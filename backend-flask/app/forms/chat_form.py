from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired
from app.models import Chat


class ChatForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[
        DataRequired()])
    friend_id = IntegerField('user_id', validators=[
        DataRequired()])
