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
