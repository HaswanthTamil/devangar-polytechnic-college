import React from 'react';
import { Page } from '@/lib/types';

export default function ProfilePage({ page }: { page: Page }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center border-b pb-4">{page.title}</h1>
                <div className="prose max-w-none">
                    {page.sections?.map((section, index) => (
                        <div key={index} className="mb-4 text-justify">
                            <div dangerouslySetInnerHTML={{ __html: section.content }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
