/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Login, registration, and token refresh
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required: [username, password]
 *       properties:
 *         username: { type: string, minLength: 3, example: admin }
 *         password: { type: string, minLength: 8, example: Admin@123456 }
 *     RegisterRequest:
 *       type: object
 *       required: [username, password, role]
 *       properties:
 *         username: { type: string, minLength: 3 }
 *         password:
 *           type: string
 *           minLength: 8
 *           maxLength: 128
 *           description: Must include uppercase, lowercase, number, and special character
 *           example: Password@123
 *         role: { type: string, enum: [receptionist, doctor, nurse, admin] }
 *     AuthUser:
 *       type: object
 *       properties:
 *         id: { type: string }
 *         username: { type: string }
 *         role: { type: string }
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with username and password
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LoginRequest' }
 *     responses:
 *       200:
 *         description: Login successful. Sets httpOnly `access_token` and `refresh_token` cookies.
 *         headers:
 *           Set-Cookie:
 *             description: Auth cookies (httpOnly, secure in production)
 *             schema: { type: string }
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     user: { $ref: '#/components/schemas/AuthUser' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       400: { $ref: '#/components/responses/ValidationError' }
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user (admin only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/RegisterRequest' }
 *     responses:
 *       201:
 *         description: User created
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       400: { $ref: '#/components/responses/ValidationError' }
 */

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh access token using the httpOnly refresh_token cookie
 *     security: []
 *     responses:
 *       200:
 *         description: Access token refreshed and `access_token` cookie updated
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Invalidate refresh token and clear auth cookies
 *     responses:
 *       200:
 *         description: Logged out
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */

export {};
