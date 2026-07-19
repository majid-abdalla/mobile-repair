// import api from './api';

// export const login = (data) =>
//   api.post('/auth/login', data);

// export const forgotPassword = (data) =>
//   api.post('/auth/forgot-password', data);

// export const changePassword = (data) =>
//   api.post('/auth/change-password', data);


//this backend of java(spring boot)

import api from './api';

export const login = (data) =>
  api.post('/auth/login', data);

export const register = (data) =>
  api.post('/auth/register', data);

export const forgotPassword = (data) =>
  api.post('/auth/forgot-password', data);

export const changePassword = (data) =>
  api.post('/auth/change-password', data);