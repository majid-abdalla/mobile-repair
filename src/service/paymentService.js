import api from './api';

export const getPayments = (params) =>
  api.get('/payment', { params });

export const getPaymentById = (id) =>
  api.get(`/payment/${id}`);

export const getPaymentsByRepair = (repairId) =>
  api.get(`/payment/repair/${repairId}`);

export const getRepairBalance = (repairId) =>
  api.get(`/payment/repair/${repairId}/balance`);

export const createPayment = (data) =>
  api.post('/payment', data);