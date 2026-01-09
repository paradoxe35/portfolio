"use client";

import React, { PropsWithChildren } from "react";
import { useFormBold } from "@/utils/hooks";
import { cn } from "@/utils/cn";

const Alert: React.FC<PropsWithChildren<{ success?: boolean }>> = function ({
  children,
  success,
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-3 rounded-md text-sm mb-5",
        success
          ? "bg-green-500/10 text-green-600 dark:text-green-400"
          : "bg-red-500/10 text-red-600 dark:text-red-400"
      )}
    >
      {success ? (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
      {children}
    </div>
  );
};

const FORMBOLD_FORM_ID = "3G55p";

const inputStyles = cn(
  "w-full px-3 py-2 text-sm rounded-md",
  "bg-neutral-1 dark:bg-white/5",
  "border border-neutral-3 dark:border-white/15",
  "text-neutral-9 dark:text-neutral-2",
  "placeholder:text-neutral-5 dark:placeholder:text-neutral-5",
  "focus:outline-none focus:border-primary dark:focus:border-primary-light",
  "transition-colors duration-150"
);

export function ContactForm({ className }: { className?: string }) {
  const [state, handleSubmit] = useFormBold(FORMBOLD_FORM_ID);

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-[1.325rem] font-semibold text-neutral-8 dark:text-neutral-1 mb-1">
          Send a Message
        </h2>
        <p className="text-sm text-neutral-8 dark:text-neutral-4">
          Fill out the form below and I'll get back to you soon.
        </p>
      </div>

      {/* Alerts */}
      {state.succeeded && <Alert success>Message sent successfully!</Alert>}
      {state.error.status && (
        <Alert success={false}>{state.error.message}</Alert>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-[0.975rem] font-medium text-neutral-8 dark:text-neutral-3 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              required
              minLength={3}
              className={inputStyles}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-[0.975rem] font-medium text-neutral-8 dark:text-neutral-3 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              required
              className={inputStyles}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-[0.975rem] font-medium text-neutral-8 dark:text-neutral-3 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell me about your project..."
            required
            minLength={15}
            rows={4}
            className={cn(inputStyles, "resize-none")}
          />
        </div>

        <button
          disabled={state.loading}
          type="submit"
          className={cn(
            "px-4 py-1.5 text-[0.975rem] rounded",
            "bg-primary dark:bg-primary-light",
            "text-white dark:text-neutral-9",
            "font-medium",
            "hover:bg-primary-dark dark:hover:bg-primary",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "transition-colors duration-150",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {state.loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
