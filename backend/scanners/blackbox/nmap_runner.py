import asyncio
import nmap
from typing import List, Dict, Any
from .base import BaseScanner, ScanResult

class NmapScanner(BaseScanner):
    def __init__(self, target: str, arguments: str = "-sV --script vuln -T4"):
        super().__init__(target)
        self.scanner_name = "Nmap"
        self.arguments = arguments
        self.nm = nmap.PortScanner()

    async def run_scan(self) -> ScanResult:
        try:
            # Run nmap scan in a thread since it's blocking
            loop = asyncio.get_event_loop()
            await loop.run_in_executor(None, self.nm.scan, self.target, self.arguments)
            
            # Parse results
            scan_data = self.nm.csv()
            
            return ScanResult(
                scanner_name=self.scanner_name,
                vulnerabilities=self.parse_results(self.nm.all_hosts()),
                raw_output=scan_data,
                success=True
            )
            
        except Exception as e:
            return ScanResult(
                scanner_name=self.scanner_name,
                vulnerabilities=[],
                raw_output="",
                success=False,
                error_message=str(e)
            )

    def parse_results(self, hosts: List[str]) -> List[Dict[str, Any]]:
        results = []
        for host in hosts:
            if host not in self.nm.all_hosts():
                continue
                
            host_data = self.nm[host]
            
            # Check open ports
            for proto in host_data.all_protocols():
                ports = host_data[proto].keys()
                for port in ports:
                    service = host_data[proto][port]
                    if service['state'] == 'open':
                        results.append({
                            "host": host,
                            "port": port,
                            "protocol": proto,
                            "service": service.get('name'),
                            "product": service.get('product'),
                            "version": service.get('version'),
                            "severity": "Info", # Open ports are info unless vulnerable
                            "message": f"Open port {port}/{proto} running {service.get('name')}"
                        })
        return results
