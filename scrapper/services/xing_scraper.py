import requests

params = {
    "engine": "google",
    "q": "site:xing.com John Doe",
    "api_key": "your_serpapi_key"
}

response = requests.get("https://serpapi.com/search", params=params)
data = response.json()

for result in data.get("organic_results", []):
    print(result.get("title"))
    print(result.get("link"))
