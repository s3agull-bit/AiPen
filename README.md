# Security Platform

A comprehensive code quality review and pentesting platform similar to Aikido.dev.

## Features

- **SAST**: Static Application Security Testing using Semgrep
- **DAST**: Dynamic Application Security Testing using OWASP ZAP
- **Black Box**: Network scanning using Nmap
- **Compliance**: Automated reporting for OWASP Top 10
- **Dashboard**: Modern UI for managing scans and viewing results

## Architecture

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Backend**: FastAPI, Python 3.11
- **Database**: PostgreSQL 16
- **Queue**: Redis + Celery
- **Scanners**: Semgrep, ZAP, Nmap

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local frontend dev)
- Python 3.11+ (for local backend dev)

### Running with Docker

1. Build and start all services:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Local Development

#### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```
