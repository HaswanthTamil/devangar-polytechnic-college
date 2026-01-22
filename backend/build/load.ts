/**
 * RESPONSIBILITY: Read raw JSON content from the filesystem.
 * SIDE EFFECTS: File system read access.
 */

import fs from 'fs/promises';
import path from 'path';
import { PATHS } from '../config/content.config';

/**
 * Loads all JSON files from the content/raw directory.
 * @returns Array of raw content objects.
 */
export async function loadRawContent(): Promise<any[]> {
  const files = await fs.readdir(PATHS.RAW);
  const jsonFiles = files.filter(file => file.endsWith('.json'));

  const contentPromises = jsonFiles.map(async (file) => {
    const filePath = path.join(PATHS.RAW, file);
    const rawData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(rawData);
  });

  return Promise.all(contentPromises);
}
