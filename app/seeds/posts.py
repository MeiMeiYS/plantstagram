from app.models import db, Post



def seed_posts():
    post1 = Post(
        userid=1,
        image_url='https://images.unsplash.com/photo-1620127807580-990c3ecebd14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1665&q=80',
        description='This is my beautiful \'Zeylanica\' in a green pot.'
    )
    post2 = Post(
        userid=2,
        image_url='https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        description='Cactus are the best.'
    )
    post3 = Post(
        userid=3,
        image_url='https://images.unsplash.com/photo-1545165375-7c5f3163f735?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        description='If you love plants check out my plantstagram!'
    )
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
