from flask_login import current_user, login_user, logout_user, login_required
from flask import Blueprint, jsonify, session, request
from forms import PostForm
from app.models import Post, User, db
router = Blueprint('posts', __name__)


@router.route("/", methods=["GET"])
def get_posts():
    post = Post.query.all()
    # this hasn't been converted to JSONable data
    return post


@router.route("/<int:id>", methods=["GET"])
def get_single_post(postid):
    post = Post.query.get(postid)
    return post.to_dict()


@router.route("/new", methods=["POST"])
@login_required
def new_post():
    form = PostForm()
    user = current_user.to_dict()
    if form.validate_on_submit():
        pass
    else:
        pass


@router.route("/<int:id>", methods=["DELETE"])
@login_required
def del_post(postid):
    post = Post.get_id(postid)
    user = current_user.to_dict()
    if(post.userid == user.id):
        # delete the post
        pass
    else:
        # this isnt your post???
        pass
