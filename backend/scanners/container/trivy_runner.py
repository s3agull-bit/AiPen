import asyncio
import json
from typing import List, Dict, Any
from ..base import BaseScanner, ScanResult

class TrivyScanner(BaseScanner):
    def __init__(self, target: str):
        super().__init__(target)
        self.scanner_name = "Trivy"

    async def run_scan(self) -> ScanResult:
        try:
            # Run trivy command
            # image scan
            cmd = ["trivy", "image", "--format", "json", "--quiet", self.target]
            
            process = await asyncio.create_subprocess_exec(
                *cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            
            stdout, stderr = await process.communicate()
            
            raw_output = stdout.decode()
            error_output = stderr.decode()
            
            if process.returncode != 0 and not raw_output:
                return ScanResult(
                    scanner_name=self.scanner_name,
                    vulnerabilities=[],
                    raw_output=raw_output,
                    success=False,
                    error_message=error_output
                )

            vulnerabilities = self.parse_results(raw_output)
            
            return ScanResult(
                scanner_name=self.scanner_name,
                vulnerabilities=vulnerabilities,
                raw_output=raw_output,
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

    def parse_results(self, raw_output: str) -> List[Dict[str, Any]]:
        try:
            data = json.loads(raw_output)
            parsed_vulns = []
            
            results = data.get("Results", [])
            for result in results:
                target_name = result.get("Target")
                vulns = result.get("Vulnerabilities", [])
                
                for item in vulns:
                    vuln = {
                        "id": item.get("VulnerabilityID"),
                        "severity": item.get("Severity"),
                        "package": item.get("PkgName"),
                        "installed_version": item.get("InstalledVersion"),
                        "fixed_version": item.get("FixedVersion"),
                        "title": item.get("Title"),
                        "description": item.get("Description"),
                        "target": target_name,
                        "references": item.get("References", [])
                    }
                    parsed_vulns.append(vuln)
                
            return parsed_vulns
        except json.JSONDecodeError:
            return []
