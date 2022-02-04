from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class Posts(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(600), nullable=False)
    image_url = db.Column(db.String(600), nullable=False)
