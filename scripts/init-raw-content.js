
const fs = require('fs');
const path = require('path');

const processedDir = '/home/haswanthtamil/Dev/Projects/devangar-polytechnic-college/content/processed';
const rawDir = '/home/haswanthtamil/Dev/Projects/devangar-polytechnic-college/content/raw';

const files = fs.readdirSync(processedDir);

files.forEach(file => {
    if (file.endsWith('.json')) {
        const filePath = path.join(processedDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const removeProcessedAt = (obj) => {
            if (Array.isArray(obj)) {
                return obj.map(removeProcessedAt);
            } else if (obj !== null && typeof obj === 'object') {
                const newObj = {};
                for (const key in obj) {
                    if (key !== '_processedAt') {
                        newObj[key] = removeProcessedAt(obj[key]);
                    }
                }
                return newObj;
            }
            return obj;
        };

        const cleanedData = removeProcessedAt(data);
        fs.writeFileSync(path.join(rawDir, file), JSON.stringify(cleanedData, null, 2));
        console.log(`Initialized raw content for ${file}`);
    }
});
