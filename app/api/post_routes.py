from tokenize import Number
from flask_login import current_user, login_user, logout_user, login_required
from flask import Blueprint, jsonify, session, request
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import PostForm
from app.models import Post, User, db
from app.models.comment import Comment
router = Blueprint('posts', __name__)


@router.route("/feed", methods=["GET"])
def get_posts():
    posts = Post.query.order_by(Post.updated_at).all()
    postsDict = {p.id: p.to_dict() for p in posts}
    return {"posts": postsDict}


@router.route("/<int:postid>", methods=["GET"])
def get_single_post(postid):
    post = Post.query.get(postid)
    return post.to_dict()


@router.route("/<int:postid>/like", methods=["POST"])
def like_post(postid):
    post = Post.query.get(postid)
    user = current_user
    if(user.has_liked_post(post)):
        user.unlike_post(post)
    else:
        user.like_post(post)
    db.session.commit()
    return post.to_dict()


# @router.route("/<int:postid>/unlike", methods=["POST"])
# def unlike_post(postid):
#     post = Post.query.get(postid)
#     user = current_user
#     user.unlike_post(post)
#     db.session.commit()
#     return post.to_dict()


@router.route("/new", methods=["POST"])
@login_required
def new_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = current_user.to_dict()
        post = {
            "userid": user["id"],
            "image_url": form.data["image_url"],
            "description": form.data["description"]
        }
        postForDb = Post(**post)
        db.session.add(postForDb)
        db.session.commit()
        return postForDb.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@router.route("/<int:id>", methods=["DELETE"])
@login_required
def del_post(id):
    post = Post.query.get(id)
    user = current_user.to_dict()
    if(post.userid == user["id"]):
        db.session.query(Comment).filter(Comment.postid == id).delete()
        db.session.delete(post)
        db.session.commit()
        return "success", 200
    else:
        return "fail", 401
