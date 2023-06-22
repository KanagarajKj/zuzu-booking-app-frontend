import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@component/slices/Auth';
import registrationReducer from '@component/slices/RegistrationData';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer
  },
});
