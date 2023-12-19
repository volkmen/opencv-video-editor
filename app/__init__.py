from flask import Flask, Response
from db_tools import run_migrations

from app.routes.slots import slots_bp
from app.routes.stream import stream_bp
from app.routes.filters import filters_bp

run_migrations()
app = Flask(__name__)


@app.route('/', methods=['OPTIONS'])
def options():
    response = Response()
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response


@app.route('/slots', methods=['OPTIONS'])
def slots_options():
    response = Response()
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response


app.register_blueprint(slots_bp, url_prefix='/slots')
app.register_blueprint(stream_bp, url_prefix='/streams')
app.register_blueprint(filters_bp, url_prefix='/filters')


@app.route('/')
def home():
    return 'Server works!!!'
