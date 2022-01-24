from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired
from app.models import Like


class LikeForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[
        DataRequired()])
    transaction_id = IntegerField('transaction_id', validators=[
        DataRequired()])