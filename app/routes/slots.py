from flask import Blueprint, request, abort
from db_tools import get_cursor_connection
from datetime import datetime

slots_bp = Blueprint('slots', __name__)


def map_slot_dto(tpl_result):
    return {
        'id': tpl_result[0],
        'timestamp': tpl_result[1],
        'url': tpl_result[2],
        'filter': tpl_result[3],
    }


@slots_bp.route('/', methods=['GET'])
def get_slots():
    cursor, _ = get_cursor_connection()

    cursor.execute('SELECT * FROM slots;')
    results_rows = cursor.fetchall()
    return [map_slot_dto(item) for item in results_rows]


@slots_bp.route('/<int:id>', methods=['GET'])
def get_slot(id):
    cursor, _ = get_cursor_connection()

    cursor.execute(f'SELECT * FROM slots WHERE id={id};')
    result = cursor.fetchone()
    return result


@slots_bp.route('/', methods=['POST'])
def add_slot():
    cursor, connection = get_cursor_connection()
    body = request.get_json()
    url = body['url']
    if (url is None):
        abort(403, 'url is missing')

    cursor.execute(
        'INSERT INTO slots(url, timestamp) VALUES(?, ?);', (url, datetime.now(),))
    connection.commit()
    return 'ok'


@slots_bp.route('/<int:id>', methods=['PATCH'])
def update_slot(id):
    cursor, connection = get_cursor_connection()
    body = request.get_json()
    filter = body.get('filter', None)
    url = body.get('url', None)

    print(filter, url, body)

    if (filter is None and url is None):
        abort(403, 'filter&url is missing')

    update_query = "UPDATE slots SET "
    update_query += ', '.join(f"{key} = ?" for key in body)
    update_query += " WHERE id = ?;"

    # Execute the UPDATE query
    cursor.execute(update_query, tuple(body.values()) + (id,))
    connection.commit()
    return 'ok'


@slots_bp.route('/<int:id>', methods=['DELETE'])
def delete_slot(id):
    cursor, connection = get_cursor_connection()
    cursor.execute(f'DELETE FROM slots WHERE id={id};')
    connection.commit()
    return 'ok'
