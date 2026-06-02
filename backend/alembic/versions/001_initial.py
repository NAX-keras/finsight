"""Buat semua tabel FinSight

Revision ID: 001_initial
Revises:
Create Date: 2025-06-01
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import JSON

revision = "001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ── stocks ────────────────────────────────────────────────
    op.create_table("stocks",
        sa.Column("id",                sa.Integer,     primary_key=True),
        sa.Column("ticker",            sa.String(10),  nullable=False),
        sa.Column("company_name",      sa.String(255), nullable=False),
        sa.Column("sector",            sa.String(100)),
        sa.Column("current_price",     sa.Float),
        sa.Column("change_percent",    sa.Float),
        sa.Column("is_up",             sa.Boolean),
        sa.Column("sentiment_label",   sa.String(20)),
        sa.Column("sentiment_score",   sa.Float),
        sa.Column("prediction_signal", sa.String(10)),
        sa.Column("predicted_change",  sa.String(20)),
        sa.Column("confidence",        sa.Float),
        sa.Column("insight",           sa.Text),
        sa.Column("reasons",           JSON),
        sa.Column("price_history",     JSON),
        sa.Column("created_at",        sa.DateTime),
        sa.Column("updated_at",        sa.DateTime),
    )
    op.create_index("ix_stocks_id",     "stocks", ["id"], unique=False)
    op.create_index("ix_stocks_ticker", "stocks", ["ticker"], unique=True)

    # ── sentiment_analysis ─────────────────────────────────────
    op.create_table("sentiment_analysis",
        sa.Column("id",              sa.Integer,   primary_key=True),
        sa.Column("stock_id",        sa.Integer,   sa.ForeignKey("stocks.id")),
        sa.Column("sentiment_score", sa.Float,     nullable=False),
        sa.Column("sentiment_label", sa.String(20),nullable=False),
        sa.Column("source",          sa.String(100)),
        sa.Column("input_text",      sa.Text),
        sa.Column("analyzed_at",     sa.DateTime),
    )
    op.create_index("ix_sentiment_analysis_id", "sentiment_analysis", ["id"])

    # ── predictions ────────────────────────────────────────────
    op.create_table("predictions",
        sa.Column("id",               sa.Integer,   primary_key=True),
        sa.Column("stock_id",         sa.Integer,   sa.ForeignKey("stocks.id")),
        sa.Column("signal",           sa.String(10),nullable=False),
        sa.Column("predicted_change", sa.String(20)),
        sa.Column("confidence",       sa.Float),
        sa.Column("insight",          sa.Text),
        sa.Column("raw_output",       sa.Float),
        sa.Column("features_used",    JSON),
        sa.Column("created_at",       sa.DateTime),
    )
    op.create_index("ix_predictions_id", "predictions", ["id"])

    # ── news ───────────────────────────────────────────────────
    op.create_table("news",
        sa.Column("id",          sa.Integer,    primary_key=True),
        sa.Column("stock_id",    sa.Integer,    sa.ForeignKey("stocks.id"), nullable=True),
        sa.Column("title",       sa.String(500),nullable=False),
        sa.Column("summary",     sa.Text),
        sa.Column("source",      sa.String(100)),
        sa.Column("tag",         sa.String(20)),
        sa.Column("published_at",sa.DateTime),
    )
    op.create_index("ix_news_id", "news", ["id"])

    # ── chat_history ───────────────────────────────────────────
    op.create_table("chat_history",
        sa.Column("id",         sa.Integer, primary_key=True),
        sa.Column("question",   sa.Text,    nullable=False),
        sa.Column("answer",     sa.Text,    nullable=False),
        sa.Column("created_at", sa.DateTime),
    )
    op.create_index("ix_chat_history_id", "chat_history", ["id"])


def downgrade() -> None:
    op.drop_table("chat_history")
    op.drop_table("news")
    op.drop_table("predictions")
    op.drop_table("sentiment_analysis")
    op.drop_table("stocks")
