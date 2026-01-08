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
        "p-4 rounded-lg mb-6 text-sm font-medium animate-fadeUp",
        success
          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800/50"
          : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50"
      )}
    >
      {children}
    </div>
  );
};

const FORMBOLD_FORM_ID = "3G55p";

const inputStyles = cn(
  "w-full px-4 py-3 rounded-lg",
  "bg-neutral-1 dark:bg-neutral-9/80",
  "border border-neutral-2 dark:border-neutral-7",
  "text-neutral-9 dark:text-neutral-1",
  "placeholder-neutral-5 dark:placeholder-neutral-5",
  "focus:outline-none focus:border-primary dark:focus:border-primary-light",
  "focus:ring-2 focus:ring-primary/10 dark:focus:ring-primary-light/10",
  "transition-all duration-200"
);

export function ContactForm({ className }: { className?: string }) {
  const [state, handleSubmit] = useFormBold(FORMBOLD_FORM_ID);

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div
        className={cn(
          "bg-white dark:bg-neutral-9/50",
          "border border-neutral-2 dark:border-white/8",
          "rounded-xl p-6 md:p-8",
          "shadow-sm"
        )}
      >
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-9 dark:text-white mb-2">
            Send a Message
          </h2>
          <p className="text-neutral-7 dark:text-neutral-3">
            Have a project in mind? Fill out the form below and I'll get back to
            you soon.
          </p>
        </div>

        {/* Alerts */}
        {state.succeeded && (
          <Alert success={state.succeeded}>
            Message sent successfully. I'll get back to you soon.
          </Alert>
        )}
        {state.error.status && (
          <Alert success={false}>{state.error.message}</Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-7 dark:text-neutral-3 mb-1.5"
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
                className="block text-sm font-medium text-neutral-7 dark:text-neutral-3 mb-1.5"
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
              className="block text-sm font-medium text-neutral-7 dark:text-neutral-3 mb-1.5"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell me about your project..."
              required
              minLength={15}
              rows={5}
              className={cn(inputStyles, "resize-none")}
            />
          </div>

          <button
            disabled={state.loading}
            type="submit"
            className={cn(
              "w-full sm:w-auto px-6 py-3 rounded-lg",
              "bg-primary dark:bg-primary-light",
              "text-white dark:text-neutral-9",
              "font-medium text-sm",
              "hover:bg-primary-dark dark:hover:bg-primary",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              "transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {state.loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
