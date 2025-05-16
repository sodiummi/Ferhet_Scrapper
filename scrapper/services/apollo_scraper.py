#from playwright.sync_api import sync_playwright

def scrape_apollo(company: str):
    search_url = f"https://www.apollo.io/companies/?q={company.replace(' ', '%20')}"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(search_url)
        page.wait_for_timeout(5000)

        results = page.locator('a.company-link')
        if results.count() > 0:
            result = results.nth(0)
            title = result.inner_text()
            href = result.get_attribute("href")
            browser.close()
            return {
                "company": company,
                "apollo_company_name": title.strip(),
                "profile_url": f"https://www.apollo.io{href}"
            }

        browser.close()
        return {"error": "No results found"}
