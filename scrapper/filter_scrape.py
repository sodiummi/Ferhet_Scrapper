import csv
import time
from serpapi import GoogleSearch

# === API Key ===
SERP_API_KEY = "5e3ce59f935b9be68473eaf28ce231af5fa62375f409daeb20691271b916437b"


# === Google Maps Search ===
def search_google_maps(industry=None, country=None, city=None, max_results=100):
    location = f"{city}, {country}" if city and country else country or city
    query = industry if industry else "company"

    params = {
        "engine": "google_maps",
        "q": query,
        "type": "search",
        "api_key": SERP_API_KEY,
        "hl": "en",
        "location": location,
        "num": max_results
    }

    search = GoogleSearch(params)
    results = search.get_dict()
    return results.get("local_results", [])

# === Display & Save ===
def display_and_save_maps_results(results, filename="maps_company_results.csv"):
    with open(filename, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["Name", "Address", "Category", "Phone", "Website", "Rating"])

        for i, result in enumerate(results, 1):
            name = result.get("title", "N/A")
            address = result.get("address", "N/A")
            category = result.get("type", "N/A")
            phone = result.get("phone", "N/A")
            website = result.get("website", "N/A")
            rating = result.get("rating", "N/A")

            # Terminal display
            print(f"\n📦 Result {i}")
            print(f"🔹 Name: {name}")
            print(f"📍 Address: {address}")
            print(f"🏭 Category: {category}")
            print(f"☎️ Phone: {phone}")
            print(f"🌐 Website: {website}")
            print(f"⭐ Rating: {rating}")

            # Save to CSV
            writer.writerow([name, address, category, phone, website, rating])

            time.sleep(1)  # Be kind to API limits

    #print(f"\n✅ Saved {len(results)} Google Maps results to {filename}")

# === User Input ===
if __name__ == "__main__":
    print("\n🔍 Google Maps Business Scraper")
    industry = input("Industry (e.g., Software, Hospital, School): ").strip() or None
    country = input("Country: ").strip() or None
    city = input("City/State: ").strip() or None

    print("\n⏳ Searching")
    results = search_google_maps(industry=industry, country=country, city=city)

    if not results:
        print("❌ No businesses found.")
    else:
        print(f"\n✅ Found {len(results)} businesses. Showing and saving results...\n")
        display_and_save_maps_results(results)
