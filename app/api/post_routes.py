from flask_login import current_user, login_user, logout_user, login_required
from flask import Blueprint, jsonify, session, request
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import PostForm
from app.models import Post, User, db
router = Blueprint('posts', __name__)


@router.route("/feed", methods=["GET"])
def get_posts():
    posts = Post.query.all()
    postsArr = [p.to_dict() for p in posts]
    return {"posts": postsArr}


@router.route("/<int:id>", methods=["GET"])
def get_single_post(postid):
    post = Post.query.get(postid)
    return post.to_dict()


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
def del_post(postid):
    post = Post.get_id(postid)
    user = current_user.to_dict()
    if(post.userid == user.id):
        # delete the post
        pass
    else:
        # this isnt your post???
        pass
