function SetAlertForm() {
  return (
    <form className="max-w-1/2 bg-input-background rounded-lg px-5.75 py-8.5 text-lg flex flex-col gap-10 mt-5" aria-labelledby="form-title">
      <h2 id="form-title" className="sr-only">Set Price Alert</h2>
      <fieldset>
        <legend>When are you flying?</legend>
        <div className="text-base flex justify-between items-center mt-2.5 gap-7.5 flex-wrap">
          <div className="flex flex-col gap-1.25 flex-1">
            <label htmlFor="earliest-date">Earliest date</label>
            <input
              type="date"
              id="earliest-date"
              name="earliest-date"
              required
              aria-required="true"
              className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs scheme-light dark cursor-pointer  text-foreground/80"
            />
          </div>
          <div className="flex flex-col gap-1.25 flex-1">
            <label htmlFor="latest-date">Latest date</label>
            <input
              type="date"
              id="latest-date"
              name="latest-date"
              className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs scheme-light dark cursor-pointer text-foreground/80"
            />
          </div>
        </div>
        <p className="text-sm mt-1.75 text-foreground/70">
          Pick the window you&apos;re flexible within.
        </p>
      </fieldset>

      <fieldset>
        <legend>Where are you flying?</legend>
        <div className="text-base flex items-center justify-between mt-2.5 gap-7.5 flex-wrap">
          <div className="flex-1 min-w-62.5">
            <label htmlFor="origin" className="sr-only">
              Origin
            </label>
            <input
              type="text"
              id="origin"
              name="origin"
              placeholder="Flying from"
              required
              aria-required="true"
              className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs scheme-light dark cursor-pointer placeholder:text-sm"
            />
          </div>
          <div className="flex-1 min-w-62.5">
            <label htmlFor="destination" className="sr-only">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              placeholder="Flying to"
              required
              aria-required="true"
              className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs scheme-light dark cursor-pointer placeholder:text-sm"
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Alert me when price drops below</legend>
        <div className="max-w-68.5 mt-2.5">
          <label htmlFor="alert-price" className="sr-only">
            Alert price:
          </label>
          <input
            type="number"
            placeholder="$400"
            className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs scheme-light dark cursor-pointer placeholder:text-sm text-base"
            id="alert-price"
            name="alert-price"
            min="0"
            step="100"
            inputMode="numeric"
            required
            aria-required="true"
          />
        </div>
      </fieldset>

      <button type="submit" className="bg-primary font-medium px-5 py-3 rounded-sm cursor-pointer flex-1 block max-w-100  transition-all duration-150 ease-in hover:bg-btn-hover self-start">
        Create my alert
      </button>
    </form>
  );
}

export default SetAlertForm;
