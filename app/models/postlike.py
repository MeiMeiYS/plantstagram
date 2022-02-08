from .db import db


class PostLike(db.Model):
    __tablename__ = 'post_like'
    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey('users.id'))
    postid = db.Column(db.Integer, db.ForeignKey('posts.id'))
