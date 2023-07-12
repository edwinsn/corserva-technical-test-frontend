import axios from "axios";
import config from "../../../api";

export default function updateOrder(id, data) {
  return axios.put(`${config.REACT_APP_API_URL}sale-orders/${id}`, data);
}
