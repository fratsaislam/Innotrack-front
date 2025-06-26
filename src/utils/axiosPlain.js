import axios from 'axios';

const axiosPlain = axios.create({
  baseURL: "http://localhost:8000/api",
});

export default axiosPlain;
