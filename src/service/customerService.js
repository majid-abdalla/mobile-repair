// import api from './api';

// export const getCustomers = (params) =>
//   api.get('/customer', { params });

// export const getCustomerById = (id) =>
//   api.get(`/customer/${id}`);

// export const createCustomer = (data) =>
//   api.post('/customer', data);

// export const updateCustomer = (id, data) =>
//   api.put(`/customer/${id}`, data);

// export const deactivateCustomer = (id) =>
//   api.patch(`/customer/${id}/status?isActive=false`);

// export const activateCustomer = (id) =>
//   api.patch(`/customer/${id}/status?isActive=true`);

import api from './api';

export const getCustomers = (params) =>
  api.get('/customer', { params });

export const getCustomerById = (id) =>
  api.get(`/customer/${id}`);

export const createCustomer = (data) =>
  api.post('/customer', data);

export const updateCustomer = (id, data) =>
  api.put(`/customer/${id}`, data);

export const deleteCustomer = (id) =>
  api.delete(`/customer/${id}`);

export const activateCustomer = (id) =>
  api.patch(`/customer/${id}/status?isActive=true`);