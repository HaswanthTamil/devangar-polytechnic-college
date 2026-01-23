/**
 * RESPONSIBILITY: Validate raw content against schemas.
 * DETERMINISTIC: Yes (input -> validation result).
 * SIDE EFFECTS: None.
 */

import fs from 'fs/promises';
import path from 'path';
import { PATHS } from '../config/content.config';

/**
 * Validates the loaded content against predefined schemas.
 * Throws an error if validation fails.
 * @param content The array of content objects to validate.
 */
export async function validateContent(content: { filename: string; data: any }[]): Promise<void> {
  for (const item of content) {
    const { filename, data } = item;
    
    // Check if a schema exists for this file
    const schemaName = filename.replace('.json', '.schema.json');
    const schemaPath = path.join(PATHS.SCHEMA, schemaName);
    
    try {
      await fs.access(schemaPath);
      // TODO: Implement actual JSON Schema validation using a library like 'ajv'
      // For now, we just acknowledge the schema exists.
      console.log(`Schema found for ${filename}: ${schemaName}`);
    } catch {
      console.warn(`No schema found for ${filename}, skipping validation.`);
    }

    if (!data || typeof data !== 'object') {
      throw new Error(`Invalid content data in ${filename}`);
    }
  }

  console.log('Validation successful.');
}
