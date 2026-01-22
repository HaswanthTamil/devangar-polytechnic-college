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
export async function generateOutput(content: any[]): Promise<void> {
  // Ensure the processed directory exists
  await fs.mkdir(PATHS.PROCESSED, { recursive: true });

  const writePromises = content.map(async (item, index) => {
    // TODO: Use a more sophisticated naming convention (e.g., item.slug or item.id)
    const fileName = `item-${index}.json`;
    const filePath = path.join(PATHS.PROCESSED, fileName);
    
    await fs.writeFile(filePath, JSON.stringify(item, null, 2), 'utf-8');
  });

  await Promise.all(writePromises);
}
