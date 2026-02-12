import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { origin, destination, date } = await request.json();
    if (!origin || !destination || !date) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }
    const url = "https://flight-api-9clq.onrender.com/search-flights";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin, destination, date }),
    });
    if (!response.ok) {
      throw new Error(`Render API returned status code: ${response.status}`);
    }
    const flights = await response.json();
    return NextResponse.json({ success: true, flights });
  } catch (error) {
    console.error("Flights search API error", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Error fetching flights data",
      },
      { status: 500 },
    );
  }
}
