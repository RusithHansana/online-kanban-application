# Online Kanban Board

## Description

An online Kanban board application designed to help you manage your projects efficiently. This project includes features such as user registration and sign-in, project creation, card and task management, and drag-and-drop functionality for reordering tasks. Developed to enhance my skills in React and full-stack development, this app has provided valuable insights and experiences.

## Features

- User registration and sign-in
- Create and manage projects
- Create, update, and delete cards
- Add and manage tasks within cards
- Drag-and-drop functionality to reorder or move tasks between cards

## Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.2.1-blueviolet)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16.16-orange)
![React Beautiful DnD](https://img.shields.io/badge/React%20Beautiful%20DnD-13.1.1-yellow)
![React Feather](https://img.shields.io/badge/React%20Feather-2.0.10-lightgrey)
![React Redux](https://img.shields.io/badge/React%20Redux-9.1.0-red)
![React Router Dom](https://img.shields.io/badge/React%20Router%20Dom-6.21.1-brightgreen)
![React Toastify](https://img.shields.io/badge/React%20Toastify-10.0.5-lightgrey)
![Sass](https://img.shields.io/badge/Sass-1.69.5-pink)

### Backend

![Express](https://img.shields.io/badge/Express-4.18.3-lightgrey)
![Mongoose](https://img.shields.io/badge/Mongoose-8.2.1-green)
![JSON Web Token](https://img.shields.io/badge/JSON%20Web%20Token-9.0.2-yellow)
![Bcryptjs](https://img.shields.io/badge/Bcryptjs-2.4.3-blue)
![Dotenv](https://img.shields.io/badge/Dotenv-16.4.5-purple)
![Cookie Parser](https://img.shields.io/badge/Cookie%20Parser-1.4.6-orange)
![Cors](https://img.shields.io/badge/Cors-2.8.5-red)
![Express Async Handler](https://img.shields.io/badge/Express%20Async%20Handler-1.2.0-blue)

### Database

![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-cloud-green)

### Development Tools

![Concurrently](https://img.shields.io/badge/Concurrently-8.2.2-blue)
![Nodemon](https://img.shields.io/badge/Nodemon-3.1.0-lightgrey)

## Screenshots

![Screenshot 1](kanbanproject/sign_in.png)
![Screenshot 2](url_to_screenshot_2)

## Installation

### Prerequisites

- Node.js
- npm or yarn
- [MongoDB Atlas account and cluster](https://www.mongodb.com/cloud/atlas/register)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/RusithHansana/online-kanban-application.git
   ```

2. Navigate to the project directory:
   ```bash
   cd online-kanban-application
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install  # or yarn install
   ```

4. Install backend dependencies:
   ```bash
   cd ../backend
   npm install  # or yarn install
   ```

5. Create a `.env` file in the server directory and add the following variables:
   ```env
   NODE_env = development
   PORT=5000
   USER = mongodb atlas username
   password = mongodb atlas password
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

6. Start the development server:
   ```bash
   npm run dev  # This will concurrently start both frontend and backend servers
   ```

## Usage

1. Open your browser and go to `http://localhost:3000` to use the Kanban board application.
2. Register a new user account or sign in with your credentials.
3. Start creating projects, adding cards, and managing tasks!

## Contributing

If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a new Pull Request

## Acknowledgments

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)

## Feedback

Feel free to provide feedback and suggestions for improvements. If you encounter any issues or have ideas for optimizations, please let me know!
