"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({
  size = "md", // sm, md, lg
  text = "Loading...",
  className = "",
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 gap-3 text-slate-500 ${className}`}
    >
      <Loader2 className={`${sizeClasses[size] || sizeClasses.md} animate-spin text-amber-600`} />
      {text && <p className="text-xs font-medium tracking-wide">{text}</p>}
    </div>
  );
}

