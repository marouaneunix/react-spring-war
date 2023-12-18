import axios from "axios";

export const getInvoice = (id, month, year) => {
  const requestUrl = `http://localhost:8080/api/invoice`;
  console.log(year);
  return axios.get(requestUrl, {
    params: {
      client: id,
      month,
      year,
    },
  });
};

export const saveClientInvoice = (data) => {
  const requestUrl = `http://localhost:8080/api/invoice`;
  return axios.post(requestUrl, data);
};
