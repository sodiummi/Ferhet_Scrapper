from serpapi import GoogleSearch

import os

def scrape_google(company: str):
    # Setting up parameters for the Google Maps search engine
    params = {
        "engine": "google_maps",  # Use Google Maps engine
        "q": company,  # Search term (company name)
        "type": "search",  # Specify that we are doing a business search
        "location": "United States",  # Location for the search results
        "hl": "en",  # Language
        "gl": "us",  # Country
        "api_key": "5e3ce59f935b9be68473eaf28ce231af5fa62375f409daeb20691271b916437b"  # Your API key here
    }

    search = GoogleSearch(params) 
    results = search.get_dict()

    if "local_results" in results and len(results["local_results"]) > 0:
        place = results["local_results"][0]  # Get the first result

        # Extracting relevant data
        company_name = place.get("title", "N/A")
        address = place.get("address", "N/A")
        phone = place.get("phone", "N/A")
        website = place.get("website", "N/A")
        category = place.get("type", "N/A")
        
        # Returning the structured data
        return {
            "company": company_name,
            "address": address,
            "phone": phone,
            "website": website,
            "category": category
        }
    else:
        return {"error": "No results found"}

