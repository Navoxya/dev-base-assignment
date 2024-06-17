import Axios from "../Axios";


export const GetAllBooks = async ({
  sortValue = "desc",
  sortField = "id",
  limit = Number.MAX_SAFE_INTEGER,
  page = 1,
  search = ""

}) => {
  return await Axios({
    pathname: `api/v1/book?search=${search}&sort=${sortField}&order=${sortValue}&limit=${limit}&page=${page}`,
    method: "get",
  });
};



