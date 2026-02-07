
const { rebuildContentPipeline } = require('./src/lib/admin-pipeline');

(async () => {
    try {
        console.log('Starting manual rebuild...');
        const result = await rebuildContentPipeline();
        console.log('Rebuild result:', result);
    } catch (error) {
        console.error('Rebuild failed:', error);
    }
})();
