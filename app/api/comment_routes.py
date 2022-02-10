from flask_login import current_user, login_user, logout_user, login_required
from flask import Blueprint, jsonify, session, request
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import PostForm, CommentForm
from app.models import Post, Comment, db
router = Blueprint('comments', __name__)


# @router.route("/<int:id>", methods=["GET"])
# def get_single_comment(postid):
#     post = Post.query.get(postid)
#     return post.to_dict()


@router.route("/posts/<int:postid>/comments/new", methods=["POST"])
@login_required
def new_comment(postid):
    form = CommentForm()
    user = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = current_user.to_dict()
        comment = {
            "userid": user["id"],
            "postid": postid,
            "content": form.data["content"]
        }
        commentForDb = Comment(**comment)
        db.session.add(commentForDb)
        db.session.commit()
        post = Post.query.get(postid)
        return post.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@router.route("/comments/<int:commentid>", methods=["DELETE"])
@login_required
def del_comment(commentid):
    comment = Comment.query.get(commentid)
    user = current_user.to_dict()
    if(comment.userid == user["id"]):
        post = Post.query.get(comment.postid)
        db.session.delete(comment)
        db.session.commit()
        return post.to_dict(), 200
    else:
        return "fail", 401
