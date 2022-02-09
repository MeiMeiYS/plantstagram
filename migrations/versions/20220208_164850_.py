"""empty message

Revision ID: 42101e2a5c28
Revises: 9947a24148b1
Create Date: 2022-02-08 16:48:50.844971

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '42101e2a5c28'
down_revision = '9947a24148b1'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('follows',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userid', sa.Integer(), nullable=False),
    sa.Column('followid', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['followid'], ['users.id'], ),
    sa.ForeignKeyConstraint(['userid'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('follows')
