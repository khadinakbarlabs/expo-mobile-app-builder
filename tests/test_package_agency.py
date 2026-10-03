import importlib.util
from pathlib import Path
import tempfile
import unittest

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

    def test_bundle_refuses_overwrite(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.fixture(root)
            output = root / 'candidate.zip'
            PACKAGE.create_bundle(root, 'openai', output)
            with self.assertRaises(FileExistsError):
                PACKAGE.create_bundle(root, 'openai', output)


if __name__ == '__main__':
    unittest.main()
