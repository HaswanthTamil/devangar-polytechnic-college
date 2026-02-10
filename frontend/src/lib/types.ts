export interface PageSection {
    type: 'text';
    content: string;
}

export interface Page {
    slug: string;
    title: string;
    published?: boolean;
    visible?: boolean;
    sections: PageSection[];
    template?: 'DefaultPage' | 'ProfilePage' | 'LandingPage' | 'ElegantTemplate';
    [key: string]: unknown;
}

export interface Department {
    slug: string;
    name: string;
    visible: boolean;
    position: number;
    heroImage?: string;
    heroOverlayText?: string;
    estYear?: string;
}

export interface DepartmentContent {
    department: string;
    name?: string;
    url?: string;
    image: string;
    sections?: {
        courses?: string;
        facilities?: string;
        placements?: string;
        activities?: string;
    };
}

export interface Faculty {
    name: string;
    department: string;
    designation: string;
    photo: string;
    position: number;
    visible: boolean;
}

export interface Announcement {
    text: string;
    link?: string;
    position: number;
    visible: boolean;
}

export interface Banner {
    image: string;
    alt: string;
    position: number;
    visible: boolean;
}

export interface GalleryItem {
    image: string;
    name?: string;
    category: string;
    position: number;
    visible: boolean;
}

export interface FileItem {
    title: string;
    file: string;
    year: number;
    visible: boolean;
}

export interface HomeData {
    collegeImage: string;
    principalImage: string;
}

export interface AboutData {
    aboutText: string;
    address: string;
    contacts: {
        emails: string[];
        mobiles: string[];
    };
}

export interface TemplateProps {
    page: Page;
    banners: Banner[];
    announcements: Announcement[];
    gallery: GalleryItem[];
    files: FileItem[];
    homeData: HomeData;
    departments: Department[];
    departmentContents: DepartmentContent[];
}

export interface Trustee {
    name: string;
    image: string;
    description: string;
    longDescription?: string;
    category: 'DPC' | 'DEC';
    position: number;
    visible: boolean;
}

export interface Principal {
    name: string;
    image: string;
    designation: string;
    message: string;
}

export interface DisclosureData {
    principal: {
        name: string;
        designation: string;
        phone: string;
        email: string;
        degree: string;
    };
    institutionContact: {
        phone: string;
        email: string;
    };
    intake: Array<{
        program: string;
        count: number;
    }>;
}

export interface Program {
    name: string;
    slug: string;
    code: string;
    intake: number;
    description: string;
    visible: boolean;
    position: number;
}

export interface EligibilityData {
    eligibility: {
        title: string;
        description: string;
        criteria: string[];
    };
    fees: {
        title: string;
        description: string;
        items: Array<{
            label: string;
            amount: string;
            note?: string;
        }>;
    };
    sessions: {
        title: string;
        description: string;
        details: Array<{
            label: string;
            value: string;
        }>;
    };
}

export interface InfrastructureItem {
    title: string;
    description: string;
    image: string;
    order: number;
    features?: string[];
}

export interface InfrastructureData {
    items: InfrastructureItem[];
}
