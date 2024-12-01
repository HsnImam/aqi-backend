# NestJS Project Setup

This guide will help you run the NestJS project locally using Docker for the database and create a `.env` file from the `.env.sample` file.

## Prerequisites

Before running the project, make sure you have the following installed on your local machine:

- **Node.js** (version >= 14.x)
- **Docker** (for running the database container)
- **Docker Compose** (for easier management of multi-container Docker applications)

## Step 1: Clone the Repository

Clone the NestJS project repository to your local machine:

```bash
git clone https://github.com/HsnImam/aqi-backend.git
cd aqi-backend

```

## Database Configuration
We will use Docker to run the PostgreSQL database container locally.
Start the database container:
```bash
docker compose up -d
```

## Environment Setup
Copy the .env.sample file to create your .env file:

```bash
cp .env.sample .env
```
Open the .env file and update the values with your local environment configuration, such as database connection details, etc

## Install Dependencies

Once the .env and database are set up, you can install the required dependencies for the NestJS project.
```bash
npm install
```

## Run the Application

With the database running and dependencies installed, you can now run the NestJS application.
```bash
npm run start:dev
```

If everything works, you should access health endpoint
```bash
curl --location 'localhost:8000/health'
```
On successful execution it should return `Server is running!`.

## Accessing the Database

You can connect to the PostgreSQL database using any database client with the following credentials (adjust based on your .env configuration):

Host: localhost
Port: 5432
User: postgres (or as specified in .env)
Password: yourpassword (or as specified in .env)
Database Name: nestdb (or as specified in .env)

## Stopping the Docker Container

When you're done working with the database, you can stop the Docker container:
```bash
docker compose down
```

This will stop and remove the container. To restart the database later, simply run:
```bash
docker compose up -d
```