from app.models import db, Transaction


def seed_transactions():
    rod_jerry = Transaction(
        payer_id=2,
        payee_id=3,
        creator_id=2,
        amount=96.37,
        details="🍽 and 🍷 with the fam",
        paid=True,
        created_at='2021-09-29 03:30',
        updated_at='2021-09-30 04:10'
    )

    rod_jerry2 = Transaction(
        payer_id=3,
        payee_id=2,
        creator_id=2,
        amount=42.86,
        details="🎁 for Marcee",
        paid=False
    )

    rod_tyson = Transaction(
        payer_id=2,
        payee_id=11,
        creator_id=2,
        amount=500.00,
        details="Happy Birthday son! 🥳 Buy yourself something nice",
        paid=True,
        created_at='2021-11-24 13:47',
        updated_at='2021-11-24 13:47'
    )

    rod_tyson2 = Transaction(
        payer_id=2,
        payee_id=11,
        creator_id=11,
        amount=400.00,
        details="I need some money for 📚. Thanks for supporting my education, Dad!",
        paid=True,
        created_at='2021-11-24 13:47',
        updated_at='2021-11-24 13:47'
    )

    jerry_rod = Transaction(
        payer_id=2,
        payee_id=3,
        creator_id=3,
        amount=1000.00,
        details="Sorry your Cardinals lost, but hey, more money for me! 🤑",
        paid=True,
        created_at='2021-11-18 17:47',
        updated_at='2021-11-19 20:41'
    )

    marcee_dorothy = Transaction(
        payer_id=5,
        payee_id=4,
        creator_id=4,
        amount=34.75,
        details="For 🍸 last night. It was so fun! We should do it again soon.",
        paid=True,
        created_at='2022-01-24 09:42',
        updated_at='2022-01-27 17:12'
    )

    rod_ray = Transaction(
        payer_id=2,
        payee_id=10,
        creator_id=2,
        amount=250.00,
        details="Merry Christmas Ray! 🎄 I still remember when you were just a little kid.",
        paid=True,
        created_at='2021-12-25 09:42',
        updated_at='2021-12-25 09:42'
    )

    marcee_jerry = Transaction(
        payer_id=4,
        payee_id=3,
        creator_id=4,
        amount=324.76,
        details="Thanks for getting 🍔 🌭 🎂 for Rod's party! You're the best!",
        paid=True,
        created_at='2021-08-28 09:42',
        updated_at='2021-08-28 09:42'
    )

    marcee_rod = Transaction(
        payer_id=2,
        payee_id=4,
        creator_id=4,
        amount=359.64,
        details="There was this really beautiful necklace that I just had to buy. Thanks honey! 😘",
        paid=False
    )

    rod_jerry3 = Transaction(
        payer_id=3,
        payee_id=2,
        creator_id=2,
        amount=100000.00,
        details="You said you have an endorsement check for me from Gatorade. SHOW ME THE MONEY, JERRY! 💰",
        paid=False
    )

    rod_tyson3 = Transaction(
        payer_id=2,
        payee_id=11,
        creator_id=11,
        amount=1500.00,
        details="I found a guy on eBay selling his PS5 for $1,500. Can I get it, please?",
        paid=False
    )

    db.session.add(rod_jerry)
    db.session.add(rod_tyson)
    db.session.add(jerry_rod)
    db.session.add(marcee_dorothy)
    db.session.add(rod_ray)
    db.session.add(marcee_jerry)
    db.session.add(marcee_rod)
    db.session.add(rod_tyson2)
    db.session.add(rod_jerry2)
    db.session.add(rod_jerry3)
    db.session.add(rod_tyson3)

    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE friend_requests RESTART IDENTITY CASCADE;')
    db.session.commit()
