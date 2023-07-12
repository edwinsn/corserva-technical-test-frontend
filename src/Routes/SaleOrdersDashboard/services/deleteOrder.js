import axios from "axios";
import config from "../../../api";

export default function newOrder(id) {
  return axios.delete(`${config.REACT_APP_API_URL}sale-orders/${id}`);
}
