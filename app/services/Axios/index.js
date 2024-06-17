import axios from "axios";
import { SERVER_URL_DEV } from "../index";

const Axios = async ({ method = "post", pathname, obj, token = "" }) => {

  console.log("pathname", pathname);
  const result = await axios({
    method: method,
    url: `${SERVER_URL_DEV}/${pathname}`,

    data: obj,
    headers: {
      Accept: `application/json`,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      
    },
  });

  const resultData = result;
  return resultData;
};

export default Axios;
