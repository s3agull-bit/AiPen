"""
MITRE ATT&CK Framework Mapping
Tactics and Techniques for Enterprise Matrix
"""

MITRE_ATTACK_TACTICS = {
    "TA0001": {
        "name": "Initial Access",
        "description": "Trying to get into your network",
        "techniques": ["T1190", "T1133", "T1566", "T1078"]
    },
    "TA0002": {
        "name": "Execution",
        "description": "Trying to run malicious code",
        "techniques": ["T1059", "T1203", "T1204", "T1053"]
    },
    "TA0003": {
        "name": "Persistence",
        "description": "Trying to maintain their foothold",
        "techniques": ["T1053", "T1136", "T1547", "T1543"]
    },
    "TA0004": {
        "name": "Privilege Escalation",
        "description": "Trying to gain higher-level permissions",
        "techniques": ["T1068", "T1078", "T1134", "T1548"]
    },
    "TA0005": {
        "name": "Defense Evasion",
        "description": "Trying to avoid being detected",
        "techniques": ["T1027", "T1036", "T1055", "T1070"]
    },
    "TA0006": {
        "name": "Credential Access",
        "description": "Stealing account names and passwords",
        "techniques": ["T1003", "T1110", "T1555", "T1558"]
    },
    "TA0007": {
        "name": "Discovery",
        "description": "Trying to figure out your environment",
        "techniques": ["T1087", "T1018", "T1083", "T1046"]
    },
    "TA0008": {
        "name": "Lateral Movement",
        "description": "Moving through your environment",
        "techniques": ["T1021", "T1091", "T1210", "T1534"]
    },
    "TA0009": {
        "name": "Collection",
        "description": "Gathering data of interest",
        "techniques": ["T1005", "T1039", "T1056", "T1113"]
    },
    "TA0010": {
        "name": "Exfiltration",
        "description": "Stealing data",
        "techniques": ["T1020", "T1030", "T1048", "T1567"]
    },
    "TA0011": {
        "name": "Command and Control",
        "description": "Communicating with compromised systems",
        "techniques": ["T1071", "T1090", "T1095", "T1105"]
    },
    "TA0040": {
        "name": "Impact",
        "description": "Manipulate, interrupt, or destroy systems and data",
        "techniques": ["T1485", "T1486", "T1490", "T1498"]
    }
}

MITRE_TECHNIQUES = {
    "T1190": {"name": "Exploit Public-Facing Application", "tactic": "TA0001"},
    "T1133": {"name": "External Remote Services", "tactic": "TA0001"},
    "T1566": {"name": "Phishing", "tactic": "TA0001"},
    "T1078": {"name": "Valid Accounts", "tactic": "TA0001"},
    "T1059": {"name": "Command and Scripting Interpreter", "tactic": "TA0002"},
    "T1003": {"name": "OS Credential Dumping", "tactic": "TA0006"},
    "T1110": {"name": "Brute Force", "tactic": "TA0006"},
    "T1046": {"name": "Network Service Discovery", "tactic": "TA0007"},
    "T1021": {"name": "Remote Services", "tactic": "TA0008"},
    "T1071": {"name": "Application Layer Protocol", "tactic": "TA0011"},
}

def map_vulnerability_to_mitre(vuln_type: str, description: str) -> list:
    """Map a vulnerability to MITRE ATT&CK techniques"""
    mappings = []
    
    # SQL Injection
    if "sql" in vuln_type.lower() or "injection" in description.lower():
        mappings.append("T1190")  # Exploit Public-Facing Application
    
    # Authentication issues
    if "auth" in vuln_type.lower() or "password" in description.lower():
        mappings.extend(["T1078", "T1110"])
    
    # Remote code execution
    if "rce" in vuln_type.lower() or "remote code" in description.lower():
        mappings.extend(["T1190", "T1059"])
    
    # Network scanning findings
    if "port" in description.lower() or "service" in description.lower():
        mappings.append("T1046")
    
    return mappings
