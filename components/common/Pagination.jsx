"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = "",
}) {
  if (totalPages <= 1) return null;

  return (
    <div
      className={`flex items-center justify-between gap-4 pt-6 border-t border-slate-200 ${className}`}
    >
      <div className="text-xs text-slate-500 font-medium">
        Page <span className="font-bold text-slate-800">{currentPage}</span> of{" "}
        <span className="font-bold text-slate-800">{totalPages}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          icon={ChevronLeft}
          iconPosition="left"
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
          // Only show nearby pages if many
          if (
            p === 1 ||
            p === totalPages ||
            (p >= currentPage - 1 && p <= currentPage + 1)
          ) {
            return (
              <button
                key={p}
                onClick={() => onPageChange?.(p)}
                className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all ${
                  currentPage === p
                    ? "bg-amber-600 text-white shadow-sm shadow-amber-600/30"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {p}
              </button>
            );
          } else if (p === currentPage - 2 || p === currentPage + 2) {
            return (
              <span key={p} className="text-slate-400 text-xs px-1">
                ...
              </span>
            );
          }
          return null;
        })}

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          icon={ChevronRight}
          iconPosition="right"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

