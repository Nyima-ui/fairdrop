export function formatPrice(price: string): string {
  const flightPrice = Number(price.split("$")[1]);
  const inr = Math.round(flightPrice * 90.66);
  return `₹${inr.toLocaleString("en-IN")}`;
}


export function convertUSDInr(priceStr: string) {
  const price = Number(priceStr.split("$")[1]);
  const inr = Math.round(price * 90.66);
  return inr;
}