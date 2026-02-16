async function fetchFlights() {
  const respnse = await fetch(
    "https://flight-api-9clq.onrender.com/search-flights",
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        origin: "DEL",
        destination: "IXL",
        date: "2026-03-05",
      }),
    },
  );
  const data = await respnse.json();
  console.log(data);
}
fetchFlights();
