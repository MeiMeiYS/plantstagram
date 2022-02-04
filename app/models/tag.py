from .db import db

class Tag(db.Model):
     __tablename__= "tags"

     postId = db.Column(db.Integer, db.ForeignKey("posts.id"))
     post = db.relationship("Post")
     hashtag = db.Column(db.String(20), nullable=False)
