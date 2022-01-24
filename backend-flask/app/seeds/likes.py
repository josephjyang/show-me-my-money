from app.models import db, Like


def seed_likes():
    rod_1 = Like(
        user_id=2,
        transaction_id=4
    )

    rod_2 = Like(
        user_id=2,
        transaction_id=6
    )

    jerry_1 = Like(
        user_id=3,
        transaction_id=1
    )

    jerry_2 = Like(
        user_id=3,
        transaction_id=2
    )

    jerry_3 = Like(
        user_id=3,
        transaction_id=4
    )

    jerry_4 = Like(
        user_id=3,
        transaction_id=6
    )

    marcee_1 = Like(
        user_id=4,
        transaction_id=2
    )

    marcee_2 = Like(
        user_id=4,
        transaction_id=5
    )

    dorothy_1 = Like(
        user_id=5,
        transaction_id=1
    )

    dorothy_2 = Like(
        user_id=5,
        transaction_id=4
    )

    dorothy_3 = Like(
        user_id=5,
        transaction_id=5
    )

    dorothy_4 = Like(
        user_id=5,
        transaction_id=6
    )

    db.session.add(rod_1)
    db.session.add(rod_2)
    db.session.add(jerry_1)
    db.session.add(jerry_2)
    db.session.add(jerry_3)
    db.session.add(jerry_4)
    db.session.add(marcee_1)
    db.session.add(marcee_2)
    db.session.add(dorothy_1)
    db.session.add(dorothy_2)
    db.session.add(dorothy_3)
    db.session.add(dorothy_4)

    db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
