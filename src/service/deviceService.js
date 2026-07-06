import api from './api';

// Brands
export const getBrands = (params) =>
  api.get('/devicebrand', { params });

export const getBrandById = (id) =>
  api.get(`/devicebrand/${id}`);

export const createBrand = (data) =>
  api.post('/devicebrand', data);

export const updateBrand = (id, data) =>
  api.put(`/devicebrand/${id}`, data);

export const deactivateBrand = (id) =>
  api.patch(`/devicebrand/${id}/status?isActive=false`);

// Models
export const getModels = (params) =>
  api.get('/devicemodel', { params });

export const getModelById = (id) =>
  api.get(`/devicemodel/${id}`);

export const createModel = (data) =>
  api.post('/devicemodel', data);

export const updateModel = (id, data) =>
  api.put(`/devicemodel/${id}`, data);

export const deactivateModel = (id) =>
  api.patch(`/devicemodel/${id}/status?isActive=false`);