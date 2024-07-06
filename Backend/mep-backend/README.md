# MEP Backend

## Overview

This project is a backend application built using NestJS. It includes features such as JWT authentication, user profile management, and tracking health data. The application uses PostgreSQL as its database and is deployed using Docker.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
  - [With Docker](#with-docker)
  - [Without Docker](#without-docker)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Notes](#notes)

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/mep-backend.git
   cd mep-backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Create .env File:**

   Create a `.env` file in the root directory of the project and add the following environment variables:

   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=yourusername
   DATABASE_PASSWORD=yourpassword
   DATABASE_NAME=mepdb
   JWT_SECRET=yourjwtsecret
   ```

## Running the Application

### With Docker

1. **Build Docker Containers:**

   ```bash
   docker-compose build
   ```

2. **Start Docker Containers:**

   ```bash
   docker-compose up
   ```

   This will start the NestJS application and the PostgreSQL database in Docker containers.

### Without Docker

1. **Start PostgreSQL:**

   Ensure your PostgreSQL server is running and you have created the database as specified in the `.env` file.

2. **Run Migrations:**

   ```bash
   npm run typeorm migration:run
   ```

3. **Start the Application:**

   ```bash
   npm run start:dev
   ```

## API Endpoints

Here are some key API endpoints:

### Authentication

#### Register User:

```bash
curl -X POST http://localhost:3000/user \
     -H "Content-Type: multipart/form-data" \
     -F "name=YourName" \
     -F "email=your.email@example.com" \
     -F "password=YourPassword123@" \
     -F "profilePicture=@/path/to/your/profile-picture.png"
```

#### Login User:

```bash
curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "your.email@example.com", "password": "YourPassword123@"}'
```

### User Profile

#### Get User Profile:

```bash
curl -X GET http://localhost:3000/user/profile \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Health Data

#### Add or Update Health Data:

```bash
curl -X POST http://localhost:3000/health/healthfrommodal \
     -H "Content-Type: application/json" \
     -d '{"email": "your.email@example.com", "steps": 5000, "calories": 300, "water_intake": 3}'
```

#### Get Health Data Chart:

```bash
curl -X GET http://localhost:3000/health/chartdata/your.email@example.com
```

## Project Structure

```
mep-backend/
├── src/
│   ├── auth/
│   ├── health/
│   ├── user/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
├── uploads/
├── .env
├── .eslintrc.js
├── package.json
├── tsconfig.json
└── docker-compose.yml
```

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeORM**: An ORM for TypeScript and JavaScript (ES7, ES6, ES5).
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Docker**: A platform for developing, shipping, and running applications in containers.
- **JWT**: JSON Web Tokens for authentication.

## Notes

- **Validation**: DTOs are used to validate and transform input data.
- **Password Security**: Passwords are hashed using bcrypt before being stored in the database.
- **Static Files**: Profile pictures and other static files are served using the ServeStaticModule.