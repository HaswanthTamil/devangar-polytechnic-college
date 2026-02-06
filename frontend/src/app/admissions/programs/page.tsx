import React from 'react';
import { getAnnouncements, getPrograms } from '@/lib/content';
import ProgramsClient from './ProgramsClient';

export default function ProgramsPage() {
    const announcements = getAnnouncements();
    const programs = getPrograms();

    return <ProgramsClient announcements={announcements} programs={programs} />;
}
