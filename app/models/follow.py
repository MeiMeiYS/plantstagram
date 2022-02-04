from .db import db

follows = db.Table(
    "follows",
    db.Column("userid", db.Integer, db.ForeignKey(
        "users.id"), primary_key=True),
    db.Column("followedid", db.Integer, db.ForeignKey(
        "users.id"), primary_key=True)
)
