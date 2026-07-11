export function StatusBadge({ status }) {
  const styles = {
    Completed: "bg-credit-soft text-credit",
    Pending: "bg-pending-soft text-pending",
    Failed: "bg-debit-soft text-debit",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || "bg-line text-muted"}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

export function TypeBadge({ type }) {
  const isCredit = type === "credit";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-mono ${
        isCredit ? "bg-credit-soft text-credit" : "bg-debit-soft text-debit"
      }`}
    >
      {isCredit ? "Credit" : "Debit"}
    </span>
  );
}
