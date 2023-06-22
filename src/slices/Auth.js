import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLogDetails } from './RegistrationData';

const initialState = {
  token: '',
  fullName: '',
  email: '',
  phone: '',
  isLoaded: false,
  isLoggedIn: false,
  header: {},
};

const BACKEND_URL = 'http://localhost:3003';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.isLoaded = true;
      state.header = {
        headers: { Authorization: `Bearer ${action.payload.token}` },
      };
    },
    removeUser: (state) => {
      state.token = '';
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.phone = '';
      state.isLoggedIn = false;
      state.header = {};
    },
    setLoaded: (state, action) => {
      state.isLoaded = action.payload.isLoaded;
    },
    setHeader: (state, action) => {
      state.header = {
        headers: { Authorization: `Bearer ${action.payload.token}` },
      };
    },
  },
});

export const checkUser = () => {
  const token = localStorage.getItem('token');
  if (token) return token;
  else return undefined;
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
  return true;
};

export const setRefreshToken = (token) => {
  localStorage.setItem('refreshToken', token);
  return true;
};

export const removeToken = () => {
  localStorage.clear();
};

export const getAuth = () => {
  return async (dispatch) => {
    try {
      const token = checkUser();
      if (token) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(BACKEND_URL + '/user', config);
        dispatch(
          setUser({
            token,
            fullName: data.data.fullName,
            email: data.data.email,
            phone: data.data.phone,
          })
        );
      } else {
        dispatch(setLoaded({ isLoaded: true }));
      }
    } catch (error) {
      console.log(error, 'eeeee');
      dispatch(setLoaded({ isLoaded: true }));
      return;
    }
  };
};

export const getLogDetails = () => {
  return async (dispatch) => {
    try {
      const token = checkUser();
      if (token) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios
          .get(BACKEND_URL + '/get-log-details', config)
          .then((res) => dispatch(setLogDetails(res?.data?.data)));
      } else {
        dispatch(setLoaded({ isLoaded: true }));
      }
    } catch (error) {
      dispatch(setLoaded({ isLoaded: true }));
      return;
    }
  };
};



export const { setUser, removeUser, setLoaded, setHeader } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
