import {useQuery} from '@tanstack/react-query';
import {useInjection} from 'inversify-react';
import {ProfileService} from '../../api/profile/profile-service';
import {z} from 'zod';
import {withDelay} from '../loading-with-delay';

const profilePattern = /^[a-zA-Z0-9]+#\d{4}$/;

export const formValidationSchema = z.object({
  profileSign: z.string().regex(profilePattern, {
    message: 'Invalid profile format. Expected format is Profile#0000',
  }),
});

export type ProfileSearchFormValues = z.infer<typeof formValidationSchema>;

export const useProfileSearch = (nickname?: string, code?: number) => {
  const profileService = useInjection(ProfileService);

  const result = useQuery({
    queryFn: () => withDelay(profileService.searchProfile(nickname!, code!)),
    queryKey: [nickname, code],
    enabled: Boolean(nickname && code),
  });

  return result;
};
