import { z, string, object, TypeOf } from 'zod';

const VALUES = ['master', 'dependant'] as const;

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    username: string({
      required_error: 'Username is required',
    }).min(8, 'Username too short, should be at least 8 characters'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short, should be at least 6 characters'),
    account: string({
      required_error: 'Account is required',
    }),
    role: z.enum(VALUES),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
