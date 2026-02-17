"use client";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/client";
import { useRef, useState } from "react";
import { FormDataProps } from "@/types/component";

interface SetAlertFormProps {
  fetchActiveAlerts: () => Promise<void>;
}

function SetAlertForm({ fetchActiveAlerts }: SetAlertFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function insertAlertRow(alertData: FormDataProps) {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.from("price_alerts").insert({
        user_id: alertData.userId,
        origin: alertData.origin,
        destination: alertData.destination,
        start_date: alertData.startDate,
        end_date: alertData.endDate,
        max_price: alertData.maxPrice,
      });
      if (error) throw error;
      fetchActiveAlerts();
    } catch (error) {
      console.error("Error inserting alert data", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occured. Please try again.",
      );
    } finally {
      setLoading(false);
      formRef.current?.reset();
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!user) return;
    const userId = user.id;
    const origin = formData.get("origin") as string;
    const destination = formData.get("destination") as string;
    const startDate = formData.get("earliest-date") as string;
    const endDate = formData.get("latest-date") as string;
    const maxPrice = formData.get("alert-price") as string;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (new Date(startDate) < today) {
      alert("Earliest date can't be in the past.");
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      alert("Latest date can't be before the earliest date.");
      return;
    }

    await insertAlertRow({
      userId,
      origin,
      destination,
      startDate,
      endDate,
      maxPrice,
    });
  }

  return (
    <form
      className="bg-input-background rounded-lg px-5.75 py-8.5 text-lg flex flex-col gap-10 mt-5 w-full"
      aria-labelledby="form-title"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <h2 id="form-title" className="sr-only">
        Set Price Alert
      </h2>
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
              className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs scheme-light dark cursor-pointer mt-1 text-foreground/80"
            />
          </div>
          <div className="flex flex-col gap-1.25 flex-1">
            <label htmlFor="latest-date">Latest date</label>
            <input
              type="date"
              id="latest-date"
              name="latest-date"
              className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs scheme-light dark cursor-pointer mt-1 text-foreground/80"
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
              className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs scheme-light dark cursor-pointer"
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
              className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs scheme-light dark cursor-pointer"
            />
          </div>
        </div>
        <p className="text-sm mt-1.75 text-foreground/70">
          Enter airport codes (e.g., DEL, JFK)
        </p>
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
            className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs scheme-light dark cursor-pointer text-base"
            id="alert-price"
            name="alert-price"
            min="0"
            inputMode="numeric"
            required
            aria-required="true"
          />
        </div>
      </fieldset>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        className="bg-primary font-medium px-5 max-sm:px-3 py-3 max-sm:py-2 rounded-sm cursor-pointer flex-1 flex max-w-100  transition-all duration-150 ease-in hover:bg-btn-hover self-start disabled:bg-btn-hover items-center gap-2"
        disabled={loading}
      >
        Create my alert
        {loading && (
          <span className="size-6 border-3 border-white border-b-transparent rounded-full inline-block animate-spin"></span>
        )}
      </button>
    </form>
  );
}

export default SetAlertForm;
