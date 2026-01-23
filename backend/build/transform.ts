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
  return content.map(item => {
    const { filename, data } = item;
    
    // If data is an array (like pages.json), transform each element
    const transformedData = Array.isArray(data) 
      ? data.map(subItem => ({
          ...subItem,
          _processedAt: new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000).toISOString().replace('Z', '+05:30'),
        }))
      : {
          ...data,
          _processedAt: new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000).toISOString().replace('Z', '+05:30'),
        };

    return {
      filename,
      data: transformedData,
    };
  });
}
