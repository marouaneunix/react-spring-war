import axios from "axios";

export const getProductLists = () => {
  const requestUrl = `http://localhost:8080/api/product`;
  return axios.get(requestUrl, {
    params: {},
  });
};

export const saveProduct = (product) => {
  const requestUrl = `http://localhost:8080/api/product`;

  return axios.post(requestUrl, product);
};

export const archiveProduct = (id) => {
  return axios.post(`http://localhost:8080/api/product/archive/${id}`);
};

export const activateProduct = (id) => {
  return axios.post(`http://localhost:8080/api/product/activate/${id}`);
};
