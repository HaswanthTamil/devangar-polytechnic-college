import { notFound } from 'next/navigation';
import {
    getDepartmentBySlug,
    getDepartmentContent,
    getFacultyByDepartment,
    getAnnouncements
} from '@/lib/content';
import ElegantDepartmentTemplate from '@/components/templates/ElegantDepartmentTemplate';

export const metadata = {
    title: 'Civil Engineering - Devangar Polytechnic College',
    description: 'Department of Civil Engineering at Devangar Polytechnic College',
};

export default function CivilDepartmentPage() {
    const slug = 'civil-engineering';
    const department = getDepartmentBySlug(slug);
    const content = getDepartmentContent(slug);
    const faculty = getFacultyByDepartment(slug);
    const announcements = getAnnouncements();

    if (!department) {
        notFound();
    }

    return (
        <ElegantDepartmentTemplate
            department={department}
            content={content}
            faculty={faculty}
            announcements={announcements}
            heroImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
            heroOverlayText="Building the foundation of modern society through sustainable infrastructure."
            estYear="1984"
        />
    );
}
