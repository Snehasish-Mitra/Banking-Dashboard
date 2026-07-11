import { formatCurrency, formatDate } from "../utils/format";
import { StatusBadge, TypeBadge } from "./Badges";

export default function TransactionsTable({ transactions, onSelect }) {
  if (transactions.length === 0) {
    return (
      <div className="bg-paper-raised border border-line rounded-lg py-16 flex flex-col items-center justify-center text-center px-6">
        <div className="w-11 h-11 rounded-full bg-paper flex items-center justify-center mb-3 border border-line">
          <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.6-10.6 7.5 7.5 0 0010.6 10.6z" />
          </svg>
        </div>
        <p className="font-medium text-ink mb-1">No transactions match these filters</p>
        <p className="text-sm text-muted">Try widening the date range or clearing a filter.</p>
      </div>
    );
  }

  return (
    <div className="bg-paper-raised border border-line rounded-lg overflow-hidden">
      <div className="overflow-x-auto scroll-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-muted">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">Type</th>
              <th className="px-4 py-3 font-medium hidden lg:table-cell">Status</th>
              <th className="px-4 py-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.id}
                onClick={() => onSelect(t)}
                className="border-b border-line last:border-0 hover:bg-paper cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 font-mono font-tabular text-muted whitespace-nowrap">
                  {formatDate(t.date)}
                </td>
                <td className="px-4 py-3">
                  <p className="text-ink font-medium">{t.description}</p>
                  <p className="text-xs text-muted">{t.merchant}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-muted">{t.category}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <TypeBadge type={t.type} />
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <StatusBadge status={t.status} />
                </td>
                <td
                  className={`px-4 py-3 text-right font-mono font-tabular font-medium whitespace-nowrap ${
                    t.type === "credit" ? "text-credit" : "text-debit"
                  }`}
                >
                  {t.type === "credit" ? "+" : "−"}
                  {formatCurrency(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
