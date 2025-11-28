export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                    + New Scan
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h3 className="text-slate-400 text-sm font-medium">Total Vulnerabilities</h3>
                    <p className="text-3xl font-bold mt-2 text-white">127</p>
                    <span className="text-red-500 text-sm">↑ 12% from last week</span>
                </div>
                <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h3 className="text-slate-400 text-sm font-medium">Critical Issues</h3>
                    <p className="text-3xl font-bold mt-2 text-red-500">3</p>
                    <span className="text-slate-500 text-sm">Requires immediate attention</span>
                </div>
                <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h3 className="text-slate-400 text-sm font-medium">Compliance Score</h3>
                    <p className="text-3xl font-bold mt-2 text-green-500">85%</p>
                    <span className="text-slate-500 text-sm">OWASP Top 10</span>
                </div>
                <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h3 className="text-slate-400 text-sm font-medium">Active Projects</h3>
                    <p className="text-3xl font-bold mt-2 text-blue-500">8</p>
                    <span className="text-slate-500 text-sm">2 scanning now</span>
                </div>
            </div>

            {/* Recent Scans */}
            <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-semibold">Recent Scans</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950 text-slate-400 uppercase">
                            <tr>
                                <th className="px-6 py-3">Project</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Findings</th>
                                <th className="px-6 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {[
                                { project: 'payment-service', type: 'SAST', status: 'Completed', findings: '2 High, 5 Med', date: '2 mins ago' },
                                { project: 'frontend-app', type: 'DAST', status: 'Running', findings: '-', date: 'In progress' },
                                { project: 'auth-service', type: 'Container', status: 'Failed', findings: '-', date: '1 hour ago' },
                                { project: 'legacy-api', type: 'Blackbox', status: 'Completed', findings: '0 High, 1 Med', date: 'Yesterday' },
                            ].map((scan, idx) => (
                                <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">{scan.project}</td>
                                    <td className="px-6 py-4">{scan.type}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${scan.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                                                scan.status === 'Running' ? 'bg-blue-500/10 text-blue-500' :
                                                    'bg-red-500/10 text-red-500'
                                            }`}>
                                            {scan.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{scan.findings}</td>
                                    <td className="px-6 py-4 text-slate-400">{scan.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
