from .db import db

post_likes = db.Table(
    "post_likes",
    db.Column("userid", db.Integer, db.ForeignKey(
        "users.id"), primary_key=True),
    db.Column("postid", db.Integer, db.ForeignKey(
        "posts.id"), primary_key=True)
)
