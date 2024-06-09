import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {z} from 'zod';
import {useAuth} from '../auth/models';
import {useInjection} from 'inversify-react';
import {ProfileService} from '../../api/profile/profile-service';
import {ISetUserProfile} from '../../api/profile/models';
import {withDelay} from '../loading-with-delay';

export const profileSettingsSchema = z.object({
  profilePicture: z.string().optional(),
  profileName: z.string().min(3),
});

export interface SaveProfileSettings {
  profilePicture?: string;
  profileName: string;
}

export const useProfile = () => {
  const {session} = useAuth();
  const profileService = useInjection(ProfileService);
  const result = useQuery({
    queryKey: ['profile', session?.user.id],
    queryFn: () => profileService.getProfile(),
  });

  return result;
};

export const useProfileChange = () => {
  const queryClient = useQueryClient();
  const profileService = useInjection(ProfileService);
  const {mutateAsync, isPending} = useMutation({
    mutationFn: (data: ISetUserProfile) =>
      withDelay(profileService.setProfile(data)),
    onMutate: () => {
      queryClient.invalidateQueries({queryKey: ['profile'], exact: false});
    },
  });

  return [mutateAsync, isPending] as const;
};
