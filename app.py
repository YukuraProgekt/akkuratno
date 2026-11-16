#!/usr/bin/env python3
"""
Akkuratno — Flask backend for Vercel (and local).

Хранение заявок:
  - на Vercel: Upstash Redis (нужны env UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
  - локально: файл bookings.json (если Redis не настроен)
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
from datetime import datetime
from pathlib import Path

app = Flask(__name__)
CORS(app)

BOOKINGS_KEY = "akkuratno:bookings"
LOCAL_FILE = Path(__file__).parent / "bookings.json"

_redis = None


def _get_redis():
    global _redis
    if _redis is not None:
        return _redis
    url = os.environ.get("UPSTASH_REDIS_REST_URL")
    token = os.environ.get("UPSTASH_REDIS_REST_TOKEN")
    if url and token:
        try:
            from upstash_redis import Redis
            _redis = Redis(url=url, token=token)
            return _redis
        except Exception as e:
            print("Redis init failed:", e)
    return None


def load_bookings():
    r = _get_redis()
    if r is not None:
        raw = r.get(BOOKINGS_KEY)
        if not raw:
            return []
        if isinstance(raw, str):
            return json.loads(raw)
        return raw

    if not LOCAL_FILE.exists():
        return []
    try:
        with open(LOCAL_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return []


def save_bookings(data):
    r = _get_redis()
    if r is not None:
        r.set(BOOKINGS_KEY, json.dumps(data, ensure_ascii=False))
        return

    with open(LOCAL_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


@app.route("/")
def index():
    public = Path(__file__).parent / "public"
    if (public / "index.html").exists():
        return send_from_directory(public, "index.html")
    return send_from_directory(".", "index.html")


@app.route("/admin")
@app.route("/admin.html")
def admin():
    public = Path(__file__).parent / "public"
    if (public / "admin.html").exists():
        return send_from_directory(public, "admin.html")
    return send_from_directory(".", "admin.html")


@app.route("/config.js")
def config_js():
    public = Path(__file__).parent / "public"
    if (public / "config.js").exists():
        return send_from_directory(public, "config.js")
    return send_from_directory(".", "config.js")


@app.route("/gallery/<path:filename>")
def gallery(filename):
    public = Path(__file__).parent / "public" / "gallery"
    if public.exists():
        return send_from_directory(public, filename)
    return send_from_directory("gallery", filename)


@app.route("/api/bookings", methods=["GET"])
def get_bookings():
    bookings = load_bookings()
    bookings.sort(key=lambda b: b.get("id", 0), reverse=True)
    return jsonify(bookings)


@app.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.get_json(silent=True) or {}

    for field in ("name", "phone", "car", "date"):
        if not str(data.get(field, "")).strip():
            return jsonify({"ok": False, "error": f"Поле «{field}» обязательно"}), 400

    booking = {
        "id": int(datetime.now().timestamp() * 1000),
        "name": data["name"].strip(),
        "phone": data["phone"].strip(),
        "car": data["car"].strip(),
        "carType": str(data.get("carType", "")).strip(),
        "service": str(data.get("service", "")).strip(),
        "price": str(data.get("price", "—")).strip(),
        "date": data["date"].strip(),
        "time": str(data.get("time", "")).strip(),
        "comment": str(data.get("comment", "")).strip(),
        "status": "pending",
        "created": datetime.now().strftime("%d.%m.%Y %H:%M:%S"),
    }

    bookings = load_bookings()
    bookings.append(booking)
    save_bookings(bookings)
    return jsonify({"ok": True, "booking": booking}), 201


@app.route("/api/bookings/<int:booking_id>", methods=["PATCH"])
def update_booking(booking_id):
    data = request.get_json(silent=True) or {}
    new_status = data.get("status")
    if new_status not in ("pending", "confirmed", "done", "cancelled"):
        return jsonify({"ok": False, "error": "Неверный статус"}), 400

    bookings = load_bookings()
    for b in bookings:
        if b.get("id") == booking_id:
            b["status"] = new_status
            save_bookings(bookings)
            return jsonify({"ok": True, "booking": b})
    return jsonify({"ok": False, "error": "Заявка не найдена"}), 404


@app.route("/api/bookings/<int:booking_id>", methods=["DELETE"])
def delete_booking(booking_id):
    bookings = load_bookings()
    new_list = [b for b in bookings if b.get("id") != booking_id]
    if len(new_list) == len(bookings):
        return jsonify({"ok": False, "error": "Заявка не найдена"}), 404
    save_bookings(new_list)
    return jsonify({"ok": True})


@app.route("/api/bookings", methods=["DELETE"])
def clear_all():
    save_bookings([])
    return jsonify({"ok": True})


@app.route("/api/health")
def health():
    mode = "redis" if _get_redis() else "local-file"
    return jsonify({"ok": True, "storage": mode})


if __name__ == "__main__":
    print("=" * 50)
    print("  Akkuratno")
    print("  http://127.0.0.1:5000")
    print("  Админ: http://127.0.0.1:5000/admin")
    print("  Storage:", "Redis" if _get_redis() else "local bookings.json")
    print("=" * 50)
    app.run(host="0.0.0.0", port=5000, debug=True)
