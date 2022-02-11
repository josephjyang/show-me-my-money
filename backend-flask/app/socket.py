from flask_socketio import SocketIO, emit
from app.models import db, Message
import os

if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://show-me-my-money.herokuapp.com',
        'https://show-me-my-money.herokuapp.com'
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("chat")
def handle_chat(data):
    new_msg = Message(user_id=data['user']['id'], 
                        chat_id=data['chat_id'],
                        content=data['content'])
    db.session.add(new_msg)
    db.session.commit()
    emit("chat", data, broadcast=True)