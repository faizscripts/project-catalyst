# PROJECT CATALYST

Project Catalyst is a full-stack web application for tracking company initiatives and their related tasks. It enables users to create initiatives, add tasks, and monitor overall progress in real time.

# TECH STACK

Frontend: Next.js (React, TypeScript, ShadCN/UI, React Query)  
Backend: NestJS (TypeScript, REST API)  
Database: PostgresSQL (hosted on Supabase)  
ORM: Prisma  
Hosting: Frontend on Vercel, Backend on Render, Database on Supabase

# PREVIEW

Live project url \- [https://faizscripts-pc.vercel.app/](https://faizscripts-pc.vercel.app/)

Backend \- [https://project-catalyst-fggs.onrender.com/api/v1](https://project-catalyst-fggs.onrender.com/api/v1)

# FEATURES

Initiative Management

* Create, view, update, and delete initiatives.  
* Track overall progress based on related tasks.

Task Management

* Add tasks linked to initiatives.  
* Enforce scheduling within the initiative date range.  
* Sync completion percentage with task status automatically.

Progress Calculation

* The endpoint _**/api/v1/initiatives/:id/progress**_ computes the average completion rate for each initiative.

Responsive UI

* Built with ShadCN and TailwindCSS.  
* Fully mobile-friendly.

# LOCAL SETUP INSTRUCTIONS

## Clone the repository

```
git clone https://github.com/faizscripts/project-catalyst.git  
cd project-catalyst
```

## Setup the database

You can use either a local PostgresSQL instance or a hosted Supabase project.

Option A: Using Supabase (Recommended)

1. Create a new project on [Supabase](https://supabase.com).  
2. Copy the connection button in the header.  
3. Select ORMs  
4. Create an .env file inside the backend folder and paste the information there. It should look like below
```
DATABASE_URL="X"

DIRECT_URL="Y"
```


5. Apply database migrations and generate the Prisma client:  
```
cd backend  
npx prisma migrate deploy  
npx prisma generate
```

## Add additional backend .env file data

Additionally, add the following CORS and port information to assist in running the project locally to  your backend .env file

```
CORS_ORIGIN=http://localhost:3001
PORT=3000
```

## Run the backend

```
cd backend  
npm install  
npm run start:dev
```

The backend will be available at: http://localhost:3000/api/v1

## Add frontend environment variables

Create a .env.local file inside the frontend folder and paste the following:  
```
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api/v1"
```

## Run the frontend
```
cd frontend 
npm install 
npm run dev
```


The frontend will be available at: [http://localhost:3001](http://localhost:3001)

