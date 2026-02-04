
import fs from 'fs/promises';
import path from 'path';

const CONTENT_ROOT = path.join(process.cwd(), 'src/app/content');
const PATHS = {
    RAW: path.join(CONTENT_ROOT, 'raw'),
    SCHEMA: path.join(CONTENT_ROOT, 'schema'),
};

export async function listContentFiles() {
    const files = await fs.readdir(PATHS.RAW);
    return files.filter(f => f.endsWith('.json'));
}

export async function getRawContent(filename: string) {
    const filePath = path.join(PATHS.RAW, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

export async function getSchema(filename: string) {
    const schemaName = filename.replace('.json', '.schema.json');
    const schemaPath = path.join(PATHS.SCHEMA, schemaName);
    try {
        const data = await fs.readFile(schemaPath, 'utf-8');
        return JSON.parse(data);
    } catch {
        console.warn(`No schema found for ${filename}`);
        return null;
    }
}

export async function saveRawContent(filename: string, data: unknown) {
    const filePath = path.join(PATHS.RAW, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
