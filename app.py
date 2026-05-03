"""
SEMIS — Hugging Face Spaces Entry Point
Hugging Face requires app.py as the main file
"""
from semis_app import app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7860, debug=False)
