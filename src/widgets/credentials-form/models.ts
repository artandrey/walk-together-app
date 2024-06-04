import {z} from 'zod';

export const credentialsValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(24),
});

export interface Credentials {
  email: string;
  password: string;
}
