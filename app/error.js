"use client";

import React from "react";
import Button from "@/components/ui/Button";

export default function GlobalError({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xl mb-4">
        !
      </div>
      <h1 className="text-2xl font-black text-slate-900 mb-2">Something went wrong</h1>
      <p className="text-sm text-slate-500 max-w-sm mb-6">
        An unexpected application error occurred.
      </p>
      <Button variant="primary" size="md" onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  );
}

