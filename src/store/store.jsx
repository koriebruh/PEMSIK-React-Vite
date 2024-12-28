import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentSlice.jsx';
import authReducer from './authSlice.jsx';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        students: studentReducer
    }
});