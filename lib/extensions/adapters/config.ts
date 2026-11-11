export interface BoardConfig { slug: string; label: string }

export function parseBoards(value: string | undefined): BoardConfig[] {
  if (!value) return [];
  return value.split(",").map((item) => {
    const [slugPart, ...labelParts] = item.trim().split(":");
    const slug = slugPart?.trim() ?? "";
    const label = labelParts.join(":").trim() || slug;
    return { slug, label };
  }).filter(({ slug }) => /^[a-zA-Z0-9._-]{1,100}$/.test(slug)).slice(0, 20);
}

export interface AdzunaMarket { country: string; currency: string }

export function parseAdzunaMarkets(value: string | undefined): AdzunaMarket[] {
  if (!value) return [];
  return value.split(",").map((market) => {
    const [country = "", currency = ""] = market.trim().split(":");
    return { country: country.toLowerCase(), currency: currency.toUpperCase() };
  }).filter(({ country, currency }) => /^[a-z]{2}$/.test(country) && /^[A-Z]{3}$/.test(currency)).slice(0, 20);
}
