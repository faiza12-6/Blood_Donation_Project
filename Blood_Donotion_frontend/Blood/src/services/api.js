import axios from "axios";

const BASE_URL = "/api";

// PATIENT API

export const getPatients = () => axios.get(`${BASE_URL}/patient`);

export const addPatient = (data) =>
  axios.post(`${BASE_URL}/patient`, data);

export const updatePatient = (data) =>
  axios.put(`${BASE_URL}/patient`, data);

export const deletePatient = (id) =>
  axios.delete(`${BASE_URL}/patient/${id}`);

// DONOR API

export const getDonors = () => axios.get(`${BASE_URL}/donor`);

export const addDonor = (data) =>
  axios.post(`${BASE_URL}/donor`, data);

export const updateDonor = (data) =>
  axios.put(`${BASE_URL}/donor`, data);

export const deleteDonor = (id) =>
  axios.delete(`${BASE_URL}/donor/${id}`);

// DONATION API

export const getDonations = () =>
  axios.get(`${BASE_URL}/donation`);

export const addDonation = (data) =>
  axios.post(`${BASE_URL}/donation`, data);

export const updateDonation = (data) =>
  axios.put(`${BASE_URL}/donation`, data);

export const deleteDonation = (id) =>
  axios.delete(`${BASE_URL}/donation/${id}`);
