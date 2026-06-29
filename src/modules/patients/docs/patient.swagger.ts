/**
 * @swagger
 * tags:
 *   - name: Patients
 *     description: Patient registration and demographics
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePatientRequest:
 *       type: object
 *       required: [fullName, phone, dateOfBirth, address, bloodGroup, emergencyContact]
 *       properties:
 *         fullName: { type: string }
 *         phone: { type: string }
 *         email: { type: string, format: email }
 *         gender: { type: string, enum: [Male, Female] }
 *         dateOfBirth: { type: string, format: date }
 *         address: { type: string }
 *         bloodGroup: { type: string, enum: [A+, A-, B+, B-, AB+, AB-, O+, O-] }
 *         emergencyContact: { type: string }
 */

/**
 * @swagger
 * /api/patients:
 *   post:
 *     tags: [Patients]
 *     summary: Register patient (admin, receptionist)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreatePatientRequest' }
 *     responses:
 *       201:
 *         description: Patient created
 *   get:
 *     tags: [Patients]
 *     summary: List patients (paginated)
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *     responses:
 *       200:
 *         description: Paginated patient list
 */

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     tags: [Patients]
 *     summary: Get patient by ID
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Patient details
 *   patch:
 *     tags: [Patients]
 *     summary: Update patient
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Patient updated
 *   delete:
 *     tags: [Patients]
 *     summary: Soft-delete patient (admin)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Patient deleted
 */

export {};
