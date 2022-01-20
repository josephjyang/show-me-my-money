from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Comment


class CommentForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[
        DataRequired()])
    transaction_id = IntegerField('transaction_id', validators=[
        DataRequired()])
    content = StringField('content', validators=[
        DataRequired()])
