from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Transaction, db, Comment, Like
from sqlalchemy import or_
from app.forms import TransactionForm, CommentForm, LikeForm

transaction_routes = Blueprint('transactions', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@transaction_routes.route('/', methods=["POST"])
@login_required
def new_transaction():
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        transaction = Transaction()
        form.populate_obj(transaction)
        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@transaction_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_transaction(id):
    transaction = Transaction.query.get(id)
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        transaction.payer_id = form.payer_id.data
        transaction.payee_id = form.payee_id.data
        transaction.amount = form.amount.data
        transaction.details = form.details.data
        transaction.paid = form.paid.data
        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@transaction_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_transaction(id):
	transaction = Transaction.query.get(id)
	db.session.delete(transaction)
	db.session.commit()
	return {'message': 'Successfully Deleted Transaction'}
	# Delete task from database
	# return success message


@transaction_routes.route('/<int:id>/comments', methods=["POST"])
@login_required
def new_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment()
        form.populate_obj(comment)
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@transaction_routes.route('/<int:id>/likes', methods=["POST"])
@login_required
def new_like(id):
    form = LikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        like = Like()
        form.populate_obj(like)
        db.session.add(like)
        db.session.commit()
        return like.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
