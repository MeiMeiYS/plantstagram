from app.models import db, Comment



def seed_comments():
    comment1 = Comment(
        userId=1,
        postId=3,
        content= 'I will checkout you page :)'
    )
    comment2 = Comment(
        userid=2,
        postId=1,
        content= 'Beautiful!!!! <3'
    )
    comment3 = Comment(
        userid=3,
        postId=2,
        content= 'Cactus are overrated.'
    )
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
