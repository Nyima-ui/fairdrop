import { NextResponse } from "next/server";
import { fetchActiveAlerts, comparePrices } from "./action";
import { searchFlights } from "@/lib/flights/searchFlight";

export async function GET() {
  try {
    const activeAlerts = await fetchActiveAlerts();
    console.log(activeAlerts)
    if (activeAlerts.length === 0) {
      return NextResponse.json({ results: [], message: "No active alerts" });
    }

    const results = await Promise.all(
      activeAlerts.map(async (alert) => {
        try {
          const flightData = await searchFlights({
            origin: alert.origin,
            destination: alert.destination,
            date: alert.start_date,
          });

          const { flights } = flightData;

          const availableFlights = comparePrices({
            matchPrice: alert.max_price,
            flights,
          });

          return {
            alert_id: alert.alert_id,
            origin: alert.origin,
            destination: alert.destination,
            max_price: alert.max_price,
            email: alert.email,
            availableFlights,
            status: "success" as const,
          };
        } catch (error) {
          console.error(`Failed to process alert ${alert.alert_id}:`, error);
          return {
            alert_id: alert.alert_id,
            origin: alert.origin,
            destination: alert.destination,
            max_price: alert.max_price,
            email: alert.email,
            availableFlights: null,
            status: "failed" as const,
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      }),
    );

    const succeeded = results.filter((r) => r.status === "success");
    const failed = results.filter((r) => r.status === "failed");

    return NextResponse.json({
      results,
      summary: {
        total: results.length,
        succeeded: succeeded.length,
        failed: failed.length,
      },
    });
  } catch (error) {
    console.error("Failed to fetch alerts:", error);
    return NextResponse.json(
      { error: "Failed to fetch active alerts:" },
      { status: 500 },
    );
  }
}
