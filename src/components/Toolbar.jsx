import { useState } from "react";
import { CATEGORY_OPTIONS } from "../data/transactions";

export default function Toolbar({ filters, onFilterChange, onReset, onExport, resultCount }) {
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount = [
    filters.type !== "all",
    filters.category !== "all",
    filters.dateFrom,
    filters.dateTo,
    filters.minAmount,
    filters.maxAmount,
  ].filter(Boolean).length;

  return (
    <div className="bg-paper-raised border border-line rounded-lg mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.6-10.6 7.5 7.5 0 0010.6 10.6z" />
          </svg>
          <input
            type="text"
            placeholder="Search by description, merchant, or reference…"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 rounded-md border border-line bg-paper text-sm placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-brass/40 focus:border-brass"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters((s) => !s)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
              showFilters ? "border-brass bg-brass-soft text-ink" : "border-line hover:bg-paper text-ink"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18M6 9.5h12M10 14.5h4" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-0.5 inline-flex items-center justify-center w-4.5 h-4.5 text-[10px] rounded-full bg-brass text-white px-1">
                {activeFilterCount}
              </span>
            )}
          </button>

          <button
            onClick={onExport}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-ink text-paper text-sm font-medium hover:bg-ink-soft transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13m0 0l-4-4m4 4l4-4M4 20h16" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="border-t border-line px-4 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Type</label>
            <select
              value={filters.type}
              onChange={(e) => onFilterChange({ type: e.target.value })}
              className="px-2.5 py-1.5 rounded-md border border-line bg-paper text-sm focus:outline-none focus:ring-2 focus:ring-brass/40"
            >
              <option value="all">All</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Category</label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ category: e.target.value })}
              className="px-2.5 py-1.5 rounded-md border border-line bg-paper text-sm focus:outline-none focus:ring-2 focus:ring-brass/40"
            >
              <option value="all">All</option>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Date from</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => onFilterChange({ dateFrom: e.target.value })}
              className="px-2.5 py-1.5 rounded-md border border-line bg-paper text-sm focus:outline-none focus:ring-2 focus:ring-brass/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Date to</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => onFilterChange({ dateTo: e.target.value })}
              className="px-2.5 py-1.5 rounded-md border border-line bg-paper text-sm focus:outline-none focus:ring-2 focus:ring-brass/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Min amount</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={filters.minAmount}
              onChange={(e) => onFilterChange({ minAmount: e.target.value })}
              className="px-2.5 py-1.5 rounded-md border border-line bg-paper text-sm focus:outline-none focus:ring-2 focus:ring-brass/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Max amount</label>
            <input
              type="number"
              min="0"
              placeholder="Any"
              value={filters.maxAmount}
              onChange={(e) => onFilterChange({ maxAmount: e.target.value })}
              className="px-2.5 py-1.5 rounded-md border border-line bg-paper text-sm focus:outline-none focus:ring-2 focus:ring-brass/40"
            />
          </div>

          <div className="col-span-2 md:col-span-3 lg:col-span-6 flex items-center justify-between pt-1">
            <p className="text-xs text-muted">{resultCount} transaction{resultCount === 1 ? "" : "s"} match</p>
            <button onClick={onReset} className="text-xs font-medium text-brass hover:underline">
              Reset filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
