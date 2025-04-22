import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/items';

export const getItems = () => axios.get(API_BASE);
export const addItem = (item) => axios.post(API_BASE, item);
export const updateItem = (id, updatedData) => axios.put(`${API_BASE}/${id}`, updatedData);
export const deleteItem = (id) => axios.delete(`${API_BASE}/${id}`);
