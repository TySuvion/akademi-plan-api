# AkademiPlan API

This is the backend API for the AkademiPlan project. Below you'll find instructions for setting up and running the project.

## Prerequisites

- Node.js (v14 or higher)
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
DATABASE_URL="postgresql://username:password@localhost:5432/akademiplan"

# JWT Authentication
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="24h"

# Server
PORT=3000
NODE_ENV="development"
```

### Environment Variables Explanation

- `DATABASE_URL`: Your PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRES_IN`: Token expiration time
- `PORT`: Server port number
- `NODE_ENV`: Application environment

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
npm start
```

## API Documentation

The API documentation is available at `/api` when the server is running.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations

## Prisma Commands

- Generate new migration: `npx prisma migrate dev --name migration_name`
- Reset database: `npx prisma migrate reset`
- View database: `npx prisma studio`
