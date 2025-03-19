from fastapi import UploadFile
from firebase_admin import storage


def upload_to_gcs(
    file: UploadFile, destination_blob_name: str, public: bool = True
) -> str:
    """Uploads a file to GCS and returns a URL."""
    bucket = storage.bucket()
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_file(file.file, content_type=file.content_type)

    if public:
        blob.make_public()
        return blob.public_url
    else:
        return blob.generate_signed_url(
            version="v4", expiration=3600
        )  # 1-hour private URL


def delete_blob(blob_name) -> None:
    """Deletes a blob from Google Cloud Storage."""
    try:
        bucket = storage.bucket()
        blob = bucket.blob(blob_name)
        blob.delete()
    except Exception as e:
        raise f"Error from deleting gcp blob: {e}"
