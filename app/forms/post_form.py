from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError


class PostForm(FlaskForm):
    image_url = StringField(
        'image', validators=[DataRequired()])
    description = StringField(
        'description')
