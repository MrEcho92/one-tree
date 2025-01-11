import logging
import os
from contextlib import asynccontextmanager
from typing import Optional

import firebase_admin
from dotenv import load_dotenv
from fastapi import FastAPI
from firebase_admin import credentials, firestore

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

db: Optional[firestore.Client] = None

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv(
    "GOOGLE_APPLICATION_CREDENTIALS"
)


def get_db() -> firestore.Client:
    """
    Returns the global database instance.
    Raises an exception if the database is not initialized.
    """
    if db is None:
        raise RuntimeError(
            "Database not initialized. Ensure the application has started properly."
        )
    return db


def set_db(database: firestore.Client) -> None:
    """Sets the global database instance."""
    global db
    db = database


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up event")
    try:
        cred = credentials.ApplicationDefault()
        firebase_admin.initialize_app(cred)

        firestore_client = firestore.Client()
        set_db(firestore_client)

        print("✅ Connected to Firestore")
        logger.info("✅ Connected to Firestore")

        yield
    except Exception as e:
        print(f"❌ Error connecting to Firestore: {e}")
        logger.error(f"❌ Error connecting to Firestore: {e}")
        raise e
    finally:
        # Shutdown event
        if get_db():
            get_db().close()
            print("🔄 Closed Firestore connection")
            logger.info("🔄 Closed Firestore connection")
