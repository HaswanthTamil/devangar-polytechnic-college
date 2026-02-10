import { notFound } from 'next/navigation';
import {
    getDepartmentBySlug,
    getDepartmentContent,
    getFacultyByDepartment,
    getAnnouncements
} from '@/lib/content';
import ECEDepartmentTemplate from '@/components/templates/ECEDepartmentTemplate';

export const metadata = {
    title: 'Electronics & Communication - Devangar Polytechnic College',
    description: 'Department of ECE at Devangar Polytechnic College',
};

export default function EceDepartmentPage() {
    const slug = 'electronics-communication';
    const department = getDepartmentBySlug(slug);
    const content = getDepartmentContent(slug);
    const faculty = getFacultyByDepartment(slug);
    const announcements = getAnnouncements();

    if (!department) {
        notFound();
    }

    return (
        <ECEDepartmentTemplate
            department={department}
            content={content}
            faculty={faculty}
            announcements={announcements}
            heroImage='/dept/ece.jpg'
        />
    );
}
