from operator import contains, or_
import random
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import exc, or_
from app.models import db, User, Follow, Post

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/suggestions')
def suggestions():
    users = User.query.all()
    suggestions = []
    rand = random.sample(range(0, len(users)),
                         5 if len(users) > 5 else len(users))
    for r in rand:
        suggestedUser = users[r]
        if(suggestedUser.id != current_user.id):
            suggestions.append(users[r])
    return {'users': [user.to_dict() for user in suggestions]}


@ user_routes.route('/<int:id>')
@ login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@ user_routes.route('/<int:id>/edit', methods=['GET', 'PUT'])
@ login_required
def editUser(id):
    try:
        user = User.query.get(id)
        data = request.get_json()

        if 'avatar_url' in data:
            user.avatar_url = data['avatar_url']
        else:
            if id == 1:
                user.bio = data['bio']
                db.session.commit()
                return user.to_dict()
            user.name = data['name']
            # check if this username is taken
            check_user = User.query.filter(
                User.username == data['username']).first()
            if len(data['username']) < 4:
                return {'errors': ['Bad data:', '* Username is too short.']}, 400
            if data['username'].find(' ') != -1:
                return {'errors': ['Bad data:', '* Username cannot contain space.']}, 400
            if data['username'] != user.username and check_user:
                return {'errors': ['* Username is already taken.']}, 400
            if data['username'] == "explore":
                return {'errors': ['*Can not use username "explore".']}, 400
            user.username = data['username']
            user.bio = data['bio']

        db.session.commit()
        return user.to_dict()
    except exc.SQLAlchemyError as e:
        return {'errors': ['Bad data:', '* Your input data is too long.']}, 400


@ user_routes.route('/<int:id>/changePassword', methods=['GET', 'PUT'])
@ login_required
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


@ user_routes.route('/<int:followid>/follow', methods=["POST"])
def follow_user(followid):
    # following = Follow.query.get(followid)
    user = current_user
    updated_user = User.query.get(followid)
    if user.has_followed_user(updated_user):
        user.unfollow_user(updated_user)
    else:
        user.follow_user(updated_user)
    db.session.commit()
    return updated_user.to_dict()

@ user_routes.route('/<int:followid>/follow_modal', methods=["POST"])
def follow_user_modal(followid):
    # following = Follow.query.get(followid)
    user = current_user
    updated_user = User.query.get(followid)
    if user.has_followed_user(updated_user):
        user.unfollow_user(updated_user)
    else:
        user.follow_user(updated_user)
    db.session.commit()
    return user.to_dict()


@ user_routes.route('/<int:userid>/following')
def get_following(userid):
    user = User.query.get(userid)
    following_id_list = [entry.followid for entry in user.get_following()]
    following_list = user.get_follow_list(following_id_list)
    return {"user_following_dict": following_list}


@ user_routes.route('/<int:userid>/followers')
def get_followers(userid):
    user = User.query.get(userid)
    followers_id_list = [entry.userid for entry in user.get_followers()]
    followers_list = user.get_follow_list(followers_id_list)

    return {"user_follower_dict": followers_list}


@ user_routes.route('/<username>')
def get_user_by_username(username):
    user = User.query.filter_by(username=username).first()
    return user.to_dict()


@ user_routes.route('/<int:followid>/follow_status')
def follow_status(followid):
    result = {}
    profile_user = User.query.filter_by(id=followid).first()
    if current_user.has_followed_user(profile_user):
        result["status"] = "Following"
    else:
        result["status"] = "Follow"
    return result


@ user_routes.route('/<int:userid>/posts')
def get_all_posts(userid):
    user = User.query.get(userid)
    all_posts = Post.query.filter_by(userid=user.id)

    posts_url_list = [entry.to_dict() for entry in all_posts]
    return {str(len(posts_url_list)):posts_url_list}

@user_routes.route('/search/<substring>')
def get_user_by_substring(substring):
    users = User.query.filter(or_(User.username.contains(substring),User.name.contains(substring), User.email.contains(substring))).all()
    all_users = { user.id: user.to_dict() for user in users}
    return all_users
