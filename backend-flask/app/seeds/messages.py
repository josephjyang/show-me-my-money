from app.models import db, Message


def seed_messages():
    rod_jerry = Message(
        user_id=2,
        chat_id=1,
        content="Hi Jerry"
    )

    marcee_rod = Message(
        user_id=4,
        friend_id=2
    )

    rod_dorothy = Message(
        user_id=2,
        friend_id=5
    )

    db.session.add(rod_jerry)
    db.session.add(marcee_rod)
    db.session.add(rod_dorothy)

    db.session.commit()


def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
