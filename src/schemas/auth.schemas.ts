import { string, object, TypeOf } from 'zod';

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: 'Eamil is required',
    }),
    username: string({
      required_error: 'Username is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),
  }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>['body'];
