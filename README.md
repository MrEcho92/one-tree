# one-tree 
A cultural heritage app 

## Project Structure

The project is divided into two main parts:

1. **Backend**: Built with FastAPI, located in the `backend` folder.
2. **Frontend**: Built with React, located in the `frontend` folder.

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+

### Backend Setup

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Create a virtual environment:
    ```bash
    python -m venv venv
    ```
3. Activate the virtual environment:
    - On Windows:
        ```bash
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```
4. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5. Run the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Start the React development server:
    ```bash
    npm start
    ```

### Optionally
Both frontend and backend could be started on the root directory using docker if it is set up locally.
    ```bash
    docker-compose up
    ```

## Usage

- The FastAPI backend will be running at `http://localhost:8000`.
- The React frontend will be running at `http://localhost:3000`.

