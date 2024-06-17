import Axios from "../Axios";

export const AddBook = async (obj) =>
  await Axios({
    pathname: "api/v1/book",
    obj: obj,
  });

