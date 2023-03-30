import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCurrentLocation = createAsyncThunk(
  'user/location',
  async ({employee_latitude, employee_longtitude}) => {
    const respone = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${employee_latitude}&lon=${employee_longtitude}&format=json`,
    );
    console.log(respone.data, 'ini dari roaaaaad');
    return respone.data;
  },
);

const locationSlice = createSlice({
  name: 'locationUser',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCurrentLocation.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchCurrentLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCurrentLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default locationSlice.reducer;
