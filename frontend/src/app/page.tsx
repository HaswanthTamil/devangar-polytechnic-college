import {
  getPageBySlug,
  getBanners,
  getAnnouncements,
  getGallery,
  getFiles,
} from "@/lib/content";
import ElegantTemplate from "@/components/templates/ElegantTemplate";
import { redirect } from "next/navigation";

export default function Home() {
  // The slug in pages.json is "welcome", not "home"
  const page = getPageBySlug("welcome");

  // We still want to load other content
  const banners = getBanners();
  const announcements = getAnnouncements();
  const gallery = getGallery();
  const files = getFiles();

  // If "welcome" page is missing, redirect to fallback
  if (!page) redirect("/departments/cse");

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
