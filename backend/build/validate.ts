/**
 * RESPONSIBILITY: Validate raw content against schemas.
 * DETERMINISTIC: Yes (input -> validation result).
 * SIDE EFFECTS: None.
 */

import fs from 'fs/promises';
import path from 'path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { PATHS } from '../config/content.config';

const ajv = new Ajv({
  allErrors: true,
  strict: true,
  removeAdditional: false,
});
addFormats(ajv);

/**
 * Validates the loaded content against predefined schemas.
 * Throws an error if validation fails.
 * @param content The array of content objects to validate.
 */
export async function validateContent(content: { filename: string; data: any }[]): Promise<void> {
  for (const item of content) {
    const { filename, data } = item;

    // 1. Raw-content safety guard: reject if _processedAt already exists
    if (data && typeof data === 'object') {
      const checkData = Array.isArray(data) ? data : [data];
      for (const entry of checkData) {
        if (entry && typeof entry === 'object' && '_processedAt' in entry) {
          throw new Error(`Security violation: Raw content ${filename} must not contain '_processedAt' field.`);
        }
      }
    }

    // 2. Resolve schema file path
    const schemaName = filename.replace('.json', '.schema.json');
    const schemaPath = path.join(PATHS.SCHEMA, schemaName);

    try {
      await fs.access(schemaPath);
      const schemaRaw = await fs.readFile(schemaPath, 'utf-8');
      const schema = JSON.parse(schemaRaw);

      // 3. Strict schema validation
      const validate = ajv.compile(schema);
      const valid = validate(data);

      if (!valid) {
        const errorDetails = validate.errors
          ?.map((err) => `${err.instancePath || 'root'}: ${err.message}`)
          .join('\n');
        throw new Error(`Validation failed for ${filename} against ${schemaName}:\n${errorDetails}`);
      }

      console.log(`Successfully validated ${filename} against ${schemaName}`);
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        console.warn(`No schema found for ${filename}, skipping validation.`);
      } else {
        // Re-throw validation or parse errors
        throw err;
      }
    }
  }

  console.log('Strict validation check passed.');
}
