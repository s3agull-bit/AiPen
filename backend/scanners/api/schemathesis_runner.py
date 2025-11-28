import asyncio
import json
import subprocess
from typing import List, Dict, Any
from ..base import BaseScanner, ScanResult

class SchemathesisScanner(BaseScanner):
    def __init__(self, target: str):
        """
        target: URL to OpenAPI/Swagger schema (e.g. http://localhost:8000/openapi.json)
        """
        super().__init__(target)
        self.scanner_name = "Schemathesis"

    async def run_scan(self) -> ScanResult:
        try:
            # Run schemathesis command
            # --checks all: run all available checks
            # --junit-xml: output to junit xml (we might want json if available or parse stdout)
            # Schemathesis CLI output is hard to parse, but we can use the python library or CLI with specific format
            # For now, let's use CLI and capture output. 
            # Note: Schemathesis is better used as a library, but for consistency with other scanners we'll wrap the CLI or run a script.
            
            # Using subprocess to run schemathesis
            cmd = [
                "schemathesis", "run", 
                self.target,
                "--checks", "all",
                "--report", "junit.xml" # We'll just capture stdout for now or implement better parsing later
            ]
            
            process = await asyncio.create_subprocess_exec(
                *cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            
            stdout, stderr = await process.communicate()
            
            raw_output = stdout.decode()
            error_output = stderr.decode()
            
            # Schemathesis returns non-zero if it finds failures
            success = True
            if process.returncode != 0 and "failures" in raw_output:
                 success = True # It ran successfully, just found bugs
            elif process.returncode != 0:
                 success = False

            vulnerabilities = self.parse_results(raw_output)
            
            return ScanResult(
                scanner_name=self.scanner_name,
                vulnerabilities=vulnerabilities,
                raw_output=raw_output,
                success=success,
                error_message=error_output if not success else None
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
        # This is a simplified parser. Real implementation would parse JUnit XML or use library hooks.
        vulns = []
        lines = raw_output.split('\n')
        current_vuln = {}
        
        for line in lines:
            if "FAILED" in line:
                # Extract endpoint and method
                parts = line.split()
                if len(parts) >= 2:
                    vulns.append({
                        "title": "API Contract Violation",
                        "description": line,
                        "severity": "High"
                    })
        
        return vulns
