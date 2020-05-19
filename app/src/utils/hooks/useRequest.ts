import useSWR, { ConfigInterface, responseInterface } from "swr";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

import apiClient from "@/services/apiClient";

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
    responseInterface<AxiosResponse<Data>, AxiosError<Error>>,
    "isValidating" | "revalidate" | "error"
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export default function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  { ...config }: ConfigInterface = {},
): Return<Data, Error> {
  const { data: response, error, isValidating, revalidate } = useSWR<
    AxiosResponse<Data>,
    AxiosError<Error>
  >(
    request && JSON.stringify(request),
    // Typescript thinks `request` can be `null` here, but the fetcher
    // * function is actually only called by `useSWR` when it isn't.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => apiClient(request!),
    {
      ...config,
    },
  );

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    revalidate,
  };
}
