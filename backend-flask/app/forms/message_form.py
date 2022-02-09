from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Message


class MessageForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[
        DataRequired()])
    chat_id = IntegerField('user_id', validators=[
        DataRequired()])
    content = StringField('content', validators=[
        DataRequired()])