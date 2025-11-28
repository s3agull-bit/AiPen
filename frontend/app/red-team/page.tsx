'use client';

export default function RedTeamPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Red Team Operations</h1>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors">
                    New Operation
                </button>
            </div>

            {/* MITRE ATT&CK Coverage */}
            <div className="bg-slate-900 rounded-lg border border-slate-800">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-semibold">MITRE ATT&CK Coverage Heatmap</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { tactic: 'Initial Access', coverage: 85, color: 'bg-green-500' },
                            { tactic: 'Execution', coverage: 70, color: 'bg-yellow-500' },
                            { tactic: 'Persistence', coverage: 90, color: 'bg-green-500' },
                            { tactic: 'Privilege Escalation', coverage: 65, color: 'bg-yellow-500' },
                            { tactic: 'Defense Evasion', coverage: 50, color: 'bg-orange-500' },
                            { tactic: 'Credential Access', coverage: 75, color: 'bg-green-500' },
                            { tactic: 'Discovery', coverage: 80, color: 'bg-green-500' },
                            { tactic: 'Lateral Movement', coverage: 60, color: 'bg-yellow-500' },
                            { tactic: 'Collection', coverage: 40, color: 'bg-orange-500' },
                            { tactic: 'Exfiltration', coverage: 55, color: 'bg-yellow-500' },
                            { tactic: 'Command & Control', coverage: 70, color: 'bg-yellow-500' },
                            { tactic: 'Impact', coverage: 45, color: 'bg-orange-500' },
                        ].map((tactic, idx) => (
                            <div key={idx} className="p-4 bg-slate-800/50 rounded-lg">
                                <h3 className="text-sm font-medium text-slate-300">{tactic.tactic}</h3>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex-1 bg-slate-700 rounded-full h-2">
                                        <div
                                            className={`${tactic.color} h-2 rounded-full`}
                                            style={{ width: `${tactic.coverage}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-semibold">{tactic.coverage}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Operations */}
            <div className="bg-slate-900 rounded-lg border border-slate-800">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-semibold">Recent Operations</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950 text-slate-400 uppercase">
                            <tr>
                                <th className="px-6 py-3">Operation</th>
                                <th className="px-6 py-3">Target</th>
                                <th className="px-6 py-3">Tactics</th>
                                <th className="px-6 py-3">Techniques</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {[
                                { name: 'Operation Phoenix', target: 'Production Network', tactics: 8, techniques: 24, status: 'Completed' },
                                { name: 'Operation Shadow', target: 'DMZ Servers', tactics: 6, techniques: 18, status: 'In Progress' },
                                { name: 'Operation Ghost', target: 'Cloud Infrastructure', tactics: 10, techniques: 32, status: 'Completed' },
                            ].map((op, idx) => (
                                <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">{op.name}</td>
                                    <td className="px-6 py-4">{op.target}</td>
                                    <td className="px-6 py-4">{op.tactics}</td>
                                    <td className="px-6 py-4">{op.techniques}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${op.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                                                'bg-blue-500/10 text-blue-500'
                                            }`}>
                                            {op.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">Today</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Adversary Emulation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
                    <h3 className="text-lg font-semibold mb-4">Adversary Profiles</h3>
                    <div className="space-y-3">
                        {[
                            { name: 'APT29 (Cozy Bear)', techniques: 45 },
                            { name: 'APT28 (Fancy Bear)', techniques: 38 },
                            { name: 'Lazarus Group', techniques: 52 },
                            { name: 'FIN7', techniques: 31 },
                        ].map((profile, idx) => (
                            <div key={idx} className="p-3 bg-slate-800/50 rounded-lg flex justify-between items-center">
                                <span className="font-medium">{profile.name}</span>
                                <span className="text-sm text-slate-400">{profile.techniques} techniques</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
                    <h3 className="text-lg font-semibold mb-4">Attack Simulation Stats</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">Success Rate</span>
                                <span className="font-semibold">72%</span>
                            </div>
                            <div className="bg-slate-700 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">Detection Rate</span>
                                <span className="font-semibold">45%</span>
                            </div>
                            <div className="bg-slate-700 rounded-full h-2">
                                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">Response Time</span>
                                <span className="font-semibold">12 mins avg</span>
                            </div>
                            <div className="bg-slate-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
