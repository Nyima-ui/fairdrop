"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  SearchDetails,
  Location,
  HandleSelectProps,
} from "@/types/autocomplete";
import LocationPin from "./svgs/LocationPin";
import Flying from "./svgs/Flying";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Search = () => {
  const [flightDetails, setFlightDetails] = useState<SearchDetails>({
    origin: "",
    destination: "",
    departure: "",
  });
  const [activeField, setActiveField] = useState<
    "origin" | "destination" | null
  >(null);
  const [suggestion, setSuggestion] = useState<Location[]>([]);
  const [selectedCodes, setSelectedCodes] = useState({
    originIATA: "GAY",
    destinationIATA: "DEL",
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const originSuggestionRef = useRef<HTMLUListElement>(null);
  const destinationSuggestionRef = useRef<HTMLUListElement>(null);

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

      if (!searchQuery || !activeField) {
        setSuggestion([]);
        return;
      }

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
        setSuggestion(data.data);
      } catch (error) {
        console.error("Error fetching autocomplete data", error);
      }
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [flightDetails.origin, flightDetails.destination, activeField]);

  function handleSelect({ locationName, iata }: HandleSelectProps): void {
    const selectedText = `${locationName} ${iata}`;
    if (activeField === "origin") {
      setFlightDetails((prev) => ({ ...prev, origin: selectedText }));
      setSelectedCodes((prev) => ({ ...prev, originIATA: iata }));
    }
    if (activeField === "destination") {
      setFlightDetails((prev) => ({ ...prev, destination: selectedText }));
      setSelectedCodes((prev) => ({ ...prev, destinationIATA: iata }));
    }
    setSuggestion([]);
    setActiveField(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // if (!selectedCodes.originIATA) {
    //   alert("Please select an origin airport from the suggestions.");
    //   return;
    // }
    // if (!selectedCodes.destinationIATA) {
    //   alert("Please select a destination airport from the suggestions.");
    //   return;
    // }
    // if (!flightDetails.departure) {
    //   alert("Please select a departure date.");
    //   return;
    // }

    try {
      const params = new URLSearchParams({
        // origin: selectedCodes.originIATA,
        origin: flightDetails.origin,
        // destination: selectedCodes.destinationIATA,
        destination: flightDetails.destination,
        date: flightDetails.departure,
      });
      router.push(`/flights/?${params.toString()}`);
    } catch (error) {
      console.error("Error fetching flight details", error);
    }
  }
  useEffect(() => {
    // console.log(selectedCodes);
  }, [selectedCodes]);

  useEffect(() => {
    function handleClickOutSide(e: MouseEvent) {
      const target = e.target as Node;
      if (
        !originSuggestionRef.current?.contains(target) &&
        !destinationSuggestionRef.current?.contains(target)
      ) {
        setSuggestion([]);
        setActiveField(null);
      }
    }
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, []);

  useEffect(() => {
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const date = searchParams.get("date");

    if (origin || destination || date) {
      setFlightDetails({
        origin: origin || "",
        destination: destination || "",
        departure: date || "",
      });
    }
  }, [searchParams]);

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Flight search"
      className="flex bg-input-background px-1.25 py-1.75 gap-3 mt-15 rounded-lg w-full flex-wrap max-sm:mt-14 justify-center"
    >
      <div className="flex gap-4 items-center relative">
        <div className="relative">
          <label htmlFor="origin" className="sr-only">
            Origin
          </label>
          <input
            id="origin"
            type="text"
            placeholder="From"
            name="origin"
            // required
            className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs"
            autoComplete="off"
            value={flightDetails.origin}
            onChange={handleInputChange}
            role="combobox"
            aria-autocomplete="list"
            aria-controls="origin-suggestions"
            aria-expanded={suggestion.length > 0 && activeField === "origin"}
            aria-haspopup="listbox"
          />
          {suggestion.length > 0 && activeField === "origin" && (
            <ul
              ref={originSuggestionRef}
              className="absolute top-full left-0 min-w-91.25 bg-input-background p-3.75 space-y-4 shadow-custom"
              role="listbox"
              id="origin-suggestions"
            >
              {suggestion.map((loc) => (
                <li
                  key={loc.id}
                  role="group"
                  aria-labelledby={`location-${loc.id}`}
                >
                  <div className="flex items-center gap-2.5">
                    <LocationPin aria-hidden="true" />
                    <p className="text-base" id={`location-${loc.id}`}>
                      {loc.name}
                    </p>
                  </div>
                  {loc.airports && loc.airports.length > 0 && (
                    <ul>
                      {loc.airports.map((airport) => (
                        <li
                          role="option"
                          aria-selected={false}
                          tabIndex={0}
                          key={airport.id}
                          className="cursor-pointer flex items-center py-2.5 pl-7.5 gap-2.5 hover:bg-background rounded-sm"
                          // onClick={() =>
                          //   handleSelect({
                          //     locationName: loc.name,
                          //     iata: airport.id,
                          //   })
                          // }
                        >
                          <Flying aria-hidden="true" />
                          <span className="whitespace-nowrap">
                            {airport.name}
                          </span>
                          <span className="ml-1">{airport.id}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Image
          height={24}
          width={24}
          src="/icons/back-forth-icon.svg"
          alt="Swap origin and destination"
          role="img"
          className="size-6"
        />

        <div className="relative max-sm:static">
          <label htmlFor="destination" className="sr-only">
            Destination
          </label>
          <input
            id="destination"
            type="text"
            placeholder="To"
            name="destination"
            // required
            className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs"
            autoComplete="off"
            value={flightDetails.destination}
            onChange={handleInputChange}
            role="combobox"
            aria-expanded={
              suggestion.length > 0 && activeField === "destination"
            }
            aria-controls="destination-suggestion"
          />
          {suggestion.length > 0 && activeField === "destination" && (
            <ul
              ref={destinationSuggestionRef}
              className="absolute top-full left-0 min-w-91.25 bg-input-background p-3.75 space-y-4 shadow-custom"
              id="destination-suggestion"
              role="listbox"
            >
              {suggestion.map((loc) => (
                <li
                  key={loc.id}
                  role="group"
                  aria-labelledby={`dest-location-${loc.id}`}
                >
                  <div className="flex items-center gap-2.5">
                    <LocationPin aria-hidden="true" />
                    <p id={`dest-location-${loc.id}`}>{loc.name}</p>
                  </div>
                  {loc.airports && loc.airports.length > 0 && (
                    <ul className="">
                      {loc.airports.map((airport) => (
                        <li
                          key={airport.id}
                          className="cursor-pointer flex items-center py-2.5 pl-7.5 gap-2.5 hover:bg-background rounded-sm"
                          // onClick={() =>
                          //   handleSelect({
                          //     locationName: loc.name,
                          //     iata: airport.id,
                          //   })
                          // }
                        >
                          <Flying aria-hidden="true" />
                          <span className="whitespace-nowrap">
                            {airport.name}
                          </span>
                          <span className="ml-3 opacity-70">{airport.id}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-1 gap-5  justify-center">
        <div className="max-sm:w-46.25 ">
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
          className="bg-primary font-medium px-5 py-3 rounded-sm cursor-pointer flex-1 max-w-100 transition-all duration-150 ease-in hover:bg-btn-hover flex items-center gap-2 disabled:cursor-auto disabled:bg-btn-hover"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
// hover:scale-103
