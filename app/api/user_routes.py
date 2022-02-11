from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import exc
from app.models import db, User


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/edit', methods=['GET', 'PUT'])
@login_required
def editUser(id):
    try:
        user = User.query.get(id)
        data = request.get_json()

        if id == 1:
            user.bio = data['bio']
            db.session.commit()
            return user.to_dict()

        user.name = data['name']
        user.username = data['username']
        user.bio = data['bio']
        db.session.commit()
        return user.to_dict()
    except exc.SQLAlchemyError as e:
        return {'errors': ['Bad data:', '* Your input data is too long.']}, 400


@user_routes.route('/<int:id>/changePassword', methods=['GET', 'PUT'])
@login_required
def changePassword(id):
    user = User.query.get(id)
    data = request.get_json()

    if id == 1:
        return {'errors': ['* Demo user\'s password cannot be changed.']}, 401

    if user.check_password(data['oldPassword']):
        if len(data['newPassword']) < 6 or len(data['newPassword']) > 30:
            return {'errors': ['* Password must be between 6 to 30 characters.']}, 400
        user.password = data['newPassword']
        db.session.commit()
        return user.to_dict()
    else:
        return {'errors': ['* Password incorrect.']}, 401

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
    following_id_list = [entry.followid for entry in user.get_following()]
    following_list = user.get_follow_list(following_id_list)
    return {"user_following_dict": following_list}

@user_routes.route('/<int:userid>/followers')
def get_followers(userid):
    user = User.query.get(userid)
    followers_id_list = [entry.userid for entry in user.get_followers()]
    followers_list = user.get_follow_list(followers_id_list)

    return {"user_follower_dict": followers_list}

@user_routes.route('/<username>')
def get_user_by_username(username):
    user = User.query.filter_by(username=username).first()
    return user.to_dict()
