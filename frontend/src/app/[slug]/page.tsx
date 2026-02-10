import { notFound } from 'next/navigation';
import { getPages, getPageBySlug, getAnnouncements, getBanners, getGallery, getFiles, getHomeData, getDepartments, getDepartmentContents } from '@/lib/content'; // Import more helpers
import DefaultPage from '@/components/templates/DefaultPage';
import LandingPage from '@/components/templates/LandingPage';
import ElegantTemplate from '@/components/templates/ElegantTemplate';
import ProfilePage from '@/components/templates/ProfilePage';

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
    const homeData = getHomeData();
    const departments = getDepartments();
    const departmentContents = getDepartmentContents();

    if (!pageData) {
        notFound();
    }

    // 3. Template Selection - Using a switch to avoid React render errors
    const props = {
        page: pageData,
        announcements,
        banners,
        gallery,
        files,
        homeData,
        departments,
        departmentContents
    };

    switch (pageData.template) {
        case 'LandingPage':
            return <LandingPage {...props} />;
        case 'ElegantTemplate':
            return <ElegantTemplate {...props} />;
        case 'ProfilePage':
            return <ProfilePage {...props} />;
        default:
            return <DefaultPage {...props} />;
    }
}
