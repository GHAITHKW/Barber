# 4K Barber: Barbershop Booking Website

A full-stack web app that lets customers book barbershop appointments online. A customer picks a service, a date and an available hourly time slot. The booking is saved to a PostgreSQL database, and the customer is then redirected to WhatsApp with a ready-made confirmation message addressed to the shop.

**Live demo:** https://barber-delta-three.vercel.app

> The backend runs on a free hosting plan, so the first request after a period of inactivity can take up to about 50 seconds while the server wakes up.

## Screenshots

<img width="1350" height="642" alt="image" src="https://github.com/user-attachments/assets/403561b4-e70e-4b34-922d-3d8828e2753c" />
<img width="1354" height="639" alt="image" src="https://github.com/user-attachments/assets/9fb0c981-d3da-421f-ba7b-2450af8927e9" />
<img width="1349" height="637" alt="image" src="https://github.com/user-attachments/assets/5ecd0a19-8e2f-4810-9da6-557f8e4b5b75" />

## Features

- Services and prices loaded dynamically from the database
- Booking form with name, phone, service, date and time
- Hourly time slots only (10:00 to 21:00), with already-booked slots disabled
- Server-side conflict check: a slot that was just taken by someone else is rejected (HTTP 409)
- WhatsApp confirmation: after a successful booking, the customer is redirected to a WhatsApp chat with the shop, with the booking details prefilled
- Arabic, right-to-left, responsive dark UI built with Tailwind CSS
- Deployed end to end: frontend, API and database are all live

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Hosting | Vercel (frontend), Render (API), Neon (database) |
| Version control | Git and GitHub |

## Architecture

```
Browser (React on Vercel)
        │  fetch (JSON over HTTPS)
        ▼
REST API (Express on Render)
        │  Prisma + pg adapter
        ▼
PostgreSQL (Neon)
```

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/services` | List all services |
| GET | `/api/appointments/booked-times?date=YYYY-MM-DD` | Booked time slots for a given day |
| POST | `/api/appointments` | Create a booking (returns 409 if the slot is taken) |

## Project structure

```
.
├── client/                 # React frontend (Vite + Tailwind CSS)
│   └── src/components/     # Header, Hero, Services, BookingForm, Footer
└── server/                 # Express API + Prisma
    ├── index.js            # Routes and server setup
    ├── prisma.config.ts    # Prisma configuration
    └── prisma/             # schema.prisma and migrations
```

## Getting started locally

**Prerequisites:** Node.js 20 or newer, and a PostgreSQL database (a free Neon project works well).

### 1. Clone the repository

```bash
git clone https://github.com/GHAITHKW/Barber.git
cd Barber
```

### 2. Backend

```bash
cd server
npm install
```

Create `server/.env`:

```
DATABASE_URL="your PostgreSQL connection string"
```

Create the tables and generate the Prisma client:

```bash
npx prisma migrate dev
npx prisma generate
```

Add a few services (name and price) to the `Service` table. The easiest way is Prisma Studio:

```bash
npx prisma studio
```

Start the API:

```bash
npm run dev
```

The API runs on http://localhost:3000.

### 3. Frontend

In a second terminal:

```bash
cd client
npm install
```

Create `client/.env`:

```
VITE_API_URL=http://localhost:3000
VITE_WHATSAPP_NUMBER=<shop number with country code, digits only>
```

Start the app:

```bash
npm run dev
```

The app runs on http://localhost:5173.

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `DATABASE_URL` | server | PostgreSQL connection string (keep it secret) |
| `VITE_API_URL` | client | Base URL of the API |
| `VITE_WHATSAPP_NUMBER` | client | Shop WhatsApp number used for booking confirmations |

Variables that start with `VITE_` are embedded in the frontend build and are visible to anyone who opens the site. Never put secrets in them.

## Deployment

- **Frontend:** Vercel, root directory `client`, Vite preset, with the two `VITE_` variables set as environment variables.
- **Backend:** Render web service, root directory `server`, build command `npm install && npx prisma generate`, start command `node index.js`, with `DATABASE_URL` set.
- **Database:** Neon (PostgreSQL).

Pushing to the `main` branch triggers an automatic redeploy. After changing an environment variable on Vercel without changing code, trigger a manual redeploy so the new value is included in the build.

## Roadmap

- Admin dashboard with authentication to view, accept, reject and delete bookings
- Make the site configurable per shop (name, WhatsApp number, services, working hours)
- Input validation and rate limiting on the API
- Installable PWA version for phones

## Author

Built by [GHAITH] ([@GHAITHKW](https://github.com/GHAITHKW)) as a full-stack learning project.
