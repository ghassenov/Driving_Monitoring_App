import api from './api';

const carService = {
  getCars: async (token) => {
    const res = await api.get('/cars', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  createCar: async (carData, token) => {
    const res = await api.post('/cars', carData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  getCarById: async (carId, token) => {
    const res = await api.get(`/cars/${carId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  updateCar: async (carId, carData, token) => {
    const res = await api.put(`/cars/${carId}`, carData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  deleteCar: async (carId, token) => {
    const res = await api.delete(`/cars/${carId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
};

export default carService;
