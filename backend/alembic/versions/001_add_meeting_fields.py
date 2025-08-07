"""Add meeting type and meet link fields

Revision ID: 001
Revises: 
Create Date: 2024-01-01 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add meeting_type column with default value
    op.add_column('appointments', sa.Column('meeting_type', sa.String(), nullable=True))
    
    # Add meet_link column
    op.add_column('appointments', sa.Column('meet_link', sa.String(), nullable=True))
    
    # Update existing records to have default meeting_type
    op.execute("UPDATE appointments SET meeting_type = 'in-person' WHERE meeting_type IS NULL")
    
    # Make meeting_type non-nullable after setting defaults
    op.alter_column('appointments', 'meeting_type', nullable=False, server_default='in-person')


def downgrade() -> None:
    # Remove the added columns
    op.drop_column('appointments', 'meet_link')
    op.drop_column('appointments', 'meeting_type')