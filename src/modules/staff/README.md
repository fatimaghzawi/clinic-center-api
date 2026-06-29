# Staff Module

Doctors and nurses — links system users to clinical profiles and departments.

## Base path

`/api/staff`

## Responsibilities

- Create and manage staff records (`doctor` | `nurse`)
- List doctors by department for scheduling

## Folder structure

```
staff/
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
├── validations/
├── docs/              staff.swagger.ts
├── tests/
└── index.ts
```

## Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| POST | `/` | admin | Create staff |
| GET | `/` | Authenticated | List staff |
| GET | `/department/:departmentId/doctors` | Authenticated | Doctors in department |
| GET | `/:id` | Authenticated | Staff by ID |
| PATCH | `/:id` | admin | Update staff |
| DELETE | `/:id` | admin | Soft-delete |

## Related modules

- **auth** / **users** — `userId` reference
- **departments** — `departmentId` reference

## Tests

```bash
npm test -- src/modules/staff/tests/staff.test.ts
```

## API docs

Swagger tag: **Staff** — `docs/staff.swagger.ts`
