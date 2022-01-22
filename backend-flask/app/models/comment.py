from .db import db
from sqlalchemy.sql import func


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    transaction_id = db.Column(
        db.Integer, db.ForeignKey("transactions.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now())
    
    user = db.relationship("User", back_populates="comments")
    transaction = db.relationship(
        "Transaction", back_populates="comments")
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'transaction_id': self.transaction_id,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict_friends(),
            'transaction': self.transaction.to_dict_user()
        }
    

    def to_dict_transactions(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'transaction_id': self.transaction_id,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict_friends(),
        }
