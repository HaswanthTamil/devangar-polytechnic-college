import { notFound } from 'next/navigation';
import {
    getDepartments,
    getDepartmentBySlug,
    getDepartmentContent,
    getFacultyByDepartment,
    getAnnouncements
} from '@/lib/content';
import ElegantDepartmentTemplate from '@/components/templates/ElegantDepartmentTemplate';

// 1. Generate Static Params
export async function generateStaticParams() {
    const departments = getDepartments();
    return departments.map((dept) => ({
        slug: dept.slug,
    }));
}

// 2. Department Page Component
export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const department = getDepartmentBySlug(slug);

    if (!department) {
        notFound();
    }

    const content = getDepartmentContent(slug);
    const faculty = getFacultyByDepartment(slug);
    const announcements = getAnnouncements();

    return (
        <ElegantDepartmentTemplate
            department={department}
            content={content}
            faculty={faculty}
            announcements={announcements}
        />
    );
}
