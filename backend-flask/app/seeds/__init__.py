from flask.cli import AppGroup
from .users import seed_users, undo_users
from .friend_requests import seed_friend_requests, undo_friend_requests
from .transactions import seed_transactions, undo_transactions
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from .chats import seed_chats, undo_chats
from .messages import seed_messages, undo_messages

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    seed_users()
    seed_friend_requests()
    seed_transactions()
    seed_comments()
    seed_likes()
    seed_chats()
    seed_messages()


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_friend_requests()
    undo_transactions()
    undo_comments()
    undo_likes()
    undo_chats()
    undo_messages()
