import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import client from '../config/axios';
import {ToastAndroid} from 'react-native';

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password, user_imei}) => {
    try {
      const response = await client.post('users/login', {
        email,
        password,
        user_imei,
      });
      console.log(user_imei, 'ini dari respone');
      return response.data;
    } catch (error) {
      ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
      console.log(error.response.data.message, 'ini dari catch');
      throw error.response.data;
    }
  },
);

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
