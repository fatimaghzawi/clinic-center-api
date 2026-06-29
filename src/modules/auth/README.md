# Auth Module

Authentication, JWT sessions, and the **User** domain model.

## Base path

`/api/auth`

## Responsibilities

- Login and logout
- Access / refresh token rotation
- Admin-only user registration
- Owns `user.model.ts` (credentials and roles)

## Folder structure

```
auth/
├── controllers/     HTTP handlers
├── services/          Business logic (hashing, tokens)
├── repositories/      User persistence
├── models/            User Mongoose schema
├── routes/            Express routes
├── validations/       Zod schemas (login, register, refresh)
├── docs/              OpenAPI definitions (auth.swagger.ts)
├── tests/             Validation unit tests
└── index.ts           Public module exports
```

## Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| POST | `/login` | Public | Login with username/password |
| POST | `/register` | admin | Create a new user account |
| POST | `/refresh` | Public | Refresh access token |
| POST | `/logout` | Authenticated | Invalidate refresh token |

## Related modules

- **users** — CRUD for existing accounts (admin)
- **staff** — Links doctor/nurse profiles to user accounts

## Tests

```bash
npm test -- src/modules/auth/tests/auth.test.ts
```

## API docs

Swagger UI: `GET /api/docs` → tag **Auth**  
Source: `docs/auth.swagger.ts`
