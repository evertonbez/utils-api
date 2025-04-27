import { writeFileSync } from "node:fs";
import { join } from "node:path";
import orval, { type OptionsExport } from "orval";

import { openAPIDocument } from "../../src/index";

export function generateOpenAPI(outputPath: string) {
  writeFileSync(outputPath, JSON.stringify(openAPIDocument, null, 2));

  console.log(`OpenAPI spec generated at: ${outputPath}`);
}

export async function buildSDK() {
  const filePath = join(__dirname, "openapi-spec.json");

  generateOpenAPI(filePath);

  const react_sdk: OptionsExport = {
    input: {
      target: "https://utils.everton.place/openapi",
    },
    output: {
      target: "react-sdk-js",
      client: "axios",
      mode: "single",
      mock: true,
      biome: false,
    },
  };

  await orval(react_sdk);
}

const args = process.argv.slice(2);

if (args.includes("--build")) {
  buildSDK()
    .then()
    .catch((e) => {
      console.error(`Build SDK failed: ${e}`);
    });
}
