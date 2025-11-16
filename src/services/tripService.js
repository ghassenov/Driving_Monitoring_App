import api from "./api";

export const sendTripData = (tripData, token = null) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return api.post("/predict", tripData, { headers });
};
