# AI Study Planner 🎯
A smart and AI-driven study planner that prioritizes learning topics based on exam dates, difficulty levels, and learning history

## Table of Contents
- Project Overview
- Features
  - User Features
  - AI Features
- Tech Stack
- Setup Instructions
- Contributing
- License

## Project Overview
The **AI Study Planner** is an intelligent application designed to help students manage their study schedules based on their exams, the difficulty of subjects, and their learning progress. The system uses an AI prioritization model to suggest topics and study strategies that maximize productivity and learning.

### Key Features:
- **Prioritization System**: Ranks study topics based on exam dates, difficulty, and user history.
- **AI Integration**:Implements a Python-based intelligent logic for topic prioritization.
- **User Profiles**: Allows users to track their study progress and Notification.

## Features

### User Features
- **Create & Manage Study Plan**: Users can input their exam dates, subject list, and difficulty levels to generate a personalized study plan.
- **Track Progress**: Users can track their study progress and update completed topics.
- **Prioritize Topics**: The app will suggest which topics to study next based on the AI system’s recommendations.
- **Notifications**: Receive notifications on upcoming exams and deadlines.

### AI Features
- **Prioritize Study Topics**: A Python-based intelligent logic ranks study topics based on exam schedules, difficulty levels, and user progress.
- **Smart Scheduling Algorithm**: The system dynamically updates study recommendations using rule-based calculations — ensuring optimized revision without a machine learning model.


## Tech Stack

### Frontend:
- **React.js**: For building the user interface.
- **Tailwind CSS**: For styling the components and layout.

### Backend:
- **Node.js**: JavaScript runtime for the backend server.
- **Express.js**: Framework for building the API.
- **Python (FastAPI, Uvicorn)**: For the AI prioritization model and data scoring.
- **MongoDB**: Database for storing user data, exam schedules, and study plans.

### Additional Tools:
- **Axios**: For making HTTP requests from the frontend.
- **jsonwebtoken**: For handling JWT authentication.
- **dotenv**: For managing environment variables.

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** - [Download Node.js](https://nodejs.org)
- **MongoDB** - [Set up MongoDB](https://www.mongodb.com/)
- **Python** (for AI model) - [Download Python](https://www.python.org/)

### Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/Bharathsivanesh/study_planner.git
cd study_planner
```
### Installation Guide

-   **Backend**

    Navigate to the server folder:

        `cd server`

    Install backend dependencies:

        `npm install`

-   **Frontend**

    Navigate to the client folder:

        `cd client`

    Install frontend dependencies:

        `npm install`

### Environment Variables

Create a `.env` file in the `server` folder and provide the following variables:

- GOOGLE_CLIENT_SECRET=your-google-client-secret-here
- GOOGLE_OAUTH=your-google-oauth-client-id-here
- CONNECTION_URL=your-mongodb-connection-url-here
- PORT=5000


### For the Python AI model:

- Install the necessary Python libraries:

    `pip install fastapi uvicorn pymongo==4.6.1 python-dotenv`

- Set up the `.env` file for Python with your MongoDB credentials.

### Run the Application

Navigate to the server directory:

`cd server`

Start the backend server:

`npm start`

Frontend

Navigate to the client directory:

`cd client`

Start the Frontend server:

`npm start`

### Access the Application

Once the servers are running:

- Open your browser and go to `http://localhost:5173` for the frontend.

- The backend runs on `http://localhost:5000`.

### Contributing

Contributions are welcome! If you have ideas, encounter any issues, or would like to improve the project, feel free to:

- Fork the repository.
- Create a feature branch: `git checkout -b feature-name`
- Commit your changes: `git commit -m "Description of feature/bug fix"`
- Push the branch: `git push origin feature-name`
- Open a Pull Request.

### License

This project is licensed under the MIT License. You are free to use, modify, and distribute it for pers
