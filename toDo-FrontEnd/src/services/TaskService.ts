import axios from 'axios';

const API_URL = 'http://localhost:5265/api/task';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getTasks = () => axios.get(API_URL + "/tasks", getAuthHeader());

export const createTask = (task: any) =>
  axios.post(API_URL + "/add-task", task, getAuthHeader());

export const updateTask = (id: number, task: any) =>
  axios.put(`${API_URL + "/edit-task"}/${id}`, task, getAuthHeader());

export const deleteTask = (id: number) =>
  axios.delete(`${API_URL + "/delete-task"}/${id}`, getAuthHeader());
