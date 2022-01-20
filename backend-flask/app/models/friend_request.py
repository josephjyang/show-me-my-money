from .db import db
from sqlalchemy.sql import func


# user_send_friend_requests = db.Table(
#     "user_send_friend_requests",
#     db.Column(
#         "user_id",
#         db.Integer,
#         db.ForeignKey("users.id"),
#         primary_key=True
#     ),
#     db.Column(
#         "friend_request_id",
#         db.Integer,
#         db.ForeignKey("friend_requests.id"),
#         primary_key=True
#     )
# )

# user_receive_friend_requests = db.Table(
#     "user_receive_friend_requests",
#     db.Column(
#         "user_id",
#         db.Integer,
#         db.ForeignKey("users.id"),
#         primary_key=True
#     ),
#     db.Column(
#         "friend_request_id",
#         db.Integer,
#         db.ForeignKey("friend_requests.id"),
#         primary_key=True
#     )
# )

class FriendRequest(db.Model):
    __tablename__ = 'friend_requests'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now())

    sender = db.relationship(
        "User", 
        foreign_keys=[sender_id],
        backref="friend_requests_sent"
    )
    recipient = db.relationship(
        "User", 
        foreign_keys=[recipient_id],
        backref="friend_requests_received")
    
    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
