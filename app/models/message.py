from .db import db


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", foreign_keys=[
        userid], uselist=False)
    receiverid = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    receiver = db.relationship("User", foreign_keys=[
                               receiverid], uselist=False)
    content = db.Column(db.String(1000), nullable=False)
