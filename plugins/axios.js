import axios from 'axios';

export default ({ app }, inject) => {
  const axiosInstance = axios.create({
    baseURL: 'https://api.openai.com/v1', // Replace with the actual ChatGPT API endpoint
  });

  inject('axios', axiosInstance);
};