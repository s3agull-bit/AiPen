'use client';

export default function ThreatIntelPage() {
    return (
        <div className="min-h-screen p-8 cyber-grid">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Threat Intelligence
                </h1>
                <p className="text-slate-400">Real-time threat feeds from OpenCTI and MISP</p>
            </div>

            {/* Threat Feed Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { source: 'OpenCTI', status: 'Active', iocs: '1,247', color: 'from-blue-500 to-cyan-600' },
                    { source: 'MISP', status: 'Active', iocs: '3,421', color: 'from-purple-500 to-pink-600' },
                    { source: 'AlienVault OTX', status: 'Active', iocs: '892', color: 'from-green-500 to-emerald-600' },
                    { source: 'Threat Fox', status: 'Syncing', iocs: '2,156', color: 'from-orange-500 to-red-600' },
                ].map((feed, idx) => (
                    <div key={idx} className="stat-card">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold">{feed.source}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${feed.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400 animate-pulse'
                                }`}>
                                {feed.status}
                            </span>
                        </div>
                        <div className={`text-3xl font-bold bg-gradient-to-r ${feed.color} bg-clip-text text-transparent mb-1`}>
                            {feed.iocs}
                        </div>
                        <p className="text-xs text-slate-400">Active IOCs</p>
                    </div>
                ))}
            </div>

            {/* Threat Actor Profiles */}
            <div className="glass-card p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6">Active Threat Actors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            name: 'APT29 (Cozy Bear)',
                            origin: '🇷🇺 Russia',
                            sophistication: 'Advanced',
                            targets: 'Government, Think Tanks',
                            recent: 'SolarWinds Compromise',
                            color: 'from-red-500 to-pink-600',
                            risk: 'Critical'
                        },
                        {
                            name: 'Lazarus Group',
                            origin: '🇰🇵 North Korea',
                            sophistication: 'Advanced',
                            targets: 'Financial, Crypto',
                            recent: 'AppleJeus Campaign',
                            color: 'from-purple-500 to-indigo-600',
                            risk: 'High'
                        },
                        {
                            name: 'APT28 (Fancy Bear)',
                            origin: '🇷🇺 Russia',
                            sophistication: 'Advanced',
                            targets: 'Military, Government',
                            recent: 'NotPetya Attack',
                            color: 'from-orange-500 to-red-600',
                            risk: 'High'
                        },
                        {
                            name: 'FIN7',
                            origin: '🌍 International',
                            sophistication: 'Intermediate',
                            targets: 'Retail, Hospitality',
                            recent: 'POS Malware Campaign',
                            color: 'from-yellow-500 to-orange-600',
                            risk: 'Medium'
                        },
                    ].map((actor, idx) => (
                        <div key={idx} className="gradient-border p-6 hover:scale-[1.02] transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold mb-1">{actor.name}</h3>
                                    <p className="text-sm text-slate-400">{actor.origin}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${actor.risk === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30 neon-glow-pink' :
                                        actor.risk === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                                            'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                    }`}>
                                    {actor.risk}
                                </span>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Sophistication:</span>
                                    <span className="font-medium">{actor.sophistication}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Primary Targets:</span>
                                    <span className="font-medium">{actor.targets}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Recent Activity:</span>
                                    <span className="font-medium">{actor.recent}</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/10">
                                <button className="w-full py-2 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 rounded-lg text-sm font-medium transition-all">
                                    View Full Profile →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent IOC Enrichments */}
            <div className="glass-card p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6">Recent IOC Enrichments</h2>
                <div className="space-y-3">
                    {[
                        { ioc: '192.168.1.100', type: 'IP', threat: 'APT29 C2', confidence: 95, sources: ['OpenCTI', 'MISP'] },
                        { ioc: 'evil-domain.com', type: 'Domain', threat: 'Phishing Campaign', confidence: 88, sources: ['MISP'] },
                        { ioc: '44d88612fea8...', type: 'Hash', threat: 'Cobalt Strike', confidence: 92, sources: ['OpenCTI', 'ThreatFox'] },
                        { ioc: '198.51.100.1', type: 'IP', threat: 'Lazarus Group', confidence: 85, sources: ['OpenCTI'] },
                    ].map((enrichment, idx) => (
                        <div key={idx} className="glass-card p-4 hover:bg-white/10 transition-all">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`px-3 py-1 rounded-lg text-xs font-bold ${enrichment.type === 'IP' ? 'bg-blue-500/20 text-blue-400' :
                                            enrichment.type === 'Domain' ? 'bg-purple-500/20 text-purple-400' :
                                                'bg-green-500/20 text-green-400'
                                        }`}>
                                        {enrichment.type}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-mono text-sm font-medium">{enrichment.ioc}</p>
                                        <p className="text-xs text-slate-400">{enrichment.threat}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-sm font-semibold">{enrichment.confidence}%</p>
                                        <p className="text-xs text-slate-400">Confidence</p>
                                    </div>
                                    <div className="flex gap-1">
                                        {enrichment.sources.map((source, sidx) => (
                                            <span key={sidx} className="px-2 py-1 bg-slate-800 rounded text-xs">
                                                {source}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MITRE ATT&CK Coverage */}
            <div className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-6">Threat Actor TTP Coverage</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { tactic: 'Initial Access', coverage: 85 },
                        { tactic: 'Execution', coverage: 70 },
                        { tactic: 'Persistence', coverage: 65 },
                        { tactic: 'Privilege Escalation', coverage: 60 },
                        { tactic: 'Defense Evasion', coverage: 75 },
                        { tactic: 'Credential Access', coverage: 80 },
                        { tactic: 'Discovery', coverage: 55 },
                        { tactic: 'Lateral Movement', coverage: 70 },
                        { tactic: 'Collection', coverage: 45 },
                        { tactic: 'Exfiltration', coverage: 50 },
                        { tactic: 'Command & Control', coverage: 90 },
                        { tactic: 'Impact', coverage: 65 },
                    ].map((tactic, idx) => (
                        <div key={idx} className="glass-card p-4">
                            <h4 className="text-sm font-medium mb-2">{tactic.tactic}</h4>
                            <div className="progress-glow mb-2">
                                <div
                                    className="progress-glow-fill"
                                    style={{ width: `${tactic.coverage}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-slate-400">{tactic.coverage}% Coverage</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
