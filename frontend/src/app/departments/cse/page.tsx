import { notFound } from 'next/navigation';
import {
    getDepartmentBySlug,
    getDepartmentContent,
    getFacultyByDepartment,
    getAnnouncements
} from '@/lib/content';
import ElegantDepartmentTemplate from '@/components/templates/ElegantDepartmentTemplate';

export const metadata = {
    title: 'Computer Engineering - Devangar Polytechnic College',
    description: 'Department of Computer Engineering at Devangar Polytechnic College',
};

export default function ComputerDepartmentPage() {
    const slug = 'computer-engineering';
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
            heroImage="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
            heroOverlayText="Coding the digital future, one algorithm at a time."
        />
    );
}
