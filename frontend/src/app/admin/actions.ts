'use server';

import { rebuildContentPipeline } from '@/lib/admin-pipeline';
import { saveRawContent, getRawContent, getSchema, listContentFiles } from '@/lib/admin-content';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

export async function rebuildContentAction() {
    try {
        const result = await rebuildContentPipeline();

        // Revalidate all paths after content change
        revalidatePath('/', 'layout');

        return {
            success: true,
            message: 'Content successfully rebuilt!',
            result
        };
    } catch (error: any) {
        console.error('Rebuild action failed:', error);
        return {
            success: false,
            message: error.message || 'An unknown error occurred during rebuild.'
        };
    }
}

export async function saveContentAction(filename: string, data: any) {
    try {
        await saveRawContent(filename, data);

        // Optionally trigger rebuild automatically, or let user do it manually.
        // For now, let's just save.

        return {
            success: true,
            message: `Successfully saved ${filename}`
        };
    } catch (error: any) {
        console.error('Save action failed:', error);
        return {
            success: false,
            message: error.message || 'Failed to save content.'
        };
    }
}

export async function getRawContentAction(filename: string) {
    return await getRawContent(filename);
}

export async function getSchemaAction(filename: string) {
    return await getSchema(filename);
}

export async function listContentFilesAction() {
    return await listContentFiles();
}

export async function loginAction(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const auth = await getRawContent('auth.json');

    if (username === auth.username && password === auth.password) {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });
        return { success: true };
    }

    return { error: 'Invalid username or password' };
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/admin/login');
}

export async function changePasswordAction(newPassword: string) {
    try {
        const auth = await getRawContent('auth.json');
        auth.password = newPassword;
        await saveRawContent('auth.json', auth);
        return { success: true, message: 'Password updated successfully' };
    } catch (error: any) {
        return { success: false, message: error.message || 'Failed to update password' };
    }
}

export async function uploadImageAction(formData: FormData) {
    const file = formData.get('file') as File;
    if (!file) {
        return { success: false, message: 'No file uploaded' };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean filename to prevent path traversal
    const filename = path.basename(file.name).replace(/[^a-zA-Z0-9.-]/g, '_');
    const uploadDir = path.join(process.cwd(), 'public/images/uploads');
    const filePath = path.join(uploadDir, filename);

    try {
        await fs.mkdir(uploadDir, { recursive: true });
        await fs.writeFile(filePath, buffer);
        return { success: true, url: `/images/uploads/${filename}` };
    } catch (error: any) {
        console.error('Upload error:', error);
        return { success: false, message: 'Failed to save image' };
    }
}

export async function listImagesAction() {
    const uploadDir = path.join(process.cwd(), 'public/images/uploads');
    try {
        const files = await fs.readdir(uploadDir);
        // Filter to only include common image extensions
        const images = files.filter(f => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f));
        return images.map(filename => `/images/uploads/${filename}`);
    } catch (error) {
        return [];
    }
}
