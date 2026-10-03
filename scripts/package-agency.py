#!/usr/bin/env python3
"""Build isolated, credential-free distribution candidates from an allowlist."""

import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
import zipfile

ROOT = Path(__file__).resolve().parent.parent
COMMON = [
    'README.md', 'WORKFLOWS.md', 'LICENSE', 'PRIVACY.md', 'TERMS.md',
    'SUPPORT.md', 'SECURITY.md', 'CONTRIBUTING.md', 'CHANGELOG.md',
    'RELEASE-CHECKLIST.md', 'skills', 'assets', 'agency', 'docs',
    'scripts/agency-catalog.mjs', 'scripts/agency.mjs',
    'scripts/build-agency-catalog.mjs', 'scripts/plan-expo-project.mjs',
]
SURFACES = {
    'portable': ['plugin.json', 'agents'],
    'openai': ['.codex-plugin/plugin.json'],
    'claude': ['.claude-plugin/plugin.json', '.claude-plugin/marketplace.json', 'agents'],
    'cursor': ['.cursor-plugin/plugin.json'],
}
EXCLUDED_NAMES = {'.git', '.DS_Store', 'node_modules', '__pycache__', 'dist', 'coverage'}
SECRET_SUFFIXES = {'.p8', '.p12', '.pem', '.key', '.jks', '.keystore'}
SECRET_NAME = re.compile(r'^(?:GoogleService-Info\.plist|google-services\.json|credentials\.json|service-account.*\.json)$', re.IGNORECASE)


def collect_files(root, surface):
    """Reject unsafe entries rather than following symlinks into another tree."""
    if surface not in SURFACES:
        raise ValueError('Unknown distribution surface')
    files = []

    def visit(file):
        if file.is_symlink():
            raise ValueError('Symbolic links are not allowed in bundles')
        if file.name in EXCLUDED_NAMES:
            return
        if file.name.startswith('.env') or file.suffix.lower() in SECRET_SUFFIXES or SECRET_NAME.fullmatch(file.name):
            raise ValueError('Credential-shaped file in allowlisted bundle content')
        if file.is_dir():
            for child in sorted(file.iterdir()):
                visit(child)
        elif file.is_file():
            files.append(file)
        else:
            raise ValueError('Missing or unsupported allowlisted entry')

    for item in COMMON + SURFACES[surface]:
        visit(root / item)
    return sorted(files)


def create_bundle(root, surface, destination):
    """Create a reproducible single-root ZIP without overwriting an artifact."""
    files = collect_files(root, surface)
    with zipfile.ZipFile(destination, 'x', compression=zipfile.ZIP_DEFLATED) as archive:
        for file in files:
            member = 'mobile-app-builder/' + file.relative_to(root).as_posix()
            info = zipfile.ZipInfo(member, date_time=(2026, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, file.read_bytes())
    with zipfile.ZipFile(destination) as archive:
        if archive.testzip() is not None:
            raise ValueError('Archive integrity failed')
    return {
        'surface': surface,
        'file': destination.name,
        'sha256': hashlib.sha256(destination.read_bytes()).hexdigest(),
        'files': len(files),
    }


def main():
    # Package only after repository safety and catalog freshness checks pass.
    for arguments in [
        ['node', 'scripts/audit-public-package.mjs', '.'],
        ['node', 'scripts/build-agency-catalog.mjs', '--check'],
        ['node', 'scripts/validate-agency.mjs'],
    ]:
        subprocess.run(arguments, cwd=ROOT, check=True)
    version = json.loads((ROOT / 'plugin.json').read_text())['version']
    destination = ROOT / 'dist' / version
    destination.mkdir(parents=True, exist_ok=True)
    outputs = [(surface, destination / f'mobile-app-builder-{version}-{surface}.zip') for surface in SURFACES]
    receipt_path = destination / 'release-receipt.json'
    if receipt_path.exists() or any(file.exists() for _, file in outputs):
        raise ValueError('Release artifacts already exist; choose a new version or explicitly remove only stale candidates')
    # Preflight every surface before writing any output.
    for surface, _ in outputs:
        collect_files(ROOT, surface)
    receipts = [create_bundle(ROOT, surface, file) for surface, file in outputs]
    subprocess.run(['node', 'scripts/validate-openai-upload.mjs', str(destination / f'mobile-app-builder-{version}-openai.zip')], cwd=ROOT, check=True)
    receipt_path.write_text(json.dumps({'version': version, 'status': 'validated-local-candidate', 'bundles': receipts}, indent=2) + '\n')
    for receipt in receipts:
        print(f"Built {receipt['file']}: {receipt['files']} files, SHA-256 {receipt['sha256']}")


if __name__ == '__main__':
    try:
        main()
    except (OSError, ValueError, zipfile.BadZipFile, subprocess.CalledProcessError) as error:
        print(f'Packaging failed: {error}', file=sys.stderr)
        sys.exit(1)
