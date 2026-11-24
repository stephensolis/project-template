import Axios, { type AxiosRequestConfig } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { camelCase, snakeCase } from "case-anything";

export const AXIOS_INSTANCE = applyCaseMiddleware(
  Axios.create({
    baseURL: "/api"
  }),
  {
    caseFunctions: {
      camel: (input: string) => camelCase(input),
      snake: (input: string) => snakeCase(input)
    },
    ignoreHeaders: true
  }
);

export const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> =>
  AXIOS_INSTANCE({ ...config, ...options }).then(({ data }) => data as T);

export default customInstance;
