import { defineConfig } from "orval";

import transformer from "./transformer";

export default defineConfig({
  api: {
    input: {
      target: "http://127.0.0.1:14001/openapi.json",
      override: {
        transformer
      }
    },
    output: {
      mode: "tags-split",
      target: "../src/services",
      schemas: "../src/services/model",
      client: "react-query",
      httpClient: "axios",
      override: {
        mutator: {
          path: "../src/helpers/axios.ts",
          name: "customInstance"
        }
      }
    }
  }
});
