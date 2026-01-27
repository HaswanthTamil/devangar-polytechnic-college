
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Skip check for login page
        if (pathname === '/admin/login') {
            setIsAuthenticated(true);
            return;
        }

        const tabSession = sessionStorage.getItem('admin_tab_active');
        if (!tabSession) {
            router.replace('/admin/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [pathname, router]);

    if (!isAuthenticated && pathname !== '/admin/login') {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="text-stone-400 font-serif italic animate-pulse">Verifying tab session...</div>
            </div>
        );
    }

    return <>{children}</>;
}
