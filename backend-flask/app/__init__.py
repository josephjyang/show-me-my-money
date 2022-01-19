import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes

from .seeds import seed_comands
from .config import Config

app = Flask(__name__)

login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


app.cli.add_command(seed_commands)
