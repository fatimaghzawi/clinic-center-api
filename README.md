# Clinic Center API

MongoDB-based backend for a clinic management system, redesigned from a relational SQL schema using document-oriented modeling and MERN-stack best practices.

## Purpose

Manage clinic operations: staff, patients, and departments — with role-based access, audit trails, and soft deletes.

## Main Features

- JWT authentication via httpOnly cookies with refresh tokens
- Role-based access (admin, doctor, nurse, receptionist)
- Patient management
- Department and staff management
- Swagger API docs and Postman collection

## User Roles

| Role | Capabilities |
|------|-------------|
| admin | Full system access |
| doctor | View/update patient records |
| nurse | View/update patient records |
| receptionist | Patient registration and updates |

## Technologies

- Node.js, Express.js
- MongoDB, Mongoose
- Zod, JWT, Bcrypt
- Swagger, Postman
- Helmet, Rate Limiting, Mongo Sanitize

## Setup

```bash
git clone <repository-url>
cd clinic-center-api
npm install
cp .env.example .env
npm run dev
```

Server: `http://localhost:5000`  
Swagger: `http://localhost:5000/api/docs`

## Environment Variables

See `.env.example` for `MONGODB_URI`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `BCRYPT_SALT_ROUNDS`, etc.

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register user | Admin |
| POST | /api/auth/login | Login | Public |
| POST | /api/auth/refresh | Refresh token | Public |
| POST | /api/auth/logout | Logout | User |
| GET | /api/departments | List departments | User |
| POST | /api/departments | Create department | Admin |
| GET | /api/staff | List staff | User |
| POST | /api/staff | Create staff profile | Admin |
| GET | /api/patients | List patients | User |
| POST | /api/patients | Create patient | Admin/Receptionist |

## Project Structure

```txt
src/
├── modules/          # Feature modules (auth, patients, staff, ...)
├── middleware/       # Auth, validation, error handling
├── config/           # Database, Swagger
├── models/           # Mongoose schemas
├── validations/      # Zod schemas
├── routes/           # Route aggregator
├── utils/            # AppError, pagination, audit
├── app.js
└── server.js
docs/
├── DATABASE_DESIGN.md
├── MIGRATION.md
└── postman-collection.json
```

## Authentication Flow

Auth uses **httpOnly cookies** (not tokens in the response body). Cookie names and paths:

| Cookie | Path | Lifetime (default) |
|--------|------|--------------------|
| `access_token` | `/` | 15m (`JWT_EXPIRES_IN`) |
| `refresh_token` | `/api/auth` | 7d (`JWT_REFRESH_EXPIRES_IN`) |

1. **Login** (`POST /api/auth/login`) — sets both cookies; response body returns user info only (`id`, `username`, `role`).
2. **Protected routes** — the client sends cookies automatically. Browsers must use `credentials: 'include'` (fetch) or `withCredentials: true` (axios). `Authorization: Bearer <token>` is supported as a fallback for API clients.
3. **Refresh** (`POST /api/auth/refresh`) — reads the httpOnly `refresh_token` cookie and updates `access_token`; no request body required.
4. **Logout** (`POST /api/auth/logout`) — clears both cookies and invalidates the refresh token hash in the database.

Cookies are `httpOnly`, `secure` in production, and `sameSite: 'lax'` in development / `'none'` in production (for cross-origin frontends over HTTPS).



## Testing

Import `docs/postman-collection.json` into Postman. Run **Auth → Login** first — Postman stores and sends the httpOnly auth cookies automatically for subsequent requests.
