/**
 * @swagger
 * tags:
 *   - name: Staff
 *     description: Doctors and nurses linked to users and departments
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateStaffRequest:
 *       type: object
 *       required: [userId, departmentId, staffType, fullName]
 *       properties:
 *         userId: { type: string, description: MongoDB ObjectId }
 *         departmentId: { type: string }
 *         staffType: { type: string, enum: [doctor, nurse] }
 *         fullName: { type: string }
 *         specialization: { type: string }
 *         phone: { type: string }
 *         email: { type: string, format: email }
 *         gender: { type: string, enum: [Male, Female] }
 */

/**
 * @swagger
 * /api/staff:
 *   post:
 *     tags: [Staff]
 *     summary: Create staff record (admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreateStaffRequest' }
 *     responses:
 *       201:
 *         description: Staff created
 *   get:
 *     tags: [Staff]
 *     summary: List staff (paginated)
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *     responses:
 *       200:
 *         description: Paginated staff list
 */

/**
 * @swagger
 * /api/staff/department/{departmentId}/doctors:
 *   get:
 *     tags: [Staff]
 *     summary: List doctors in a department
 *     parameters:
 *       - in: path
 *         name: departmentId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Doctors in department
 */

/**
 * @swagger
 * /api/staff/{id}:
 *   get:
 *     tags: [Staff]
 *     summary: Get staff by ID
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Staff details
 *   patch:
 *     tags: [Staff]
 *     summary: Update staff (admin)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Staff updated
 *   delete:
 *     tags: [Staff]
 *     summary: Soft-delete staff (admin)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Staff deleted
 */

export {};
