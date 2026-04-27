# Backend Update Plan

## Steps Completed

- [x] Step 1: Update `models.go` — Add Package, Destination, Guide, Review models + CRUD functions
- [x] Step 2: Update `main.go` — Add REST API routes for all admin resources
- [x] Step 3: Update `frontend/admin/index.html` — Replace mock data with fetch() calls
- [x] Step 4: Update `frontend/admin/bookings.html` — Replace mock data with fetch() calls
- [x] Step 5: Update `frontend/admin/packages.html` — Replace empty state with API table
- [x] Step 6: Update `frontend/admin/destinations.html` — Replace empty state with API table
- [x] Step 7: Update `frontend/admin/guides.html` — Replace empty state with API table
- [x] Step 8: Update `frontend/admin/reviews.html` — Replace empty state with API table
- [x] Step 9: Test backend compiles successfully
- [x] Step 10: Commit and push to GitHub

## Summary of Changes

### Backend (`backend/`)
- **models/models.go**: Added `Package`, `Destination`, `Guide`, `Review` models with full CRUD operations
- **models/db.go**: Added `InitDB()` with schema creation for all new tables
- **main.go**: Added REST API endpoints:
  - `GET /api/bookings` — List all bookings
  - `POST /api/bookings` — Create booking
  - `PUT /api/bookings/:id/status` — Update booking status
  - `DELETE /api/bookings/:id` — Delete booking
  - `GET /api/packages` — List all packages
  - `GET /api/destinations` — List all destinations
  - `GET /api/guides` — List all guides
  - `GET /api/reviews` — List all reviews
  - `PUT /api/reviews/:id/status` — Update review status
  - `DELETE /api/reviews/:id` — Delete review

### Frontend Admin Panel (`frontend/admin/`)
- **index.html**: Dashboard now fetches real stats from `/api/bookings`, `/api/packages`, `/api/reviews`
- **bookings.html**: Full booking table with live data, delete support, CSV export
- **packages.html**: Package table with live data from `/api/packages`
- **destinations.html**: Destination card grid with live data from `/api/destinations`
- **guides.html**: Guide card grid with live data from `/api/guides`
- **reviews.html**: Review table with live data, approve/reject toggle, delete support

