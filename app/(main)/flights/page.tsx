"use client";
import FlightCard from "../../components/FlightCard";
import Search from "../../components/Search";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FlightProps } from "@/types/component";
import { useToast } from "@/context/ToastContext";

interface FlightResults {
  origin: string;
  destination: string;
  flights: FlightProps[];
}

const FlightResults = () => {
  const searchParams = useSearchParams();
  const [flights, setFlights] = useState<FlightResults>({
    origin: "",
    destination: "",
    flights: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchFlights() {
      const origin = searchParams.get("origin");
      const destination = searchParams.get("destination");
      const date = searchParams.get("date");

      if (!origin || !destination || !date) return;
      if (origin === destination) {
        showToast({
          title: "Invalid Route",
          message:
            "Origin and destination cannot be the same. Please choose different locations.",
          type: "warning",
        });
        return;
      }
      if (new Date(date) < new Date()) {
        showToast({
          title: "Invalid Date",
          message: "Please select a future date for your flight.",
          type: "warning",
        });
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const resonse = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            origin,
            destination,
            date,
          }),
        });

        const data = await resonse.json();
        if (data && data.flights) {
          setFlights(data.flights);
        } else {
          setError(
            "We couldn't find flights for this route. Our search works best with direct flights between major airports.",
          );
          setFlights({
            origin: "",
            destination: "",
            flights: [],
          });
        }
      } catch (error) {
        console.error("Error fetching flights data", error);
        setError(error instanceof Error ? error.message : "Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchFlights();
  }, [searchParams]);

  return (
    <div>
      <div className="max-w-211.5 mx-auto">
        <Search />
      </div>
      <main className="mt-15 max-sm:mt-11.25 mx-auto max-w-265.5">
        <h1 className="text-4xl">
          Flights flying on {flights.flights[0]?.departure.split(" on ")[1]}
        </h1>
        {error && <p className="text-red-500 mt-5">{error}</p>}
        {loading ? (
          <div className="flex justify-center mt-5">
            <span className="size-6 border-3 border-white border-b-transparent rounded-full inline-block animate-spin"></span>
          </div>
        ) : (
          <ul className="mt-7.5">
            {flights &&
              flights.flights.length > 0 &&
              flights.flights
                .slice(0, 10)
                .map((flight, i) => (
                  <FlightCard
                    key={i}
                    origin={flights.origin}
                    destination={flights.destination}
                    flight={flight}
                  />
                ))}
          </ul>
        )}
      </main>
    </div>
  );
};

const FlightResultsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center mt-5">
          <span className="size-6 border-3 border-white border-b-transparent rounded-full inline-block animate-spin"></span>
        </div>
      }
    >
      <FlightResults />
    </Suspense>
  );
};

export default FlightResultsPage;
