from app.models import db, User


def seed_users():
    demo = User(
        username="demo", 
        email="demo@aa.io", 
        password="password", 
        first_name="Demo", 
        last_name="User"
    )
    rod = User(
        username="rod.tidwell85", 
        email="rod.tidwell85@gmail.com", 
        password="password", 
        first_name="Rod", 
        last_name="Tidwell",
        profile_pic="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Cuba_Gooding_Jr._2012.jpg/1200px-Cuba_Gooding_Jr._2012.jpg"
    )
    jerry = User(
        username="jerry.maguire",
        email="jerry.maguire@gmail.com",
        password="password",
        first_name="Jerry",
        last_name="Maguire",
        profile_pic="https://www.biography.com/.image/t_share/MTc5ODc1NTM4NjMyOTc2Mzcz/gettyimages-693134468.jpg"
    )
    marcee = User(
        username="marcee.tidwell",
        email="marcee.tidwell@gmail.com",
        password="password",
        first_name="Marcee",
        last_name="Tidwell",
        profile_pic="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Regina_King_by_Gage_Skidmore.jpg/640px-Regina_King_by_Gage_Skidmore.jpg"
    )
    dorothy = User(
        username="dorothy.maguire",
        email="dorothy.maguire@gmail.com",
        password="password",
        first_name="Dorothy",
        last_name="Maguire",
        profile_pic="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimagesvc.meredithcorp.io%2Fv3%2Fmm%2Fimage%3Furl%3Dhttps%253A%252F%252Fstatic.onecms.io%252Fwp-content%252Fuploads%252Fsites%252F20%252F2021%252F02%252F04%252Frenee-zellweger.jpg&q=85"
    )
    ray = User(
        username="ray.maguire",
        email="ray.maguire@gmail.com",
        password="password",
        first_name="Ray",
        last_name="Maguire",
        profile_pic="https://cbsnews2.cbsistatic.com/hub/i/r/2010/10/11/98f5727f-a642-11e2-a3f0-029118418759/thumbnail/640x480/9fd224f1e82d36d5fd721a5e2f459145/jonathan_lipnick_424.jpg"
    )
    tyson = User(
        username="tyson.tidwell85",
        email="tyson.tidwell@gmail.com",
        password="password",
        first_name="Tyson",
        last_name="Tidwell",
        profile_pic="https://m.media-amazon.com/images/M/MV5BMzA5ZWM5ZjctNTNiZi00NjJkLTkwY2QtZDhhZWUzZWUyMTA0XkEyXkFqcGdeQXVyOTExNDkxMjk@._V1_.jpg"
    )

    db.session.add(demo)
    db.session.add(rod)
    db.session.add(jerry)
    db.session.add(marcee)
    db.session.add(dorothy)
    db.session.add(ray)
    db.session.add(tyson)

    db.session.commit()


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
