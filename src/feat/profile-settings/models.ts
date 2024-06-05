import {z} from 'zod';

export const profileSettingsSchema = z.object({
  profilePicture: z.string().optional(),
  profileName: z.string().min(3),
});

export interface SaveProfileSettings {
  profilePicture?: string;
  profileName: string;
}
