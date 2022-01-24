from flask import Blueprint, request
from flask_login import login_required
from app.models import Like, db

like_routes = Blueprint('likes', __name__)


@like_routes.route('/')
@login_required
def get_likes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}


@like_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_like(id):
	like = Like.query.get(id)
	db.session.delete(like)
	db.session.commit()
	return {'message': 'Successfully Deleted Like'}
