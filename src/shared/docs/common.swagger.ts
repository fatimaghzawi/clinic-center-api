/**
 * @swagger
 * components:
 *   parameters:
 *     PageParam:
 *       in: query
 *       name: page
 *       schema: { type: integer, minimum: 1, default: 1 }
 *     LimitParam:
 *       in: query
 *       name: limit
 *       schema: { type: integer, minimum: 1, maximum: 100, default: 10 }
 *     SortByParam:
 *       in: query
 *       name: sortBy
 *       schema: { type: string }
 *     SortOrderParam:
 *       in: query
 *       name: sortOrder
 *       schema: { type: string, enum: [asc, desc], default: desc }
 *     SearchParam:
 *       in: query
 *       name: search
 *       schema: { type: string }
 *     IdParam:
 *       in: path
 *       name: id
 *       required: true
 *       schema: { type: string, pattern: '^[0-9a-fA-F]{24}$' }
 *   responses:
 *     Unauthorized:
 *       description: Missing or invalid JWT
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Error' }
 *     Forbidden:
 *       description: Insufficient role permissions
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Error' }
 *     NotFound:
 *       description: Resource not found
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Error' }
 *     ValidationError:
 *       description: Request validation failed
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Error' }
 */

export {};
