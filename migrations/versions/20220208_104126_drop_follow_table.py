"""drop follow table

Revision ID: bb9992c5eb4d
Revises: 5c54e2f62083
Create Date: 2022-02-08 10:41:26.172667

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bb9992c5eb4d'
down_revision = '5c54e2f62083'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_table('follows')


def downgrade():
    pass
