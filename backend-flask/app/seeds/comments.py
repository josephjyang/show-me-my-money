from app.models import db, Comment


def seed_comments():
    rod_jerry = Comment(
        user_id=3,
        transaction_id=1,
        content="Thanks Rod! You the man."
    )

    rod_tyson = Comment(
        user_id=7,
        transaction_id=2,
        content="Thanks Dad!"
    )

    jerry_tyson = Comment(
        user_id=3,
        transaction_id=2,
        content="Happy birthday Tyson!"
    )

    jerry_rod = Comment(
        user_id=2,
        transaction_id=3,
        content="If I was playing, you KNOW the result would be different."
    )

    jerry_rod2 = Comment(
        user_id=3,
        transaction_id=3,
        content="It's a good thing for me, then, that you retired!"
    )

    marcee_dorothy = Comment(
        user_id=5,
        transaction_id=4,
        content="Yes! Are you free next weekend?"
    )

    rod_ray = Comment(
        user_id=6,
        transaction_id=5,
        content="Thanks Rod! You're still my favorite player... even though you're old."
    )

    db.session.add(rod_jerry)
    db.session.add(rod_tyson)
    db.session.add(jerry_tyson)
    db.session.add(jerry_rod)
    db.session.add(jerry_rod2)
    db.session.add(marcee_dorothy)
    db.session.add(rod_ray)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE friend_requests RESTART IDENTITY CASCADE;')
    db.session.commit()
