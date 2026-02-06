import FlightCard from "../../components/FlightCard";
import Search from "../../components/Search";

const FlightResultsPage = () => {
  return (
    <div>
      <div className="max-w-211.5 mx-auto">
        <Search />
      </div>
      <main className="mt-15 max-sm:mt-11.25 mx-auto max-w-265.5">
        <h1 className="text-4xl">Google flights results:</h1>
        <ul className="mt-7.5">
          <FlightCard />
        </ul>
      </main>
    </div>
  );
};

export default FlightResultsPage;
