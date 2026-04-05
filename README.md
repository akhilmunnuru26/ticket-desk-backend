# Zeto Ticket Desk - Backend API

This is the backend REST API for the Zeto Ticket Desk application, built to manage internal support tickets, assignments, and comments. It utilizes a robust, type-safe architecture powered by Express.js, TypeScript, and Drizzle ORM.

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** Drizzle ORM

  ## Project Structure

```text
├── src/
│   ├── controllers/    # Business logic and database interactions
│   ├── db/             # Drizzle schema definitions and seed scripts
│   ├── routes/         # Express API route definitions
│   └── index.ts        # Server entry point and middleware configuration
├── drizzle.config.ts   # Drizzle ORM configuration
├── .env.example        # Example environment variables
└── package.json
```

## Getting Started

## Prerequisites
1. Node.js (v18+ recommended)
2. PostgreSQL running locally or via a cloud provider

## Installation

## Clone the repository:
```bash
git clone https://github.com/akhilmunnuru26/ticket-desk-backend.git
```


## Install dependencies:

```bash
npm install
```

## Environment Variables:
Create a .env file in the root directory and add your PostgreSQL connection string:

PORT=5000
DATABASE_URL=postgres://<username>:<password>@localhost:5432/zeto_tickets

## Database Setup:
Ensure your PostgreSQL database is created. Then, push the schema and seed the initial users:

``` bash
npm run db:push
npm run db:seed
```

## Start the Development Server:

``` bash
npm run dev
```

The API will be available at http://localhost:5000.

## API Endpoints

**Tickets**

**GET /api/tickets** - Fetch all tickets

**GET /api/tickets/:id** - Fetch a specific ticket by ID

**POST /api/tickets** - Create a new ticket

**PATCH /api/tickets/:id** - Update ticket status or assignee


**Comments**

**GET /api/tickets/:id/comments** - Fetch comments for a ticket

**POST /api/tickets/:id/comments** - Add a comment to a ticket 



**Users**

**GET /api/users** - Fetch all available users for assignment





