'use client';

export default function Dashboard() {
    return (
        <div className="min-h-screen p-8 cyber-grid">
            {/* Hero Header */}
            <div className="mb-8">
                <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Security Command Center
                </h1>
                <p className="text-slate-400 text-lg">Real-time threat monitoring and assessment platform</p>
            </div>

            {/* Critical Alerts Banner */}
            <div className="glass-card p-6 mb-8 border-2 border-red-500/30 neon-glow-pink">
                <div className="flex items-center gap-4">
                    <div className="text-4xl animate-pulse">🚨</div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-red-400 mb-1">3 Critical Vulnerabilities Detected</h3>
                        <p className="text-slate-300">Immediate action required • Last detected 5 minutes ago</p>
                    </div>
                    <button className="cyber-button bg-gradient-to-r from-red-500 to-pink-600">
                        <span className="relative z-10">View Details →</span>
                    </button>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Active Projects', value: '12', change: '+3', icon: '🎯', color: 'cyan', trend: 'up' },
                    { label: 'Total Scans', value: '1,247', change: '+156', icon: '🔍', color: 'blue', trend: 'up' },
                    { label: 'Vulnerabilities', value: '89', change: '-12', icon: '⚠️', color: 'red', trend: 'down' },
                    { label: 'Compliance', value: '94%', change: '+2%', icon: '✓', color: 'green', trend: 'up' },
                ].map((stat, idx) => (
                    <div key={idx} className="stat-card group">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-4xl">{stat.icon}</span>
                                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                            <p className={`text-4xl font-bold bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 bg-clip-text text-transparent`}>
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Threat Timeline */}
                <div className="glass-card p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-cyan-400">📊</span>
                        Threat Detection Timeline
                    </h2>
                    <div className="space-y-4">
                        {[
                            { time: '2 mins ago', event: 'SQL Injection Attempt', severity: 'critical', source: 'Web App' },
                            { time: '15 mins ago', event: 'Suspicious Login Activity', severity: 'high', source: 'Auth System' },
                            { time: '1 hour ago', event: 'Port Scan Detected', severity: 'medium', source: 'Network' },
                            { time: '3 hours ago', event: 'Outdated Dependency', severity: 'low', source: 'SCA' },
                        ].map((event, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-3 bg-slate-900/50 rounded-lg hover:bg-slate-800/50 transition-all">
                                <div className={`w-3 h-3 rounded-full ${event.severity === 'critical' ? 'bg-red-500 pulse-glow' :
                                        event.severity === 'high' ? 'bg-orange-500' :
                                            event.severity === 'medium' ? 'bg-yellow-500' :
                                                'bg-blue-500'
                                    }`}></div>
                                <div className="flex-1">
                                    <p className="font-medium">{event.event}</p>
                                    <p className="text-xs text-slate-400">{event.source} • {event.time}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                                        event.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                                            event.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-blue-500/20 text-blue-400'
                                    }`}>
                                    {event.severity.toUpperCase()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MITRE ATT&CK Coverage */}
                <div className="glass-card p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-purple-400">🎯</span>
                        MITRE ATT&CK Coverage
                    </h2>
                    <div className="space-y-3">
                        {[
                            { tactic: 'Initial Access', coverage: 85, techniques: 12 },
                            { tactic: 'Execution', coverage: 70, techniques: 8 },
                            { tactic: 'Persistence', coverage: 90, techniques: 15 },
                            { tactic: 'Privilege Escalation', coverage: 65, techniques: 6 },
                            { tactic: 'Defense Evasion', coverage: 75, techniques: 10 },
                        ].map((tactic, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-300">{tactic.tactic}</span>
                                    <span className="font-semibold">{tactic.coverage}%</span>
                                </div>
                                <div className="progress-glow">
                                    <div className="progress-glow-fill" style={{ width: `${tactic.coverage}%` }}></div>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">{tactic.techniques} techniques tested</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Scans */}
            <div className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-6">Recent Security Scans</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-slate-400 uppercase text-xs border-b border-white/10">
                            <tr>
                                <th className="px-4 py-3">Project</th>
                                <th className="px-4 py-3">Scan Type</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Findings</th>
                                <th className="px-4 py-3">Started</th>
                                <th className="px-4 py-3">Duration</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { project: 'Production API', type: 'DAST', status: 'completed', findings: 23, time: '2h ago', duration: '45m' },
                                { project: 'Mobile App', type: 'SAST', status: 'running', findings: 12, time: '30m ago', duration: '15m' },
                                { project: 'Cloud Infrastructure', type: 'Container Scan', status: 'completed', findings: 5, time: '4h ago', duration: '1h 20m' },
                            ].map((scan, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-4 font-medium">{scan.project}</td>
                                    <td className="px-4 py-4">
                                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                                            {scan.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${scan.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                'bg-blue-500/20 text-blue-400 animate-pulse'
                                            }`}>
                                            {scan.status === 'running' ? '🔄 Running' : '✓ Completed'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-lg font-bold">{scan.findings}</span>
                                    </td>
                                    <td className="px-4 py-4 text-slate-400">{scan.time}</td>
                                    <td className="px-4 py-4 text-slate-400">{scan.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
