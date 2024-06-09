import {Container} from 'inversify';
import ApiClient from '../api/api-client';
import {AuthService} from '../api/auth/auth-service';
import {ProfileService} from '../api/profile/profile-service';

export const container = new Container();
container.bind(AuthService).toSelf();
container.bind(ApiClient).toSelf();
container.bind(ProfileService).toSelf();
