from .db import db
from sqlalchemy.sql import func


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    transaction_id = db.Column(
        db.Integer, db.ForeignKey("transactions.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now())

    user = db.relationship("User", back_populates="likes")
    transaction = db.relationship(
        "Transaction", back_populates="likes")

