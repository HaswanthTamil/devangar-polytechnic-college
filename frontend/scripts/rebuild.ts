import { rebuildContentPipeline } from '../src/lib/admin-pipeline';

async function main() {
    try {
        const result = await rebuildContentPipeline();
        console.log('Rebuild successful:', result);
    } catch (error) {
        console.error('Rebuild failed:', error);
        process.exit(1);
    }
}

main();
