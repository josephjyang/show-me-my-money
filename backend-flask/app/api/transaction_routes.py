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


@transaction_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@transaction_routes.route('/<int:id>/friends')
@login_required
def get_all_friends(id):
    user = User.query.get(id)
    following = {friend.id: friend.to_dict_friends()
                 for friend in user.following}
    followed = {friend.id: friend.to_dict_friends()
                for friend in user.followed}
    friends = {**following, **followed}
    return {'friends': friends}


@transaction_routes.route('/<int:id>/friends/transactions')
@login_required
def get_all_transactions(id):
    user = User.query.get(id)
    followedIds = [friend.id for friend in user.followed]
    followingIds = [friend.id for friend in user.following]
    friendIds = followedIds + followingIds
    transactions = Transaction.query.filter(or_(Transaction.payee_id == user.id,
                                                Transaction.payer_id == user.id,
                                                Transaction.payee_id.in_(
                                                    friendIds),
                                                Transaction.payee_id.in_(
                                                    friendIds),
                                                ))
    return {'transactions': [transaction.to_dict() for transaction in transactions]}
