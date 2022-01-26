from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired


class UserUpdateForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    profile_pic = StringField('profile_pic')
    balance = DecimalField('amount', places=2, validators=[
        DataRequired()])