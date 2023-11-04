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

export const deleteProduct = (id) => {
  const requestUrl = `http://localhost:8080/api/product/remove`;

  let formData = new FormData();
  formData.append("id", id);

  return axios.post(requestUrl, formData);
};
