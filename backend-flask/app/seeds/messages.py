from app.models import db, Message


def seed_messages():
    rod_jerry = Message(
        user_id=2,
        chat_id=1,
        content="Hi Jerry"
    )

    marcee_rod = Message(
        user_id=4,
        chat_id=2,
        content="Hi Honey"
    )

    rod_dorothy = Message(
        user_id=2,
        chat_id=3,
        content="Hi Dorothy"
    )

    db.session.add(rod_jerry)
    db.session.add(marcee_rod)
    db.session.add(rod_dorothy)

    db.session.commit()


def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
