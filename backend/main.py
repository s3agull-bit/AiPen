from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to DB, etc.
    print("Starting Security Platform API...")
    yield
    # Shutdown: Disconnect DB, etc.
    print("Shutting down Security Platform API...")

app = FastAPI(
    title="Security Platform API",
    description="API for Code Quality & Pentesting Platform",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "security-platform-api"}

@app.get("/")
async def root():
    return {"message": "Welcome to the Security Platform API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
