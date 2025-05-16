import requests
import json

# Your Scrapingdog API key
api_key = '67fd47db17f0e0d6ade27d7a'

# The LinkedIn profile ID you want to scrape (e.g., 'rbranson')
profile_id = 'LinkedIn_Profile_ID'

# API endpoint
url = "https://api.scrapingdog.com/linkedin"

# Parameters for the API request

params = {
      "api_key": api_key,
      "type": "company",
      "linkId": profile_id,
      "private": "false"
}

# Make the request to Scrapingdog API
response = requests.get(url, params=params)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    data = response.json()

    # Process and print the data as needed
    print(json.dumps(data, indent=4))  # Pretty-print the data
else:
    print(f'Request failed with status code: {response.status_code}')
