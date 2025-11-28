import asyncio
import time
from typing import List, Dict, Any
from zapv2 import ZAPv2
from ..base import BaseScanner, ScanResult

class ZapScanner(BaseScanner):
    def __init__(self, target: str, api_key: str = "", proxy_url: str = "http://zap:8080"):
        super().__init__(target)
        self.scanner_name = "OWASP ZAP"
        self.zap = ZAPv2(apikey=api_key, proxies={'http': proxy_url, 'https': proxy_url})

    async def run_scan(self) -> ScanResult:
        try:
            # 1. Spider the target
            print(f'Spidering target {self.target}')
            scan_id = self.zap.spider.scan(self.target)
            while int(self.zap.spider.status(scan_id)) < 100:
                await asyncio.sleep(2)
            
            # 2. Active Scan
            print(f'Active Scanning target {self.target}')
            scan_id = self.zap.ascan.scan(self.target)
            while int(self.zap.ascan.status(scan_id)) < 100:
                await asyncio.sleep(5)
                
            # 3. Get Alerts
            alerts = self.zap.core.alerts(baseurl=self.target)
            
            return ScanResult(
                scanner_name=self.scanner_name,
                vulnerabilities=self.parse_results(alerts),
                raw_output=str(alerts),
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

    def parse_results(self, raw_output: Any) -> List[Dict[str, Any]]:
        # raw_output is already a list of dicts from zap.core.alerts
        if isinstance(raw_output, str):
            return [] # Should be list
            
        parsed_vulns = []
        for alert in raw_output:
            vuln = {
                "id": alert.get("pluginId"),
                "name": alert.get("alert"),
                "severity": alert.get("risk"),
                "description": alert.get("description"),
                "solution": alert.get("solution"),
                "url": alert.get("url"),
                "evidence": alert.get("evidence"),
                "cwe_id": alert.get("cweid"),
                "wasc_id": alert.get("wascid")
            }
            parsed_vulns.append(vuln)
            
        return parsed_vulns
