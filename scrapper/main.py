from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy import select
from scraper import AIScraper
from models import Company
from database import async_session, init_db
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time
from dotenv import load_dotenv
from serpapi import GoogleSearch

# Load environment variables from .env (like SERP_API_KEY)
load_dotenv()

app = FastAPI()

# Rate limiting configuration
REQUEST_LIMIT = 5  # requests per minute
request_times = {}

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    ip = request.client.host
    now = time.time()
    
    if ip not in request_times:
        request_times[ip] = []
    
    # Remove timestamps older than 60 seconds
    request_times[ip] = [t for t in request_times[ip] if now - t < 60]
    
    if len(request_times[ip]) >= REQUEST_LIMIT:
        return JSONResponse(
            status_code=429,
            content={"detail": "Too many requests. Limit is 5 per minute."}
        )
    
    request_times[ip].append(now)
    response = await call_next(request)
    return response

# Allow CORS for all domains (adjust in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create an instance of the scraper
scraper = AIScraper()

# Initialize the database on startup
@app.on_event("startup")
async def startup_event():
    await init_db()

# Define the Pydantic model for the request body
class CompanyNameRequest(BaseModel):
    name: str

# Endpoint to scrape from a specific URL (OpenAI + scraping)
@app.post("/scrape")
async def scrape_company(url: str):
    try:
        result = await scraper.scrape_company(url)
        if result:
            return {"status": "success", "data": result}
        return {"status": "skipped", "message": "Duplicate or failed extraction"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ NEW: Endpoint to scrape using company name via SerpAPI and OpenAI
@app.post("/scrape-by-name")
async def scrape_by_name(request: CompanyNameRequest):  # Use the Pydantic model here
    try:
        result = await scraper.scrape_by_name(request.name)
        if result:
            return {"status": "success", "data": result}
        return {"status": "skipped", "message": "Duplicate or failed extraction"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to get a list of companies (optional query filtering)
@app.get("/companies")
async def get_companies(query: str = None, limit: int = 50):
    async with async_session() as session:
        if query:
            result = await session.execute(
                select(Company).where(Company.name.ilike(f"%{query}%")).limit(limit)
            )
        else:
            result = await session.execute(select(Company).limit(limit))
        companies = result.scalars().all()
        return companies
