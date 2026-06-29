# Patients Module

Patient registration and demographics.

## Base path

`/api/patients`

## Responsibilities

- Register and maintain patient records

## Folder structure

```
patients/
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
├── validations/
├── docs/              patient.swagger.ts
├── tests/
└── index.ts
```

## Endpoints

| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| POST | `/` | admin, receptionist | Register patient |
| GET | `/` | Authenticated | List patients |
| GET | `/:id` | Authenticated | Patient by ID |
| PATCH | `/:id` | admin, receptionist, doctor, nurse | Update patient |
| DELETE | `/:id` | admin | Soft-delete |

## Tests

```bash
npm test -- src/modules/patients/tests/patient.test.ts
```

## API docs

Swagger tag: **Patients** — `docs/patient.swagger.ts`
