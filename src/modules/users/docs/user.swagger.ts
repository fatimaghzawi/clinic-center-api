/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User account management (admin)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         username: { type: string, minLength: 3 }
 *         role: { type: string, enum: [receptionist, doctor, nurse, admin] }
 *         isActive: { type: boolean }
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: List users (paginated)
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SortByParam'
 *       - $ref: '#/components/parameters/SortOrderParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *     responses:
 *       200:
 *         description: Paginated user list
 *       403: { $ref: '#/components/responses/Forbidden' }
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: User details
 *       404: { $ref: '#/components/responses/NotFound' }
 *   patch:
 *     tags: [Users]
 *     summary: Update user
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UpdateUserRequest' }
 *     responses:
 *       200:
 *         description: User updated
 *   delete:
 *     tags: [Users]
 *     summary: Soft-delete user
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: User deleted
 */

export {};
