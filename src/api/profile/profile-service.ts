import {inject, injectable} from 'inversify';
import ApiClient from '../api-client';
import {IRetrieveUserProfile, ISetUserProfile} from './models';
import 'reflect-metadata';

@injectable()
export class ProfileService {
  @inject(ApiClient)
  private readonly apiClient!: ApiClient;

  public async setProfile(profile: ISetUserProfile) {
    const result = await this.apiClient.put<IRetrieveUserProfile>(
      '/profiles',
      profile,
    );
    return result;
  }
  public async getProfile() {
    const result = await this.apiClient.get<IRetrieveUserProfile>('/profiles');
    return result;
  }

  public async searchProfile(nickname: string, code: number) {
    const result = await this.apiClient.get<IRetrieveUserProfile>(
      '/profiles/search',
      {
        params: {
          nickname,
          code,
        },
      },
    );
    return result;
  }
}
