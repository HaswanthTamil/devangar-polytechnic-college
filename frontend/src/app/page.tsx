/* eslint-disable @typescript-eslint/no-unused-vars */
import { getPageBySlug, getBanners, getAnnouncements, getGallery, getFiles } from '@/lib/content';
import ElegantTemplate from '@/components/templates/ElegantTemplate';
import { notFound } from 'next/navigation';

export default function Home() {
  // The slug in pages.json is "welcome", not "home"
  const page = getPageBySlug('welcome');

  // We still want to load other content
  const banners = getBanners();
  const announcements = getAnnouncements();
  const gallery = getGallery();
  const files = getFiles();

  // If "welcome" page is missing, fall back to a mock object or 404
  if (!page) {
    return notFound();
  }

  return (
    <ElegantTemplate
      page={page}
      banners={banners}
      announcements={announcements}
      gallery={gallery}
      files={files}
    />
  );
}
