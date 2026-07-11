import { formatCurrency, formatDateTime } from "../utils/format";
import { StatusBadge } from "./Badges";

export default function TransactionDetailsDrawer({ transaction, onClose }) {
  if (!transaction) return null;
  const t = transaction;
  const isCredit = t.type === "credit";

  const rows = [
    ["Reference", t.reference],
    ["Account", t.account],
    ["Method", t.method],
    ["Merchant", t.merchant],
    ["Category", t.category],
    ["Balance after", formatCurrency(t.balanceAfter)],
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />

      <div className="relative w-full max-w-md h-full bg-paper-raised shadow-2xl flex flex-col animate-[slideIn_0.2s_ease-out]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <p className="text-xs uppercase tracking-widest text-muted">Transaction detail</p>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-paper text-muted hover:text-ink"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scroll-thin px-5 py-6">
          {/* Receipt stub */}
          <div className="relative bg-paper border border-line rounded-lg px-5 pt-6 pb-5 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-display text-lg text-ink leading-snug">{t.description}</p>
                <p className="text-xs text-muted mt-0.5">{formatDateTime(t.date)}</p>
              </div>
              <StatusBadge status={t.status} />
            </div>

            <p
              className={`font-mono font-tabular text-3xl font-semibold ${
                isCredit ? "text-credit" : "text-debit"
              }`}
            >
              {isCredit ? "+" : "−"}
              {formatCurrency(t.amount)}
            </p>

            {/* perforation */}
            <div className="relative my-5 -mx-5">
              <div className="border-t border-dashed border-line" />
              <div className="absolute -left-2 -top-2.5 w-4 h-4 rounded-full bg-ink" />
              <div className="absolute -right-2 -top-2.5 w-4 h-4 rounded-full bg-ink" />
            </div>

            <dl className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2.5 text-sm">
              {rows.map(([label, value]) => (
                <div className="contents" key={label}>
                  <dt className="text-muted">{label}</dt>
                  <dd className="text-ink font-mono font-tabular text-right">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex items-center gap-2 text-xs text-muted">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brass" />
              Transaction ID {t.id}
            </div>
          </div>

          {t.notes && (
            <div className="bg-brass-soft/50 border border-brass/25 rounded-md px-4 py-3 text-sm text-ink">
              {t.notes}
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-line flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-md border border-line text-sm font-medium hover:bg-paper"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
