import useSWR from "swr";
import apiClient from "@/services/apiClient";

export default function useRequest(request: any, { ...config } = {}) {
  return useSWR(
    request && JSON.stringify(request),
    () => apiClient(request).then((response) => response.data),
    {
      ...config,
    },
  );
}
