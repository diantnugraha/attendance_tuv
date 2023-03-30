import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import client from '../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';

export const attendanceIn = createAsyncThunk(
  'attendance/attendanceIn',
  async ({employee_imei, employee_latitude, employee_longtitude}) => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await client.post(
        'users/attendance-in',
        {
          employee_imei,
          employee_latitude,
          employee_longtitude,
        },
        {
          headers: {access_token: token},
        },
      );
      ToastAndroid.show(response.data.message, ToastAndroid.LONG);

      console.log(response.data, 'ini dari cekin');
      console.log(response, 'ini dari cekin');

      return response.data;
    } catch (error) {
      ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
      console.log(error.response.data, 'ini dari slice');
      throw error.response.data.message;
    }
  },
);

export const attendanceOut = createAsyncThunk(
  'attendance/attendanceOut',
  async ({id_attendance, employee_latitude_out, employee_longtitude_out}) => {
    try {
      console.log(id_attendance, 'ini dari out');
      const token = await AsyncStorage.getItem('access_token');
      const response = await client.patch(
        `users/attendance-out/${id_attendance}`,
        {
          employee_latitude_out,
          employee_longtitude_out,
        },
        {
          headers: {access_token: token},
        },
      );
      ToastAndroid.show(response.data.message, ToastAndroid.LONG);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log(error, 'ini dari checkin');
      throw error.response.data;
    }
  },
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(attendanceIn.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(attendanceIn.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(attendanceIn.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(attendanceOut.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(attendanceOut.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(attendanceOut.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default attendanceSlice.reducer;
