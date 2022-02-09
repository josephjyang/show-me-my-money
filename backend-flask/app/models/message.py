from .db import db
from sqlalchemy.sql import func


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    chat_id = db.Column(db.Integer, db.ForeignKey("chats.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now())
    
    user = db.relationship(
        "User",
        back_populates="messages"
    )
    chat = db.relationship(
        "Chat",
        back_populates="messages"
    )


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'chat_id': self.chat_id,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'payer': self.payer.to_dict(),
            'payee': self.payee.to_dict(),
            'creator': self.creator.to_dict(),
            'comments': {comment.to_dict_transactions()['id']: comment.to_dict_transactions()
                         for comment in self.comments},
            'likes': {like.to_dict_transactions()['user_id']: like.to_dict_transactions()
                      for like in self.likes},
        }

    def to_dict_user(self):
        return {
            'id': self.id,
            'payer_id': self.payer_id,
            'payee_id': self.payee_id,
            'creator_id': self.creator_id,
            'amount': str(self.amount),
            'details': self.details,
            'paid': self.paid,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
