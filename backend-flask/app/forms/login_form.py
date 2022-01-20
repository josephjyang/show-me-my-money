from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def user_exists(form, field):
    credential = field.data
    user = User.query.filter(User.email == credential).first()
    if not user:
        user = User.query.filter(User.username == credential).first()
        if not user:
            raise ValidationError('Email/username provided not found')


def password_matches(form, field):
    password = field.data
    credential = form.data['credential']
    user = User.query.filter(User.email == credential).first()
    if not user:
        user = User.query.filter(User.username == credential).first()
        if not user:
            raise ValidationError('Email/username provided not found')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    credential = StringField('credential', validators=[
                             DataRequired(), user_exists])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
