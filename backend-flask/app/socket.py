from flask_socketio import SocketIO, emit
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://show-me-my-money.herokuapp.com",
        "https://show-me-my-money.herokuapp.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("chat")
def handle_chat(data):
    # code to follow
    emit("chat", data, broadcast=True)