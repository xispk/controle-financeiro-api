import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

// zod will validate the req content using the schemas and pass to the next
// middleware if the content is valid else will return error response
const validateResources =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      const message = error.issues.map((issue: any) => {
        return { path: issue.path[1], message: issue.message };
      });

      return res.status(400).json({ error: message });
    }
  };

export default validateResources;
