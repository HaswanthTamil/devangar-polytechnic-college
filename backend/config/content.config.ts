/**
 * Central configuration for content pipeline paths and types.
 * This file serves as the single source of truth for content-related constants.
 */

import path from 'path';

// Root directory for content
const CONTENT_ROOT = path.resolve(__dirname, '../../content');

export const PATHS = {
  RAW: path.join(CONTENT_ROOT, 'raw'),
  SCHEMA: path.join(CONTENT_ROOT, 'schema'),
  PROCESSED: path.join(CONTENT_ROOT, 'processed'),
} as const;

export type ContentType = 'page' | 'post' | 'author'; // TODO: Add more content types as needed

export const CONFIG = {
  DEFAULT_LOCALE: 'en',
  SUPPORTED_LOCALES: ['en', 'ta'], // English and Tamil
} as const;
