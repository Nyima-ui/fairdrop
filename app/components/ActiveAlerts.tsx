"use client";
import DeletePopUp from "./DeletePopUp";
import { useState } from "react";

const ActiveAlerts = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  return (
    <li className="bg-input-background rounded-lg p-3.75">
      <article aria-labelledby="alert-route">
        <div className="flex justify-between items-center gap-5">
          <div className="flex-1 min-w-48 max-w-70">
            <div className="flex gap-3 items-center w-full" id="alert-route">
              <p>Delhi</p>
              <span
                aria-hidden="true"
                className="h-0.5 flex-1 bg-foreground/70"
              ></span>
              <span className="sr-only">to</span>
              <p>Mumbai</p>
            </div>
            <div className="flex gap-3 items-center w-full text-foreground/70">
              {/* change this later  */}
              <time dateTime="2026-08-23">August 23</time>
              <span
                aria-hidden="true"
                className="h-0.5 flex-1 bg-foreground/70"
              ></span>
              {/* change this later  */}
              <time dateTime="2026-08-23">August 31</time>
            </div>
          </div>

          <div>
            <p>Under</p>
            {/* change this later  */}
            <p className="font-medium" aria-label="9000 rupees">
              ₹9000
            </p>
          </div>
        </div>

        <div className="mt-7.5">
          <button
            className="px-6.25 py-1.25 border rounded-sm cursor-pointer hover:border-primary"
            type="button"
            // change this later
            aria-label="Edit alert for Delhi to  Mumbai"
          >
            Edit
          </button>
          <button
            className="px-6.25 py-1.25 rounded-sm bg-primary cursor-pointer border border-primary ml-7.5 hover:bg-btn-hover transition-all duration-150 ease-in"
            type="button"
            //   change this later
            aria-label="Delete alert for Delhi to Mumbai"
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
