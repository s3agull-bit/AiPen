'use client';

export default function CompromiseAssessmentPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Compromise Assessment</h1>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
                    Start IOC Scan
                </button>
            </div>

            {/* Alert Banner */}
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                <div className="flex items-center gap-3">
                    <span className="text-red-500 text-2xl">⚠️</span>
                    <div>
                        <h3 className="text-red-400 font-semibold">Active Threats Detected</h3>
                        <p className="text-sm text-slate-400">3 critical IOCs found in the last 24 hours</p>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h3 className="text-slate-400 text-sm font-medium">Total IOCs</h3>
                    <p className="text-3xl font-bold mt-2 text-red-500">127</p>
                    <span className="text-xs text-slate-500">Last 7 days</span>
                </div>
                <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h3 className="text-slate-400 text-sm font-medium">Malicious Files</h3>
                    <p className="text-3xl font-bold mt-2 text-orange-500">8</p>
                    <span className="text-xs text-slate-500">Quarantined</span>
                </div>
                <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h3 className="text-slate-400 text-sm font-medium">Suspicious IPs</h3>
                    <p className="text-3xl font-bold mt-2 text-yellow-500">23</p>
                    <span className="text-xs text-slate-500">Blocked</span>
                </div>
                <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h3 className="text-slate-400 text-sm font-medium">C2 Connections</h3>
                    <p className="text-3xl font-bold mt-2 text-purple-500">2</p>
                    <span className="text-xs text-slate-500">Investigating</span>
                </div>
            </div>

            {/* IOC Timeline */}
            <div className="bg-slate-900 rounded-lg border border-slate-800">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-semibold">IOC Detection Timeline</h2>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {[
                            { time: '2 mins ago', type: 'Malicious Hash', severity: 'Critical', file: 'suspicious.exe' },
                            { time: '15 mins ago', type: 'C2 Communication', severity: 'Critical', file: '192.168.1.100' },
                            { time: '1 hour ago', type: 'Suspicious Domain', severity: 'High', file: 'evil-domain.com' },
                            { time: '3 hours ago', type: 'Registry Modification', severity: 'Medium', file: 'HKLM\\Software\\...' },
                        ].map((ioc, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${ioc.severity === 'Critical' ? 'bg-red-500' :
                                            ioc.severity === 'High' ? 'bg-orange-500' : 'bg-yellow-500'
                                        }`}></div>
                                    <div>
                                        <p className="font-medium">{ioc.type}</p>
                                        <p className="text-sm text-slate-400">{ioc.file}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${ioc.severity === 'Critical' ? 'bg-red-500/10 text-red-500' :
                                            ioc.severity === 'High' ? 'bg-orange-500/10 text-orange-500' :
                                                'bg-yellow-500/10 text-yellow-500'
                                        }`}>
                                        {ioc.severity}
                                    </span>
                                    <p className="text-xs text-slate-500 mt-1">{ioc.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Threat Hunting Queries */}
            <div className="bg-slate-900 rounded-lg border border-slate-800">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-semibold">Active Threat Hunting Queries</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { name: 'Lateral Movement Detection', status: 'Running', matches: 0 },
                            { name: 'Credential Dumping', status: 'Running', matches: 2 },
                            { name: 'Persistence Mechanisms', status: 'Completed', matches: 5 },
                            { name: 'Data Exfiltration', status: 'Running', matches: 0 },
                        ].map((query, idx) => (
                            <div key={idx} className="p-4 bg-slate-800/50 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium">{query.name}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs ${query.status === 'Running' ? 'bg-blue-500/10 text-blue-500' :
                                            'bg-green-500/10 text-green-500'
                                        }`}>
                                        {query.status}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-400 mt-2">{query.matches} matches found</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
