'use client';

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Compliance Reports</h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                    Generate Report
                </button>
            </div>

            {/* Framework Selection */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                    { name: 'NIST CSF', score: 85, color: 'text-green-500' },
                    { name: 'PCI-DSS', score: 78, color: 'text-yellow-500' },
                    { name: 'SOC 2', score: 92, color: 'text-green-500' },
                    { name: 'ISO 27001', score: 88, color: 'text-green-500' },
                    { name: 'OWASP Top 10', score: 75, color: 'text-yellow-500' },
                ].map((framework, idx) => (
                    <div key={idx} className="bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-blue-500 transition-colors cursor-pointer">
                        <h3 className="text-sm font-medium text-slate-400">{framework.name}</h3>
                        <p className={`text-3xl font-bold mt-2 ${framework.color}`}>{framework.score}%</p>
                        <span className="text-xs text-slate-500">Compliance Score</span>
                    </div>
                ))}
            </div>

            {/* NIST CSF Detailed View */}
            <div className="bg-slate-900 rounded-lg border border-slate-800">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-semibold">NIST Cybersecurity Framework</h2>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {[
                            { function: 'Identify', score: 90, findings: 2, color: 'bg-green-500' },
                            { function: 'Protect', score: 85, findings: 5, color: 'bg-green-500' },
                            { function: 'Detect', score: 80, findings: 3, color: 'bg-yellow-500' },
                            { function: 'Respond', score: 75, findings: 8, color: 'bg-yellow-500' },
                            { function: 'Recover', score: 88, findings: 1, color: 'bg-green-500' },
                        ].map((func, idx) => (
                            <div key={idx} className="p-4 bg-slate-800/50 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-medium">{func.function}</h3>
                                    <span className="text-sm text-slate-400">{func.findings} findings</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-slate-700 rounded-full h-2">
                                        <div
                                            className={`${func.color} h-2 rounded-full`}
                                            style={{ width: `${func.score}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-semibold w-12 text-right">{func.score}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-slate-900 rounded-lg border border-slate-800">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-semibold">Generated Reports</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950 text-slate-400 uppercase">
                            <tr>
                                <th className="px-6 py-3">Report Name</th>
                                <th className="px-6 py-3">Framework</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Generated</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {[
                                { name: 'Q4 2024 Security Assessment', framework: 'NIST CSF', type: 'Executive Summary', date: 'Today' },
                                { name: 'PCI-DSS Compliance Audit', framework: 'PCI-DSS', type: 'Technical Report', date: 'Yesterday' },
                                { name: 'SOC 2 Type II Report', framework: 'SOC 2', type: 'Compliance Report', date: '2 days ago' },
                                { name: 'ISO 27001 Gap Analysis', framework: 'ISO 27001', type: 'Gap Analysis', date: '1 week ago' },
                            ].map((report, idx) => (
                                <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">{report.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
                                            {report.framework}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{report.type}</td>
                                    <td className="px-6 py-4 text-slate-400">{report.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button className="text-blue-400 hover:text-blue-300">View</button>
                                            <button className="text-green-400 hover:text-green-300">Download</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MITRE ATT&CK Mapping */}
            <div className="bg-slate-900 rounded-lg border border-slate-800">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-semibold">MITRE ATT&CK Technique Coverage</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-800/50 rounded-lg">
                            <h3 className="text-sm text-slate-400 mb-2">Total Techniques</h3>
                            <p className="text-3xl font-bold">156</p>
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-lg">
                            <h3 className="text-sm text-slate-400 mb-2">Covered</h3>
                            <p className="text-3xl font-bold text-green-500">124</p>
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-lg">
                            <h3 className="text-sm text-slate-400 mb-2">Coverage</h3>
                            <p className="text-3xl font-bold text-blue-500">79%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
