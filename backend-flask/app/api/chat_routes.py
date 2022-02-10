# from flask import Blueprint, request
# from flask_login import login_required
# from app.models import Like, db

# chat_routes = Blueprint('chats', __name__)


# @chat_routes.route('/')
# @login_required
# def get_chats():
#     likes = Like.query.all()
#     return {'likes': [like.to_dict() for like in likes]}


# @chat_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
# def delete_chat(id):
# 	like = Like.query.get(id)
# 	db.session.delete(like)
# 	db.session.commit()
# 	return {'message': 'Successfully Deleted Like'}
