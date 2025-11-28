'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
        targets: [],
        scanTypes: [],
        schedule: 'manual',
        frequency: 'weekly',
        notifications: {
            email: true,
            slack: false,
            critical: true,
        },
    });

    const totalSteps = 5;

    const updateFormData = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        // Submit project creation
        console.log('Creating project:', formData);
        router.push('/projects');
    };

    return (
        <div className="min-h-screen p-8 cyber-grid">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Create New Project
                </h1>
                <p className="text-slate-400">Configure your security assessment scope</p>
            </div>

            {/* Progress Bar */}
            <div className="glass-card p-6 mb-8">
                <div className="flex justify-between mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className="flex items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${s < step ? 'bg-gradient-to-r from-green-500 to-emerald-600 neon-glow-blue' :
                                    s === step ? 'bg-gradient-to-r from-cyan-500 to-blue-600 neon-glow-blue scale-110' :
                                        'bg-slate-800 text-slate-500'
                                }`}>
                                {s < step ? '✓' : s}
                            </div>
                            {s < 5 && (
                                <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${s < step ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-slate-800'
                                    }`}></div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                    <span>Basic Info</span>
                    <span>Targets</span>
                    <span>Scan Types</span>
                    <span>Schedule</span>
                    <span>Review</span>
                </div>
            </div>

            {/* Step Content */}
            <div className="glass-card p-8">
                {/* Step 1: Basic Information */}
                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Project Information</h2>

                        <div>
                            <label className="block text-sm font-medium mb-2">Project Name *</label>
                            <input
                                type="text"
                                value={formData.projectName}
                                onChange={(e) => updateFormData('projectName', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                                placeholder="e.g., Production Infrastructure Assessment"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => updateFormData('description', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                                placeholder="Describe the scope and objectives of this security assessment..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Industry</label>
                                <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-cyan-500 outline-none">
                                    <option>Financial Services</option>
                                    <option>Healthcare</option>
                                    <option>Technology</option>
                                    <option>Retail</option>
                                    <option>Government</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Compliance Framework</label>
                                <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-cyan-500 outline-none">
                                    <option>PCI-DSS</option>
                                    <option>SOC 2</option>
                                    <option>ISO 27001</option>
                                    <option>HIPAA</option>
                                    <option>GDPR</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Target Selection */}
                {step === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Define Targets</h2>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {[
                                { type: 'Web Application', icon: '🌐', desc: 'Websites and web apps' },
                                { type: 'API Endpoints', icon: '🔌', desc: 'REST/GraphQL APIs' },
                                { type: 'Network Range', icon: '🌍', desc: 'IP ranges and subnets' },
                                { type: 'Cloud Infrastructure', icon: '☁️', desc: 'AWS, Azure, GCP' },
                                { type: 'Mobile Apps', icon: '📱', desc: 'iOS and Android' },
                                { type: 'Containers', icon: '🐳', desc: 'Docker images' },
                            ].map((target, idx) => (
                                <div key={idx} className="glass-card p-4 cursor-pointer hover:scale-105 transition-all group">
                                    <div className="text-3xl mb-2">{target.icon}</div>
                                    <h3 className="font-semibold mb-1">{target.type}</h3>
                                    <p className="text-xs text-slate-400">{target.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Target URLs/IPs *</label>
                            <textarea
                                rows={6}
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all font-mono text-sm"
                                placeholder="Enter targets (one per line):&#10;https://example.com&#10;192.168.1.0/24&#10;api.example.com"
                            />
                        </div>

                        <div className="glass-card p-4 bg-blue-500/10 border-blue-500/30">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">💡</span>
                                <div>
                                    <h4 className="font-semibold mb-1">Pro Tip</h4>
                                    <p className="text-sm text-slate-300">You can import targets from a file or integrate with your asset management system.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Scan Types */}
                {step === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Select Scan Types</h2>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'SAST', desc: 'Static Application Security Testing', icon: '📝', recommended: true },
                                { name: 'DAST', desc: 'Dynamic Application Security Testing', icon: '🔍', recommended: true },
                                { name: 'SCA', desc: 'Software Composition Analysis', icon: '📦', recommended: true },
                                { name: 'Container Scan', desc: 'Docker & Kubernetes Security', icon: '🐳', recommended: false },
                                { name: 'API Security', desc: 'REST/GraphQL API Testing', icon: '🔌', recommended: true },
                                { name: 'Network Scan', desc: 'Port & Service Discovery', icon: '🌐', recommended: false },
                                { name: 'Secrets Detection', desc: 'Find Exposed Credentials', icon: '🔑', recommended: true },
                                { name: 'Compliance Check', desc: 'Framework Validation', icon: '✓', recommended: false },
                            ].map((scan, idx) => (
                                <div key={idx} className="glass-card p-4 cursor-pointer hover:scale-105 transition-all relative">
                                    {scan.recommended && (
                                        <span className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-xs font-bold">
                                            Recommended
                                        </span>
                                    )}
                                    <div className="flex items-start gap-3">
                                        <div className="text-3xl">{scan.icon}</div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <input type="checkbox" className="w-4 h-4" defaultChecked={scan.recommended} />
                                                <h3 className="font-semibold">{scan.name}</h3>
                                            </div>
                                            <p className="text-sm text-slate-400">{scan.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 4: Schedule */}
                {step === 4 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Schedule & Notifications</h2>

                        <div>
                            <label className="block text-sm font-medium mb-3">Scan Schedule</label>
                            <div className="grid grid-cols-3 gap-4">
                                {['Manual', 'Daily', 'Weekly', 'Monthly'].map((freq) => (
                                    <div
                                        key={freq}
                                        className={`glass-card p-4 cursor-pointer text-center transition-all ${formData.schedule === freq.toLowerCase() ? 'border-cyan-500 neon-glow-blue' : ''
                                            }`}
                                        onClick={() => updateFormData('schedule', freq.toLowerCase())}
                                    >
                                        <h3 className="font-semibold">{freq}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-3">Notification Preferences</label>
                            <div className="space-y-3">
                                {[
                                    { key: 'email', label: 'Email Notifications', desc: 'Receive scan reports via email' },
                                    { key: 'slack', label: 'Slack Integration', desc: 'Post updates to Slack channel' },
                                    { key: 'critical', label: 'Critical Alerts Only', desc: 'Only notify for critical findings' },
                                ].map((notif) => (
                                    <div key={notif.key} className="glass-card p-4 flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">{notif.label}</h4>
                                            <p className="text-sm text-slate-400">{notif.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-blue-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Review & Confirm */}
                {step === 5 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Review & Confirm</h2>

                        <div className="space-y-4">
                            <div className="glass-card p-4">
                                <h3 className="font-semibold mb-2">Project Details</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-slate-400">Name:</span>
                                        <span className="ml-2 font-medium">{formData.projectName || 'Not set'}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400">Schedule:</span>
                                        <span className="ml-2 font-medium capitalize">{formData.schedule}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-4">
                                <h3 className="font-semibold mb-2">Scan Configuration</h3>
                                <p className="text-sm text-slate-400">8 scan types selected • 3 targets configured</p>
                            </div>

                            <div className="glass-card p-4 bg-green-500/10 border-green-500/30">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">✓</span>
                                    <div>
                                        <h4 className="font-semibold">Ready to Launch</h4>
                                        <p className="text-sm text-slate-300">Your project is configured and ready to start scanning</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                    <button
                        onClick={prevStep}
                        disabled={step === 1}
                        className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ← Previous
                    </button>

                    {step < totalSteps ? (
                        <button
                            onClick={nextStep}
                            className="cyber-button"
                        >
                            <span className="relative z-10">Next →</span>
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="cyber-button"
                        >
                            <span className="relative z-10">🚀 Create Project</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
