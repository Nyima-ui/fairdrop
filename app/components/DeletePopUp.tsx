"use client";
import { useEffect, useRef } from "react";

interface DeletePopUpProps {
  setisModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeletePopUp = ({ setisModalOpen }: DeletePopUpProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
  
  function handleClickOutside(e: React.MouseEvent<HTMLDivElement>) {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setisModalOpen(false);
    }
  }
  return (
    <div
      className="bg-black/50 fixed top-0 right-0 w-full h-screen z-10 flex justify-center items-center"
      role="dialog"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      aria-modal="true"
      onClick={(e) => handleClickOutside(e)}
    >
      <div
        className="px-3.75 pt-6.25 pb-5 bg-input-background max-w-88 rounded-sm space-y-7.5 border border-input-border"
        ref={modalRef}
      >
        <div className="flex flex-col items-center gap-2.5">
          <h3 className="text-[19px]" id="delete-dialog-title">
            Delete this alert?
          </h3>
          <p className="text-center" id="delete-dialog-description">
            You won&apos;t receive notifications for flights from Delhi to
            Mumbai between Aug 1–30.
          </p>
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            className="flex-1 py-2.5 border border-input-border rounded-sm cursor-pointer hover:text-primary transition-all duration-100 ease-in"
            aria-label="Cancel deletion"
            onClick={() => setisModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 py-2.5 bg-primary rounded-sm cursor-pointer hover:bg-btn-hover transition-all duration-100 ease-in"
            aria-label="Confirm delete alert"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
