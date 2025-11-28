FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
# build-essential for compiling python packages
# libpango*, libcairo*, libgdk* for WeasyPrint (PDF generation)
# git for cloning repos to scan
# nmap for network scanning
RUN apt-get update && apt-get install -y \
    build-essential \
    libpango-1.0-0 \
    libpangoft2-1.0-0 \
    libcairo2 \
    libpango1.0-dev \
    git \
    nmap \
    && rm -rf /var/lib/apt/lists/*

# Install Trivy
# Install Trivy
RUN apt-get update && apt-get install -y curl \
    && curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
