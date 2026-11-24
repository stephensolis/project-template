import { openapiChangeCase } from "openapi-format";
import { defineTransformer, type OpenApiDocument } from "orval";

export default defineTransformer(async (inputSchema) => {
  const { data } = await openapiChangeCase(inputSchema, {
    casingSet: {
      properties: "camelCase",
      parametersQuery: "camelCase",
      parametersPath: "camelCase"
    }
  });

  return data as OpenApiDocument;
});
