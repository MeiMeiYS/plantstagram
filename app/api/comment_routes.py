from flask_login import current_user, login_user, logout_user, login_required
from flask import Blueprint, jsonify, session, request
from app.forms.comment_form import CommentForm
from app.api.auth_routes import validation_errors_to_error_messages
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
    form['csrf_token'].data = request.cookies['csrf_token']
    user = current_user.to_dict()
    if form.validate_on_submit():
        new_comment = Comment(
            userid=form.data["userid"],
            postid=form.data["postid"],
            content=form.data["comment"]
        )
        db.session.add(new_comment)
        db.session.commit()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@router.route("/edit", methods=["PUT"])
@login_required
def new_comment():
    form = CommentForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    user = current_user.to_dict()
    if form.validate_on_submit():
        new_comment = Comment(
            userid=form.data["userid"],
            postid=form.data["postid"],
            content=form.data["comment"]
        )
        db.session.add(new_comment)
        db.session.commit()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@router.route("/<int:id>", methods=["DELETE"])
@login_required
def del_comment(commentid):
    comment = Comment.get_id(commentid)
    user = current_user.to_dict()
    if(comment.userid == user.id):
        comment = {}
       db.session.commit()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@router.route("/")
@login_required
def view_all_comments():
    comments = Comment.query.all()
    commentsArr = [c.to_dict() for c in comments]
    return {"comments": commentsArr}