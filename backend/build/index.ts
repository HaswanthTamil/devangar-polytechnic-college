/**
 * Main entry point for the content build pipeline.
 * Orchestrates the flow: load -> validate -> transform -> generate.
 */

import { loadRawContent } from './load';
import { validateContent } from './validate';
import { transformContent } from './transform';
import { generateOutput } from './generate';

async function runBuildPipeline() {
  try {
    console.log('Starting content build pipeline...');

    // 1. Load
    const rawContent = await loadRawContent();
    console.log(`Loaded ${rawContent.length} items.`);

    // 2. Validate
    await validateContent(rawContent);

    // 3. Transform
    const processedContent = transformContent(rawContent);
    console.log('Transformation complete.');

    // 4. Generate
    await generateOutput(processedContent);
    console.log('Build pipeline completed successfully.');

  } catch (error) {
    console.error('Build pipeline failed:', error);
    process.exit(1);
  }
}

// Execute the pipeline
runBuildPipeline();
