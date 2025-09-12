import axios from 'axios';
// http://localhost:3081
// https://nsfapi.bingeboxx.com


const   apiurl = "http://localhost:3081"

const axiosInstance = axios.create({
  baseURL: apiurl,

});

const getRequest = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response?.data || error.message);
    throw error;
  }
};


const postRequest = async (url, data) => {
  try {
    let config = {};

    
    if (data instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
      config.headers = { "Content-Type": "application/json" };
    } else {
      config.headers = { "Content-Type": "application/json" };
      data = JSON.stringify(data);
    }


    const response = await axiosInstance.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error.response?.data || error.message);

    if (error.response?.data?.token === 0) {
      localStorage.removeItem('authToken');
      alert(error.response?.data.error);
      postRequest('api/logout');
      window.location.href = '/';
    }
    throw error;
  }
};



export { getRequest, postRequest , apiurl};










