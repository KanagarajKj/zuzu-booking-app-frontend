import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restaurantData: [
    {
      URL: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      _id: { $oid: '55f14312c7447c3da7051b26' },
      address: '228 City Road',
      'address line 2': 'Cardiff',
      name: 'CN Chinese',
      outcode: 'CF24',
      postcode: '3JH',
      rating: 5,
      type_of_food: 'Chinese',
    },
    {
      URL: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      _id: { $oid: '55f14312c7447c3da7051b27' },
      address: '376 Rayleigh Road',
      'address line 2': 'Essex',
      name: '@ Thai',
      outcode: 'SS9',
      postcode: '5PT',
      rating: 5.5,
      type_of_food: 'Thai',
    },
    {
      URL: 'https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      _id: { $oid: '55f14312c7447c3da7051b28' },
      address: '30 Greyhound Road Hammersmith',
      'address line 2': 'London',
      name: '@ Thai Restaurant',
      outcode: 'W6',
      postcode: '8NX',
      rating: 4.5,
      type_of_food: 'Thai',
    },
    {
      URL: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      _id: { $oid: '55f14312c7447c3da7051b29' },
      address: '30 Greyhound Road Hammersmith',
      'address line 2': 'London',
      name: '@ Thai Restaurant',
      outcode: 'W6',
      postcode: '8NX',
      rating: 4.5,
      type_of_food: 'Thai',
    },
    {
      URL: 'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      _id: { $oid: '55f14312c7447c3da7051b2a' },
      address: '9 Broughton Hall Road',
      'address line 2': 'Broughton',
      name: '@Indian.com',
      outcode: 'CH4',
      postcode: '0QR',
      rating: 6,
      type_of_food: 'Curry',
    },
  ],
  logDetails:[]
};

const registrationDataSlice = createSlice({
  name: 'registrationData',
  initialState,
  reducers: {
    setLogDetails:(state, action)=> {
      state.logDetails = action.payload
    },
  },
});

export const { setLogDetails } = registrationDataSlice.actions;

const registrationReducer = registrationDataSlice.reducer;

export default registrationReducer;
