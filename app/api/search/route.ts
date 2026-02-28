import { NextResponse, NextRequest } from "next/server";

// MY PYTHON API
// export async function POST(request: NextRequest) {
//   try {
//     const { origin, destination, date } = await request.json();
//     if (!origin || !destination || !date) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 },
//       );
//     }
//     const url = "https://flight-api-9clq.onrender.com/search-flights";
//     const response = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ origin, destination, date }),
//     });
//     if (!response.ok) {
//       throw new Error(`Render API returned status code: ${response.status}`);
//     }
//     const flights = await response.json();
//     return NextResponse.json({ success: true, flights });
//   } catch (error) {
//     console.error("Flights search API error", error);
//     return NextResponse.json(
//       {
//         message:
//           error instanceof Error
//             ? error.message
//             : "Error fetching flights data",
//       },
//       { status: 500 },
//     );
//   }
// }

import { parseSerpFlights } from "@/lib/flights/parser";

// SERP API
export async function POST(request: NextRequest) {
  try {
    const { origin, destination, date } = await request.json();
    if (!origin || !destination || !date) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const params = new URLSearchParams({
      engine: "google_flights",
      departure_id: origin,
      arrival_id: destination,
      outbound_date: date,
      type: "2",
      currency: "INR",
      hl: "en",
      api_key: process.env.SERP_API_KEY!,
    });

    const fullUrl = `https://serpapi.com/search.json?${params}`;
    const response = await fetch(fullUrl);
    const data = await response.json();
    const parsedFlights = parseSerpFlights(data);
    const flights = {
      origin,
      destination,
      flights: parsedFlights,
    };

    return NextResponse.json({ success: true, flights });
  } catch (error) {
    console.error("SERP API error", error);
    return NextResponse.json(
      { message: "Failed to fetch flights from upstream" },
      { status: 502 },
    );
  }
}
