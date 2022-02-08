from app.models.postlike import PostLike
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(320), nullable=False, unique=True)
    bio = db.Column(db.String(150))
    avatar_url = db.Column(db.String(600))
    hashed_password = db.Column(db.String(255), nullable=False)
    posts = db.relationship("Post", back_populates="user")
    comments = db.relationship("Comment",  back_populates="user")
    liked = db.relationship(
        'PostLike',
        foreign_keys='PostLike.userid',
        backref='user', lazy='dynamic')

    followers = db.relationship(
        "Follow",
        foreign_keys="Follow.followid",
        backref="user", lazy="dynamic"
    )

    following = db.relationship(
        "Follow",
        foreign_keys="Follow.userid",
        backref="user", lazy="dynamic"
    )

    def like_post(self, post):
        if not self.has_liked_post(post):
            like = PostLike(userid=self.id, postid=post.id)
            db.session.add(like)

    def unlike_post(self, post):
        if self.has_liked_post(post):
            PostLike.query.filter_by(
                userid=self.id,
                postid=post.id).delete()

    def has_liked_post(self, post):
        return PostLike.query.filter(
            PostLike.userid == self.id,
            PostLike.postid == post.id).count() > 0

    def follow_user(self, user):
        if not self.has_followed_user(user):
            follow = Follow(userid=self.id, followid=user.id)
            db.session.add(follow)

    def unfollow_user(self, user):
        if self.has_followed_user(user):
            Follow.query.filter_by(
                userid==self.id,
                followid==user.id).delete()

    def has_followed_user(self, user):
        return Follow.query.filter(
            Follow.userid == self.id,
            Follow.followid == user.id).count() > 0
    
    def get_followers(self):
        followers = Follow.query.filter(
            Follow.followid == self.id
        ).all()
        return followers

    def get_following(self):
        following = Follow.query.filter(
            Follow.userid == self.id
        ).all()
        return following

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'following': self.get_following().count(),
            'followers': self.get_followers().count()
        }
