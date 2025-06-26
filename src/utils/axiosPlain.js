import axios from 'axios';

const axiosPlain = axios.create({
  baseURL: "https://innotrack.onrender.com/api",
});

export default axiosPlain;
