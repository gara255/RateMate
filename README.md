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

## Functional Guide

### 1. Project Overview

**Application Name:** RateMate

**Application Category / Topic:** Game review & rating platform (similar to a review/social network hybrid)

**Main Purpose:** RateMate lets gamers write and browse honest reviews of video games, instead of relying on star ratings. Users search for a game, rate it 1–10, write pros/cons and a personal verdict, and react to other people's reviews with emoji . It solves the problem of generic, context-free star ratings by pairing a score with an actual written opinion and casual, low-effort community feedback via reactions.

### 2. User Access & Permissions

**Guest (Not Authenticated)**
- Available pages/routes: `/` (Home), `/Catalog` (all reviews), `/Catalog/:id` (review details), `/Profile/:userId`, `/Register`, `/Login`
- Public data shown: all reviews (game, rating, pros, cons, verdict, cover image, author, reaction counts) — read-only

**Authenticated User**
- Main sections/pages: everything a guest sees, plus the ability to open the "Write a review" modal from Home
- Details pages: same `/Catalog/:id` page, but if the logged-in user is the review's author, Edit and Delete buttons appear
- Create/Edit/Delete actions: can create new reviews (any logged-in user); can only Edit/Delete their **own** reviews, enforced both in the UI (buttons hidden) and at the database level (Supabase Row Level Security policies tied to `auth.uid()`)

### 3. Authentication & Session Handling

**Authentication Flow**
- On app load, `App.jsx` initializes its `auth` state by reading a previously saved session from `localStorage` (if any)
- Authentication status is checked everywhere via a custom `useAuth()` hook, which reads `auth` from a global `AuthContext`
- On successful login or registration, Supabase Auth returns a session (`access_token` + `user` object); this is stored in `auth` state and persisted to `localStorage`
- On logout, `auth` is set to `null` and removed from `localStorage`; the user is redirected to `/`

**Session Persistence**
- The session is stored in React Context (`AuthContext`/`AuthProvider` in `App.jsx`) for use across all components, and mirrored into `localStorage` so it survives page refreshes
- On refresh, `App.jsx`'s `useState` initializer reads `localStorage` synchronously, restoring the logged-in state immediately without requiring a new login

### 4. Routing Structure

**Route Guards Logic**
- `RequireGuest` wraps `/Login` and `/Register` — if `auth.user` exists, the user is redirected to `/` instead of seeing those forms
- Functional/write actions (creating a review, reacting) check `auth.user` inline and redirect unauthenticated users to `/Register` instead of performing the action
- Guests can freely view `/Catalog` and `/Catalog/:id` (read-only access), matching the "guests see data, not functionality" requirement

**Main Routes**
- 8 top-level routes: `/`, `/Write-review` (alias to Home), `/Catalog`, `/Catalog/:id`, `/Register`, `/Login`, `/Profile/:userId`, and a catch-all `*` 404 page

**Nested & Parameterized Routes**
- No layout/nested routing is used — all routes are flat under `<Routes>` in `App.jsx`
- Two routes use URL parameters: `/Catalog/:id` (review ID) and `/Profile/:userId` (user ID)

### 5. List → Details Flow

**Catalog / List Page**
- Displays all reviews (game, cover image, rating, pros/cons preview, verdict, author, reaction counts), fetched from Supabase and paginated (12 per page)

**Details Page**
- Navigation is triggered by a `<Link to={`/Catalog/${review.id}`}>` wrapping each review card
- The details page reads the `id` route parameter via `useParams()` and fetches the matching review from Supabase

### 6. Data Source & Backend

**Backend Type:** Backend-as-a-Service — Supabase (Auth + Postgres database), accessed via its REST API directly (no SDK), with Row Level Security enabled on all write-sensitive tables.

### 7. Data Operations (CRUD)

**Create (POST):** A logged-in user opens the "Write a review" modal from Home, searches for a game (RAWG API autocomplete), fills in rating/pros/cons/verdict, and submits — this sends a `POST /Reviews` request with the review data plus `author_id`/`author_username`.

**Read (GET):** Reviews are fetched on Home (3 most recent), Catalog (paginated list), the Details page (single review by ID), and Profile (all reviews by a given author).

**Update (PATCH):** On the Details page, if the logged-in user is the review's author, an "Edit" button switches the page into an inline edit form; saving sends a `PATCH /Reviews?id=eq.<id>` request and updates the local state immediately.

**Delete:** The author can click "Delete" on their own review (with a confirm dialog), which sends a `DELETE /Reviews?id=eq.<id>` request and navigates back to `/Catalog`.

### 8. Forms & Validation

**Forms Used:** Register form, Login form, Write a Review form (game search + rating + pros + cons + verdict), inline Edit Review form.

**Validation Rules:**
- **Email** (Register/Login): must match a valid email format via regex before submission is allowed
- **Password** (Register): must be at least 8 characters
- **Username** (Register): must be at least 3 characters, required (non-empty)
- Review fields (game, rating, pros, cons, verdict): all required — submission is blocked with an inline message listing which fields are empty if any are missing

### 9. React-Specific Techniques

**Hooks & Component Lifecycle**
- `useState` and `useEffect` are used throughout (Catalog, Home, Review Details, Profile, Stat section, Review Modal's live game search)
- Custom hook: `useAuth()` wraps

## Architecture

- `src/pages/` — route-level page components (Home, Catalog, Register, Login, Profile, Review Details)
- `src/Components/` — reusable UI components (Header, Footer, ReviewCard, ReviewModal, etc.)
- `src/context/` — React Context for global auth state
- `src/hooks/` — custom hooks (`useAuth`)
- `src/API/` — fetch wrappers for Supabase REST (data) and Supabase Auth
- Styling: CSS Modules for page-specific styles, shared global tokens/classes in `styles.css`