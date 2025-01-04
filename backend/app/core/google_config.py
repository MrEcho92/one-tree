from google.cloud import firestore
import os
from dotenv import load_dotenv

load_dotenv()

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

# db = firestore.Client(project=os.getenv("GOOGLE_PROJECT_ID"))

# storage_client = storage.Client(project=os.getenv("GOOGLE_PROJECT_ID"))

