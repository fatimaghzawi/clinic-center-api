# Users Module

Admin-only management of user accounts (separate from login/register in **auth**).

## Base path

`/api/users`

## Responsibilities

- List, view, update, and soft-delete users
- Toggle `isActive` and change roles

## Folder structure

```
users/
├── controllers/
├── services/
├── repositories/
├── routes/
├── validations/
├── docs/              user.swagger.ts
├── tests/
└── index.ts
```

## Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| GET | `/` | admin | Paginated user list |
| GET | `/:id` | admin | User by ID |
| PATCH | `/:id` | admin | Update username, role, isActive |
| DELETE | `/:id` | admin | Soft-delete user |

## Related modules

- **auth** — owns `User` model and registration
- **staff** — references `userId` for clinical staff

## Tests

```bash
npm test -- src/modules/users/tests/user.test.ts
```

## API docs

Swagger tag: **Users** — `docs/user.swagger.ts`
