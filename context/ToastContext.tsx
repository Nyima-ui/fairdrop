"use client";
import React, { createContext, useContext, useState } from "react";

interface ToastConfig {
  title: string;
  message: string;
  type?: "success" | "warning";
}

interface ToastContextType {
  showToast: (config: ToastConfig) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [config, setConfig] = useState<ToastConfig>({ title: "", message: "" });

  const showToast = (toastConfig: ToastConfig) => {
    setIsVisible(true);
    setConfig(toastConfig);
    setTimeout(() => setIsAnimating(true), 10);
    setTimeout(() => setIsAnimating(false), 4500);
    setTimeout(() => setIsVisible(false), 5000);
  };
  const hideToast = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 400);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {isVisible && (
        <ToastNotification
          onClose={hideToast}
          isAnimating={isAnimating}
          config={config}
        ></ToastNotification>
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

import CheckCircle from "@/app/components/svgs/CheckCircle";
import Close from "@/app/components/svgs/Close";
import Warning from "@/app/components/svgs/Warning";

const icons = {
  success: <CheckCircle />,
  warning: <Warning />,
};

export function ToastNotification({
  onClose,
  isAnimating,
  config,
}: {
  onClose: () => void;
  isAnimating: boolean;
  config: ToastConfig;
}) {
  const type = config.type ?? "success";
  return (
    <div
      className={`bg-input-background fixed right-18 max-w-100 p-3.75 rounded-lg top-15 shadow-lg shadow-primary/50 z-20 max-sm:right-5 max-sm:top-17.5 transition-transform duration-400 ease-[cubic-bezier(0.68, -0.55, 0.25, 1.35)] ${isAnimating ? `translate-x-0` : `translate-x-118`}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2.5 items-center">
          {icons[type]}
          <h5 className="text-[18px]">{config.title}</h5>
        </div>
        <button
          className="cursor-pointer hover:bg-primary rounded-sm"
          onClick={onClose}
        >
          <Close />
        </button>
      </div>
      <div className="mt-2 pl-8.5 pr-7.5">
        <p className="text-base opacity-70 font-light leading-snug">
          {config.message}
        </p>
      </div>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
