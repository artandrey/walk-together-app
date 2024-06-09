import {Provider} from 'inversify-react';
import React, {FC, PropsWithChildren} from 'react';
import {container} from './container';

export const DiProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <Provider key={container.id} container={container}>
      {children}
    </Provider>
  );
};
