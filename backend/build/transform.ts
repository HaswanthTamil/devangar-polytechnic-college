/**
 * RESPONSIBILITY: Normalize and enrich validated content.
 * DETERMINISTIC: Yes (input -> transformed output).
 * SIDE EFFECTS: None.
 */

/**
 * Transforms raw content into a processed format.
 * @param content Validated raw content.
 * @returns Processed content.
 */
export function transformContent(content: { filename: string; data: any }[]): { filename: string; data: any }[] {
  // Use map to create a new array (no in-place mutation)
  return content.map(item => {
    const { filename, data } = item;
    
    const timestamp = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000).toISOString().replace('Z', '+05:30');

    // If data is an array (like pages.json), transform each element into a NEW object
    const transformedData = Array.isArray(data) 
      ? data.map(subItem => ({
          ...subItem, // Spread to create new object
          _processedAt: timestamp,
        }))
      : {
          ...data, // Spread to create new object
          _processedAt: timestamp,
        };

    return {
      filename, // Re-use filename string (immutable)
      data: transformedData,
    };
  });
}
