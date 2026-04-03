# Shree Krishna Devasthana

A modern spiritual temple website built with React, Vite, Tailwind CSS, and Express. The project is mobile-first, SEO-friendly, and structured so events, blogs, donations, and contact features can be expanded into a MongoDB-backed CMS later.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Routing: React Router
- Backend: Node.js + Express
- Data: JSON seed data with MongoDB-ready model structure
- Styling: Tailwind CSS with a saffron, white, and gold temple theme

## Run Locally

1. Install dependencies from the project root:

```bash
npm install
```

2. Start frontend and backend together:

```bash
npm run dev
```

3. Frontend: `http://localhost:5173`
4. API: `http://localhost:5000/api`

## Environment Variables

`client/.env.example`

```bash
VITE_API_URL=http://localhost:5000/api
```

`server/.env.example`

```bash
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/shree-krishna-devasthana
```

## API Endpoints

- `GET /api/events`
- `GET /api/blogs`
- `POST /api/contact`

## Notes

- The frontend gracefully falls back to local seed content if the API is unavailable.
- MongoDB models are included for future persistence.
- Temple, events, activities, gallery, donations, blog, and contact flows are all scaffolded for production-style extension.
