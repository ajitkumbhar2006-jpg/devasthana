# MongoDB Setup Report

This project now supports MongoDB through `mongoose` and will still fall back to the local JSON files until your database contains data.

## What was changed

- The server now attempts a MongoDB connection on startup from `server/index.js`.
- Event and blog APIs now read from MongoDB first and fall back to `server/data/*.json` if the database is empty or unavailable.
- A seed script was added at `server/scripts/seedMongo.js`.

## Environment setup

1. Create `server/.env` from `server/.env.example`.
2. Set:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/shree-krishna-devasthana
```

## MongoDB Atlas option

Use a connection string like:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/shree-krishna-devasthana?retryWrites=true&w=majority
```

## Seed the database

From the project root:

```powershell
npm run seed --workspace server
```

## Run after setup

From the project root:

```powershell
npm install
npm run dev
```

## Notes

- If MongoDB is not running or `MONGODB_URI` is missing, the site still works with the bundled JSON seed files.
- Contact form submissions are not stored in MongoDB yet. They still return a mock success response from the API.
