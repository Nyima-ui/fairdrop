import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { AlertProps, ComparePricesProps } from "@/types/component";
import { formatPrice, convertUSDInr } from "@/utils/formatter";

const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function fetchActiveAlerts(): Promise<AlertProps[]> {
  const { data, error } = await supabaseAdmin.from("price_alerts").select("*");
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


export function emailHtml(){
  return ``
}