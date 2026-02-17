"use client";
import DeletePopUp from "./DeletePopUp";
import { useState } from "react";
import { AlertProps } from "@/types/component";

interface ActiveAlertsProps {
  alert: AlertProps;
}

const ActiveAlerts = ({ alert }: ActiveAlertsProps) => {
  const [isModalOpen, setisModalOpen] = useState(false);

  function formatDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  }

  return (
    <li className="bg-input-background rounded-lg p-3.75">
      <article aria-labelledby="alert-route">
        <div className="flex justify-between items-center gap-5">
          <div className="flex-1 min-w-48 max-w-70">
            <div className="flex gap-3 items-center w-full" id="alert-route">
              <p>{alert.origin}</p>
              <span
                aria-hidden="true"
                className="h-0.5 flex-1 bg-foreground/70"
              ></span>
              <span className="sr-only">to</span>
              <p>{alert.destination}</p>
            </div>
            <div className="flex gap-3 items-center w-full text-foreground/70">
              <time dateTime={formatDate(alert.start_date)}>
                {formatDate(alert.start_date)}
              </time>
              <span
                aria-hidden="true"
                className="h-0.5 flex-1 bg-foreground/70"
              ></span>
              <time dateTime={formatDate(alert.end_date)}>
                {formatDate(alert.end_date)}
              </time>
            </div>
          </div>

          <div>
            <p>Under</p>
            <p
              className="font-medium"
              aria-label={`${alert.max_price.toLocaleString("en-IN")} rupees`}
            >
              ₹{alert.max_price.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="mt-7.5">
          <button
            className="px-6.25 py-1.25 border rounded-sm cursor-pointer hover:border-primary"
            type="button"
            aria-label={`Edit alert for ${alert.origin} - ${alert.destination}`}
          >
            Edit
          </button>
          <button
            className="px-6.25 py-1.25 rounded-sm bg-primary cursor-pointer border border-primary ml-7.5 hover:bg-btn-hover transition-all duration-150 ease-in"
            type="button"
            aria-label={`Delete alert for ${alert.origin} - ${alert.destination}`}
            onClick={() => setisModalOpen(true)}
          >
            Delete
          </button>
        </div>
      </article>
      {isModalOpen && <DeletePopUp setisModalOpen={setisModalOpen} />}
    </li>
  );
};

export default ActiveAlerts;
