# LinkVault — Bookmark & Link Manager

A single-page MERN application built for the AQI Labs Bookmark & Link Manager evaluation.

## Features

- Add a bookmark with title, HTTP/HTTPS URL and category.
- List bookmarks newest first.
- Search by title without a page reload.
- Filter by category and Favorites.
- Toggle a bookmark's favorite status.
- Delete a bookmark.
- Client-side and server-side validation.
- Loading, error and empty states.

## Folder structure

```text
aqi-bookmark-manager/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   └── package.json
└── server/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── .env.example
    ├── package.json
    └── server.js
```

## Run locally

### 1. Start MongoDB

Create a MongoDB Atlas cluster or use a local MongoDB instance. Copy the connection string.

### 2. Start the backend

```bash
cd server
npm install
```

Copy `.env.example` to `.env`, then put your MongoDB connection string in `MONGO_URI`.

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

### 3. Start the frontend

Open a second terminal:

```bash
cd client
npm install
```

Copy `.env.example` to `.env`.

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/bookmarks` | Get bookmarks |
| POST | `/api/bookmarks` | Create bookmark |
| PATCH | `/api/bookmarks/:id/favorite` | Toggle favorite |
| DELETE | `/api/bookmarks/:id` | Delete bookmark |

Optional GET query parameters:
- `category=Work` (or Learning, Tools, Entertainment)
- `search=react`
- `favorite=true`

## Deployment notes

- Deploy `server` to Render or Railway.
- Add `MONGO_URI`, `PORT` and `CLIENT_URL` to backend environment variables.
- Deploy `client` to Vercel with the root directory set to `client`.
- Add `VITE_API_URL` to Vercel, pointing to the deployed backend API base, for example `https://your-api.onrender.com/api`.
- Set `CLIENT_URL` on the backend to your deployed frontend domain.
- Never commit real `.env` files or database credentials.

## Before submitting

Test all four API endpoints, check the deployed frontend and backend, and make sure the GitHub repository contains no secrets. Be ready to explain the model, controller, routes, React state, `useEffect`, validation and API request flow.
