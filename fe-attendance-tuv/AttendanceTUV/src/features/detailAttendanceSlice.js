import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import client from '../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const detailAttendance = createAsyncThunk(
  'user/detailAttendance',
  async () => {
    const token = await AsyncStorage.getItem('access_token');
    const respone = await client.get(`/users/attendance`, {
      headers: {access_token: token},
    });
    console.log(respone.data);
    return respone.data;
  },
);

const detailAttendanceSlice = createSlice({
  name: 'detailAttendance',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(detailAttendance.pending, state => {
      state.loading = true;
    });
    builder.addCase(detailAttendance.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(detailAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default detailAttendanceSlice.reducer;
