import axios from "axios";
import api from "../../services/api";

const API = `http://localhost:5000/api/admin`;

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const suspendUser = (userId, reason) =>
  axios.put(
    `${API}/users/${userId}/suspend`,
    { reason },
    { headers: authHeaders() }
  );

export const unsuspendUser = (userId) =>
  axios.put(`${API}/users/${userId}/unsuspend`, {}, { headers: authHeaders() });

export const getUsers = () =>
  axios.get(`${API}/users`, { headers: authHeaders() });

export const getUserById = (userId) =>
  axios.get(`${API}/users/${userId}`, { headers: authHeaders() });
