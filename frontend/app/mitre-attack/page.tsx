'use client';

import { useState } from 'react';

export default function MitreAttackDashboard() {
    const [selectedTactic, setSelectedTactic] = useState(null);

    const tactics = [
        { id: 'TA0001', name: 'Initial Access', techniques: 12, coverage: 85, color: 'from-red-500 to-pink-600' },
        { id: 'TA0002', name: 'Execution', techniques: 14, coverage: 70, color: 'from-orange-500 to-red-600' },
        { id: 'TA0003', name: 'Persistence', techniques: 19, coverage: 90, color: 'from-yellow-500 to-orange-600' },
        { id: 'TA0004', name: 'Privilege Escalation', techniques: 13, coverage: 65, color: 'from-green-500 to-emerald-600' },
        { id: 'TA0005', name: 'Defense Evasion', techniques: 42, coverage: 75, color: 'from-cyan-500 to-blue-600' },
        { id: 'TA0006', name: 'Credential Access', techniques: 17, coverage: 80, color: 'from-blue-500 to-indigo-600' },
        { id: 'TA0007', name: 'Discovery', techniques: 29, coverage: 55, color: 'from-indigo-500 to-purple-600' },
        { id: 'TA0008', name: 'Lateral Movement', techniques: 9, coverage: 70, color: 'from-purple-500 to-pink-600' },
        { id: 'TA0009', name: 'Collection', techniques: 17, coverage: 45, color: 'from-pink-500 to-rose-600' },
        { id: 'TA0010', name: 'Exfiltration', techniques: 9, coverage: 50, color: 'from-rose-500 to-red-600' },
        { id: 'TA0011', name: 'Command and Control', techniques: 16, coverage: 90, color: 'from-teal-500 to-cyan-600' },
        { id: 'TA0040', name: 'Impact', techniques: 13, coverage: 65, color: 'from-amber-500 to-orange-600' },
    ];

    return (
        <div className="min-h-screen p-6 bg-[#0B0E1A]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">MITRE ATT&CK Framework</h1>
                <p className="text-slate-400">Adversarial Tactics, Techniques & Common Knowledge</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Total Tactics', value: '12', icon: '🎯', color: 'cyan' },
                    { label: 'Techniques Covered', value: '156/210', icon: '✓', color: 'green' },
                    { label: 'Avg Coverage', value: '74%', icon: '📊', color: 'blue' },
                    { label: 'Last Updated', value: '2h ago', icon: '🔄', color: 'purple' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-[#1A1F2E] to-[#151923] rounded-xl p-4 border border-slate-800/50">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{stat.icon}</span>
                            <span className={`text-${stat.color}-400 text-xs font-semibold`}>LIVE</span>
                        </div>
                        <p className="text-slate-400 text-xs mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* MITRE ATT&CK Matrix */}
            <div className="bg-gradient-to-br from-[#1A1F2E] to-[#151923] rounded-2xl p-6 border border-slate-800/50 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">ATT&CK Matrix Heatmap</h2>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-white transition-all">
                            Enterprise
                        </button>
                        <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-sm text-slate-400 transition-all">
                            Mobile
                        </button>
                        <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-sm text-slate-400 transition-all">
                            ICS
                        </button>
                    </div>
                </div>

                {/* Matrix Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {tactics.map((tactic, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedTactic(tactic)}
                            className="relative group cursor-pointer"
                        >
                            <div className={`bg-gradient-to-br ${tactic.color} p-4 rounded-xl transition-all hover:scale-105 hover:shadow-2xl`}>
                                <div className="absolute top-2 right-2">
                                    <div className={`w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-xs font-bold text-white`}>
                                        {tactic.coverage}%
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <p className="text-white/80 text-xs font-medium mb-1">{tactic.id}</p>
                                    <h3 className="text-white font-bold text-sm mb-2">{tactic.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-white rounded-full"
                                                style={{ width: `${tactic.coverage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <p className="text-white/60 text-xs mt-2">{tactic.techniques} techniques</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coverage Legend */}
                <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-gradient-to-r from-green-500 to-emerald-600"></div>
                        <span className="text-sm text-slate-400">80-100% Coverage</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-gradient-to-r from-yellow-500 to-orange-600"></div>
                        <span className="text-sm text-slate-400">50-79% Coverage</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-gradient-to-r from-red-500 to-pink-600"></div>
                        <span className="text-sm text-slate-400">0-49% Coverage</span>
                    </div>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Technique Details */}
                <div className="bg-gradient-to-br from-[#1A1F2E] to-[#151923] rounded-2xl p-6 border border-slate-800/50">
                    <h2 className="text-xl font-bold text-white mb-6">Top Detected Techniques</h2>
                    <div className="space-y-4">
                        {[
                            { id: 'T1566', name: 'Phishing', tactic: 'Initial Access', detections: 45, severity: 'high' },
                            { id: 'T1059', name: 'Command and Scripting Interpreter', tactic: 'Execution', detections: 38, severity: 'high' },
                            { id: 'T1053', name: 'Scheduled Task/Job', tactic: 'Persistence', detections: 32, severity: 'medium' },
                            { id: 'T1078', name: 'Valid Accounts', tactic: 'Persistence', detections: 28, severity: 'critical' },
                            { id: 'T1027', name: 'Obfuscated Files or Information', tactic: 'Defense Evasion', detections: 24, severity: 'medium' },
                        ].map((technique, idx) => (
                            <div key={idx} className="bg-slate-900/50 rounded-lg p-4 hover:bg-slate-900/70 transition-all">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-cyan-400 font-mono text-sm font-bold">{technique.id}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${technique.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                                                    technique.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                                                        'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                {technique.severity.toUpperCase()}
                                            </span>
                                        </div>
                                        <h4 className="text-white font-medium text-sm">{technique.name}</h4>
                                        <p className="text-slate-400 text-xs mt-1">{technique.tactic}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-white">{technique.detections}</p>
                                        <p className="text-xs text-slate-400">detections</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Threat Actor Mapping */}
                <div className="bg-gradient-to-br from-[#1A1F2E] to-[#151923] rounded-2xl p-6 border border-slate-800/50">
                    <h2 className="text-xl font-bold text-white mb-6">Threat Actor TTP Mapping</h2>
                    <div className="space-y-4">
                        {[
                            {
                                name: 'APT29',
                                country: '🇷🇺',
                                tactics: ['Initial Access', 'Execution', 'Persistence', 'Defense Evasion'],
                                techniques: 24,
                                color: 'from-red-500 to-pink-600'
                            },
                            {
                                name: 'Lazarus Group',
                                country: '🇰🇵',
                                tactics: ['Initial Access', 'Execution', 'Impact'],
                                techniques: 18,
                                color: 'from-purple-500 to-indigo-600'
                            },
                            {
                                name: 'APT28',
                                country: '🇷🇺',
                                tactics: ['Initial Access', 'Credential Access', 'Lateral Movement'],
                                techniques: 21,
                                color: 'from-orange-500 to-red-600'
                            },
                        ].map((actor, idx) => (
                            <div key={idx} className="bg-slate-900/50 rounded-lg p-4 hover:bg-slate-900/70 transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{actor.country}</span>
                                        <h4 className="text-white font-bold">{actor.name}</h4>
                                    </div>
                                    <span className="text-slate-400 text-sm">{actor.techniques} TTPs</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {actor.tactics.map((tactic, tidx) => (
                                        <span key={tidx} className={`px-3 py-1 bg-gradient-to-r ${actor.color} bg-opacity-20 rounded-full text-xs font-medium text-white`}>
                                            {tactic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Coverage Chart */}
                    <div className="mt-6 pt-6 border-t border-slate-800">
                        <h3 className="text-sm font-semibold text-white mb-4">Coverage by Kill Chain Phase</h3>
                        <div className="space-y-3">
                            {[
                                { phase: 'Reconnaissance', coverage: 45 },
                                { phase: 'Weaponization', coverage: 60 },
                                { phase: 'Delivery', coverage: 85 },
                                { phase: 'Exploitation', coverage: 70 },
                                { phase: 'Installation', coverage: 75 },
                                { phase: 'Command & Control', coverage: 90 },
                                { phase: 'Actions on Objectives', coverage: 65 },
                            ].map((phase, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-slate-400">{phase.phase}</span>
                                        <span className="text-white font-semibold">{phase.coverage}%</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                                            style={{ width: `${phase.coverage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
