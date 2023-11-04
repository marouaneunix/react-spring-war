import axios from "axios";

export const getVouchersList = (id, month) => {
  const requestUrl = `http://localhost:8080/api/voucher`;
  return axios.get(requestUrl, {
    params: {
      client: id,
      month,
    },
  });
};

export const saveClientVoucher = (data) => {
  const requestUrl = `http://localhost:8080/api/voucher`;
  return axios.post(requestUrl, data);
};
