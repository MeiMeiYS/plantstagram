
from sqlalchemy import DateTime
from .db import db
from sqlalchemy.sql import func


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="posts")
    image_url = db.Column(db.String(600), nullable=False)
    description = db.Column(db.String(2200))
    comments = db.relationship("Comment", back_populates="post")
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True),
                           onupdate=func.now(), server_default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'userid': self.userid,
            'image_url': self.image_url,
            'description': self.description,
            'updated_at': self.updated_at
        }
