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
    template?: 'DefaultPage' | 'ProfilePage' | 'LandingPage';
    [key: string]: any;
}

export interface Department {
    slug: string;
    name: string;
    visible: boolean;
    position: number;
}

export interface DepartmentContent {
    department: string;
    sections: {
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

export interface AboutData {
    aboutText: string;
    address: string;
    contacts: {
        emails: string[];
        mobiles: string[];
    };
}
