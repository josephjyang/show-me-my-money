from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Transaction, db, Comment, Like, FriendRequest
from sqlalchemy import or_
from app.forms import FriendRequestForm, LikeForm, CommentForm

friend_request_routes = Blueprint('friend_requests', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@friend_request_routes.route('/', methods=["POST"])
@login_required
def new_friend_request():
    form = FriendRequestForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        friend_request = FriendRequest()
        form.populate_obj(friend_request)
        db.session.add(friend_request)
        db.session.commit()
        return friend_request.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@friend_request_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_friend_request(id):
	request = FriendRequest.query.get(id)
	db.session.delete(request)
	db.session.commit()
	return {'message': 'Successfully Deleted Transaction'}
	# Delete task from database
	# return success message