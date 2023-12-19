from flask import Blueprint
from app.services.filterService import FilterService

filters_bp = Blueprint('filters', __name__)


@filters_bp.route('/', methods=['GET'])
def get_filters():
    return [FilterService.CLAHE, FilterService.EQUALIZE_HIST, FilterService.ORIGINAL]
