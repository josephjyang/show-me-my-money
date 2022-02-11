from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func


friends = db.Table(
    "friends",
    db.Column("user1_id", db.Integer, db.ForeignKey(
        "users.id"), nullable=False),
    db.Column("user2_id", db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(1000), nullable=True)
    balance = db.Column(db.Float(asdecimal=True), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now())

    following = db.relationship(
        "User",
        secondary=friends,
        primaryjoin=(friends.c.user1_id == id),
        secondaryjoin=(friends.c.user2_id == id),
        backref=db.backref("followed", lazy="dynamic"),
        lazy="dynamic"
    )

    comments = db.relationship(
        "Comment",
        back_populates="user",
        cascade="all, delete"
    )
    likes = db.relationship(
        "Like",
        back_populates="user",
        cascade="all, delete"
    )
    messages = db.relationship(
        "Message",
        back_populates="user",
        cascade="all, delete"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def friend(self, user):
        if user not in self.following and user not in self.followed:
            self.followed.append(user)
            return self.to_dict()

    def unfriend(self, user):
        if user in self.following:
            self.following.remove(user)
            return self.to_dict()
        if user in self.followed:
            self.followed.remove(user)
            return self.to_dict()

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_pic': self.profile_pic,
            'balance': str(self.balance),
            'transactions_sent': {transaction.to_dict_user()['id']: transaction.to_dict_user() 
                        for transaction in self.transactions_sent},
            'transactions_received': {transaction.to_dict_user()['id']: transaction.to_dict_user() 
                        for transaction in self.transactions_received},
            'transactions_created': {transaction.to_dict_user()['id']: transaction.to_dict_user()
                                      for transaction in self.transactions_created},
            'following': {user.to_dict_friends()['id']: user.to_dict_friends()
                        for user in self.following},
            'followed': {user.to_dict_friends()['id']: user.to_dict_friends()
                        for user in self.followed},
            'friend_requests_sent': {request.to_dict()['recipient_id']: request.to_dict()
                                     for request in self.friend_requests_sent},
            'friend_requests_received': {request.to_dict()['sender_id']: request.to_dict()
                                     for request in self.friend_requests_received},
            'likes': {like.to_dict_transactions()['transaction_id']: like.to_dict_transactions()
                                         for like in self.likes}
        }

    def to_dict_friends(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_pic': self.profile_pic,
            'balance': str(self.balance)
        }
