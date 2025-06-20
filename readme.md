# Movie Recommendation System

A full-stack web application that recommends movies to users based on collaborative filtering. Users can log in, rate movies, and receive personalized recommendations. Built with React (frontend), Flask (backend), and MongoDB.

## Features

- User authentication (sign up & log in)
- Rate movies and see your ratings
- Personalized movie recommendations
- Trending and most-watched movies
- Responsive, modern UI with Tailwind CSS

## Project Structure

```
movie-recommendation/
├── backend/
│   ├── server.py
│   ├── collab_filtering.py
│   ├── content_based.py
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
└── dataset/
    ├── movies.csv
    └── ratings.csv
```

## Prerequisites

- Node.js & npm
- Python 3.x
- MongoDB Atlas account (or local MongoDB)
- [Optional] Virtualenv for Python

## Setup Instructions

### 1. **Backend Setup**

1. **Install Python dependencies:**
    ```bash
    pip install flask pymongo python-dotenv pandas
    ```

2. **Set up your `.env` file in `backend/`:**
    ```
    MONGODB_URI=your_mongodb_connection_string
    ```

3. **Prepare your dataset:**
    - Place `movies.csv` and `ratings.csv` in a `dataset/` folder at the project root.

4. **Run the backend server:**
    ```bash
    cd backend
    python server.py
    ```
    The backend will run on `http://127.0.0.1:5000`.

### 2. **Frontend Setup**

1. **Install Node dependencies:**
    ```bash
    cd frontend
    npm install
    ```

2. **Start the frontend:**
    ```bash
    npm start
    ```
    The frontend will run on `http://localhost:3000` and proxy API requests to the backend.

## Usage

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Sign up or log in with a username and password.
- Rate movies using the search bar or the rating list.
- View your personalized recommendations and trending movies.
- Log out to switch users.

## Customization

- **Styling:** Tailwind CSS is used for rapid UI development.
- **Recommendation Logic:** See `backend/collab_filtering.py` for collaborative filtering details.
- **Database:** MongoDB stores user info and ratings.

## Troubleshooting

- Ensure both backend and frontend servers are running.
- Check your `.env` for the correct MongoDB URI.
- If you change the backend port, update the `proxy` field in `frontend/package.json`.

## License

MIT License

## Credits

- [Create React App](https://github.com/facebook/create-react-app)
- [Flask](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
