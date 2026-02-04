
import fs from 'fs/promises';
import path from 'path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({
    allErrors: true,
    strict: true,
    removeAdditional: false,
});
addFormats(ajv);

const CONTENT_ROOT = path.join(process.cwd(), 'src/app/content');
const PATHS = {
    RAW: path.join(CONTENT_ROOT, 'raw'),
    SCHEMA: path.join(CONTENT_ROOT, 'schema'),
    PROCESSED: path.join(CONTENT_ROOT, 'processed'),
};

interface ContentItem {
    filename: string;
    data: unknown;
}

export async function loadRawContent(): Promise<ContentItem[]> {
    const files = await fs.readdir(PATHS.RAW);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    const contentPromises = jsonFiles.map(async (file) => {
        const filePath = path.join(PATHS.RAW, file);
        const rawData = await fs.readFile(filePath, 'utf-8');
        return {
            filename: file,
            data: JSON.parse(rawData),
        };
    });

    return Promise.all(contentPromises);
}

export async function validateContent(content: ContentItem[]): Promise<void> {
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
        } catch (err: unknown) {
            const isEnoent = err instanceof Error && 'code' in err && (err as { code: string }).code === 'ENOENT';
            if (isEnoent) {
                console.warn(`No schema found for ${filename}, skipping validation.`);
            } else {
                throw err;
            }
        }
    }
}

export function transformContent(content: ContentItem[]): ContentItem[] {
    const timestamp = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000).toISOString().replace('Z', '+05:30');

    return content.map(item => {
        const { filename, data } = item;

        let transformedData;
        if (Array.isArray(data)) {
            transformedData = data.map(subItem => ({
                ...(typeof subItem === 'object' && subItem !== null ? subItem : {}),
                _processedAt: timestamp,
            }));
        } else if (typeof data === 'object' && data !== null) {
            transformedData = {
                ...data,
                _processedAt: timestamp,
            };
        } else {
            transformedData = data; // Should not happen if validation passes, but fallback
        }

        return {
            filename,
            data: transformedData,
        };
    });
}

export async function generateOutput(content: ContentItem[]): Promise<void> {
    await fs.mkdir(PATHS.PROCESSED, { recursive: true });

    const writePromises = content.map(async (item) => {
        const { filename, data } = item;
        const filePath = path.join(PATHS.PROCESSED, filename);

        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    });

    await Promise.all(writePromises);
}

export async function rebuildContentPipeline() {
    console.log('Starting content rebuild pipeline (frontend)...');
    console.log('Current Working Directory:', process.cwd());
    console.log('Pipeline Configuration:', {
        CONTENT_ROOT,
        RAW_PATH: PATHS.RAW,
        PROCESSED_PATH: PATHS.PROCESSED
    });

    const rawContent = await loadRawContent();
    console.log(`Loaded ${rawContent.length} files from raw content.`);

    await validateContent(rawContent);
    console.log('Validation passed.');

    const processedContent = transformContent(rawContent);
    console.log('Transformation complete.');

    await generateOutput(processedContent);
    console.log('Processed content generated successfully.');

    return {
        success: true,
        filesProcessed: rawContent.length,
        timestamp: new Date().toISOString()
    };
}
