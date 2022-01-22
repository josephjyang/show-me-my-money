from flask import Blueprint, request
from flask_login import login_required
from app.models import Comment, db
from sqlalchemy import or_
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@comment_routes.route('/')
@login_required
def get_comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}