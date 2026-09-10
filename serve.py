#!/usr/bin/env python3
"""Serve the atlas locally on an OS-assigned port, without external dependencies."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from build import build

class Handler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.mjs':'text/javascript'}

if __name__ == '__main__':
    root = Path(__file__).resolve().parent
    root = root / 'dist'
    build(root)
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Handler, directory=str(root)))
    print(f'Local: http://127.0.0.1:{server.server_port}/', flush=True)
    server.serve_forever()
