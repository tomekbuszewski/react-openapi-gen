import { client } from "../api";
import * as services from "../api/services.gen.ts";
import type { Config } from "@hey-api/client-fetch";
export * from "../api/types.gen.ts";

export const useApi = (override: Config = {}) => {
  const config: Config = {
    baseUrl: "https://fakerestapi.azurewebsites.net",
  };

  client.setConfig({
    ...config,
    ...override,
  });

  return services;
}
