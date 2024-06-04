import {Provider} from 'inversify-react';
import {Container} from 'inversify';
import React, {FC, PropsWithChildren} from 'react';
import {AuthService} from '../api/auth/auth-service';

export const DiProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <Provider
      container={() => {
        const container = new Container();
        container.bind(AuthService).toSelf();
        return container;
      }}>
      {children}
    </Provider>
  );
};
