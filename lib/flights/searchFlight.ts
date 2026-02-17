export interface SearchFlightsProps {
  origin: string;
  destination: string;
  date: string;
}

export async function searchFlights({
  origin,
  destination,
  date,
}: SearchFlightsProps) {
  const url = "https://flight-api-9clq.onrender.com/search-flights";

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ origin, destination, date }),
    headers: { "Content-type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Render API returned status code: ${response.status}`);
  }
  const flights = await response.json();
  return flights;
}
