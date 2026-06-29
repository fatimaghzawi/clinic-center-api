/**
 * @swagger
 * tags:
 *   - name: Departments
 *     description: Clinic department management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateDepartmentRequest:
 *       type: object
 *       required: [departmentName]
 *       properties:
 *         departmentName: { type: string, example: Cardiology }
 *         description: { type: string }
 *     UpdateDepartmentRequest:
 *       type: object
 *       properties:
 *         departmentName: { type: string }
 *         description: { type: string }
 */

/**
 * @swagger
 * /api/departments:
 *   post:
 *     tags: [Departments]
 *     summary: Create department (admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreateDepartmentRequest' }
 *     responses:
 *       201:
 *         description: Department created
 *   get:
 *     tags: [Departments]
 *     summary: List departments (paginated)
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *     responses:
 *       200:
 *         description: Paginated department list
 */

/**
 * @swagger
 * /api/departments/{id}:
 *   get:
 *     tags: [Departments]
 *     summary: Get department by ID
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Department details
 *   patch:
 *     tags: [Departments]
 *     summary: Update department (admin)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UpdateDepartmentRequest' }
 *     responses:
 *       200:
 *         description: Department updated
 *   delete:
 *     tags: [Departments]
 *     summary: Soft-delete department (admin)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Department deleted
 */

export {};
