"use client";
import { AlertProps } from "@/types/component";
import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface EditAlertProps {
  alert: AlertProps | null;
  setActiveAlerts: React.Dispatch<React.SetStateAction<AlertProps[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditAlert = ({
  alert,
  setActiveAlerts,
  setIsEditing,
}: EditAlertProps) => {
  const [formData, setFormData] = useState({
    destination: alert?.destination ?? "",
    origin: alert?.origin ?? "",
    start_date: alert?.start_date ?? "",
    end_date: alert?.end_date ?? "",
    max_price: alert?.max_price ?? 0,
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("price_alerts")
        .update(formData)
        .eq("alert_id", alert?.alert_id)
        .select()
        .single();

      if (error) throw error;
      setActiveAlerts((prev) =>
        prev.map((a) => (a.alert_id === alert?.alert_id ? data : a)),
      );
    } catch (error) {
      console.error("Error updating alert", error);
      setError(
        error instanceof Error ? error.message : "Error updating alert.",
      );
    } finally {
      formRef.current?.reset();
      setIsEditing(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);
  return (
    <form
    // shadow-sm shadow-primary
      className="bg-input-background rounded-lg px-5.75 py-8.5 text-lg flex flex-col gap-10 mt-5 w-full  edit-alert-form"
      aria-labelledby="form-title"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <h2 id="form-title" className="sr-only">
        Update Price Alert
      </h2>
      <fieldset>
        <legend>When are you flying?</legend>
        <div className="text-base flex justify-between items-center mt-2.5 gap-7.5 flex-wrap">
          <div className="flex flex-col gap-1.25 flex-1">
            <label htmlFor="earliest-date">Earliest date</label>
            <input
              type="date"
              id="earliest-date"
              name="start_date"
              required
              aria-required="true"
              className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs scheme-light dark cursor-pointer mt-1 text-foreground/80"
              value={formData.start_date}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1.25 flex-1">
            <label htmlFor="latest-date">Latest date</label>
            <input
              type="date"
              id="latest-date"
              name="end_date"
              className="border-2 border-input-border p-2.5 rounded-sm w-full focus:border-primary outline-none focus:ring-primary shadow-xs scheme-light dark cursor-pointer mt-1 text-foreground/80"
              value={formData.end_date}
              onChange={handleChange}
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
              value={formData.origin}
              onChange={handleChange}
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
              value={formData.destination}
              onChange={handleChange}
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
            name="max_price"
            min="0"
            inputMode="numeric"
            required
            aria-required="true"
            value={formData.max_price}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-5 flex-wrap">
        <button
          type="submit"
          className="bg-primary font-medium px-5 max-sm:px-3 py-3 max-sm:py-2 rounded-sm cursor-pointer flex max-w-100  transition-all duration-150 ease-in hover:bg-btn-hover self-start disabled:bg-btn-hover items-center gap-2"
          disabled={loading}
        >
          Update my alert
          {loading && (
            <span className="size-6 border-3 border-white border-b-transparent rounded-full inline-block animate-spin"></span>
          )}
        </button>

        <button
          type="button"
          className="bg-transparent font-medium px-5 max-sm:px-3 py-3 max-sm:py-2 rounded-sm cursor-pointer flex max-w-100  transition-all duration-150 ease-in hover:bg-background hover:border-transparent self-start disabled:bg-btn-hover items-center gap-2 border border-primary"
          disabled={loading}
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditAlert;
