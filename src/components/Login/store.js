import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../Dashboard/employeeSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer, 
  },
});

export default store;