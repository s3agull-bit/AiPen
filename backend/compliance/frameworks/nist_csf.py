"""
NIST Cybersecurity Framework Mapping
"""

NIST_CSF = {
    "name": "NIST Cybersecurity Framework",
    "version": "1.1",
    "functions": {
        "ID": {
            "name": "Identify",
            "description": "Develop organizational understanding to manage cybersecurity risk",
            "categories": {
                "ID.AM": "Asset Management",
                "ID.BE": "Business Environment",
                "ID.GV": "Governance",
                "ID.RA": "Risk Assessment",
                "ID.RM": "Risk Management Strategy"
            }
        },
        "PR": {
            "name": "Protect",
            "description": "Develop and implement appropriate safeguards",
            "categories": {
                "PR.AC": "Identity Management and Access Control",
                "PR.AT": "Awareness and Training",
                "PR.DS": "Data Security",
                "PR.IP": "Information Protection Processes",
                "PR.MA": "Maintenance",
                "PR.PT": "Protective Technology"
            }
        },
        "DE": {
            "name": "Detect",
            "description": "Develop and implement activities to identify cybersecurity events",
            "categories": {
                "DE.AE": "Anomalies and Events",
                "DE.CM": "Security Continuous Monitoring",
                "DE.DP": "Detection Processes"
            }
        },
        "RS": {
            "name": "Respond",
            "description": "Develop and implement activities to take action regarding a detected incident",
            "categories": {
                "RS.RP": "Response Planning",
                "RS.CO": "Communications",
                "RS.AN": "Analysis",
                "RS.MI": "Mitigation",
                "RS.IM": "Improvements"
            }
        },
        "RC": {
            "name": "Recover",
            "description": "Develop and implement activities to maintain resilience",
            "categories": {
                "RC.RP": "Recovery Planning",
                "RC.IM": "Improvements",
                "RC.CO": "Communications"
            }
        }
    }
}

def map_finding_to_nist(finding_type: str, severity: str) -> list:
    """Map a security finding to NIST CSF categories"""
    mappings = []
    
    if "vulnerability" in finding_type.lower():
        mappings.extend(["ID.RA", "PR.IP"])  # Risk Assessment, Info Protection
    
    if "access" in finding_type.lower() or "auth" in finding_type.lower():
        mappings.append("PR.AC")  # Access Control
    
    if "encryption" in finding_type.lower() or "crypto" in finding_type.lower():
        mappings.append("PR.DS")  # Data Security
    
    if "monitoring" in finding_type.lower() or "logging" in finding_type.lower():
        mappings.append("DE.CM")  # Continuous Monitoring
    
    if "incident" in finding_type.lower() or "compromise" in finding_type.lower():
        mappings.extend(["DE.AE", "RS.AN"])  # Anomalies, Analysis
    
    return mappings
