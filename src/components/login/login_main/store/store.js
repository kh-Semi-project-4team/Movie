import { configureStore } from '@reduxjs/toolkit';
import MemberSlice from './MemberSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'login_app',
  storage,
}

const persistedReducer = persistReducer(persistConfig, MemberSlice);

export const store = configureStore({
  reducer: {
    member: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
