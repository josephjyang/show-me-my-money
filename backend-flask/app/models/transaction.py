from .db import db
from sqlalchemy.sql import func


user_create_transactions = db.Table(
    "user_create_transactions",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "transaction_id",
        db.Integer,
        db.ForeignKey("transactions.id"),
        primary_key=True
    )
)

user_send_transactions = db.Table(
    "user_send_transactions",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "transaction_id",
        db.Integer,
        db.ForeignKey("transactions.id"),
        primary_key=True
    )
)

user_receive_transactions = db.Table(
    "user_receive_transactions",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "transaction_id",
        db.Integer,
        db.ForeignKey("transactions.id"),
        primary_key=True
    )
)


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    payer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    payee_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    creator_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    amount = db.Column(db.Numeric(precision=2), nullable=False)
    details = db.Column(db.Text, nullable=False)
    paid = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now())
    
    payer = db.relationship(
        "User", 
        secondary=user_send_transactions,
        back_populates="transactions_sent")
    payee = db.relationship(
        "User", 
        secondary=user_receive_transactions,
        back_populates="transactions_received")
    creator = db.relationship(
        "User",
        secondary=user_create_transactions,
        back_populates="transactions_created")
    comments = db.relationship(
        "Comment",
        back_populates="transaction",
        cascade="all, delete"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'payer_id': self.payer_id,
            'payee_id': self.payee_id,
            'creator_id': self.creator_id,
            'amount': self.amount,
            'details': self.details,
            'paid': self.paid,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'payer': self.payer.to_dict(),
            'payee': self.payee.to_dict(),
            'creator': self.creator.to_dict()
        }
