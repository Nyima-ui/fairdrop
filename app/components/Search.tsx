"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SearchDetails {
  origin: string;
  destination: string;
  departure: string;
}

const Search = () => {
  const [flightDetails, setFlightDetails] = useState<SearchDetails>({
    origin: "",
    destination: "",
    departure: "",
  });
  const [activeField, setActiveField] = useState<
    "origin" | "destination" | null
  >(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFlightDetails((prev) => ({ ...prev, [name]: value }));

    if (name === "origin" || name === "destination") {
      setActiveField(name);
    }
  }

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      const searchQuery =
        activeField === "origin"
          ? flightDetails.origin
          : activeField === "destination"
            ? flightDetails.destination
            : "";

      if (!searchQuery && !activeField) return;

      try {
        const response = await fetch("/api/autocomplete", {
          method: "POST",
          body: JSON.stringify({ searchQuery }),
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch autocomplete data.");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching autocomplete data", error);
      }
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [flightDetails.origin, flightDetails.destination, activeField]);

  return (
    <form
      role="search"
      aria-label="Flight search"
      className="flex bg-input-background px-1.25 py-1.75 gap-3 mt-15 rounded-lg w-full flex-wrap max-sm:mt-14 justify-center"
    >
      <div className="flex gap-4 items-center">
        <div>
          <label htmlFor="origin" className="sr-only">
            Origin
          </label>
          <input
            id="origin"
            type="text"
            placeholder="From"
            name="origin"
            required
            className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs"
            value={flightDetails.origin}
            onChange={handleInputChange}
          />
        </div>

        <Image
          height={24}
          width={24}
          src="/icons/back-forth-icon.svg"
          alt="Swap origin and destination"
          role="img"
          className="size-6"
        />

        <div>
          <label htmlFor="destination" className="sr-only">
            Destination date
          </label>
          <input
            id="destination"
            type="text"
            placeholder="To"
            name="destination"
            required
            className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs"
            value={flightDetails.destination}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex flex-1 gap-5  justify-center">
        <div className="max-sm:w-46.25">
          <label htmlFor="departure" className="sr-only">
            Departure
          </label>
          <input
            id="departure"
            type="date"
            placeholder="Departure"
            name="departure"
            required
            className="border-2 border-input-border p-2.5 rounded-sm cursor-pointer date scheme-dark min-w-0 flex-1 w-full focus:border-primary outline-none focus:ring-primary shadow-xs"
            value={flightDetails.departure}
            onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          className="bg-primary font-medium px-5 py-3 rounded-sm cursor-pointer flex-1 block max-w-100 transition-all duration-150 ease-in hover:bg-btn-hover"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
// hover:scale-103
