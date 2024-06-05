import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_CLIENT_ID} from '@env';
import {injectable} from 'inversify';
import {supabase} from '../supabase/supabase-client';

GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID,
});

export interface SignUpCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
}

@injectable()
export class AuthService {
  public async signInWithGoogle() {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const {idToken} = userInfo;
    await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken!,
    });
  }

  public async signUpWithCredentials(credentials: SignUpCredentials) {
    await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });
  }

  public async signInWithCredentials(credentials: SignUpCredentials) {
    await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
  }
}
