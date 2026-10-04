import importlib.util
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import subprocess

SPEC = importlib.util.spec_from_file_location('package_agency', Path(__file__).parents[1] / 'scripts/package-agency.py')
PACKAGE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(PACKAGE)


class PackageTests(unittest.TestCase):
    def fixture(self, root):
        for name in PACKAGE.COMMON + [entry for entries in PACKAGE.SURFACES.values() for entry in entries]:
            file = root / name
            if name in ['skills', 'assets', 'agency', 'docs', 'agents']:
                file.mkdir(parents=True, exist_ok=True)
            else:
                file.parent.mkdir(parents=True, exist_ok=True)
                file.write_text('{}')

    def test_openai_does_not_mix_native_agents_or_manifests(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.fixture(root)
            (root / 'agents/ux-designer.md').write_text('role')
            paths = {file.relative_to(root).as_posix() for file in PACKAGE.collect_files(root, 'openai')}
            self.assertIn('.codex-plugin/plugin.json', paths)
            self.assertNotIn('plugin.json', paths)
            self.assertNotIn('.claude-plugin/plugin.json', paths)
            self.assertNotIn('agents/ux-designer.md', paths)

    def test_media_release_tool_is_excluded_from_every_installed_surface(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.fixture(root)
            (root / 'scripts/validate-anthropic-media.mjs').write_text('source-only check')
            for surface in PACKAGE.SURFACES:
                paths = {file.relative_to(root).as_posix() for file in PACKAGE.collect_files(root, surface)}
                self.assertNotIn('scripts/validate-anthropic-media.mjs', paths)

    def test_publisher_scanners_and_catalog_generation_are_source_only(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.fixture(root)
            publisher_tools = ['scripts/agency-catalog.mjs', 'scripts/build-agency-catalog.mjs', 'scripts/check-anthropic-package.mjs', 'skills/prepare-anthropic-plugin/scripts/check-plugin.mjs']
            for name in publisher_tools:
                file = root / name
                file.parent.mkdir(parents=True, exist_ok=True)
                file.write_text('publisher tool')
            for surface in PACKAGE.SURFACES:
                paths = {file.relative_to(root).as_posix() for file in PACKAGE.collect_files(root, surface)}
                for name in publisher_tools:
                    self.assertNotIn(name, paths)
                self.assertIn('scripts/agency-runtime.mjs', paths)
                self.assertIn('scripts/agency.mjs', paths)

    def test_owner_artwork_preview_is_source_only_and_brand_docs_remain(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.fixture(root)
            (root / 'docs/OWNER-REVIEW.html').write_text('<img src="../assets/mobile-app-builder-logo-v8.png">')
            (root / 'docs/BRAND.md').write_text('Brand guidance')
            for surface in PACKAGE.SURFACES:
                paths = {file.relative_to(root).as_posix() for file in PACKAGE.collect_files(root, surface)}
                self.assertNotIn('docs/OWNER-REVIEW.html', paths)
                self.assertIn('docs/BRAND.md', paths)

    def test_symlinks_and_credentials_are_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.fixture(root)
            linked = root / 'skills/linked'
            linked.symlink_to(root / 'README.md')
            with self.assertRaisesRegex(ValueError, 'Symbolic'):
                PACKAGE.collect_files(root, 'openai')
            linked.unlink()
            (root / 'skills/.env').write_text('placeholder')
            with self.assertRaisesRegex(ValueError, 'Credential'):
                PACKAGE.collect_files(root, 'openai')
            (root / 'skills/.env').unlink()
            (root / 'skills/service-account-test.json').write_text('{}')
            with self.assertRaisesRegex(ValueError, 'Credential'):
                PACKAGE.collect_files(root, 'openai')

    def test_only_current_brand_art_ships_and_older_art_remains_in_source(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.fixture(root)
            for name in ['mobile-app-builder-logo-v8.png', 'mobile-app-builder-banner.png', 'composer-icon.png', 'mobile-app-builder-icon-v5-1024.png', 'mobile-app-builder-logo-v6.png']:
                (root / 'assets' / name).write_text('art')
            for surface in PACKAGE.SURFACES:
                paths = {file.relative_to(root).as_posix() for file in PACKAGE.collect_files(root, surface)}
                self.assertIn('assets/mobile-app-builder-logo-v8.png', paths)
                self.assertIn('assets/mobile-app-builder-banner.png', paths)
                self.assertNotIn('assets/composer-icon.png', paths)
                self.assertNotIn('assets/mobile-app-builder-icon-v5-1024.png', paths)
                self.assertNotIn('assets/mobile-app-builder-logo-v6.png', paths)
            self.assertTrue((root / 'assets/mobile-app-builder-logo-v6.png').exists())

    def test_bundle_refuses_overwrite(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.fixture(root)
            output = root / 'candidate.zip'
            PACKAGE.create_bundle(root, 'openai', output)
            with self.assertRaises(FileExistsError):
                PACKAGE.create_bundle(root, 'openai', output)

    def test_cloudflare_local_credentials_are_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.fixture(root)
            (root / 'skills/.dev.vars.preview').write_text('placeholder')
            with self.assertRaisesRegex(ValueError, 'Credential'):
                PACKAGE.collect_files(root, 'claude')

    def test_final_validation_failure_does_not_publish_or_block_retry(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.fixture(root)
            (root / 'plugin.json').write_text('{"version":"1.0.0"}')

            def validate(arguments, **kwargs):
                if 'scripts/validate-openai-upload.mjs' in arguments:
                    raise subprocess.CalledProcessError(1, arguments)

            with patch.object(PACKAGE, 'ROOT', root), patch.object(PACKAGE.subprocess, 'run', side_effect=validate):
                with self.assertRaises(subprocess.CalledProcessError):
                    PACKAGE.main()
            self.assertFalse((root / 'dist/1.0.0').exists())
            with patch.object(PACKAGE, 'ROOT', root), patch.object(PACKAGE.subprocess, 'run'):
                PACKAGE.main()
            self.assertTrue((root / 'dist/1.0.0/release-receipt.json').exists())

    def test_release_version_cannot_escape_distribution_directory(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.fixture(root)
            (root / 'plugin.json').write_text('{"version":"../outside"}')
            with patch.object(PACKAGE, 'ROOT', root), patch.object(PACKAGE.subprocess, 'run'):
                with self.assertRaisesRegex(ValueError, 'semantic version'):
                    PACKAGE.main()
            self.assertFalse((root / 'dist').exists())


if __name__ == '__main__':
    unittest.main()
