import json
import sys
import subprocess
import threading
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path

PORT = 8080
BASE_DIR = Path(__file__).parent

_agent_running = False
_lock = threading.Lock()


class Handler(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path in ("/", "/index.html"):
            self._serve_file(BASE_DIR / "dashboard.html", "text/html; charset=utf-8")
        elif self.path == "/api/data":
            self._serve_json(BASE_DIR / "run_log.json")
        elif self.path == "/api/status":
            self._send_json({"running": _agent_running})
        elif self.path == "/favicon.ico":
            self.send_response(204)
            self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path == "/api/run":
            self._trigger_agent()
        else:
            self.send_response(404)
            self.end_headers()

    def _serve_file(self, path, content_type):
        if not path.exists():
            self.send_response(404)
            self.end_headers()
            return
        data = path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", len(data))
        self.end_headers()
        self.wfile.write(data)

    def _serve_json(self, path):
        data = path.read_bytes() if path.exists() else b"[]"
        self._send_raw_json(data)

    def _send_json(self, obj):
        self._send_raw_json(json.dumps(obj).encode())

    def _send_raw_json(self, data):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", len(data))
        self.end_headers()
        self.wfile.write(data)

    def _trigger_agent(self):
        global _agent_running
        with _lock:
            if _agent_running:
                self._send_json({"status": "already_running"})
                return
            _agent_running = True

        def run():
            global _agent_running
            try:
                subprocess.run(
                    [sys.executable, str(BASE_DIR / "agent.py")],
                    cwd=str(BASE_DIR),
                )
            finally:
                _agent_running = False

        threading.Thread(target=run, daemon=True).start()
        self._send_json({"status": "started"})

    def log_message(self, format, *args):
        pass  # suppress per-request logs


def main():
    server = HTTPServer(("0.0.0.0", PORT), Handler)
    print(f"[OK] Dashboard: http://localhost:{PORT}")
    print(f"[->] Press Ctrl+C to stop")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[->] Server stopped")


if __name__ == "__main__":
    main()
