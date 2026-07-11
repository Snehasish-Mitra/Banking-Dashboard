export function exportToCSV(rows, filename = "transactions.csv") {
  if (!rows || rows.length === 0) return;

  const columns = [
    { key: "id", label: "Transaction ID" },
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
    { key: "merchant", label: "Merchant" },
    { key: "category", label: "Category" },
    { key: "type", label: "Type" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "method", label: "Method" },
    { key: "account", label: "Account" },
    { key: "reference", label: "Reference" },
  ];

  const escapeCell = (value) => {
    const str = String(value ?? "");
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const header = columns.map((c) => escapeCell(c.label)).join(",");
  const lines = rows.map((row) =>
    columns
      .map((c) => {
        if (c.key === "date") return escapeCell(new Date(row.date).toISOString().slice(0, 10));
        return escapeCell(row[c.key]);
      })
      .join(",")
  );

  const csvContent = [header, ...lines].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
