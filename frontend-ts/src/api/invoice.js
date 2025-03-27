import axios from "axios";

export const getInvoice = (id, month, year) => {
  const requestUrl = `http://localhost:8080/api/invoice`;
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

export const saveInvoiceSetting = (data) => {
  const requestUrl = `http://localhost:8080/api/invoice/settings`;
  return axios.post(requestUrl, data);
};

export const saveInvoiceDetails = (data) => {
  const requestUrl = `http://localhost:8080/api/invoice/details`;
  return axios.post(requestUrl, data);
};
