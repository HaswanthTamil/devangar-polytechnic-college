import { notFound } from 'next/navigation';
import { getPages, getPageBySlug, getAnnouncements, getBanners, getGallery, getFiles } from '@/lib/content'; // Import more helpers
import { getTemplate } from '@/components/templates';

// 1. Generate Static Params
export async function generateStaticParams() {
    const pages = getPages();
    return pages.map((page) => ({
        slug: page.slug,
    }));
}

// 2. Page Component
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const pageData = getPageBySlug(slug);
    const announcements = getAnnouncements(); // Fetch announcements
    const banners = getBanners();
    const gallery = getGallery();
    const files = getFiles();

    if (!pageData) {
        notFound();
    }

    // 3. Template Selection
    const Template = getTemplate(pageData.template);

    // Pass all required props to the template
    return (
        <Template
            page={pageData}
            announcements={announcements}
            banners={banners}
            gallery={gallery}
            files={files}
        />
    );
}
