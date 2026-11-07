"use client";

import React from "react";

export default function Table({
  headers = [],
  children,
  emptyMessage = "No records available.",
  className = "",
}) {
  return (
    <div
      className={`w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <table className="w-full text-left text-sm text-slate-600 border-collapse">
        <thead className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-700 border-b border-slate-200">
          <tr>
            {headers.map((h, i) => (
              <th
                key={h.key || h.label || i}
                className={`px-5 py-3.5 ${h.className || ""}`}
              >
                {h.label || h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">{children}</tbody>
      </table>
    </div>
  );
}

