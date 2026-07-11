export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const windowSize = 1;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - windowSize && i <= currentPage + windowSize)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "…") {
        pages.push("…");
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 text-sm">
      <div className="flex items-center gap-3 text-muted">
        <span>
          Showing <span className="font-medium text-ink">{startItem}–{endItem}</span> of{" "}
          <span className="font-medium text-ink">{totalItems}</span>
        </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="px-2 py-1 rounded-md border border-line bg-paper-raised text-xs focus:outline-none focus:ring-2 focus:ring-brass/40"
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-line disabled:opacity-35 disabled:cursor-not-allowed hover:bg-paper-raised"
          aria-label="Previous page"
        >
          ‹
        </button>

        {getPageNumbers().map((p, idx) =>
          p === "…" ? (
            <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-muted">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${
                p === currentPage
                  ? "bg-ink text-paper"
                  : "border border-line hover:bg-paper-raised text-ink"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-line disabled:opacity-35 disabled:cursor-not-allowed hover:bg-paper-raised"
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  );
}
