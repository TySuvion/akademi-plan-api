# AkademiPlan API

This is the backend API for the AkademiPlan project. Below you'll find instructions for setting up and running the project.

## Prerequisites

- Node.js
- A running PostgreSQL Database
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database connection
DATABASE_URL="postgresql://[username]:[password]@[url]:[port]/[database-name]?schema=public"

# JWT Authentication
JWT_SECRET="your-secret-key"

# Corse Filter Expemtion Address for Angular FrontEnd (example for angular app running on localhost)
CORS_ORIGIN = "http://localhost:4200"
```

### Environment Variables Explanation

- `DATABASE_URL`: Your PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `CORS_ORIGIN`: the url of the FrontEnd to skip the CORS filter

## Database Setup

1. Start your PostgreSQL server
2. Set up Prisma:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

## Running the Application

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm run start
```

## API Documentation

The API documentation is available at `/api` when the server is running.

## Scripts

- `npm run start:dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Prisma Commands

- Generate new migration: `npx prisma migrate dev --name migration_name`
- Reset database: `npx prisma migrate reset`
