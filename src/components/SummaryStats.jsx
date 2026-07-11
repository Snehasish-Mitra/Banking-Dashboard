import { formatCurrency } from "../utils/format";

export default function SummaryStats({ transactions }) {
  const totalCredit = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalDebit = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);
  const net = totalCredit - totalDebit;
  const currentBalance = transactions[0]?.balanceAfter ?? 0;

  const stats = [
    { label: "Current Balance", value: formatCurrency(currentBalance), tone: "ink" },
    { label: "Money In", value: formatCurrency(totalCredit), tone: "credit" },
    { label: "Money Out", value: formatCurrency(totalDebit), tone: "debit" },
    {
      label: "Net (filtered range)",
      value: `${net >= 0 ? "+" : "−"}${formatCurrency(Math.abs(net))}`,
      tone: net >= 0 ? "credit" : "debit",
    },
  ];

  const toneClasses = {
    ink: "text-ink",
    credit: "text-credit",
    debit: "text-debit",
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-paper-raised border border-line rounded-lg px-4 py-3.5"
        >
          <p className="text-xs uppercase tracking-wider text-muted mb-1.5">{stat.label}</p>
          <p className={`font-mono font-tabular text-lg font-medium ${toneClasses[stat.tone]}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
