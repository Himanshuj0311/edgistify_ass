import axios from "axios";

export const getData = async (endpoint) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}${endpoint}`
    );
    return response?.data?.data || null;
  } catch (error) {
    return window.alert(error?.message);
  }
};

export const postDataForLogin = async (endpoint, data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
      data
    );
    const userData =
      { token: response?.data?.token, user: response?.data?.data } || null;
    return userData;
  } catch (error) {
    return window.alert(error?.message);
  }
};

export const postData = async (endpoint, data, token) => {
  try {
    if (!token) return window.alert("not authorized!");
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
      data,
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userData = response?.data || null;
    return userData;
  } catch (error) {
    return window.alert(error?.message);
  }
};
