from flask_login import current_user, login_user, logout_user, login_required
from flask import Blueprint, jsonify, session, request
from app.forms.comment_form import CommentForm
from app.forms import PostForm
from app.models import Post, Comment, db
router = Blueprint('comments', __name__)


# @router.route("/<int:id>", methods=["GET"])
# def get_single_comment(postid):
#     post = Post.query.get(postid)
#     return post.to_dict()


@router.route("/new", methods=["POST"])
@login_required
def new_comment():
    form = CommentForm()
    user = current_user.to_dict()
    if form.validate_on_submit():
        pass
    else:
        pass


@router.route("/<int:id>", methods=["DELETE"])
@login_required
def del_comment(postid):
    post = Post.get_id(postid)
    user = current_user.to_dict()
    if(post.userid == user.id):
        # delete the post
        pass
    else:
        # this isnt your post???
        pass
