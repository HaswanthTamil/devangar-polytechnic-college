import DefaultPage from './DefaultPage';
import ProfilePage from './ProfilePage';
import LandingPage from './LandingPage';
import ElegantTemplate from './ElegantTemplate';
import { Page } from '@/lib/types';

const templates = {
    DefaultPage,
    ProfilePage,
    LandingPage,
    ElegantTemplate,
};

export const getTemplate = (templateName?: string) => {
    if (templateName && templates[templateName as keyof typeof templates]) {
        return templates[templateName as keyof typeof templates];
    }
    return DefaultPage;
};
