from flask.cli import AppGroup
from .users import seed_users, undo_users
from .friend_requests import seed_friend_requests, undo_friend_requests
from .transactions import seed_transactions, undo_transactions

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    seed_users()
    seed_friend_requests()
    seed_transactions()


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_friend_requests()
    undo_transactions()