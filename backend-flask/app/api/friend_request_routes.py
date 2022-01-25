from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Transaction, db, Comment, Like
from sqlalchemy import or_
from app.forms import FriendRequestForm

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
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form)
    if form.validate_on_submit():
        transaction = Transaction()
        form.populate_obj(transaction)
        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@friend_request_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_transaction(id):
	transaction = Transaction.query.get(id)
	db.session.delete(transaction)
	db.session.commit()
	return {'message': 'Successfully Deleted Transaction'}
	# Delete task from database
	# return success message


@friend_request_routes.route('/<int:id>/comments', methods=["POST"])
@login_required
def new_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form)
    if form.validate_on_submit():
        comment = Comment()
        form.populate_obj(comment)
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@friend_request_routes.route('/<int:id>/likes', methods=["POST"])
@login_required
def new_like(id):
    form = LikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form)
    if form.validate_on_submit():
        like = Like()
        form.populate_obj(like)
        db.session.add(like)
        db.session.commit()
        return like.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401