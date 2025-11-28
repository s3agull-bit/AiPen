from typing import List, Dict, Any
from .frameworks.owasp import OWASP_TOP_10_2021

class ComplianceManager:
    def __init__(self):
        self.frameworks = {
            "owasp_top_10_2021": OWASP_TOP_10_2021
        }

    def map_vulnerabilities(self, vulnerabilities: List[Dict[str, Any]], framework_id: str) -> Dict[str, Any]:
        """
        Map a list of vulnerabilities to a specific compliance framework.
        """
        framework = self.frameworks.get(framework_id)
        if not framework:
            raise ValueError(f"Framework {framework_id} not found")

        report = {
            "framework_id": framework_id,
            "framework_name": framework["name"],
            "compliance_score": 100.0,
            "controls": {}
        }

        # Initialize controls
        for control_id, control_data in framework["controls"].items():
            report["controls"][control_id] = {
                "name": control_data["name"],
                "description": control_data["description"],
                "status": "PASSED",
                "findings": []
            }

        # Map findings
        total_controls = len(framework["controls"])
        failed_controls = 0

        for vuln in vulnerabilities:
            # Try to map by CWE
            cwe_id = vuln.get("cwe_id")
            if cwe_id:
                # Find which control this CWE belongs to
                # This is a simplified mapping logic
                for control_id, control_data in framework["controls"].items():
                    if str(cwe_id) in control_data.get("cwe_mappings", []):
                        report["controls"][control_id]["status"] = "FAILED"
                        report["controls"][control_id]["findings"].append(vuln)
                        failed_controls += 1
                        break
            
            # Fallback: map by keyword matching if needed
            # ...

        # Calculate score
        if total_controls > 0:
            report["compliance_score"] = ((total_controls - failed_controls) / total_controls) * 100

        return report
