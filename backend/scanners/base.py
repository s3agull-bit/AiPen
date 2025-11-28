from abc import ABC, abstractmethod
from typing import Dict, List, Any
from pydantic import BaseModel

class ScanResult(BaseModel):
    scanner_name: str
    vulnerabilities: List[Dict[str, Any]]
    raw_output: str
    success: bool
    error_message: str = None

class BaseScanner(ABC):
    def __init__(self, target: str):
        self.target = target

    @abstractmethod
    async def run_scan(self) -> ScanResult:
        """
        Run the security scan against the target.
        """
        pass

    @abstractmethod
    def parse_results(self, raw_output: str) -> List[Dict[str, Any]]:
        """
        Parse the raw output from the scanner tool into a structured format.
        """
        pass
