FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app

# Copy the service account key
COPY service-account.json /tmp/service-account.json

# Set the environment variable
ENV GOOGLE_APPLICATION_CREDENTIALS=/tmp/service-account.json

# CLOUD RUN port 8080
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8080}"]
