import asyncio
import json
import subprocess
from typing import List, Dict, Any
from .base import BaseScanner, ScanResult

class SemgrepScanner(BaseScanner):
    def __init__(self, target: str):
        super().__init__(target)
        self.scanner_name = "Semgrep"

    async def run_scan(self) -> ScanResult:
        try:
            # Run semgrep command
            # --json for machine readable output
            # --config=auto to use default rules
            cmd = ["semgrep", "--json", "--config=auto", self.target]
            
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
            results = data.get("results", [])
            parsed_vulns = []
            
            for item in results:
                vuln = {
                    "id": item.get("check_id"),
                    "severity": item.get("extra", {}).get("severity"),
                    "message": item.get("extra", {}).get("message"),
                    "file": item.get("path"),
                    "line": item.get("start", {}).get("line"),
                    "code": item.get("extra", {}).get("lines"),
                    "metadata": item.get("extra", {}).get("metadata", {})
                }
                parsed_vulns.append(vuln)
                
            return parsed_vulns
        except json.JSONDecodeError:
            return []
