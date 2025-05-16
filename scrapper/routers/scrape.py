import requests
from fastapi import APIRouter
from services import google_scraper, linkedin_scraper, apollo_scraper

# Directly pass the API key here
API_KEY = "67fd47db17f0e0d6ade27d7a"  # Your actual API key
BASE_URL = "https://api.scrapingdog.com/linkedin/"

router = APIRouter(prefix="/scrape", tags=["Scraping"])

# Google Scraper Route
@router.get("/google")
def scrape_google(company: str):
    return google_scraper.scrape_google(company)

# LinkedIn Scraper Function
def scrape_linkedin(company: str):
    params = {
        'api_key': API_KEY,
        'type': 'profile',
        'linkId': company  # Company name or LinkedIn profile ID
    }

    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors (4xx, 5xx)

        if response.status_code == 200:
            return response.json()
        else:
            return {"error": f"Request failed with status code: {response.status_code}"}
    except requests.exceptions.RequestException as e:
        return {"error": f"An error occurred while scraping LinkedIn: {str(e)}"}

# LinkedIn Scraping Route
@router.get("/linkedin")
def get_linkedin_profile(company: str):
    return scrape_linkedin(company)

# Apollo Scraper Route
@router.get("/apollo")
def scrape_apollo(company: str):
    return apollo_scraper.scrape_apollo(company)
