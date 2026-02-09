import { notFound } from 'next/navigation';
import {
    getDepartmentBySlug,
    getDepartmentContent,
    getFacultyByDepartment,
    getAnnouncements
} from '@/lib/content';
import EEEDepartmentTemplate from '@/components/templates/EEEDepartmentTemplate';

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
        <EEEDepartmentTemplate
            department={department}
            content={content}
            faculty={faculty}
            announcements={announcements}
        />
    );
}
