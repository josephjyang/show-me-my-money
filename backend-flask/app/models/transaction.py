from .db import db
from sqlalchemy.sql import func


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    payer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    payee_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    creator_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    amount = db.Column(db.Float(asdecimal=True), nullable=False)
    details = db.Column(db.Text, nullable=False)
    paid = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now())
    
    payer = db.relationship(
        "User", 
        foreign_keys=[payer_id],
        backref="transactions_sent")
    payee = db.relationship(
        "User", 
        foreign_keys=[payee_id],
        backref="transactions_received")
    creator = db.relationship(
        "User",
        foreign_keys=[creator_id],
        backref="transactions_created")
    comments = db.relationship(
        "Comment",
        back_populates="transaction",
        cascade="all, delete"
    )
    likes = db.relationship(
        "Like",
        back_populates="transaction",
        cascade="all, delete"
    )

    def to_dict(self):
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
