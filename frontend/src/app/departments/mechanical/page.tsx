import { notFound } from 'next/navigation';
import {
    getDepartmentBySlug,
    getDepartmentContent,
    getFacultyByDepartment,
    getAnnouncements
} from '@/lib/content';
import ElegantDepartmentTemplate from '@/components/templates/ElegantDepartmentTemplate';

export const metadata = {
    title: 'Mechanical Engineering - Devangar Polytechnic College',
    description: 'Department of Mechanical Engineering at Devangar Polytechnic College',
};

export default function MechanicalDepartmentPage() {
    const slug = 'mechanical-engineering';
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
            heroImage="https://images.unsplash.com/photo-1537462713205-e5126c842ce3?q=80&w=2070&auto=format&fit=crop"
            heroOverlayText="Designing the machines that move the world forward."
        />
    );
}
