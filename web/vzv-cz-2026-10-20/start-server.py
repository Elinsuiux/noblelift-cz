#!/usr/bin/env python3
"""Open this folder as a local website (same as the prototype preview)."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import webbrowser

ROOT = Path(__file__).resolve().parent
os.chdir(ROOT)
HOST = "127.0.0.1"
PORT = 8080
HOME = "/pages/vzv.cz/cz/index/index.html"

class Handler(SimpleHTTPRequestHandler):
    def guess_type(self, path):
        t = super().guess_type(path)
        if t.startswith("text/html"):
            return "text/html; charset=utf-8"
        if t.startswith("text/css"):
            return "text/css; charset=utf-8"
        if t.startswith("text/javascript") or t.endswith("javascript"):
            return "application/javascript; charset=utf-8"
        return t

    def log_message(self, fmt, *args):
        print("[%s] %s" % (self.log_date_time_string(), fmt % args))

if __name__ == "__main__":
    httpd = ThreadingHTTPServer((HOST, PORT), Handler)
    url = f"http://{HOST}:{PORT}{HOME}"
    print("VZV.cz static prototype")
    print("Folder:", ROOT)
    print("Open:  ", url)
    print("Stop with Ctrl+C")
    try:
        webbrowser.open(url)
    except Exception:
        pass
    httpd.serve_forever()
