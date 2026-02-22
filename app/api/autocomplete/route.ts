import { NextRequest, NextResponse } from "next/server";

const data = {
  search_metadata: {
    id: "695927a38c24bd247f1be7e8",
    status: "Success",
    json_endpoint:
      "https://serpapi.com/searches/757fcef4391d398f/695927a38c24bd247f1be7e8.json",
    created_at: "2026-01-03 14:28:51 UTC",
    processed_at: "2026-01-03 14:28:51 UTC",
    google_flights_autocomplete_url:
      "https://www.google.com/travel/flights?hl=en&gl=us",
    raw_html_file:
      "https://serpapi.com/searches/757fcef4391d398f/695927a38c24bd247f1be7e8.html",
    prettify_html_file:
      "https://serpapi.com/searches/757fcef4391d398f/695927a38c24bd247f1be7e8.prettify",
    total_time_taken: 0.93,
  },
  search_parameters: {
    engine: "google_flights_autocomplete",
    q: "New",
    hl: "en",
    gl: "us",
  },
  suggestions: [
    {
      position: 1,
      name: "New York",
      type: "city",
      description: "City in New York State",
      id: "/m/02_286",
      airports: [
        {
          name: "John F. Kennedy International Airport",
          id: "JFK",
          city: "New York",
          city_id: "/m/02_286",
          distance: "12 mi",
        },
        {
          name: "LaGuardia Airport",
          id: "LGA",
          city: "New York",
          city_id: "/m/02_286",
          distance: "8 mi",
        },
        {
          name: "Newark Liberty International Airport",
          id: "EWR",
          city: "Newark",
          city_id: "/m/0hptm",
          distance: "8 mi",
        },
      ],
    },
    {
      position: 2,
      name: "New Zealand",
      type: "region",
      description: "Country in Oceania",
      id: "/m/0ctw_b",
    },
    {
      position: 3,
      name: "New Orleans, Louisiana",
      type: "city",
      description: "City in Louisiana",
      id: "/m/0f2tj",
      airports: [
        {
          name: "Louis Armstrong New Orleans International Airport",
          id: "MSY",
          city: "New Orleans",
          city_id: "/m/0f2tj",
          distance: "11 mi",
        },
      ],
    },
    {
      position: 4,
      name: "New Jersey",
      type: "region",
      description: "US state",
      id: "/m/05fjf",
    },
    {
      position: 5,
      name: "New Delhi, India",
      type: "city",
      description: "Capital of India",
      id: "/m/0dlv0",
      airports: [
        {
          name: "Indira Gandhi International Airport",
          id: "DEL",
          city: "New Delhi",
          city_id: "/m/0dlv0",
          distance: "6 mi",
        },
      ],
    },
  ],
};

const data2 = {
  search_metadata: {
    id: "698d377b12481529ec08a67b",
    status: "Success",
    json_endpoint:
      "https://serpapi.com/searches/t1DvBdgh1se37xrJqwFoAg/698d377b12481529ec08a67b.json",
    created_at: "2026-02-12 02:14:19 UTC",
    processed_at: "2026-02-12 02:14:19 UTC",
    google_flights_autocomplete_url:
      "https://www.google.com/travel/flights?hl=en&gl=us",
    raw_html_file:
      "https://serpapi.com/searches/t1DvBdgh1se37xrJqwFoAg/698d377b12481529ec08a67b.html",
    prettify_html_file:
      "https://serpapi.com/searches/t1DvBdgh1se37xrJqwFoAg/698d377b12481529ec08a67b.prettify",
    total_time_taken: 0.74,
  },
  search_parameters: {
    engine: "google_flights_autocomplete",
    q: "Leh",
    hl: "en",
    gl: "us",
  },
  suggestions: [
    {
      position: 1,
      name: "Leh",
      type: "city",
      id: "/m/02bnpk",
      airports: [
        {
          name: "Kushok Bakula Rimpochee Airport",
          id: "IXL",
          city: "Leh",
          city_id: "/m/02bnpk",
          distance: "2 mi",
        },
      ],
    },
    {
      position: 2,
      name: "Lehigh Valley International Airport",
      description: "Airport in Lehigh County, Pennsylvania",
      id: "/m/02fmv9",
    },
    {
      position: 3,
      name: "Lehigh County, Pennsylvania",
      type: "city",
      description: "County in Pennsylvania",
      id: "/m/0mwl2",
      airports: [
        {
          name: "Lehigh Valley International Airport",
          id: "ABE",
          city: "Allentown",
          city_id: "/m/0_3cs",
        },
      ],
    },
    {
      position: 4,
      name: "Lehi, Utah",
      type: "city",
      description: "City in Utah",
      id: "/m/010gsz",
      airports: [
        {
          name: "Salt Lake City International Airport",
          id: "SLC",
          city: "Salt Lake City",
          city_id: "/m/0f2r6",
          distance: "28 mi",
        },
      ],
    },
    {
      position: 5,
      name: "Lehigh Acres, Florida",
      type: "city",
      description: "Census-designated place in Florida",
      id: "/m/01z_5l5",
      airports: [
        {
          name: "Southwest Florida International Airport",
          id: "RSW",
          city: "Fort Myers",
          city_id: "/m/0rmby",
          distance: "10 mi",
        },
      ],
    },
  ],
};

async function simulateDelay(ms: number = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// real api
export async function POST(request: NextRequest) {
  const API_KEY = process.env.SERP_API_KEY;
  try {
    const { searchQuery } = await request.json();

    if (!searchQuery) {
      return NextResponse.json(
        { message: "SearchQuery is required" },
        { status: 400 },
      );
    }
    const url = `https://serpapi.com/search.json?engine=google_flights_autocomplete&q=${searchQuery}&api_key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`SerpAPI returned status ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json({ success: true, data: data.suggestions });
  } catch (error) {
    console.error("Autocomplete API error: ", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch autocomplete data",
      },
      { status: 500 },
    );
  }
}

//mock api
// export async function POST(request: NextRequest) {
//   try {
//     const { searchQuery } = await request.json();

//     if (!searchQuery) {
//       return NextResponse.json(
//         { message: "Search query is required" },
//         { status: 400 },
//       );
//     }

//     await simulateDelay(500);
//     return NextResponse.json({ success: true, data: data2.suggestions });
//   } catch (error) {
//     console.error("Autocomplete API error", error);
//     return NextResponse.json({
//       message:
//         error instanceof Error
//           ? error.message
//           : "Failed to fetch autocomplete data",
//     });
//   }
// }
