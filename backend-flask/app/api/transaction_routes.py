from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Transaction, db
from sqlalchemy import or_
from app.forms import TransactionForm

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
    print(form)
    if form.validate_on_submit():
        transaction = Transaction()
        form.populate_obj(transaction)
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
