from .db import db
from sqlalchemy.sql import func


class Chat(db.Model):
    __tablename__ = 'chats'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now())

    user = db.relationship(
        "User",
        foreign_keys=[user_id],
        backref="chats_sent")
    friend = db.relationship(
        "User",
        foreign_keys=[friend_id],
        backref="chats_received")
    messages = db.relationship(
        "Message",
        back_populates="chat",
        cascade="all, delete"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'friend_id': self.friend_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict(),
            'friend': self.friend.to_dict(),
            'messages': [message.to_dict_chats()
                         for message in self.messages],
        }

    def to_dict_user(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'friend_id': self.friend_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'messages': [message.to_dict_chats()
                         for message in self.messages],
        }
