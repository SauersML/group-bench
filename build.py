#!/usr/bin/env python3
"""Validate and build Group Bench as a static website."""
import argparse
import hashlib
import re
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parent
ASSETS = ('index.html', 'style.css', 'app.mjs', 'engine.mjs', 'data.mjs', 'history.mjs', 'progress.mjs', 'timeline.mjs', 'rule-history.mjs', 'og.svg')

def build(out: Path):
    subprocess.run(['node', '--test', str(ROOT / 'test.mjs'), str(ROOT / 'timeline.test.mjs')], check=True)
    out.mkdir(parents=True, exist_ok=True)
    for name in ASSETS:
        shutil.copyfile(ROOT / name, out / name)
    subprocess.run(['node', str(ROOT / 'build-timeline.mjs'), str(out / 'pair-history.json')], check=True)
    # One content revision keeps HTML, module imports, and proof data in sync after deploys.
    published = (*ASSETS, 'pair-history.json')
    revision = hashlib.sha256(b''.join((out / name).read_bytes() for name in published)).hexdigest()[:12]
    for name in ASSETS:
        if not name.endswith(('.html', '.mjs')):
            continue
        path = out / name
        text = path.read_text()
        text = re.sub(r'\./([\w-]+\.(?:mjs|css|json))',
                      lambda match: f'{match[0]}?v={revision}', text)
        path.write_text(text)
    (out / '.nojekyll').touch()
    print(f'Group Bench built: {out / "index.html"}')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--out', type=Path, default=ROOT / 'dist', help='Static site output directory')
    build(parser.parse_args().out.resolve())
