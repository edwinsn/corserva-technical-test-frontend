import { useQuery } from "react-query";
import axios from "axios";
import config from "../api";

export default function useFetch(url, params = {}, reactQueryParams = {}) {
  const { isLoading, data, refetch } = useQuery({
    queryKey: url,
    queryFn: () => {
      const endpoint = `${config.REACT_APP_API_URL}${url}`;

      return axios.get(endpoint, {
        params,
      });
    },
    ...reactQueryParams,
  });

  let dataExtracted;

  //Get the data requested
  dataExtracted = data?.data || data;

  //Check if there is data
  let isThereData = Array.isArray(dataExtracted)
    ? dataExtracted.length !== 0
    : typeof data === "object" && Object.values(data || {}).length !== 0;

  const noData = !isThereData && !isLoading;

  return [dataExtracted, isLoading, noData, refetch];
}
