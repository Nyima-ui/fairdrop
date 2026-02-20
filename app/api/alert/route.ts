import { NextResponse } from "next/server";
import { fetchActiveAlerts, comparePrices } from "./action";
import { searchFlights } from "@/lib/flights/searchFlight";
import { sendEmail } from "@/lib/email/sendEmail";

export async function GET() {
  try {
    const activeAlerts = await fetchActiveAlerts();
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

          await sendEmail({
            to: alert.email,
            subject: `FairDrop: Flights found for ${alert.origin} -> ${alert.destination}`,
            html: `<h2>Flights below ₹${alert.max_price} found!</h2> ${availableFlights
              ?.map(
                (f) => `<div>
              <p><strong>${f.name}</strong></p>
              <p>${f.departure} -> ${f.arrival}</p>
              <p>Price: ${f.price}</p>
              </div>`,
              )
              .join("")}`,
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
