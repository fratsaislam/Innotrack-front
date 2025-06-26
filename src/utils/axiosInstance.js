import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, //pass cookies for like auth
});

export default axiosInstance;
