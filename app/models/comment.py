from .db import db


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="comments")
    postid = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    post = db.relationship("Post", back_populates="comments")
    content = db.Column(db.String(2200), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userid': self.userid,
            'user': self.user.to_dict(),
            'content': self.content,
            # 'updated_at': self.updated_at TODO
        }
