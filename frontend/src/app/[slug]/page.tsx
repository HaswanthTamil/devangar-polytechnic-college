import { notFound } from 'next/navigation';
import { getPages, getPageBySlug, getAnnouncements } from '@/lib/content'; // Import getAnnouncements
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

    if (!pageData) {
        notFound();
    }

    // 3. Template Selection
    const Template = getTemplate(pageData.template);

    // Pass announcements to the template
    return <Template page={pageData} announcements={announcements} />;
}
