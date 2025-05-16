import requests

API_KEY = 'your_api_key_here'
url = 'https://api.rocketreach.co/v1/api/lookupProfile'

params = {
    'api_key': API_KEY,
    'name': 'Elon Musk',
    'company': 'Tesla'
}

response = requests.get(url, params=params)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code} - {response.text}")
