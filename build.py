#!/usr/bin/env python3
"""Validate and build Group Atlas as a static website."""
import argparse
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parent
ASSETS = ('index.html', 'style.css', 'app.mjs', 'engine.mjs', 'data.mjs', 'history.mjs', 'og.png')

def build(out: Path):
    subprocess.run(['node', '--test', str(ROOT / 'test.mjs')], check=True)
    out.mkdir(parents=True, exist_ok=True)
    for name in ASSETS:
        shutil.copyfile(ROOT / name, out / name)
    (out / '.nojekyll').touch()
    print(f'Atlas built: {out / "index.html"}')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--out', type=Path, default=ROOT / 'dist', help='Static site output directory')
    build(parser.parse_args().out.resolve())
