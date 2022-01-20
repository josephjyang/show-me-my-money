from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

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
@login_required
def get_all_friends(id):
    user = User.query.get(id)
    results = User.query.filter(User.id == user.id).all()
    obj = {'tasks': [task.to_dict() for task in results]}
    return {'tasks': [task.to_dict() for task in results]}