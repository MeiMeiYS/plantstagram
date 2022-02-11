from time import clock_getres
from app.models.postlike import PostLike
from app.models.follow import Follow
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
        foreign_keys="PostLike.userid",
        backref='user', lazy='select')

    following = db.relationship(
        "Follow",
        foreign_keys="Follow.userid",
        backref="follower", lazy="select"
    )

    followers = db.relationship(
        "Follow",
        foreign_keys="Follow.followid",
        backref="following", lazy="select"
    )

    def like_post(self, post):
        if not self.has_liked_post(post):
            like = PostLike(userid=self.id, postid=post.id)
            db.session.add(like)

    def unlike_post(self, post):
        if self.has_liked_post(post):
            for like in self.liked:
                if post.id == like.postid:
                    return db.session.delete(like)

    def has_liked_post(self, post):
        for like in self.liked:
            if post.id == like.postid:
                return True
        return False
        # return PostLike.query.filter(
        #     PostLike.userid == self.id,
        #     PostLike.postid == post.id).count() > 0

    def follow_user(self, user):
        if not self.has_followed_user(user):
            follow = Follow(userid=self.id, followid=user.id)
            db.session.add(follow)

    def unfollow_user(self, user):
        if self.has_followed_user(user):
            entry = Follow.query.filter(
                Follow.userid == self.id,
                Follow.followid == user.id).first()
            db.session.delete(entry)

    def has_followed_user(self, user):
        hasFollowed = Follow.query.filter(
            Follow.userid == self.id,
            Follow.followid == user.id).all()
        if len(hasFollowed):
            return True
        return False

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

    def get_follow_list(self, id_list):
        follow_list = {}
        for id in id_list:
            user = User.query.get(id)
            follow_list[id] = {"id": user.id, "username": user.username, "name": user.name, "avatar_url": user.avatar_url}
        return follow_list

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
            'name': self.name,
            'username': self.username,
            'email': self.email,
            'following_count': len(self.following),
            'followers_count': len(self.followers),
            # 'followers_list': [f.user.username for f in self.followers],
            # 'following_list': [f.followedUser.username for f in self.following],
            'bio': self.bio
        }
