from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Transaction


class TransactionForm(FlaskForm):
    payer_id = IntegerField('payer_id', validators=[
        DataRequired()])
    payee_id = IntegerField('payee_id', validators=[
        DataRequired()])
    creator_id = IntegerField('creator_id', validators=[
        DataRequired()])
    amount = DecimalField('amount', places=2, validators=[
                        DataRequired()])
    details = StringField('details', validators=[DataRequired()])
    paid = BooleanField('paid')