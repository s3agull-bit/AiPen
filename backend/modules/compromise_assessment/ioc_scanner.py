"""
Indicators of Compromise (IOC) Scanner
Detects signs of system compromise
"""
import asyncio
import hashlib
import os
from typing import List, Dict, Any
from pathlib import Path

class IOCScanner:
    def __init__(self, target_path: str):
        self.target_path = target_path
        self.ioc_database = self.load_ioc_database()
        
    def load_ioc_database(self) -> Dict[str, List[str]]:
        """Load IOC database (in production, load from threat intelligence feeds)"""
        return {
            "malicious_hashes": [
                # Example MD5 hashes of known malware
                "44d88612fea8a8f36de82e1278abb02f",
                "3395856ce81f2b7382dee72602f798b6",
            ],
            "malicious_ips": [
                "192.0.2.1",  # Example malicious IP
                "198.51.100.1",
            ],
            "malicious_domains": [
                "malicious-domain.example",
                "evil-c2.example",
            ],
            "suspicious_filenames": [
                "mimikatz.exe",
                "procdump.exe",
                "psexec.exe",
            ]
        }
    
    async def scan_files(self) -> List[Dict[str, Any]]:
        """Scan files for malicious hashes and suspicious names"""
        findings = []
        
        try:
            for root, dirs, files in os.walk(self.target_path):
                for file in files:
                    file_path = os.path.join(root, file)
                    
                    # Check suspicious filename
                    if file.lower() in [f.lower() for f in self.ioc_database["suspicious_filenames"]]:
                        findings.append({
                            "type": "suspicious_file",
                            "severity": "High",
                            "file": file_path,
                            "indicator": file,
                            "description": f"Suspicious filename detected: {file}"
                        })
                    
                    # Check file hash (for small files only to avoid performance issues)
                    try:
                        if os.path.getsize(file_path) < 10 * 1024 * 1024:  # < 10MB
                            file_hash = self.calculate_md5(file_path)
                            if file_hash in self.ioc_database["malicious_hashes"]:
                                findings.append({
                                    "type": "malicious_hash",
                                    "severity": "Critical",
                                    "file": file_path,
                                    "indicator": file_hash,
                                    "description": f"Known malicious file hash detected"
                                })
                    except:
                        pass
                        
        except Exception as e:
            print(f"Error scanning files: {e}")
        
        return findings
    
    def calculate_md5(self, file_path: str) -> str:
        """Calculate MD5 hash of a file"""
        hash_md5 = hashlib.md5()
        try:
            with open(file_path, "rb") as f:
                for chunk in iter(lambda: f.read(4096), b""):
                    hash_md5.update(chunk)
            return hash_md5.hexdigest()
        except:
            return ""
    
    async def scan_network_indicators(self, log_file: str = None) -> List[Dict[str, Any]]:
        """Scan for malicious network indicators in logs"""
        findings = []
        
        # In production, parse actual network logs
        # This is a simplified example
        if log_file and os.path.exists(log_file):
            try:
                with open(log_file, 'r') as f:
                    content = f.read()
                    
                    for ip in self.ioc_database["malicious_ips"]:
                        if ip in content:
                            findings.append({
                                "type": "malicious_ip",
                                "severity": "High",
                                "indicator": ip,
                                "description": f"Communication with known malicious IP: {ip}"
                            })
                    
                    for domain in self.ioc_database["malicious_domains"]:
                        if domain in content:
                            findings.append({
                                "type": "malicious_domain",
                                "severity": "High",
                                "indicator": domain,
                                "description": f"Communication with known malicious domain: {domain}"
                            })
            except Exception as e:
                print(f"Error scanning network indicators: {e}")
        
        return findings
    
    async def run_full_scan(self) -> Dict[str, Any]:
        """Run complete IOC scan"""
        file_findings = await self.scan_files()
        network_findings = await self.scan_network_indicators()
        
        all_findings = file_findings + network_findings
        
        return {
            "scanner": "IOC Scanner",
            "target": self.target_path,
            "total_findings": len(all_findings),
            "critical": len([f for f in all_findings if f["severity"] == "Critical"]),
            "high": len([f for f in all_findings if f["severity"] == "High"]),
            "findings": all_findings
        }
