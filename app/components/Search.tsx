import Image from "next/image";

const Search = () => {
  return (
    <form
      role="search"
      aria-label="Flight search"
      className="flex bg-input-background px-1.25 py-1.75 gap-3 mt-15 rounded-lg w-full flex-wrap max-sm:mt-14 justify-center"
    >
      <div className="flex gap-5">
        <div>
          <label htmlFor="origin" className="sr-only">
            Origin
          </label>
          <input
            id="origin"
            type="text"
            placeholder="From"
            name="origin"
            required
            className="border border-input-border p-2.5 rounded-sm w-full"
          />
        </div>

        <Image
          height={24}
          width={24}
          src="/icons/back-forth-icon.svg"
          alt="Swap origin and destination"
          role="img"
        />

        <div>
          <label htmlFor="destination" className="sr-only">
            Destination date
          </label>
          <input
            id="destination"
            type="text"
            placeholder="To"
            name="destination"
            required
            className="border border-input-border p-2.5 rounded-sm w-full"
          />
        </div>
      </div>

      <div className="flex flex-1 gap-5  justify-center">
        <div className="max-sm:w-46.25">
          <label htmlFor="departure" className="sr-only">
            Departure
          </label>
          <input
            id="departure"
            type="date"
            placeholder="Departure"
            name="departure"
            required
            defaultValue={new Date().toISOString().split("T")[0]}
            className="border border-input-border p-2.5 rounded-sm cursor-pointer date scheme-dark min-w-0 flex-1 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-primary font-medium px-5 py-3 rounded-sm cursor-pointer flex-1 block max-w-[400px]"
        >
          Search
        </button>
      </div>

    </form>
  );
};

export default Search;
