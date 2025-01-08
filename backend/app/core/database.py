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


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up event")
    try:
        global db
        cred = credentials.ApplicationDefault()
        firebase_admin.initialize_app(cred)

        db = firestore.Client()

        print("✅ Connected to Firestore")
        logger.info("✅ Connected to Firestore")
        yield
    except Exception as e:
        print(f"❌ Error connecting to Firestore: {e}")
        logger.error(f"❌ Error connecting to Firestore: {e}")
        raise e
    finally:
        # Shutdown event
        if db:
            db.close()
            print("🔄 Closed Firestore connection")
            logger.info("🔄 Closed Firestore connection")
