import { object, string, TypeOf, z } from 'zod';

const VALUES = ['basic', 'pro'] as const;

export const createAccountSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Email is not valid'),
    tier: z.enum(VALUES),
  }),
});

export type CreateAccountInput = TypeOf<typeof createAccountSchema>['body'];
