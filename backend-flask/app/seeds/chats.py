from app.models import db, Chat


def seed_chats():
    rod_jerry = Chat(
        user_id=2,
        friend_id=3
    )

    marcee_rod = Chat(
        user_id=4,
        friend_id=2
    )

    rod_dorothy = Chat(
        user_id=2,
        friend_id=5
    )

    db.session.add(rod_jerry)
    db.session.add(marcee_rod)
    db.session.add(rod_dorothy)

    db.session.commit()


def undo_chats():
    db.session.execute('TRUNCATE chats RESTART IDENTITY CASCADE;')
    db.session.commit()
