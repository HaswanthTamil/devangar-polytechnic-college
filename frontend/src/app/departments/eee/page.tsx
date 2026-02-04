import { notFound } from 'next/navigation';
import {
    getDepartmentBySlug,
    getDepartmentContent,
    getFacultyByDepartment,
    getAnnouncements
} from '@/lib/content';
import ElegantDepartmentTemplate from '@/components/templates/ElegantDepartmentTemplate';

export const metadata = {
    title: 'Electrical & Electronics - Devangar Polytechnic College',
    description: 'Department of EEE at Devangar Polytechnic College',
};

export default function EeeDepartmentPage() {
    const slug = 'electrical-electronics';
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
            heroImage="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop"
            heroOverlayText="Powering the grid and energizing the future."
        />
    );
}
