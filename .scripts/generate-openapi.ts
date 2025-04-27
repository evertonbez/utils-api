import fs from "node:fs";
import path from "node:path";
import { openAPIDocument } from "../src/index";

// Ensure directory exists
const outputDir = path.resolve(process.cwd(), ".spec");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write OpenAPI spec to file
const outputPath = path.join(outputDir, "openapi-spec.json");
fs.writeFileSync(outputPath, JSON.stringify(openAPIDocument, null, 2));

console.log(`OpenAPI spec generated at: ${outputPath}`);
