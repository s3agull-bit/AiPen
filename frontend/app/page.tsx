'use client';

import { useState } from 'react';

export default function PremiumDashboard() {
    const [timeRange, setTimeRange] = useState('24h');

    return (
        <div className="min-h-screen p-6 bg-[#0B0E1A]">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Security Operations Center</h1>
                    <p className="text-slate-400">Real-time threat monitoring and analysis</p>
                </div>
                <div className="flex items-center gap-4">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 bg-[#1A1F2E] border border-slate-700 rounded-lg text-white focus:border-cyan-500 outline-none"
                    >
                        <option value="1h">Last Hour</option>
                        <option value="24h">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                    </select>
                    <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[
                    {
                        label: 'Threats Detected',
                        value: '1,247',
                        change: '+12%',
                        trend: 'up',
                        icon: '🛡️',
                        color: 'from-red-500 to-pink-600',
                        bgColor: 'bg-red-500/10'
                    },
                    {
                        label: 'Active Incidents',
                        value: '23',
                        change: '-8%',
                        trend: 'down',
                        icon: '⚠️',
                        color: 'from-orange-500 to-yellow-600',
                        bgColor: 'bg-orange-500/10'
                    },
                    {
                        label: 'Vulnerabilities',
                        value: '156',
                        change: '+5%',
                        trend: 'up',
                        icon: '🔍',
                        color: 'from-purple-500 to-indigo-600',
                        bgColor: 'bg-purple-500/10'
                    },
                    {
                        label: 'Security Score',
                        value: '94/100',
                        change: '+3pts',
                        trend: 'up',
                        icon: '✓',
                        color: 'from-green-500 to-emerald-600',
                        bgColor: 'bg-green-500/10'
                    },
                ].map((metric, idx) => (
                    <div key={idx} className="relative overflow-hidden bg-gradient-to-br from-[#1A1F2E] to-[#151923] rounded-2xl p-6 border border-slate-800/50 hover:border-slate-700 transition-all group">
                        <div className={`absolute top-0 right-0 w-32 h-32 ${metric.bgColor} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center text-2xl`}>
                                    {metric.icon}
                                </div>
                                <span className={`text-sm font-semibold ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                                    {metric.change}
                                </span>
                            </div>
                            <p className="text-slate-400 text-sm mb-2">{metric.label}</p>
                            <p className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                                {metric.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Threat Map */}
                <div className="lg:col-span-2 bg-gradient-to-br from-[#1A1F2E] to-[#151923] rounded-2xl p-6 border border-slate-800/50">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Global Threat Map</h2>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium">● Critical</span>
                            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-medium">● High</span>
                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">● Medium</span>
                        </div>
                    </div>

                    {/* Simplified World Map Representation */}
                    <div className="relative h-64 bg-slate-900/50 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent"></div>
                        {/* Threat Markers */}
                        {[
                            { x: '20%', y: '40%', severity: 'critical' },
                            { x: '45%', y: '35%', severity: 'high' },
                            { x: '70%', y: '45%', severity: 'medium' },
                            { x: '35%', y: '60%', severity: 'critical' },
                            { x: '80%', y: '30%', severity: 'high' },
                        ].map((marker, idx) => (
                            <div
                                key={idx}
                                className={`absolute w-4 h-4 rounded-full animate-ping ${marker.severity === 'critical' ? 'bg-red-500' :
                                        marker.severity === 'high' ? 'bg-orange-500' :
                                            'bg-yellow-500'
                                    }`}
                                style={{ left: marker.x, top: marker.y }}
                            ></div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                        {[
                            { region: 'North America', attacks: 342, trend: '+12%' },
                            { region: 'Europe', attacks: 289, trend: '+8%' },
                            { region: 'Asia Pacific', attacks: 456, trend: '+15%' },
                        ].map((region, idx) => (
                            <div key={idx} className="bg-slate-900/50 rounded-lg p-4">
                                <p className="text-slate-400 text-xs mb-1">{region.region}</p>
                                <p className="text-2xl font-bold text-white">{region.attacks}</p>
                                <p className="text-green-400 text-xs">{region.trend}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Threats */}
                <div className="bg-gradient-to-br from-[#1A1F2E] to-[#151923] rounded-2xl p-6 border border-slate-800/50">
                    <h2 className="text-xl font-bold text-white mb-6">Top Threats</h2>
                    <div className="space-y-4">
                        {[
                            { name: 'Ransomware Attack', severity: 'critical', count: 45, percentage: 85 },
                            { name: 'Phishing Campaign', severity: 'high', count: 32, percentage: 70 },
                            { name: 'DDoS Attempt', severity: 'high', count: 28, percentage: 60 },
                            { name: 'SQL Injection', severity: 'medium', count: 19, percentage: 45 },
                            { name: 'Brute Force', severity: 'medium', count: 15, percentage: 35 },
                        ].map((threat, idx) => (
                            <div key={idx} className="group">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${threat.severity === 'critical' ? 'bg-red-500' :
                                                threat.severity === 'high' ? 'bg-orange-500' :
                                                    'bg-yellow-500'
                                            }`}></div>
                                        <span className="text-white font-medium text-sm">{threat.name}</span>
                                    </div>
                                    <span className="text-slate-400 text-sm">{threat.count}</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${threat.severity === 'critical' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                                                threat.severity === 'high' ? 'bg-gradient-to-r from-orange-500 to-yellow-600' :
                                                    'bg-gradient-to-r from-yellow-500 to-green-600'
                                            }`}
                                        style={{ width: `${threat.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MITRE ATT&CK Matrix & Activity Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* MITRE ATT&CK Heatmap */}
                <div className="bg-gradient-to-br from-[#1A1F2E] to-[#151923] rounded-2xl p-6 border border-slate-800/50">
                    <h2 className="text-xl font-bold text-white mb-6">MITRE ATT&CK Coverage</h2>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { tactic: 'Initial Access', level: 'high' },
                            { tactic: 'Execution', level: 'medium' },
                            { tactic: 'Persistence', level: 'high' },
                            { tactic: 'Privilege Esc', level: 'low' },
                            { tactic: 'Defense Evasion', level: 'medium' },
                            { tactic: 'Credential Access', level: 'high' },
                            { tactic: 'Discovery', level: 'medium' },
                            { tactic: 'Lateral Movement', level: 'high' },
                            { tactic: 'Collection', level: 'low' },
                            { tactic: 'Exfiltration', level: 'medium' },
                            { tactic: 'Command & Control', level: 'high' },
                            { tactic: 'Impact', level: 'medium' },
                        ].map((tactic, idx) => (
                            <div
                                key={idx}
                                className={`aspect-square rounded-lg flex items-center justify-center text-center p-2 cursor-pointer transition-all hover:scale-105 ${tactic.level === 'high' ? 'bg-red-500/20 border border-red-500/50 hover:bg-red-500/30' :
                                        tactic.level === 'medium' ? 'bg-yellow-500/20 border border-yellow-500/50 hover:bg-yellow-500/30' :
                                            'bg-green-500/20 border border-green-500/50 hover:bg-green-500/30'
                                    }`}
                            >
                                <span className="text-xs font-medium text-white">{tactic.tactic}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-red-500"></div>
                            <span className="text-xs text-slate-400">High Coverage</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-yellow-500"></div>
                            <span className="text-xs text-slate-400">Medium</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-green-500"></div>
                            <span className="text-xs text-slate-400">Low</span>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Timeline */}
                <div className="bg-gradient-to-br from-[#1A1F2E] to-[#151923] rounded-2xl p-6 border border-slate-800/50">
                    <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                        {[
                            { time: '2 mins ago', event: 'Critical vulnerability detected', type: 'critical', user: 'Auto-Scan' },
                            { time: '15 mins ago', event: 'Suspicious login blocked', type: 'warning', user: 'Auth System' },
                            { time: '1 hour ago', event: 'Scan completed successfully', type: 'success', user: 'Scanner-01' },
                            { time: '2 hours ago', event: 'New threat intel received', type: 'info', user: 'MISP Feed' },
                            { time: '3 hours ago', event: 'Policy violation detected', type: 'warning', user: 'Compliance' },
                        ].map((activity, idx) => (
                            <div key={idx} className="flex items-start gap-4 group">
                                <div className="relative">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'critical' ? 'bg-red-500/20' :
                                            activity.type === 'warning' ? 'bg-orange-500/20' :
                                                activity.type === 'success' ? 'bg-green-500/20' :
                                                    'bg-blue-500/20'
                                        }`}>
                                        <span className="text-lg">
                                            {activity.type === 'critical' ? '🚨' :
                                                activity.type === 'warning' ? '⚠️' :
                                                    activity.type === 'success' ? '✓' : 'ℹ️'}
                                        </span>
                                    </div>
                                    {idx < 4 && (
                                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-6 bg-slate-700"></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-medium text-sm">{activity.event}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-slate-400 text-xs">{activity.user}</span>
                                        <span className="text-slate-600">•</span>
                                        <span className="text-slate-500 text-xs">{activity.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
