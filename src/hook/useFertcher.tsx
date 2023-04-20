import { apiClient } from "@/common/apiClient";

import useSWR from "swr";

const fetcher = (url: string) => apiClient.get(url).then((promise) => promise.data);

const useFetcher = (url: string) => {
  const { data, error, mutate, isLoading, isValidating } = useSWR(url, fetcher);
  return {
    data: data,
    isLoading: !error && !data,
    error: error,
  };
};

export { useFetcher };
