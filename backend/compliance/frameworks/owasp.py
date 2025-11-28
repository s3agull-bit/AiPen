OWASP_TOP_10_2021 = {
    "name": "OWASP Top 10 2021",
    "version": "2021",
    "controls": {
        "A01:2021": {
            "name": "Broken Access Control",
            "description": "Access control enforces policy such that users cannot act outside of their intended permissions.",
            "cwe_mappings": ["22", "23", "35", "59", "200", "276", "284", "285", "639"]
        },
        "A02:2021": {
            "name": "Cryptographic Failures",
            "description": "Failures related to cryptography which often lead to sensitive data exposure or system compromise.",
            "cwe_mappings": ["259", "321", "327", "328", "330", "331", "338", "798"]
        },
        "A03:2021": {
            "name": "Injection",
            "description": "User supplied data is not validated, filtered, or sanitized by the application.",
            "cwe_mappings": ["77", "78", "79", "89", "94", "502", "943"]
        },
        "A04:2021": {
            "name": "Insecure Design",
            "description": "Focuses on risks related to design flaws and architectural structures.",
            "cwe_mappings": ["73", "183", "209", "213", "235", "256", "269", "280", "311", "312", "313", "316", "419", "434", "502", "522", "525", "759", "798"]
        },
        "A05:2021": {
            "name": "Security Misconfiguration",
            "description": "Security settings are defined, implemented, and maintained as defaults.",
            "cwe_mappings": ["2", "16", "209", "319", "388", "489", "520", "526", "538", "541", "547", "611", "614", "756", "776", "942", "1004", "1035", "1173"]
        },
        "A06:2021": {
            "name": "Vulnerable and Outdated Components",
            "description": "Components, such as libraries, frameworks, and other software modules, run with the same privileges as the application.",
            "cwe_mappings": ["1104"]
        },
        "A07:2021": {
            "name": "Identification and Authentication Failures",
            "description": "Confirmation of the user's identity, authentication, and session management.",
            "cwe_mappings": ["255", "259", "287", "290", "294", "300", "302", "304", "306", "307", "384", "521", "613", "620", "640", "798"]
        },
        "A08:2021": {
            "name": "Software and Data Integrity Failures",
            "description": "Code and infrastructure that does not protect against integrity violations.",
            "cwe_mappings": ["345", "353", "424", "494", "502", "829", "830"]
        },
        "A09:2021": {
            "name": "Security Logging and Monitoring Failures",
            "description": "Failures in logging and monitoring can allow attackers to maintain access.",
            "cwe_mappings": ["117", "223", "532", "778"]
        },
        "A10:2021": {
            "name": "Server-Side Request Forgery (SSRF)",
            "description": "SSRF flaws occur whenever a web application is fetching a remote resource without validating the user-supplied URL.",
            "cwe_mappings": ["918"]
        }
    }
}
