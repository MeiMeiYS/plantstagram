from .db import db

class Follow(db.Model):
    __tablename__ = "follows"

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    followid = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # user = db.relationship("User", back_populates="followers")
    # following = db.relationship("User", back_populates="following")
