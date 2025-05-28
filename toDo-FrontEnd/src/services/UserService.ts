import axios from 'axios';

const API_URL = 'http://localhost:5265/api/user'; // Adjust if your backend runs on a different port

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchUserProfile = () =>
  axios.get(`${API_URL}/me`, getAuthHeader());
