from flask_cors import CORS
from app import app

if __name__ == "__main__":
    CORS(app, origins='*')
    app.run(debug=True, host='0.0.0.0', port=5002)
