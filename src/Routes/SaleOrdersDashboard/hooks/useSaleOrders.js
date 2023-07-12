import useFetch from "../../../hooks/useFetch";

export default function useSaleOrders() {
  return useFetch("sale-orders");
}
