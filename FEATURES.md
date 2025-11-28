# Security Platform - Enhanced Features

## Overview

The Security Platform now includes comprehensive **Compromise Assessment** and **Red Teaming** capabilities with advanced multi-framework compliance reporting.

## New Modules

### 1. Compromise Assessment Module

**Purpose**: Detect and analyze indicators of compromise (IOCs) in your environment.

**Features**:
- **IOC Scanner**: Scans for malicious file hashes, suspicious IPs, domains, and filenames
- **Threat Hunting**: Pre-configured queries for common attack patterns
- **Timeline Analysis**: Chronological view of security events
- **Real-time Monitoring**: Continuous detection of compromise indicators

**Dashboard**: `/compromise-assessment`
- IOC detection metrics
- Threat timeline
- Active threat hunting queries
- Malicious file quarantine status

**Backend Module**: `backend/modules/compromise_assessment/ioc_scanner.py`

### 2. Red Team Operations Module

**Purpose**: Conduct adversary emulation based on MITRE ATT&CK framework.

**Features**:
- **MITRE ATT&CK Mapping**: Full coverage of tactics and techniques
- **Adversary Emulation**: Simulate real-world attack scenarios
- **Tactical Execution**: Test Initial Access, Persistence, Privilege Escalation, Lateral Movement
- **Coverage Heatmap**: Visual representation of tested techniques

**Dashboard**: `/red-team`
- MITRE ATT&CK coverage heatmap (12 tactics)
- Recent operations tracking
- Adversary profile library (APT29, APT28, Lazarus, FIN7)
- Attack simulation statistics

**Backend Module**: `backend/modules/red_team/operations.py`

### 3. Advanced Reporting Engine

**Purpose**: Generate compliance reports for multiple security frameworks.

**Supported Frameworks**:

#### MITRE ATT&CK
- Technique coverage analysis
- Tactic-based heatmaps
- Adversary behavior mapping

#### NIST Cybersecurity Framework (CSF)
- 5 Core Functions: Identify, Protect, Detect, Respond, Recover
- Category-level compliance scoring
- Gap analysis and recommendations

#### PCI-DSS v4.0
- All 12 requirements coverage
- Cardholder data protection controls
- Network security validation

#### SOC 2
- Trust Service Criteria mapping
- Control evidence collection
- Continuous compliance monitoring

#### ISO 27001:2022
- Annex A controls assessment
- Risk-based compliance scoring
- Management system integration

#### OWASP Top 10 2021
- Vulnerability mapping to OWASP categories
- Risk prioritization
- Remediation tracking

**Dashboard**: `/reports`
- Framework selection and scoring
- Detailed compliance breakdowns
- Report generation and export
- Historical trend analysis

**Backend Module**: `backend/reports/generator.py`

## Framework Mappings

### MITRE ATT&CK Integration

The platform automatically maps security findings to MITRE ATT&CK techniques:

```python
# Example: SQL Injection → T1190 (Exploit Public-Facing Application)
# Authentication Issues → T1078, T1110 (Valid Accounts, Brute Force)
# RCE → T1190, T1059 (Exploit Public-Facing App, Command Interpreter)
```

**Tactics Covered**:
- TA0001: Initial Access
- TA0002: Execution
- TA0003: Persistence
- TA0004: Privilege Escalation
- TA0005: Defense Evasion
- TA0006: Credential Access
- TA0007: Discovery
- TA0008: Lateral Movement
- TA0009: Collection
- TA0010: Exfiltration
- TA0011: Command and Control
- TA0040: Impact

### NIST CSF Integration

Findings are mapped to NIST CSF categories:

- **ID.RA**: Risk Assessment (vulnerabilities)
- **PR.AC**: Access Control (authentication)
- **PR.DS**: Data Security (encryption)
- **DE.CM**: Continuous Monitoring (logging)
- **RS.AN**: Analysis (incident response)

## API Endpoints (To Be Implemented)

```
POST /api/compromise-assessment/scan
GET  /api/compromise-assessment/iocs
POST /api/red-team/operation
GET  /api/red-team/operations
POST /api/reports/generate
GET  /api/reports/{framework}
GET  /api/mitre/heatmap
```

## Usage Examples

### Running IOC Scan

```python
from modules.compromise_assessment.ioc_scanner import IOCScanner

scanner = IOCScanner(target_path="/path/to/scan")
results = await scanner.run_full_scan()
print(f"Found {results['total_findings']} IOCs")
```

### Executing Red Team Operation

```python
from modules.red_team.operations import RedTeamOperation

operation = RedTeamOperation("Operation Phoenix", "production-network")
report = await operation.execute_full_operation()
print(f"Executed {report['tactics_executed']} tactics")
```

### Generating Compliance Report

```python
from reports.generator import ReportGenerator

generator = ReportGenerator()
nist_report = generator.generate_nist_csf_report(findings)
print(f"NIST CSF Score: {nist_report['overall_score']}")
```

## Next Steps

1. **API Integration**: Connect frontend dashboards to backend modules
2. **Database Models**: Create schemas for storing scan results and reports
3. **Scheduled Scans**: Implement automated compromise assessment scans
4. **Custom Rules**: Add ability to define custom IOC patterns
5. **Export Formats**: Add PDF, CSV, and JSON export for all reports
6. **Trend Analysis**: Implement historical tracking and metrics
7. **Alerting**: Add real-time notifications for critical findings

## Access the Features

1. **Start the application**:
   ```bash
   cd security-platform
   docker-compose up -d
   ```

2. **Access dashboards**:
   - Main Dashboard: http://localhost:3000
   - Compromise Assessment: http://localhost:3000/compromise-assessment
   - Red Team Operations: http://localhost:3000/red-team
   - Compliance Reports: http://localhost:3000/reports

3. **API Documentation**: http://localhost:8000/docs
