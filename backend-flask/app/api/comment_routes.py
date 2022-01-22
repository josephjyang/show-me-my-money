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


@comment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_comment(id):
	comment = Comment.query.get(id)
	db.session.delete(comment)
	db.session.commit()
	return {'message': 'Successfully Deleted Comment'}


@comment_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_comment(id):
    comment = Comment.query.get(id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.content = form.content.data
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
