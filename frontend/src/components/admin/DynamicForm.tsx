
'use client';

import React from 'react';
import ImageUpload from './ImageUpload';

interface DynamicFormProps {
    schema: any;
    data: any;
    onChange: (newData: any) => void;
}

export default function DynamicForm({ schema, data, onChange }: DynamicFormProps) {
    if (!schema) return <div className="text-red-500">No schema provided.</div>;

    // Helper to deeply set value in object/array
    function setByPath(obj: any, path: string[], value: any): any {
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
        const newObj = { ...obj };
        newObj[head] = setByPath(obj[head] || {}, tail, value);
        return newObj;
    }

    const renderField = (fieldSchema: any, value: any, fullPath: string[]) => {
        const key = fullPath[fullPath.length - 1] || '';

        const handleChange = (newValue: any) => {
            const newData = setByPath(data, fullPath, newValue);
            onChange(newData);
        };

        const isImageField = ['image', 'photo', 'logo', 'banner', 'thumbnail'].includes(key.toLowerCase());

        if (fieldSchema.type === 'string' && isImageField) {
            return (
                <ImageUpload
                    key={fullPath.join('.')}
                    label={key}
                    value={value || ''}
                    onChange={handleChange}
                />
            );
        }

        if (fieldSchema.type === 'string') {
            return (
                <div key={fullPath.join('.')} className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">{key}</label>
                    <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => handleChange(e.target.value)}
                        className="w-full p-3 bg-white border border-stone-200 focus:border-red-700 outline-none transition-colors font-serif text-sm"
                    />
                </div>
            );
        }

        if (fieldSchema.type === 'integer' || fieldSchema.type === 'number') {
            return (
                <div key={fullPath.join('.')} className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">{key}</label>
                    <input
                        type="number"
                        value={value || 0}
                        onChange={(e) => handleChange(Number(e.target.value))}
                        className="w-full p-3 bg-white border border-stone-200 focus:border-red-700 outline-none transition-colors font-serif text-sm"
                    />
                </div>
            );
        }

        if (fieldSchema.type === 'boolean') {
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

        if (fieldSchema.type === 'object') {
            return (
                <div key={fullPath.join('.')} className="mb-8 p-6 bg-stone-50 border border-stone-100">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-900 mb-6 border-b border-stone-200 pb-2">{key}</h3>
                    {Object.entries(fieldSchema.properties || {}).map(([subKey, subSchema]) =>
                        renderField(subSchema, value?.[subKey], [...fullPath, subKey])
                    )}
                </div>
            );
        }

        if (fieldSchema.type === 'array') {
            const itemSchema = fieldSchema.items;
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
                        {Array.isArray(value) ? value.map((item: any, index: number) => (
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
                                {itemSchema.type === 'object' ? (
                                    Object.entries(itemSchema.properties || {}).map(([subKey, subSchema]) =>
                                        renderField(subSchema, item[subKey], [...fullPath, `[${index}]`, subKey])
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

    const createDefault = (schema: any): any => {
        if (schema.type === 'string') return '';
        if (schema.type === 'integer' || schema.type === 'number') return 0;
        if (schema.type === 'boolean') return false;
        if (schema.type === 'object') {
            const obj: any = {};
            Object.entries(schema.properties || {}).map(([k, s]) => {
                obj[k] = createDefault(s);
            });
            return obj;
        }
        if (schema.type === 'array') return [];
        return null;
    };

    // Root rendering
    if (schema.type === 'array') {
        return (
            <div className="DynamicForm">
                {renderField(schema, data, [])}
            </div>
        );
    }

    return (
        <div className="DynamicForm">
            {Object.entries(schema.properties || {}).map(([key, fieldSchema]) =>
                renderField(fieldSchema, data?.[key], [key])
            )}
        </div>
    );
}
