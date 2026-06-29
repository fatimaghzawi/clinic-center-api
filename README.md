# Clinic Center API

MongoDB-based backend for a clinic management system, redesigned from a relational SQL schema using document-oriented modeling and MERN-stack best practices.

## Purpose

Manage clinic operations: staff, patients, and departments — with role-based access, audit trails, and soft deletes.

## Main Features

- JWT authentication with refresh tokens
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

1. User logs in with username/password → receives `accessToken` (15m) + `refreshToken` (7d)
2. Access token sent as `Authorization: Bearer <token>` on protected routes
3. On expiry, client calls `/api/auth/refresh` with refresh token
4. Logout invalidates refresh token hash in database

## Database Design

See [docs/DATABASE_DESIGN.md](docs/DATABASE_DESIGN.md) for collection schemas, embed vs reference decisions, and indexes.

## Migration

See [docs/MIGRATION.md](docs/MIGRATION.md) for SQL → MongoDB migration steps.

## Deployment

- Use MongoDB Atlas for managed database
- Set `NODE_ENV=production`
- Use strong JWT secrets (32+ chars)
- Enable HTTPS via reverse proxy (Nginx)
- Consider Redis for rate limiting at scale
- Docker + GitHub Actions for CI/CD

## Testing

Import `docs/postman-collection.json` into Postman. Login first to auto-set the access token variable.
