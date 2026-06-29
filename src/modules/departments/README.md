# Departments Module

Clinic departments (e.g. Cardiology, Pediatrics).

## Base path

`/api/departments`

## Responsibilities

- CRUD for departments
- Referenced by **staff** assignments

## Folder structure

```
departments/
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
├── validations/
├── docs/              department.swagger.ts
├── tests/
└── index.ts
```

## Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| POST | `/` | admin | Create department |
| GET | `/` | Authenticated | List departments |
| GET | `/:id` | Authenticated | Department by ID |
| PATCH | `/:id` | admin | Update department |
| DELETE | `/:id` | admin | Soft-delete |

## Related modules

- **staff** — each staff member belongs to a department

## Tests

```bash
npm test -- src/modules/departments/tests/department.test.ts
```

## API docs

Swagger tag: **Departments** — `docs/department.swagger.ts`
