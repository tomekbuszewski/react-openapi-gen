import { createClient } from "@hey-api/openapi-ts";

try {
  await createClient({
    client: "@hey-api/client-fetch",
    input: "./docs/swagger.json",
    output: {
      path: "./src/api",
      format: "prettier",
    },
  })
} catch (e) {
  console.error("Error generating the API", e);
}
