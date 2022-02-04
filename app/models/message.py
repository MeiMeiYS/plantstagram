from .db import db

class Message(db.Model):
     __tablename__= "messages"

     id = db.Column(db.Integer, primary_key=True)
     userid = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
     user = db.relationship("User")
     receiverid = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
     receiver = db.relationship("User")
     content = db.Column(db.String(1000), nullable=False)
