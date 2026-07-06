import api from './api';

export const getRepairs = (params) =>
  api.get('/repair', { params });

export const getRepairById = (id) =>
  api.get(`/repair/${id}`);

export const createRepair = (data) =>
  api.post('/repair', data);

export const updateIssueDescription = (id, data) =>
  api.put(`/repair/${id}/issue-description`, data);

export const assignTechnician = (id, data) =>
  api.patch(`/repair/${id}/technician`, data);

export const updateRepairStatus = (id, data) =>
  api.patch(`/repair/${id}/status`, data);

export const updateRepairCosts = (id, data) =>
  api.patch(`/repair/${id}/costs`, data);

export const cancelRepair = (id) =>
  api.patch(`/repair/${id}/status`, { status: 'Cancelled' });