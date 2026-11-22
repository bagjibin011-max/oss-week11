
import { readFile } from "node:fs/promises";

const BASE = "https://api.open-meteo.com/v1/forecast";

// P5: Fetch daily forecast data from Open-Meteo.
export async function getDaily({ lat, lon }) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    daily: "temperature_2m_max,precipitation_probability_max,wind_speed_10m_max",
    timezone: "Asia/Seoul",
    forecast_days: 7,
  });

  const res = await fetch(`${BASE}?${params}`);

  if (!res.ok) {
    throw new Error(`Open-Meteo: HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.daily;
}

// Provided sample function for offline testing.
export async function getSampleDaily(cityKey) {
  const file = new URL(`./data/${cityKey}.json`, import.meta.url);
  const data = JSON.parse(await readFile(file, "utf8"));
  return data.daily;
}
