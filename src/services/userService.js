import api from './api';

const userService = {
  getProfile: async (token) => {
    const res = await api.get('/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  updateProfile: async (userData, token) => {
    const res = await api.put('/users/profile', userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  changePassword: async (passwordData, token) => {
    const res = await api.put('/users/password', passwordData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
};

export default userService;