import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import chatReducer from './chatSlice';
import uiReducer from './uiSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['profile', 'ui']
};

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  chat: chatReducer,
  ui: uiReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
