'use client';

import Link from 'next/link';

export default function ProjectsPage() {
    const projects = [
        { id: 1, name: 'Production Infrastructure', status: 'active', scans: 156, findings: 23, risk: 'medium', color: 'from-cyan-500 to-blue-600' },
        { id: 2, name: 'Cloud Services', status: 'active', scans: 89, findings: 5, risk: 'low', color: 'from-green-500 to-emerald-600' },
        { id: 3, name: 'Legacy Systems', status: 'scanning', scans: 234, findings: 67, risk: 'high', color: 'from-red-500 to-pink-600' },
        { id: 4, name: 'Mobile Applications', status: 'active', scans: 45, findings: 12, risk: 'medium', color: 'from-purple-500 to-indigo-600' },
    ];

    return (
        <div className="min-h-screen p-8 cyber-grid">
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Security Projects
                    </h1>
                    <p className="text-slate-400">Manage and monitor your security assessment projects</p>
                </div>
                <Link href="/projects/new">
                    <button className="cyber-button">
                        <span className="relative z-10">+ New Project</span>
                    </button>
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Projects', value: '4', icon: '📁', color: 'cyan' },
                    { label: 'Active Scans', value: '12', icon: '🔍', color: 'blue' },
                    { label: 'Critical Findings', value: '8', icon: '⚠️', color: 'red' },
                    { label: 'Compliance Score', value: '87%', icon: '✓', color: 'green' },
                ].map((stat, idx) => (
                    <div key={idx} className="stat-card group">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-4xl">{stat.icon}</span>
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/20 flex items-center justify-center`}>
                                <div className={`w-2 h-2 rounded-full bg-${stat.color}-500 pulse-glow`}></div>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                        <div className="glass-card p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group relative overflow-hidden">
                            {/* Scan Line Animation */}
                            <div className="scan-line"></div>

                            {/* Gradient Background */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`}></div>

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                                    project.status === 'scanning' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse' :
                                                        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                                                }`}>
                                                {project.status === 'scanning' ? '🔄 Scanning' : '✓ Active'}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.risk === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                    project.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                                        'bg-green-500/20 text-green-400 border border-green-500/30'
                                                }`}>
                                                {project.risk.toUpperCase()} RISK
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                            {project.findings}
                                        </div>
                                        <div className="text-xs text-slate-400">Findings</div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                                    <div>
                                        <p className="text-slate-400 text-sm mb-1">Total Scans</p>
                                        <p className="text-xl font-semibold">{project.scans}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm mb-1">Last Scan</p>
                                        <p className="text-xl font-semibold">2h ago</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-4">
                                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                                        <span>Scan Coverage</span>
                                        <span>78%</span>
                                    </div>
                                    <div className="progress-glow">
                                        <div className="progress-glow-fill" style={{ width: '78%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty State for New Users */}
            {projects.length === 0 && (
                <div className="glass-card p-12 text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-2xl font-bold mb-2">No Projects Yet</h3>
                    <p className="text-slate-400 mb-6">Create your first security assessment project to get started</p>
                    <Link href="/projects/new">
                        <button className="cyber-button">
                            <span className="relative z-10">Create First Project</span>
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
