import axios from "axios";
import config from "../../../api";

export default function newOrder(data) {
  return axios.post(`${config.REACT_APP_API_URL}sale-orders`, data);
}
