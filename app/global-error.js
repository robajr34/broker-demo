"use client";

import React from "react";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-center font-sans">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-2xl mb-4">
          !
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Application Error</h1>
        <p className="text-sm text-slate-500 max-w-sm mb-6">
          A critical error occurred. Please refresh or retry.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-sm shadow-md hover:bg-amber-700 transition-colors"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}

