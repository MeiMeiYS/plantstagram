from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')

def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/edit', methods=['GET', 'PUT'])
def editUser(id):
    user = User.query.get(id)
    data = request.get_json()
    user.name = data['name']
    user.username = data['username']
    user.bio = data['bio']
    db.session.commit()

    return user.to_dict()

@user_routes.route('/<int:followid>/follow', methods=["POST"])
def follow_user(followid):
    following = Follow.query.get(followid)
    user = current_user
    if user.has_followed_user(following):
        user.unfollow_user(following)
    else:
        user.follow_user(following)
    db.session.commit()
    return user.to_dict()

@user_routes.route('/<int:userid>/following')
def get_following(userid):
    user = User.query.get(userid)
    following_list = user.get_following()
    print(following)
    return following_list

@user_routes.route('/<int:userid>/followers')
def get_followers(userid):
    user = User.query.get(userid)
    followers_list = user.get_followers()
    return followers_list









