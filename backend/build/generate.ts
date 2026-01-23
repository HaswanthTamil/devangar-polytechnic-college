/**
 * RESPONSIBILITY: Write processed content back to the filesystem.
 * SIDE EFFECTS: File system write access.
 */

import fs from 'fs/promises';
import path from 'path';
import { PATHS } from '../config/content.config';

/**
 * Writes processed content to the content/processed directory.
 * Overwrites existing files.
 * @param content The processed content to write.
 */
export async function generateOutput(content: { filename: string; data: any }[]): Promise<void> {
  // Ensure the processed directory exists
  await fs.mkdir(PATHS.PROCESSED, { recursive: true });

  const writePromises = content.map(async (item) => {
    const { filename, data } = item;
    const filePath = path.join(PATHS.PROCESSED, filename);
    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  });

  await Promise.all(writePromises);
}
