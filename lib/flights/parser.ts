import { FlightProps } from "@/types/component";
import { Flights } from "@/types/SerpApi";

function formatTime(datetime: string): string {
  //datetime is like "2026-03-05 11:10"
  const [, time] = datetime.split(" ");
  const [hourStr, minute] = time.split(":");
  const hour = parseInt(hourStr);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute} ${ampm}`;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} hour`;
  return `${hours} hour ${mins} min`;
}

//rough
import fs from "fs/promises";
async function saveData(data: Flights) {
  try {
    await fs.writeFile("data.json", JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Failed to write data to file", error);
  }
}

export function parseSerpFlights(data: Flights): FlightProps[] {
  saveData(data);
  const raw = [...(data.best_flights ?? []), ...(data.other_flights ?? [])];

  return raw.map((itinerary) => {
    const firstFlight = itinerary.flights[0];
    const lastFlight = itinerary.flights[itinerary.flights.length - 1];
    const stops = itinerary.flights.length - 1;

    return {
      departure: formatTime(firstFlight.departure_airport.time),
      arrival: formatTime(lastFlight.arrival_airport.time),
      duration: formatDuration(itinerary.total_duration),
      name: firstFlight.airline,
      price:
        itinerary.price != null
          ? `₹${itinerary.price.toLocaleString("en-IN")}`
          : "N/A",
      stops: stops === 0 ? "Nonstop" : stops,
      airline_logo: itinerary.airline_logo,
    };
  });
}
