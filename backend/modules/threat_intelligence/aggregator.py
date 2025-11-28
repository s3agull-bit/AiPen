"""
Threat Intelligence Integration
OpenCTI and MISP Integration for IOC Enrichment
"""
import asyncio
import httpx
from typing import List, Dict, Any
from datetime import datetime

class ThreatIntelligence:
    def __init__(self, opencti_url: str = None, misp_url: str = None):
        self.opencti_url = opencti_url or "http://opencti:8080"
        self.misp_url = misp_url or "http://misp:80"
        self.opencti_token = None  # Set from environment
        self.misp_token = None  # Set from environment
        
    async def enrich_ioc(self, ioc: str, ioc_type: str) -> Dict[str, Any]:
        """Enrich an IOC with threat intelligence from OpenCTI and MISP"""
        enrichment = {
            "ioc": ioc,
            "type": ioc_type,
            "sources": [],
            "threat_actors": [],
            "campaigns": [],
            "malware_families": [],
            "confidence": 0,
            "last_seen": None,
            "tags": []
        }
        
        # Query OpenCTI
        opencti_data = await self.query_opencti(ioc, ioc_type)
        if opencti_data:
            enrichment["sources"].append("OpenCTI")
            enrichment["threat_actors"].extend(opencti_data.get("threat_actors", []))
            enrichment["campaigns"].extend(opencti_data.get("campaigns", []))
            enrichment["confidence"] = max(enrichment["confidence"], opencti_data.get("confidence", 0))
        
        # Query MISP
        misp_data = await self.query_misp(ioc, ioc_type)
        if misp_data:
            enrichment["sources"].append("MISP")
            enrichment["malware_families"].extend(misp_data.get("malware", []))
            enrichment["tags"].extend(misp_data.get("tags", []))
            if misp_data.get("last_seen"):
                enrichment["last_seen"] = misp_data["last_seen"]
        
        return enrichment
    
    async def query_opencti(self, ioc: str, ioc_type: str) -> Dict[str, Any]:
        """Query OpenCTI for threat intelligence"""
        # Simulated OpenCTI response
        # In production, use actual OpenCTI GraphQL API
        if ioc_type == "ip":
            return {
                "threat_actors": ["APT29", "Lazarus Group"],
                "campaigns": ["SolarWinds Compromise"],
                "confidence": 85,
                "ttps": ["T1071", "T1090"]
            }
        elif ioc_type == "hash":
            return {
                "threat_actors": ["APT28"],
                "campaigns": ["NotPetya"],
                "confidence": 90,
                "ttps": ["T1486", "T1490"]
            }
        return {}
    
    async def query_misp(self, ioc: str, ioc_type: str) -> Dict[str, Any]:
        """Query MISP for threat intelligence"""
        # Simulated MISP response
        # In production, use actual MISP REST API
        if ioc_type == "domain":
            return {
                "malware": ["Emotet", "TrickBot"],
                "tags": ["phishing", "c2"],
                "last_seen": "2024-01-15",
                "events": 12
            }
        elif ioc_type == "hash":
            return {
                "malware": ["Cobalt Strike"],
                "tags": ["ransomware", "lateral-movement"],
                "last_seen": "2024-01-20",
                "events": 8
            }
        return {}
    
    async def get_threat_actor_profile(self, actor_name: str) -> Dict[str, Any]:
        """Get detailed threat actor profile"""
        # Simulated threat actor profiles
        profiles = {
            "APT29": {
                "name": "APT29 (Cozy Bear)",
                "aliases": ["The Dukes", "Cozy Bear", "CozyDuke"],
                "origin": "Russia",
                "first_seen": "2008",
                "sophistication": "Advanced",
                "motivations": ["Espionage", "Intelligence Gathering"],
                "targets": ["Government", "Think Tanks", "Technology"],
                "ttps": [
                    {"id": "T1566", "name": "Phishing", "frequency": "High"},
                    {"id": "T1071", "name": "Application Layer Protocol", "frequency": "High"},
                    {"id": "T1027", "name": "Obfuscated Files", "frequency": "Medium"}
                ],
                "malware": ["WellMess", "WellMail", "SolarWinds SUNBURST"],
                "recent_campaigns": [
                    {"name": "SolarWinds Compromise", "date": "2020-12", "impact": "Critical"},
                    {"name": "COVID-19 Research Targeting", "date": "2020-07", "impact": "High"}
                ]
            },
            "Lazarus Group": {
                "name": "Lazarus Group",
                "aliases": ["HIDDEN COBRA", "Guardians of Peace"],
                "origin": "North Korea",
                "first_seen": "2009",
                "sophistication": "Advanced",
                "motivations": ["Financial Gain", "Espionage", "Disruption"],
                "targets": ["Financial", "Cryptocurrency", "Media"],
                "ttps": [
                    {"id": "T1566", "name": "Phishing", "frequency": "High"},
                    {"id": "T1486", "name": "Data Encrypted for Impact", "frequency": "High"},
                    {"id": "T1105", "name": "Ingress Tool Transfer", "frequency": "Medium"}
                ],
                "malware": ["WannaCry", "BLINDINGCAN", "HOPLIGHT"],
                "recent_campaigns": [
                    {"name": "AppleJeus", "date": "2023-11", "impact": "High"},
                    {"name": "Cryptocurrency Exchange Attacks", "date": "2023-08", "impact": "Critical"}
                ]
            }
        }
        
        return profiles.get(actor_name, {})
    
    async def get_threat_feeds(self) -> List[Dict[str, Any]]:
        """Get aggregated threat feeds from multiple sources"""
        feeds = [
            {
                "source": "OpenCTI",
                "type": "Malicious IPs",
                "count": 1247,
                "last_updated": datetime.now().isoformat(),
                "confidence": "High"
            },
            {
                "source": "MISP",
                "type": "Malware Hashes",
                "count": 3421,
                "last_updated": datetime.now().isoformat(),
                "confidence": "High"
            },
            {
                "source": "OpenCTI",
                "type": "C2 Domains",
                "count": 892,
                "last_updated": datetime.now().isoformat(),
                "confidence": "Medium"
            },
            {
                "source": "MISP",
                "type": "Phishing URLs",
                "count": 2156,
                "last_updated": datetime.now().isoformat(),
                "confidence": "High"
            }
        ]
        return feeds
    
    async def map_to_mitre_attack(self, threat_actor: str) -> Dict[str, Any]:
        """Map threat actor TTPs to MITRE ATT&CK framework"""
        actor_profile = await self.get_threat_actor_profile(threat_actor)
        
        if not actor_profile:
            return {}
        
        return {
            "actor": threat_actor,
            "ttps": actor_profile.get("ttps", []),
            "tactics_coverage": self.calculate_tactics_coverage(actor_profile.get("ttps", [])),
            "kill_chain_phases": self.map_to_kill_chain(actor_profile.get("ttps", []))
        }
    
    def calculate_tactics_coverage(self, ttps: List[Dict]) -> Dict[str, int]:
        """Calculate which MITRE ATT&CK tactics are covered"""
        # Map techniques to tactics
        tactic_mapping = {
            "T1566": "Initial Access",
            "T1071": "Command and Control",
            "T1027": "Defense Evasion",
            "T1486": "Impact",
            "T1105": "Command and Control"
        }
        
        coverage = {}
        for ttp in ttps:
            tactic = tactic_mapping.get(ttp["id"], "Unknown")
            coverage[tactic] = coverage.get(tactic, 0) + 1
        
        return coverage
    
    def map_to_kill_chain(self, ttps: List[Dict]) -> List[str]:
        """Map TTPs to Lockheed Martin Cyber Kill Chain"""
        kill_chain_phases = set()
        
        # Simplified mapping
        for ttp in ttps:
            if ttp["id"] in ["T1566"]:
                kill_chain_phases.add("Delivery")
            elif ttp["id"] in ["T1071", "T1105"]:
                kill_chain_phases.add("Command and Control")
            elif ttp["id"] in ["T1486"]:
                kill_chain_phases.add("Actions on Objectives")
        
        return sorted(list(kill_chain_phases))
