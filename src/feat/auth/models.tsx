import {Session} from '@supabase/supabase-js';
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {supabase} from '../../api/supabase/supabase-client';

export const useAuth = () => {
  const contextValue = useContext(AuthContext);
  if (contextValue === null) {
    throw new Error('Wrap your app in AuthProvider');
  }
  return contextValue;
};

export interface AuthContextValue {
  isAuthenticated: boolean;
  session: Session | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export interface AuthProviderProps extends PropsWithChildren {}

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{session, isAuthenticated: !!session}}>
      {children}
    </AuthContext.Provider>
  );
};
