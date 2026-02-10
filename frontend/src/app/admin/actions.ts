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
    } catch (error: unknown) {
        console.error('Rebuild action failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return {
            success: false,
            message: errorMessage || 'An unknown error occurred during rebuild.'
        };
    }
}

export async function saveContentAction(filename: string, data: unknown) {
    try {
        await saveRawContent(filename, data);

        // Optionally trigger rebuild automatically, or let user do it manually.
        // For now, let's just save.

        return {
            success: true,
            message: `Successfully saved ${filename}`
        };
    } catch (error: unknown) {
        console.error('Save action failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            success: false,
            message: errorMessage || 'Failed to save content.'
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
    console.log('Login Action Triggered');
    try {
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        console.log('Login Attempt Data:', { username, passwordLength: password?.length });

        const auth = await getRawContent('auth.json');
        
        // console.log('Auth Content Loaded:', { 
        //     storedUsername: auth.username, 
        //     storedPassword: auth.password,
        //     match: username === auth.username && password === auth.password
        // });

        if (username === (auth as { username: string; password: string }).username && password === (auth as { username: string; password: string }).password) {
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
    } catch (error: unknown) {
        console.error('Login Action Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Login failed due to server error';
        return { error: errorMessage };
    }
}
export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/admin/login');
}

export async function changePasswordAction(newPassword: string) {
    try {
        const auth = await getRawContent('auth.json');
        (auth as { username: string; password: string }).password = newPassword;
        await saveRawContent('auth.json', auth);
        return { success: true, message: 'Password updated successfully' };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update password';
        return { success: false, message: errorMessage };
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
    } catch (error: unknown) {
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
        console.log(error);
        return [];
    }
}
