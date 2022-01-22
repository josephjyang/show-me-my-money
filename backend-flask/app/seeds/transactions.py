from app.models import db, Transaction


def seed_transactions():
    rod_jerry = Transaction(
        payer_id=2,
        payee_id=3,
        creator_id=2,
        amount=96.37,
        details="Dinner and drinks with the fam",
        paid=True
    )

    rod_tyson = Transaction(
        payer_id=2,
        payee_id=7,
        creator_id=2,
        amount=500.00,
        details="Happy Birthday son! Buy yourself something nice",
        paid=True
    )

    jerry_rod = Transaction(
        payer_id=2,
        payee_id=3,
        creator_id=3,
        amount=1000.00,
        details="Sorry your Cardinals lost, but hey, more money for me!",
        paid=False
    )

    marcee_dorothy = Transaction(
        payer_id=5,
        payee_id=4,
        creator_id=4,
        amount=34.75,
        details="For drinks last night. It was so fun! We should do it again soon.",
        paid=True
    )

    rod_ray = Transaction(
        payer_id=2,
        payee_id=6,
        creator_id=2,
        amount=250.00,
        details="Merry Christmas Ray! I still remember when you were just a little kid.",
        paid=True
    )

    marcee_jerry = Transaction(
        payer_id=5,
        payee_id=3,
        creator_id=5,
        amount=324.76,
        details="Thanks for getting the food for Rod's party! You're the best!",
        paid=True
    )

    db.session.add(rod_jerry)
    db.session.add(rod_tyson)
    db.session.add(jerry_rod)
    db.session.add(marcee_dorothy)
    db.session.add(rod_ray)
    db.session.add(marcee_jerry)

    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE friend_requests RESTART IDENTITY CASCADE;')
    db.session.commit()
