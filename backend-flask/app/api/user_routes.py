from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Transaction, FriendRequest, Chat, db
from app.forms import FriendRequestForm, UserUpdateForm, ChatForm
from sqlalchemy import or_


user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_user_balance(id):
    user = User.query.get(id)
    form = UserUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.balance = form.balance.data
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/<int:id>/friends')
@login_required
def get_all_friends(id):
    user = User.query.get(id)
    following = {friend.id: friend.to_dict_friends()
                 for friend in user.following}
    followed = {friend.id: friend.to_dict_friends()
                for friend in user.followed}
    friends = { **following, **followed }
    return {'friends': friends}


@user_routes.route('/<int:id>/friends', methods=["POST"])
@login_required
def new_friend(id):
    form = FriendRequestForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        friend_id = form.data['sender_id']
        user = User.query.get(id)
        new_friend = User.query.get(friend_id)
        user.friend(new_friend)
        db.session.commit()
        return new_friend.to_dict_friends()


@user_routes.route('/<int:id>/friends/<int:friend_id>', methods=["DELETE"])
@login_required
def delete_friend(id, friend_id):
    user = User.query.get(id)
    friend = User.query.get(friend_id)
    user.unfriend(friend)
    friend.unfriend(user)
    db.session.commit()
    return {'message': 'Successfully Deleted Friend'}


@user_routes.route('/<int:id>/friends/transactions')
@login_required
def get_all_transactions(id):
    user = User.query.get(id)
    followed_ids = [friend.id for friend in user.followed]
    following_ids = [friend.id for friend in user.following]
    friendIds = followed_ids + following_ids
    transactions = Transaction.query.filter(or_(Transaction.payee_id == user.id,
        Transaction.payer_id == user.id,
        Transaction.payee_id.in_(friendIds),
        Transaction.payee_id.in_(friendIds),
        ))
    return {'transactions': [transaction.to_dict() for transaction in transactions]}


@user_routes.route('/<int:id>/friend-requests')
@login_required
def get_all_friend_requests(id):
    friend_requests = FriendRequest.query.filter(or_(
        FriendRequest.sender_id == id,
        FriendRequest.recipient_id == id
        ))
    return {'friend_requests': [request.to_dict() for request in friend_requests]}


@user_routes.route('/<int:id>/chats')
@login_required
def get_all_chats(id):
    user = User.query.get(id)
    chats = Chat.query.filter(or_(Chat.user_id == user.id,
                                Chat.friend_id == user.id))
    print(chats)
    return {'chats': [chat.to_dict() for chat in chats]}


@user_routes.route('/<int:id>/chats', methods=["POST"])
@login_required
def new_chat(id):
    form = ChatForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        chat = Chat()
        form.populate_obj(chat)
        db.session.add(chat)
        db.session.commit()
        return chat.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
