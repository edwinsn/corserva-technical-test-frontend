import useFetch from "../../../hooks/useFetch";

export default function useSaleOrder(id) {
  return useFetch(`sale-orders/${id}`);
}
