import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
export const fetchUserLoaction = createAsyncThunk(
  'user/getloaction',
  async () => {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in.
    // Payload of the FULFILLED state
    return { position, address };
  }
);

const initialState = {
  userName: '',
  isloading: false,
  position: '',
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser(state, action) {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLoaction.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(fetchUserLoaction.fulfilled, (state, action) => {
        state.isloading = false;
        state.address = action.payload.address;
        state.position = action.payload.position;
      })
      .addCase(fetchUserLoaction.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
      });
  },
});

export const { createUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
