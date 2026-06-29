import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ZodSchema } from 'zod';

type RequestSource = 'body' | 'query' | 'params';

export const validate = <T>(schema: ZodSchema<T>, source: RequestSource = 'body'): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return next(result.error);
    }
    (req as Request & Record<RequestSource, T>)[source] = result.data; //cast the request to include the validated data
    next();
  };
};

export const validateMultiple = (schemas: Partial<Record<RequestSource, ZodSchema>>): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    for (const [source, schema] of Object.entries(schemas) as [RequestSource, ZodSchema][]) {
      const result = schema.safeParse(req[source]);
      if (!result.success) {
        return next(result.error);
      }
      (req as Request & Record<string, unknown>)[source] = result.data;
    }
    next();
  };
};
