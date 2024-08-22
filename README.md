# Task Manager

It is a robust application built with microservices architecture to manage tasks efficiently. It utilizes **React** for the frontend, **Spring Boot** for the backend, and **JWT** for secure authentication. This project is designed to provide a seamless experience for users to create, manage, and track tasks.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure user authentication using JWT.
- **Task Management**: Create, update, delete, and view tasks.
- **Microservices Architecture**: The application is divided into separate services for scalability and maintainability.
- **React Frontend**: Interactive and responsive user interface using React.
- **Spring Boot Backend**: Robust and scalable backend built with Spring Boot.
- **RESTful APIs**: Well-structured APIs for communication between services.
- **Error Handling**: Comprehensive error handling across all services.
- **Testing**: Unit and integration tests to ensure code quality.

## Tech Stack

- **Frontend**: React, Redux, HTML, CSS, JavaScript
- **Backend**: Spring Boot, Spring Security, Hibernate, JWT
- **Database**: MySQL
- **Version Control**: Git
- **Build Tools**: Maven

## Installation

### Prerequisites

- **Node.js** and **npm**
- **Java 17+**
- **Maven**
- **MySQL** 

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
   ```

2. **Backend Setup**
   - Navigate to the `backend` directory.
   - Configure the `application.properties` file with your database details.
   - Build the project:
     ```bash
     mvn clean install
     ```
   - Run the Spring Boot application:
     ```bash
     mvn spring-boot:run
     ```

3. **Frontend Setup**
   - Navigate to the `frontend` directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React application:
     ```bash
     npm start
     ```

4. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Register**: Create a new account.
- **Login**: Authenticate using your credentials.
- **Manage Tasks**: Add, update, and delete tasks.
- **View Tasks**: Get an overview of all your tasks with filtering options.

## API Endpoints

- **Authentication**
  - `POST /api/auth/login`: Login
  - `POST /api/auth/register`: Register

- **Tasks**
  - `GET /api/tasks`: Get all tasks
  - `POST /api/tasks`: Create a new task
  - `PUT /api/tasks/{id}`: Update a task
  - `DELETE /api/tasks/{id}`: Delete a task
