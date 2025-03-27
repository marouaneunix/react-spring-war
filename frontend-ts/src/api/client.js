import axios from "axios";

export const getClientsList = (data) => {
  const requestUrl = `http://localhost:8080/api/client`;
  let filter = [];
  if (data.keyWord && data.keyWord.length > 0) {
    filter.push({
      property: "name",
      value: data.keyWord,
      operator: "like",
    });
  }

  let params = {
    filter,
  };

  params.limit = data.pageSize || 10;
  params.start = !data.paginationPage
    ? 0
    : (data.paginationPage - 1) * data.pageSize;

  return axios.get(requestUrl, {
    params: {},
  });
};

export const getClient = (id) => {
  const requestUrl = `http://localhost:8080/api/client/${id}`;
  return axios.get(requestUrl);
};

export const getClientConfiguration = (id) => {
  const requestUrl = `http://localhost:8080/api/client/${id}/surplus`;
  return axios.get(requestUrl);
};

export const saveClientSurplus = (id, details) => {
  const requestUrl = `http://localhost:8080/api/client/${id}/surplus`;

  return axios.post(requestUrl, {
    details: JSON.stringify(details),
    client: id,
  });
};

export const saveClient = (client) => {
  const requestUrl = `http://localhost:8080/api/client`;

  return axios.post(requestUrl, client);
};

export const archiveClient = (id) => {
  const requestUrl = `http://localhost:8080/api/client/archive/${id}`;

  return axios.post(requestUrl);
};

export const activateClient = (id) => {
  const requestUrl = `http://localhost:8080/api/client/activate/${id}`;

  return axios.post(requestUrl);
};
