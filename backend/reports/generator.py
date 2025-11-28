"""
Advanced Report Generator
Supports multiple compliance frameworks and report types
"""
from typing import List, Dict, Any
from datetime import datetime
import json

class ReportGenerator:
    def __init__(self):
        self.report_types = [
            "executive_summary",
            "technical_findings",
            "mitre_attack_heatmap",
            "nist_csf_report",
            "pci_dss_report",
            "soc2_report",
            "iso27001_report",
            "compromise_assessment",
            "red_team_report"
        ]
    
    def generate_executive_summary(self, findings: List[Dict], metrics: Dict) -> Dict[str, Any]:
        """Generate executive-level summary report"""
        critical_count = len([f for f in findings if f.get("severity") == "Critical"])
        high_count = len([f for f in findings if f.get("severity") == "High"])
        medium_count = len([f for f in findings if f.get("severity") == "Medium"])
        
        return {
            "report_type": "Executive Summary",
            "generated_at": datetime.now().isoformat(),
            "overview": {
                "total_findings": len(findings),
                "critical_issues": critical_count,
                "high_issues": high_count,
                "medium_issues": medium_count,
                "risk_score": self.calculate_risk_score(critical_count, high_count, medium_count)
            },
            "key_findings": self.get_top_findings(findings, limit=5),
            "recommendations": self.generate_recommendations(findings),
            "compliance_status": metrics.get("compliance_scores", {})
        }
    
    def generate_mitre_heatmap(self, red_team_results: Dict) -> Dict[str, Any]:
        """Generate MITRE ATT&CK heatmap data"""
        tactics_coverage = {}
        
        if "mitre_coverage" in red_team_results:
            for tactic in red_team_results["mitre_coverage"]:
                tactic_id = tactic.get("tactic")
                tactic_name = tactic.get("tactic_name")
                techniques_count = len(tactic.get("techniques_tested", []))
                
                tactics_coverage[tactic_id] = {
                    "name": tactic_name,
                    "techniques_tested": techniques_count,
                    "coverage_level": "high" if techniques_count > 2 else "medium"
                }
        
        return {
            "report_type": "MITRE ATT&CK Heatmap",
            "generated_at": datetime.now().isoformat(),
            "tactics_coverage": tactics_coverage,
            "total_tactics_tested": len(tactics_coverage),
            "visualization_data": self.prepare_heatmap_visualization(tactics_coverage)
        }
    
    def generate_nist_csf_report(self, findings: List[Dict]) -> Dict[str, Any]:
        """Generate NIST Cybersecurity Framework compliance report"""
        from .frameworks.nist_csf import NIST_CSF, map_finding_to_nist
        
        function_coverage = {
            "ID": {"findings": [], "score": 100},
            "PR": {"findings": [], "score": 100},
            "DE": {"findings": [], "score": 100},
            "RS": {"findings": [], "score": 100},
            "RC": {"findings": [], "score": 100}
        }
        
        for finding in findings:
            categories = map_finding_to_nist(
                finding.get("type", ""),
                finding.get("severity", "")
            )
            for category in categories:
                function = category.split(".")[0]
                if function in function_coverage:
                    function_coverage[function]["findings"].append(finding)
                    # Reduce score based on severity
                    if finding.get("severity") == "Critical":
                        function_coverage[function]["score"] -= 20
                    elif finding.get("severity") == "High":
                        function_coverage[function]["score"] -= 10
        
        return {
            "report_type": "NIST CSF Compliance Report",
            "generated_at": datetime.now().isoformat(),
            "framework": "NIST Cybersecurity Framework 1.1",
            "function_coverage": function_coverage,
            "overall_score": sum(f["score"] for f in function_coverage.values()) / len(function_coverage),
            "recommendations": self.generate_nist_recommendations(function_coverage)
        }
    
    def generate_pci_dss_report(self, findings: List[Dict]) -> Dict[str, Any]:
        """Generate PCI-DSS compliance report"""
        requirements = {
            "1": "Install and maintain firewall configuration",
            "2": "Do not use vendor-supplied defaults",
            "3": "Protect stored cardholder data",
            "4": "Encrypt transmission of cardholder data",
            "5": "Protect systems against malware",
            "6": "Develop secure systems and applications",
            "7": "Restrict access to cardholder data",
            "8": "Identify and authenticate access",
            "9": "Restrict physical access",
            "10": "Track and monitor network access",
            "11": "Regularly test security systems",
            "12": "Maintain information security policy"
        }
        
        compliance_status = {}
        for req_id, req_name in requirements.items():
            compliance_status[req_id] = {
                "requirement": req_name,
                "status": "Compliant",  # Would be determined by actual findings
                "findings": []
            }
        
        return {
            "report_type": "PCI-DSS Compliance Report",
            "generated_at": datetime.now().isoformat(),
            "framework": "PCI-DSS v4.0",
            "requirements": compliance_status,
            "compliance_percentage": 85  # Calculate based on actual findings
        }
    
    def calculate_risk_score(self, critical: int, high: int, medium: int) -> int:
        """Calculate overall risk score (0-100)"""
        score = 100
        score -= critical * 20
        score -= high * 10
        score -= medium * 5
        return max(0, score)
    
    def get_top_findings(self, findings: List[Dict], limit: int = 5) -> List[Dict]:
        """Get top N critical findings"""
        sorted_findings = sorted(
            findings,
            key=lambda x: {"Critical": 0, "High": 1, "Medium": 2, "Low": 3}.get(x.get("severity", "Low"), 4)
        )
        return sorted_findings[:limit]
    
    def generate_recommendations(self, findings: List[Dict]) -> List[str]:
        """Generate remediation recommendations"""
        recommendations = []
        
        if any(f.get("severity") == "Critical" for f in findings):
            recommendations.append("Immediately address all critical vulnerabilities")
        
        if any("auth" in str(f).lower() for f in findings):
            recommendations.append("Implement multi-factor authentication")
        
        if any("encryption" in str(f).lower() for f in findings):
            recommendations.append("Enable encryption for data at rest and in transit")
        
        recommendations.append("Conduct regular security assessments")
        recommendations.append("Implement continuous monitoring")
        
        return recommendations
    
    def generate_nist_recommendations(self, function_coverage: Dict) -> List[str]:
        """Generate NIST-specific recommendations"""
        recommendations = []
        
        for function, data in function_coverage.items():
            if data["score"] < 70:
                recommendations.append(
                    f"Improve {function} function - current score: {data['score']}"
                )
        
        return recommendations
    
    def prepare_heatmap_visualization(self, tactics_coverage: Dict) -> Dict:
        """Prepare data for MITRE ATT&CK heatmap visualization"""
        return {
            "type": "heatmap",
            "data": [
                {
                    "tactic_id": tid,
                    "tactic_name": data["name"],
                    "coverage": data["coverage_level"],
                    "techniques_count": data["techniques_tested"]
                }
                for tid, data in tactics_coverage.items()
            ]
        }
