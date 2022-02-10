from .db import db


class Follow(db.Model):
    __tablename__ = "follows"

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    followid = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # user = db.relationship("User",  foreign_keys=userid,
    #                        )
    # followedUser = db.relationship(
    #     "User", primaryjoin="User.id==Follow.followid")
