"""alembic/env.py — Alembic migration environment."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from app.core.config import settings
from app.database.database import Base
from app.models.db_models import Stock, SentimentAnalysis, Prediction, News, ChatHistory  # noqa

config = context.config

# --- INI YANG KITA UBAH (JURUS PAMUNGKAS) ---
# Masukkan link panjang Neon kamu di bawah ini (tetap pakai tanda kutip ya "")
config.set_main_option("sqlalchemy.url", "postgresql://neondb_owner:npg_RTDg29Ezdauw@ep-broad-butterfly-ao7zw9i3.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require")

if config.config_file_name:
    fileConfig(config.config_file_name)
target_metadata = Base.metadata

def run_migrations_offline():
    # Ini juga kita ubah paksa
    url = config.get_main_option("sqlalchemy.url")
    context.configure(url=url, target_metadata=target_metadata,
                      literal_binds=True, dialect_opts={"paramstyle": "named"})
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.", poolclass=pool.NullPool,
    )
    with connectable.connect() as conn:
        context.configure(connection=conn, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()