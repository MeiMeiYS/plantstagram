from .db import db

follows = db.Table(
    "follows",
    db.Column("userId", db.Integer, db.ForeignKey(
        "users.id"), primary_key=True),
    db.Column("followedId", db.Integer, db.ForeignKey(
        "users.id"), primary_key=True)
)
