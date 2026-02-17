import { createClient } from "@/lib/supabase/server";
import { AlertProps, ComparePricesProps } from "@/types/component";
import { formatPrice, convertUSDInr } from "@/utils/formatter";

export async function fetchActiveAlerts(): Promise<AlertProps[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("price_alerts").select("*");
  if (error) throw error;
  return data;
}

export function comparePrices({ matchPrice, flights }: ComparePricesProps) {
  const availableFlights = flights
    .filter((flight) => convertUSDInr(flight.price) < matchPrice)
    .sort((a, b) => convertUSDInr(a.price) - convertUSDInr(b.price))
    .slice(0, 3);
    
  if (availableFlights.length > 0) {
    return availableFlights.map((flight) => ({
      ...flight,
      price: formatPrice(flight.price),
    }));
  } else return null;
}
