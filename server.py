#!/usr/bin/env python3
"""
Cole Browser Server
Powered by Ultraviolet proxy with WISP support
"""

import http.server
import socketserver
import os
import json
from urllib.parse import urlparse, parse_qs

PORT = 8080

class ColeHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        # Security headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        # Serve index.html for root
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

    def log_message(self, format, *args):
        # Custom logging
        print(f"[Cole] {self.address_string()} - {format % args}")


def run_server():
    with socketserver.TCPServer(("", PORT), ColeHandler) as httpd:
        print(f"""
╔═══════════════════════════════════════╗
║           COLE BROWSER                ║
║                                       ║
║   Server running on port {PORT}       ║
║   http://localhost:{PORT}              ║
║                                       ║
║   Press Ctrl+C to stop                ║
╚═══════════════════════════════════════╝
        """)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[Cole] Server stopped.")


if __name__ == "__main__":
    # Change to script directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    run_server()
