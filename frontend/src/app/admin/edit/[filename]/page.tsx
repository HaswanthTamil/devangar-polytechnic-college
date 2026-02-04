
'use client';

import { useEffect, useState, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { saveContentAction } from '../../actions';
import DynamicForm from '@/components/admin/DynamicForm';
import { motion } from 'framer-motion';

// We need a client-side wrapper since we are using 'use client'
// But we can fetch initial data in a parent SC if we wanted.
// For simplicity and dynamic feel, let's fetch in useEffect or use a sibling SC.
// Actually, since it's an admin panel, a bit of client-side fetching is fine.

export default function EditContentPage() {
    const params = useParams();
    const router = useRouter();
    const filename = params.filename as string;

    const [data, setData] = useState<Record<string, unknown> | null>(null);
    const [schema, setSchema] = useState<Record<string, unknown> | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, startTransition] = useTransition();
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        async function load() {
            try {
                // We'll use a simple fetch or a server action to get data.
                // Let's create a Server Action for reading too for consistency.
                const { getRawContentAction, getSchemaAction } = await import('../../actions');
                const content = await getRawContentAction(filename);
                const schemaData = await getSchemaAction(filename);

                setData(content);
                setSchema(schemaData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [filename]);

    const handleSave = () => {
        setMessage(null);
        startTransition(async () => {
            const result = await saveContentAction(filename, data);
            if (result.success) {
                setMessage({ type: 'success', text: result.message });
            } else {
                setMessage({ type: 'error', text: result.message });
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="text-stone-400 font-serif italic animate-pulse">Loading content & schema...</div>
            </div>
        );
    }

    if (!schema) {
        return (
            <div className="min-h-screen bg-stone-50 p-20">
                <div className="max-w-4xl mx-auto bg-white p-12 border border-red-100 text-center">
                    <h2 className="text-2xl font-playfair font-bold text-red-700 mb-4">No Schema Found</h2>
                    <p className="text-stone-600 mb-8">Editing is disabled for files without a corresponding <code>.schema.json</code>.</p>
                    <button onClick={() => router.back()} className="text-stone-400 hover:text-stone-900 border-b border-stone-200 pb-1 uppercase text-[10px] font-bold tracking-widest transition-colors">Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 p-8 md:p-20">
            <div className="max-w-5xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <button
                            onClick={() => router.push('/admin')}
                            className="text-stone-400 hover:text-stone-900 mb-4 transition-colors flex items-center gap-2 group"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Dashboard</span>
                        </button>
                        <h1 className="text-4xl font-playfair font-bold text-stone-900 mb-2">Editing <span className="text-red-700 italic">{filename}</span></h1>
                        <p className="text-stone-500 font-serif italic">Strict schema validation enabled</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`px-10 py-4 font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-xl ${isSaving
                                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                                : 'bg-stone-900 text-white hover:bg-red-700'
                                }`}
                        >
                            {isSaving ? 'Saving Changes...' : 'Save Content'}
                        </button>
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`mb-8 p-4 text-[10px] font-bold uppercase tracking-[0.2em] border shadow-sm ${message.type === 'success'
                                    ? 'bg-green-50 text-green-700 border-green-100'
                                    : 'bg-red-50 text-red-700 border-red-100'
                                    }`}
                            >
                                {message.text}
                            </motion.div>
                        )}

                        <div className="bg-white p-10 border border-stone-200 shadow-sm">
                            <DynamicForm schema={schema} data={data} onChange={setData} />
                        </div>
                    </div>

                    <aside className="lg:col-span-4 space-y-8">
                        <div className="bg-stone-100 p-8 border border-stone-200">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-6 border-b border-stone-300 pb-2">Schema Details</h3>
                            <pre className="text-[10px] text-stone-500 font-mono leading-relaxed overflow-x-auto">
                                {JSON.stringify(schema, null, 2)}
                            </pre>
                        </div>

                        <div className="p-8 border border-dashed border-stone-300">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">Editing Note</h4>
                            <p className="text-xs text-stone-500 font-serif leading-relaxed italic">
                                &quot;Changes saved here affect the raw content data. Remember to rebuild the site via the dashboard to make these changes live on the public pages.&quot;
                            </p>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
}
