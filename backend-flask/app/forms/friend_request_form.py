from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired
from app.models import FriendRequest


class FriendRequestForm(FlaskForm):
    sender_id = IntegerField('sender_id', validators=[
        DataRequired()])
    recipient_id = IntegerField('recipient_id', validators=[
        DataRequired()])
