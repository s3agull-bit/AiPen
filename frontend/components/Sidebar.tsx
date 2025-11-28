'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
    { name: 'Dashboard', href: '/', icon: 'HomeIcon' },
    { name: 'Projects', href: '/projects', icon: 'FolderIcon' },
    { name: 'Scans', href: '/scans', icon: 'ShieldCheckIcon' },
    { name: 'MITRE ATT&CK', href: '/mitre-attack', icon: 'ChartBarIcon' },
    { name: 'Compromise Assessment', href: '/compromise-assessment', icon: 'ExclamationTriangleIcon' },
    { name: 'Red Team', href: '/red-team', icon: 'BeakerIcon' },
    { name: 'Threat Intel', href: '/threat-intel', icon: 'GlobeAltIcon' },
    { name: 'Reports', href: '/reports', icon: 'DocumentChartBarIcon' },
    { name: 'Settings', href: '/settings', icon: 'Cog6ToothIcon' },
];

export default function Sidebar() {
    // In a real app, use usePathname() to highlight active link
    // const pathname = usePathname();

    return (
        <div className="flex flex-col w-64 bg-slate-900 h-screen text-white border-r border-slate-800">
            <div className="flex items-center justify-center h-16 border-b border-slate-800">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    SecurityPlatform
                </h1>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors"
                    >
                        {/* Icon placeholder */}
                        <span className="mr-3">🔹</span>
                        {item.name}
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                        U
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium">User</p>
                        <p className="text-xs text-slate-400">Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
