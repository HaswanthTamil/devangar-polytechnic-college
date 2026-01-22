/**
 * CLI script to run load and validate without generating output.
 * Useful for CI/CD or local development checks.
 */

import { loadRawContent } from '../build/load';
import { validateContent } from '../build/validate';

async function runSanityCheck() {
  try {
    console.log('Starting sanity check...');

    const rawContent = await loadRawContent();
    await validateContent(rawContent);

    console.log('Sanity check passed.');
    process.exit(0);

  } catch (error) {
    console.error('Sanity check failed:', error);
    process.exit(1);
  }
}

runSanityCheck();
