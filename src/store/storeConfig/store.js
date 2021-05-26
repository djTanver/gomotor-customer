import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './reducers';

const persistConfig = {
    key:"root",
    version: 1,
    storage:AsyncStorage, 
    whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {

    const store = configureStore({
        reducer:persistedReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
          })
      });
      
    let persistor = persistStore(store);

    return { store, persistor }
  }