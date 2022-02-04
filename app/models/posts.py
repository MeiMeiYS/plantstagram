from flask_sqlalchemy import SQLAlchemy
from .db import db


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User")
    image_url = db.Column(db.String(600), nullable=False)
    description = db.Column(db.String(2200))

    def to_dict(self):
        return {
            'id': self.id,
            'userid': self.userid,
            'image_url': self.image_url,
            'description': self.description
        }
