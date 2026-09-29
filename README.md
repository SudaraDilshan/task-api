# Task Management API

A simple backend Task Management API built as a 3-Tier Monolith.
It is organized into three separate layers: Controllers, Services, and Repositories.

## Project Structure

task-api/
  src/
    controllers/    -> Presentation Layer (HTTP handling)
    services/       -> Business Logic Layer (Core rules)
    repositories/   -> Data Access Layer (Storage handling)
  .gitignore
  README.md
  package.json

## How to Run

1. Install dependencies:
   npm install

2. Start the server:
   npm start

3. The server will run on http://localhost:3000

## API Endpoints

GET /tasks          - Get all tasks
GET /tasks/:id      - Get a single task by ID
POST /tasks         - Create a new task
PUT /tasks/:id      - Update an existing task
DELETE /tasks/:id   - Delete a task
GET /health         - Health check

## Example Request

Create a task:

curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\": \"Buy groceries\", \"priority\": \"high\"}"

Get all tasks:

curl http://localhost:3000/tasks

## How Layer Separation Is Maintained

The project follows a strict 3-tier structure.

The controllers folder handles only HTTP requests and responses. It does not contain any business logic.

The services folder contains all the business rules and validation. It does not know about HTTP or the database.

The repositories folder handles only data storage and retrieval. It does not contain any business rules.

Each layer only talks to the layer directly below it. The controller calls the service, and the service calls the repository. This keeps the code maintainable, extensible, and easy to test.

## Why This Structure Matters

High cohesion means related code stays together in one layer.

Loose coupling means each layer depends as little as possible on the others.

This makes the application easy to maintain and easy to extend. For example, to switch from in-memory storage to a real database, only the repository layer needs to change. The controllers and services remain untouched.