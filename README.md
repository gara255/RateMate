# RateMate

A game review & rating platform built with React. Users can browse reviews, create an account, write their own reviews for games (pulled from the RAWG API), and react to reviews with 🔥 💀 🤝 and more.

## Tech stack
- React 19 + Vite
- React Router (`react-router`)
- Framer Motion (page/card transitions)
- Supabase (Auth + Database, accessed via REST API, Row Level Security enabled)
- RAWG API (game search/cover images)

## Installation

1. Clone the repo
   git clone https://github.com/gara255/ratemate.git
   cd ratemate

2. Install dependencies

   npm install

3. Create a `.env` file in the project root with:

   VITE_SUPABASE_URL=your_supabase_project_rest_url
   VITE_SUPABASE_AUTH_URL=your_supabase_project_auth_url
   VITE_SUPABASE_KEY=your_supabase_anon_key
   VITE_RAWG_SEARCH_KEY=your_rawg_api_key

4. Run the dev server

   npm run dev


## Functional guide

- **Home** (`/`) — hero section, quick stats, 3 most recent reviews, "how it works" section.
- **Catalog** (`/Catalog`) — paginated list of all reviews.
- **Review details** (`/Catalog/:id`) — full review with pros/cons, verdict, and reactions. Only the review's author sees Edit/Delete.
- **Register** (`/Register`) — create an account (username, email, password).
- **Login** (`/Login`) — log in with email and password.
- **Profile** (`/Profile/:userId`) — all reviews written by a specific user; click your username in the header to see your own.
- **Write a review** — available from the Home page once logged in; search for a game (RAWG API), rate it 1–10, add pros/cons and a verdict.

## Security

- Supabase Row Level Security enabled on `Reviews` and `Reactions` tables.
- Only authenticated users can create reviews/reactions.
- Only the author of a review can edit or delete it, enforced both in the UI and at the database level.

## Deployment

Live app: **https://rate-mate-sooty.vercel.app**
Backend: Supabase (hosted, no separate backend deploy needed).
