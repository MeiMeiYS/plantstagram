"""empty message

Revision ID: 9947a24148b1
Revises: b3c01412b724
Create Date: 2022-02-08 16:44:50.487053

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9947a24148b1'
down_revision = 'b3c01412b724'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_table('follows')


def downgrade():
    pass
