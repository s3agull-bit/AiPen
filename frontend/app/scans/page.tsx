export default function ScansPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Security Scans</h1>
                <div className="flex gap-3">
                    <select className="bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm">
                        <option>All Projects</option>
                        <option>payment-service</option>
                        <option>frontend-app</option>
                    </select>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                        Start New Scan
                    </button>
                </div>
            </div>

            <div className="bg-slate-900 rounded-lg border border-slate-800">
                <div className="p-6 border-b border-slate-800 flex gap-4">
                    <button className="text-blue-400 border-b-2 border-blue-400 pb-2 font-medium">All Scans</button>
                    <button className="text-slate-400 hover:text-slate-200 pb-2 font-medium">Scheduled</button>
                    <button className="text-slate-400 hover:text-slate-200 pb-2 font-medium">Templates</button>
                </div>

                {/* Placeholder for scan list */}
                <div className="p-12 text-center text-slate-500">
                    <p>Connect a project to start scanning.</p>
                </div>
            </div>
        </div>
    );
}
