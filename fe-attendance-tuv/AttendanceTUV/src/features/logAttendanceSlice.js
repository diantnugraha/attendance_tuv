import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import client from '../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const fetchLogAttendance = createAsyncThunk(
  'user/fetchLogAttendance',
  async () => {
    const token = await AsyncStorage.getItem('access_token');
    const respone = await client.get('/users/logs', {
        headers: {access_token: token},
    });
    return respone.data;
  },
);

const logAttendanceSlice = createSlice({
  name: 'fetchLogAttendance',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLogAttendance.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchLogAttendance.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchLogAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default logAttendanceSlice.reducer;
