# Task Management API

A simple backend Task Management API built as a 3-Tier Monolith.
It is organized into three separate layers: Controllers, Services, and Repositories.

## Project Structure

```text
task-api/
  src/
    routes/         -> Presentation / Routing Layer (HTTP endpoints mapping)
    controllers/    -> Presentation Layer (HTTP request/response handling)
    services/       -> Business Logic Layer (Core validation & rules)
    repositories/   -> Data Access Layer (Storage handling)
    index.js        -> Application entry point & server bootstrap
  .gitignore
  README.md
  package.json
```

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. The server will run on `http://localhost:3000`

## API Endpoints

- `GET /tasks`         - Get all tasks
- `GET /tasks/:id`     - Get a single task by ID
- `POST /tasks`        - Create a new task (body: `title`, `description`, `priority`, `status`)
- `PUT /tasks/:id`     - Update an existing task
- `DELETE /tasks/:id`  - Delete a task
- `GET /health`        - Health check

## Example Requests

**Create a task:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Complete Workshop Assignment", "priority": "high"}'
```

**Get all tasks:**
```bash
curl http://localhost:3000/tasks
```

## Layer Separation & Architecture

The project follows a strict 3-tier monolithic architecture aligned with **SOLID Principles** and **Clean Architecture**:

1. **Routing (`src/routes/`) & Controllers (`src/controllers/`) - Presentation Layer**
   - Focuses solely on HTTP concerns (parsing request params/body, serializing JSON, and returning proper HTTP status codes like `200`, `201`, `400`, `404`, and `500`).
   - Contains zero business validation and zero database queries.

2. **Services (`src/services/`) - Business Logic Layer**
   - Contains all domain rules, data sanitization, and invariant checks (e.g. title length, allowed priorities: `low`, `medium`, `high`, status validation).
   - Completely agnostic of HTTP (`req`, `res`) and database drivers.

3. **Repositories (`src/repositories/`) - Data Access Layer**
   - Handles storage, retrieval, and persistence logic exclusively.
   - All repository operations return Promises (`async/await`) and return cloned data to protect internal state encapsulation.

## Alignment with Architectural Principles

- **High Cohesion**: Every layer has a single, well-defined responsibility.
- **Loose Coupling**: Layers communicate downward via well-defined boundaries. Controllers only call Services; Services only call Repositories.
- **Open-Closed Principle (OCP)**: Because the repository layer exposes an asynchronous contract, swapping the in-memory array for MongoDB, PostgreSQL, or MySQL requires changes **only** in the repository layer—controllers and services remain untouched.
- **Single Responsibility Principle (SRP)**: Each class/module has one and only one reason to change. Routing maps endpoints, controllers handle HTTP transport, services enforce business logic, and repositories manage persistence.