
'use client';

import React from 'react';
import ImageUpload from './ImageUpload';

interface DynamicFormProps {
    schema: unknown;
    data: Record<string, unknown> | null;
    onChange: (newData: unknown) => void;
}

export default function DynamicForm({ schema, data, onChange }: DynamicFormProps) {
    if (!schema) return <div className="text-red-500">No schema provided.</div>;

    // Helper to deeply set value in object/array
    function setByPath(obj: unknown, path: string[], value: unknown): unknown {
        if (path.length === 0) return value;

        const [head, ...tail] = path;

        // Handle array index like "[0]"
        const arrayMatch = head.match(/^\[(\d+)\]$/);
        if (arrayMatch) {
            const index = parseInt(arrayMatch[1]);
            const newArr = Array.isArray(obj) ? [...obj] : [];
            while (newArr.length <= index) newArr.push({});
            newArr[index] = setByPath(newArr[index], tail, value);
            return newArr;
        }

        // Handle object key
        const newObj = { ...(obj as Record<string, unknown>) } as Record<string, unknown>;
        newObj[head] = setByPath((obj as Record<string, unknown>)[head] || {}, tail, value);
        return newObj;
    }

    const renderField = (fieldSchema: unknown, value: unknown, fullPath: string[]) => {
        const key = fullPath[fullPath.length - 1] || '';

        const handleChange = (newValue: unknown) => {
            const newData = setByPath(data, fullPath, newValue);
            onChange(newData);
        };

        const isImageField = ['image', 'photo', 'logo', 'banner', 'thumbnail'].includes(key.toLowerCase());

        if ((fieldSchema as { type?: string }).type === 'string' && isImageField) {
            return (
                <ImageUpload
                    key={fullPath.join('.')}
                    label={key}
                    value={(value as string) || ''}
                    onChange={handleChange}
                />
            );
        }

        if ((fieldSchema as { type?: string }).type === 'string' || (fieldSchema as { enum?: unknown[] }).enum) {
            const isEnum = !!(fieldSchema as { enum?: unknown[] }).enum;
            
            return (
                <div key={fullPath.join('.')} className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">{key}</label>
                    {isEnum ? (
                        <select
                            value={(value as string) || ''}
                            onChange={(e) => handleChange(e.target.value)}
                            className="w-full p-3 bg-white border border-stone-200 focus:border-red-700 outline-none transition-colors font-serif text-sm appearance-none cursor-pointer"
                        >
                            <option value="" disabled>Select {key}...</option>
                            {((fieldSchema as { enum: string[] }).enum).map((opt: string) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            value={(value as string) || ''}
                            onChange={(e) => handleChange(e.target.value)}
                            className="w-full p-3 bg-white border border-stone-200 focus:border-red-700 outline-none transition-colors font-serif text-sm"
                        />
                    )}
                </div>
            );
        }

        if ((fieldSchema as { type?: string }).type === 'integer' || (fieldSchema as { type?: string }).type === 'number') {
            return (
                <div key={fullPath.join('.')} className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">{key}</label>
                    <input
                        type="number"
                        value={(value as number) || 0}
                        onChange={(e) => handleChange(Number(e.target.value))}
                        className="w-full p-3 bg-white border border-stone-200 focus:border-red-700 outline-none transition-colors font-serif text-sm"
                    />
                </div>
            );
        }

        if ((fieldSchema as { type?: string }).type === 'boolean') {
            return (
                <div key={fullPath.join('.')} className="mb-6 flex items-center gap-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500">{key}</label>
                    <button
                        onClick={() => handleChange(!value)}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${value ? 'bg-red-700' : 'bg-stone-300'}`}
                    >
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${value ? 'translate-x-6' : ''}`} />
                    </button>
                </div>
            );
        }

        if ((fieldSchema as { type?: string }).type === 'object') {
            return (
                <div key={fullPath.join('.')} className="mb-8 p-6 bg-stone-50 border border-stone-100">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-900 mb-6 border-b border-stone-200 pb-2">{key}</h3>
                    {Object.entries((fieldSchema as { properties?: Record<string, unknown> }).properties || {}).map(([subKey, subSchema]) =>
                        renderField(subSchema, (value as Record<string, unknown>)?.[subKey], [...fullPath, subKey])
                    )}
                </div>
            );
        }

        if ((fieldSchema as { type?: string }).type === 'array') {
            const itemSchema = (fieldSchema as { items?: unknown }).items;
            return (
                <div key={fullPath.join('.')} className="mb-10">
                    <div className="flex justify-between items-center mb-6">
                        <label className="text-sm font-bold uppercase tracking-[0.2em] text-red-700">{key}</label>
                        <button
                            onClick={() => {
                                const newItem = createDefault(itemSchema);
                                const currentArray = Array.isArray(value) ? value : [];
                                handleChange([newItem, ...currentArray]);
                            }}
                            className="px-4 py-1.5 border border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest"
                        >
                            Add {key.slice(0, -1)}
                        </button>
                    </div>
                    <div className="space-y-6">
                        {Array.isArray(value) ? value.map((item: unknown, index: number) => (
                            <div key={`${fullPath.join('.')}-${index}`} className="relative p-6 bg-white border border-stone-200 shadow-sm border-l-4 border-l-stone-800">
                                <button
                                    onClick={() => {
                                        const next = [...value];
                                        next.splice(index, 1);
                                        handleChange(next);
                                    }}
                                    className="absolute top-4 right-4 text-stone-400 hover:text-red-700 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                {(itemSchema as { type?: string }).type === 'object' ? (
                                    Object.entries((itemSchema as { properties?: Record<string, unknown> }).properties || {}).map(([subKey, subSchema]) =>
                                        renderField(subSchema, (item as Record<string, unknown>)[subKey], [...fullPath, `[${index}]`, subKey])
                                    )
                                ) : (
                                    renderField(itemSchema, item, [...fullPath, `[${index}]`])
                                )}
                            </div>
                        )) : null}
                    </div>
                </div>
            );
        }

        return null;
    };

    const createDefault = (schema: unknown): unknown => {
        if ((schema as { enum?: unknown[] }).enum && (schema as { enum: unknown[] }).enum.length > 0) return (schema as { enum: unknown[] }).enum[0];
        if ((schema as { type?: string }).type === 'string') return '';
        if ((schema as { type?: string }).type === 'integer' || (schema as { type?: string }).type === 'number') return 0;
        if ((schema as { type?: string }).type === 'boolean') return false;
        if ((schema as { type?: string }).type === 'object') {
            const obj: Record<string, unknown> = {};
            Object.entries((schema as { properties?: Record<string, unknown> }).properties || {}).map(([k, s]) => {
                obj[k] = createDefault(s);
            });
            return obj;
        }
        if ((schema as { type?: string }).type === 'array') return [];
        return null;
    };

    // Root rendering
    if ((schema as { type?: string }).type === 'array') {
        return (
            <div className="DynamicForm">
                {renderField(schema, data, [])}
            </div>
        );
    }

    return (
        <div className="DynamicForm">
            {Object.entries((schema as { properties?: Record<string, unknown> }).properties || {}).map(([key, fieldSchema]) =>
                renderField(fieldSchema, (data as Record<string, unknown>)?.[key], [key])
            )}
        </div>
    );
}
