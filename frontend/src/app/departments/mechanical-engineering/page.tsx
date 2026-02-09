import { notFound } from 'next/navigation';
import {
    getDepartmentBySlug,
    getDepartmentContent,
    getFacultyByDepartment,
    getAnnouncements
} from '@/lib/content';
import MechanicalDepartmentTemplate from '@/components/templates/MechanicalDepartmentTemplate';

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
        <MechanicalDepartmentTemplate
            department={department}
            content={content}
            faculty={faculty}
            announcements={announcements}
        />
    );
}
