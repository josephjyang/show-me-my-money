from app.models import db, FriendRequest


def seed_friend_requests():
    rod_ray = FriendRequest(
        sender_id=2,
        recipient_id=6
    )

    rod_tyson = FriendRequest(
        sender_id=2,
        recipient_id=7
    )

    jerry_ray = FriendRequest(
        sender_id=3,
        recipient_id=6
    )

    jerry_tyson = FriendRequest(
        sender_id=3,
        recipient_id=7
    )

    marcee_ray = FriendRequest(
        sender_id=4,
        recipient_id=6
    )

    marcee_tyson = FriendRequest(
        sender_id=4,
        recipient_id=7
    )

    dorothy_ray = FriendRequest(
        sender_id=5,
        recipient_id=6
    )

    dorothy_tyson = FriendRequest(
        sender_id=5,
        recipient_id=7
    )

    cush_rod = FriendRequest(
        sender_id=8,
        recipient_id=2
    )

    bob_rod = FriendRequest(
        sender_id=9,
        recipient_id=2
    )

    db.session.add(rod_ray)
    db.session.add(rod_tyson)
    db.session.add(jerry_ray)
    db.session.add(jerry_tyson)
    db.session.add(marcee_ray)
    db.session.add(marcee_tyson)
    db.session.add(dorothy_ray)
    db.session.add(dorothy_tyson)
    db.session.add(cush_rod)
    db.session.add(bob_rod)

    db.session.commit()


def undo_friend_requests():
    db.session.execute('TRUNCATE friend_requests RESTART IDENTITY CASCADE;')
    db.session.commit()
