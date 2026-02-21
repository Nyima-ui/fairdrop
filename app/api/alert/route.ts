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
            subject: `FairDrop Alert: Flights from ${alert.origin} to ${alert.destination} under Rs.${alert.max_price.toLocaleString("en-IN")}`,
            html: `
<div class="body" style="background-color: #DAE0E5; font-family: 'Helvetica', Arial, sans-serif; font-size: 16px; padding: 60px 0px" role="presentation">
  <div style="max-width: 528px; background-color: #FFFFFF; padding: 40px 28px; border-radius: 3px; margin: 0px auto" role="presentation">
    <a href="https://fairdrop-sage.vercel.app/" target="_blank">
      <img src="https://uhbyckpiasoinqkwftap.supabase.co/storage/v1/object/public/public-assets/email-fairdrop-logo.png" style="transform: translateX(-9px)" alt="FairDrop logo" /> </a>
    <h2 style="margin-top: 30px;">Your fare alert just matched! 🎉</h2>
    <p style="margin-top: 20px;">We found flights from <strong>${alert.origin} → ${alert.destination}</strong> under your target of <strong>₹${alert.max_price.toLocaleString("en-IN")}</strong>.</p>

    <h3 style="margin-top: 30px;">Here are the top deals:</h3>

    ${availableFlights
      ?.map(
        (f) => ` <div style="margin-top: 30px;">
      <p>Airline: <strong>${f.name}</strong></p>
      <p style="margin-top: 10px">🛫 ${alert.origin} → ${alert.destination}</p>
      <p style="margin-top: 10px">🕐 Departure: ${f.departure}</p>
      <p style="margin-top: 10px">💰 Price: <strong>${f.price}</strong></p>
      <a href="https://www.google.com/travel/flights?gl=IN&hl=en" style="text-decoration: none; background: #1247B2; color: white; padding: 10px 20px; border-radius: 3px; display: inline-block; margin-top: 30px;" aria-label="View flight details" >View flight</a>
    </div>`,
      )
      .join("")}

    <p style="font-size: 14px; margin-top: 20px;">You're receiving this because you set a fare alert on FairDrop.</p>
  </div>
</div>
`,
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
