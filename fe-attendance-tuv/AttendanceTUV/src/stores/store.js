import {configureStore} from '@reduxjs/toolkit';
import employeeReducer from '../features/employeeSlice';
import attendanceReducer from '../features/attendanceSlice';
import detailEmployeeSlice from '../features/detailEmployeeSlice';
import detailAttendanceSlice from '../features/detailAttendanceSlice';
import locationSlice from '../features/locationSlice';

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    detailUser: detailEmployeeSlice,
    attendance: attendanceReducer,
    detailAttendance: detailAttendanceSlice,
    locationUser: locationSlice,
  },
});
