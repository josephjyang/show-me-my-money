from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func


friends = db.Table(
    "friends",
    db.Column("user1_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("user2_id", db.Integer, db.ForeignKey("users.id"))
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
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())
    
    friends = db.relationship(
        "User",
        secondary=friends,
        primaryjoin=(friends.c.user1_id == id),
        secondaryjoin=(friends.c.user2_id == id)
    )
    # transactions_sent = db.relationship(
    #     "Transaction", 
    #     foreign_keys=[payer_id],
    #     back_populates="payer",
    #     cascade="all, delete"
    #     )
    # transactions_received = db.relationship(
    #     "Transaction", 
    #     foreign_keys=[payee_id],
    #     back_populates="payee",
    #     cascade="all, delete"
    #     )
    # transactions_created = db.relationship(
    #     "Transaction", 
    #     foreign_keys=[creator_id],
    #     back_populates="creator",
    #     cascade="all, delete"
    #     )
    # friend_requests_sent = db.relationship(
    #     "FriendRequest",
    #     foreign_keys=[sender_id],
    #     back_populates="sender",
    #     cascade="all, delete"
    #     )
    # friend_requests_received = db.relationship(
    #     "FriendRequest", 
    #     foreign_keys=[recipient_id],
    #     back_populates="recipient",
    #     cascade="all, delete"
    #     )
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

    @property
    def password(self):
        return self.hashed_password
    
    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

    
    def friend(self, user):
        if user not in self.friends:
            self.friends.append(user)
            return self.to_dict()


    def unfriend(self, user):
        if user in self.friends:
            self.friends.remove(user)
            return self.to_dict()

    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_pic': self.profile_pic,
            'friends': {user.friends_to_dict()['id']:user.friends_to_dict() for user in self.friends}
        }
    

    def friends_to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_pic': self.profile_pic,
            'friends': {user.friends_to_dict()['id']: user.friends_to_dict() for user in self.friends}
        }
