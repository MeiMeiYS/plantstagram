from app.models import db, Follow

def seed_follows():
    follow1 = Follow(
        userid=1,
        followid=2
    )
    follow2 = Follow(
        userid=1,
        followid=3
    )

    follow3 = Follow(
        userid=2,
        followid=1
    )
    follow4 = Follow(
        userid=2,
        followid=3
    )
    db.session.add(follow1)
    db.session.add(follow2)
    db.session.add(follow3)
    db.session.add(follow4)
    db.session.commit()

def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()