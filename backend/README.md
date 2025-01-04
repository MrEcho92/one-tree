# Backend README

## Overview
This backend application is built using FastAPI. It provides a RESTful API for managing resources. The project uses a Makefile to simplify common tasks.

## Requirements
- Python 3.8+
- FastAPI
- Uvicorn
- Make

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/MrEcho92/one-tree.git
    cd one-tree/backend
    ```

2. Create and activate a virtual environment:
    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```

## Running the Application
To start the FastAPI server, run:
```sh
make run
```
This will start the server on `http://localhost:8000`.

## Makefile Commands
- `make run`: Start the FastAPI server.
- `make test`: Run the test suite.
- `make lint`: Lint the codebase using flake8.
- `make format`: Format the codebase.
- `make clean`: Remove temporary files.

## API Documentation
Once the server is running, you can access the API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Testing
To run the tests, use:
```sh
make test
```

## Linting
To lint the codebase, use:
```sh
make lint
```

## Cleaning Up
To remove temporary files, use:
```sh
make clean
```

