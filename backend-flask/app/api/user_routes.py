from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Transaction
from sqlalchemy import or_

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/friends')
# @login_required
def get_all_friends(id):
    user = User.query.get(id)
    following = {friend.id: friend.to_dict_friends()
                 for friend in user.following}
    followed = {friend.id: friend.to_dict_friends()
                for friend in user.followed}
    friends = { **following, **followed }
    return {'friends': friends}


@user_routes.route('/<int:id>/friends/transactions')
# @login_required
def get_all_transactions(id):
    user = User.query.get(id)
    followedIds = [friend.id for friend in user.followed]
    followingIds = [friend.id for friend in user.following]
    friendIds = followedIds + followingIds
    transactions = Transaction.query.filter(or_(Transaction.payee_id == user.id,
        Transaction.payer_id == user.id,
        Transaction.payee_id.in_(friendIds),
        Transaction.payee_id.in_(friendIds),
        ))
    return {'transactions': [transaction.to_dict() for transaction in transactions]}