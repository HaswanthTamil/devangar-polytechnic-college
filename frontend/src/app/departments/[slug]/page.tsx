import { notFound } from 'next/navigation';
import {
    getDepartments,
    getDepartmentBySlug,
    getDepartmentContent,
    getFacultyByDepartment
} from '@/lib/content';

// 1. Generate Static Params
export async function generateStaticParams() {
    const departments = getDepartments();
    return departments.map((dept) => ({
        slug: dept.slug,
    }));
}

// 2. Department Page Component
export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const department = getDepartmentBySlug(slug);

    if (!department) {
        notFound();
    }

    const content = getDepartmentContent(slug);
    const facultyList = getFacultyByDepartment(slug);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <h1 className="text-4xl font-bold mb-6">{department.name}</h1>

            {/* Content Sections */}
            {content && content.sections && (
                <div className="prose max-w-none mb-12">
                    {content.sections.courses && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Courses</h2>
                            <div dangerouslySetInnerHTML={{ __html: content.sections.courses }} />
                        </div>
                    )}
                    {content.sections.facilities && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Facilities</h2>
                            <div dangerouslySetInnerHTML={{ __html: content.sections.facilities }} />
                        </div>
                    )}
                    {content.sections.placements && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Placements</h2>
                            <div dangerouslySetInnerHTML={{ __html: content.sections.placements }} />
                        </div>
                    )}
                    {content.sections.activities && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Activities</h2>
                            <div dangerouslySetInnerHTML={{ __html: content.sections.activities }} />
                        </div>
                    )}
                </div>
            )}

            {/* Faculty Section */}
            {facultyList && facultyList.length > 0 && (
                <section>
                    <h2 className="text-3xl font-bold mb-6">Faculty</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {facultyList.map((f, idx) => (
                            <div key={idx} className="border p-4 rounded shadow-sm">
                                {f.photo && (
                                    <img
                                        src={f.photo}
                                        alt={f.name}
                                        className="w-full h-48 object-cover mb-4 rounded"
                                    />
                                )}
                                <h3 className="text-xl font-bold">{f.name}</h3>
                                {f.designation && <p className="text-gray-600">{f.designation}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
