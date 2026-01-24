import fs from 'fs';
import path from 'path';
import {
    Page, Department, DepartmentContent, Faculty, Announcement, Banner, GalleryItem, FileItem, AboutData
} from './types';

export * from './types'; // Re-export types for backward compatibility if needed, 
// BUT re-exporting might cause the same issue if bundler sees this file as the source of types.
// Better NOT to re-export if I change imports in other files.
// But to save time refactoring ALL imports, I might try 'export type * from' (TS 3.8+).
// But safe bet is strictly separate.
// I will NOT re-export. I will update imports.

const CONTENT_DIR = path.join(process.cwd(), '../content/processed');

function readContent<T>(fileName: string): T {
    const filePath = path.join(CONTENT_DIR, fileName);
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents) as T;
    } catch (error) {
        console.error(`Error reading content file ${fileName}:`, error);
        throw error;
    }
}

// --- Helper Functions ---

const isVisible = (item: any) => {
    if (item.published !== undefined) return item.published;
    if (item.visible !== undefined) return item.visible;
    return true;
};

const sortByPosition = (a: any, b: any) => {
    const posA = a.position !== undefined ? a.position : 9999;
    const posB = b.position !== undefined ? b.position : 9999;
    return posA - posB;
};

export function getPages(): Page[] {
    const pages = readContent<Page[]>('pages.json');
    return pages
        .filter(isVisible)
        .sort((a, b) => (a.slug || '').localeCompare(b.slug || ''));
}

export function getPageBySlug(slug: string): Page | undefined {
    return getPages().find((p) => p.slug === slug);
}

export function getDepartments(): Department[] {
    const departments = readContent<Department[]>('departments.json');
    return departments
        .filter(isVisible)
        .sort(sortByPosition);
}

export function getDepartmentBySlug(slug: string): Department | undefined {
    return getDepartments().find((d) => d.slug === slug);
}

export function getDepartmentContent(slug: string): DepartmentContent | undefined {
    const contents = readContent<DepartmentContent[]>('department-content.json');
    return contents.find(d => d.department === slug);
}

export function getFacultyByDepartment(departmentSlug: string): Faculty[] {
    const faculty = readContent<Faculty[]>('faculty.json');
    return faculty
        .filter((f) => f.department === departmentSlug && isVisible(f))
        .sort(sortByPosition);
}

export function getAnnouncements(): Announcement[] {
    const announcements = readContent<Announcement[]>('announcements.json');
    return announcements
        .filter(isVisible)
        .sort(sortByPosition);
}

export function getBanners(): Banner[] {
    const banners = readContent<Banner[]>('banners.json');
    return banners
        .filter(isVisible)
        .sort(sortByPosition);
}

export function getGallery(category?: string): GalleryItem[] {
    const gallery = readContent<GalleryItem[]>('gallery.json');
    let items = gallery.filter(isVisible);
    if (category) {
        items = items.filter((item) => item.category === category);
    }
    return items.sort(sortByPosition);
}

export function getFiles(year?: number): FileItem[] {
    const files = readContent<FileItem[]>('files.json');
    let items = files.filter(isVisible);
    if (year) {
        items = items.filter((item) => item.year === year);
    }
    return items.sort((a, b) => b.year - a.year);
}

export function getAbout(): AboutData {
    return readContent<AboutData>('about.json');
}
