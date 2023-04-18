import React from 'react';
import { Provider } from 'react-redux';

import GStyles from './config/GlobalStyles';
import AppRoutes from './routes/AppRoutes';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <GStyles />
          <AppRoutes />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
