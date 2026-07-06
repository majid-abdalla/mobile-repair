import api from './api';

export const getUsers = (params) =>
  api.get('/user', { params });

export const getUserById = (id) =>
  api.get(`/user/${id}`);

export const createUser = (data) =>
  api.post('/user', data);

export const deactivateUser = (id) =>
  api.patch(`/user/${id}/status?isActive=false`);

export const activateUser = (id) =>
  api.patch(`/user/${id}/status?isActive=true`);