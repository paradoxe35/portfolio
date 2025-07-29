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
        "p-4 rounded-lg mb-4 text-sm font-medium animate-fadeInUp",
        success
          ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800"
          : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
      )}
    >
      {children}
    </div>
  );
};

const FORMBOLD_FORM_ID = "3G55p";

export function ContactForm() {
  const [state, handleSubmit] = useFormBold(FORMBOLD_FORM_ID);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-10 shadow-2xl border border-black/10 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary-light/20 transition-all duration-300">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark dark:from-neutral-1 dark:to-neutral-2 bg-clip-text text-transparent">
          {"Let's Build Something Amazing"}
        </h1>
        <p className="text-neutral-7 dark:text-neutral-4 mb-8 text-lg">
          {`Have a project in mind? I'd love to hear about it. Send me the details and let's create something exceptional together.`}
        </p>

        {state.succeeded && (
          <Alert success={state.succeeded}>
            {"Message sent successfully. I'll get back to you soon."}
          </Alert>
        )}
        {state.error.status && (
          <Alert success={false}>{state.error.message}</Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              minLength={3}
              className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm text-neutral-9 dark:text-neutral-1 placeholder-neutral-5 dark:placeholder-neutral-5 focus:outline-none focus:border-primary dark:focus:border-primary-light focus:bg-white/90 dark:focus:bg-white/10 transition-all duration-300 shadow-sm focus:shadow-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm text-neutral-9 dark:text-neutral-1 placeholder-neutral-5 dark:placeholder-neutral-5 focus:outline-none focus:border-primary dark:focus:border-primary-light focus:bg-white/90 dark:focus:bg-white/10 transition-all duration-300 shadow-sm focus:shadow-md"
            />
          </div>
          <textarea
            name="message"
            placeholder="Your message..."
            required
            minLength={15}
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-neutral-7 bg-white/80 dark:bg-neutral-9/50 text-neutral-9 dark:text-neutral-1 placeholder-neutral-5 dark:placeholder-neutral-5 focus:outline-none focus:border-primary dark:focus:border-primary-light transition-all duration-300 shadow-sm focus:shadow-md resize-none backdrop-blur-sm"
          />
          <div>
            <button
              disabled={state.loading}
              className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark dark:from-primary-light dark:to-primary text-white font-medium rounded-lg hover:shadow-xl hover:shadow-primary/20 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              type="submit"
            >
              {state.loading ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}