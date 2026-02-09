import { notFound } from 'next/navigation';
import {
    getDepartmentBySlug,
    getDepartmentContent,
    getFacultyByDepartment,
    getAnnouncements
} from '@/lib/content';
import ComputerDepartmentTemplate from '@/components/templates/ComputerDepartmentTemplate';

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
        <ComputerDepartmentTemplate
            department={department}
            content={content}
            faculty={faculty}
            announcements={announcements}
        />
    );
}
