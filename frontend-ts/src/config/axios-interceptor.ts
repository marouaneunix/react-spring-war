import axios from 'axios';


const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const setupAxiosInterceptors = () => {
  const onRequestSuccess = (config: any) => {
    return config;
  };
  const onResponseSuccess = (response: any) => response;
  const onResponseError = (err: any) => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403 || status === 401) {
      // onUnauthenticated();
      // TODO implement redirect && logout
    }
    return Promise.reject(err);
  };
  console.log('ok');
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
