import cv2
from flask import Blueprint, Response, abort
from db_tools import get_cursor_connection
from app.services.filterService import FilterService
import uuid
import time

stream_bp = Blueprint('streams', __name__)
filter_service = FilterService()

streams_map = {}


def create_stream(slot_id):
    global streams_map
    result_row = get_slot_by_id(slot_id)
    url = result_row[0]
    filter = result_row[1]
    cap = cv2.VideoCapture(url)

    if cap.isOpened():
        new_uuid = str(uuid.uuid4())
        streams_map[new_uuid] = (cap, filter)
        print('STREAMS SIZE', len(streams_map), new_uuid)

        return new_uuid
    raise Exception('bad stream')


def release_stream(uuid):
    global streams_map
    stream, filter = streams_map.get(uuid, (None, None))
    if (stream):
        print('RELEASED', uuid)
        stream.release()
        del streams_map[uuid]
    print('STREAMS SIZE', uuid, len(streams_map))


def generate_frames(stream, filter: str or None, uuid):
    try:
        while True:
            success, frame = stream.read()

            if not success:
                stream.set(cv2.CAP_PROP_POS_FRAMES, 0)
                continue

            filtered_frame = filter_service.get_applied_filter_frame(
                frame, filter)
            _, buffer = cv2.imencode('.jpg', filtered_frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: video/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
            time.sleep(0.1)
    finally:
        release_stream(uuid)


def get_slot_by_id(slot_id):
    cursor, _ = get_cursor_connection()

    cursor.execute('SELECT url, filter FROM slots WHERE id=?', (slot_id,))
    result_row = cursor.fetchone()
    return result_row


@stream_bp.route('/<string:uuid>', methods=['GET'])
def get_stream(uuid):
    global streams_map
    stream, filter = streams_map.get(uuid, (None, None))
    if (stream is None):
        abort(404)

    return Response(generate_frames(stream, filter, uuid), mimetype='multipart/x-mixed-replace; boundary=frame')


@stream_bp.route('/open-stream/<int:slot_id>', methods=['GET'])
def open_stream(slot_id):
    try:
        id = create_stream(slot_id)
        return str(id)
    except:
        abort(404, 'Bad url')


@stream_bp.route('/drop-stream/<string:uuid>', methods=['GET'])
def close_stream(uuid):
    release_stream(uuid)
    return 'ok'
