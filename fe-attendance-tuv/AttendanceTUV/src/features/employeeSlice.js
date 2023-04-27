import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import client from '../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchEmployee = createAsyncThunk(
  'user/fetchEmployee',
  async () => {
    const respone = await client.get('/users/all');
    return respone.data;
  },
);

// export const fetchDetailUser = createAsyncThunk(
//   'user/fetchDetailUser',
//   async () => {
//     const id_user = await AsyncStorage.getItem('id');
//     const id = Number(id_user);
//     const token = await AsyncStorage.getItem('access_token');

//     const respone = await client.get(`/users/${id}`, {
//       headers: {access_token: token},
//     });
//     return respone.data;
//   },
// );

// export const detailAttendance = createAsyncThunk(
//   'user/detailAttendance',
//   async () => {
//     const token = await AsyncStorage.getItem('access_token');
//     const respone = await client.get(`/users/attendance`, {
//       headers: {access_token: token},
//     });
//     return respone.data;
//   },
// );

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEmployee.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // builder.addCase(fetchDetailUser.pending, state => {
    //   state.loading = true;
    // });
    // builder.addCase(fetchDetailUser.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.data = action.payload;
    // });
    // builder.addCase(fetchDetailUser.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });

    // builder.addCase(detailAttendance.pending, state => {
    //   state.loading = true;
    // });
    // builder.addCase(detailAttendance.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.data = action.payload;
    // });
    // builder.addCase(detailAttendance.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});

export default employeeSlice.reducer;
