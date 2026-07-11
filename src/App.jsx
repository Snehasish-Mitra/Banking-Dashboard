import { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import SummaryStats from "./components/SummaryStats";
import Toolbar from "./components/Toolbar";
import TransactionsTable from "./components/TransactionsTable";
import Pagination from "./components/Pagination";
import TransactionDetailsDrawer from "./components/TransactionDetailsDrawer";
import { transactions as allTransactions } from "./data/transactions";

const DEFAULT_FILTERS = {
  search: "",
  type: "all",
  category: "all",
  dateFrom: "",
  dateTo: "",
  minAmount: "",
  maxAmount: "",
};

function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleFilterChange = (partial) => {
    setFilters((prev) => ({ ...prev, ...partial }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  };

  const filteredTransactions = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    const minAmount = filters.minAmount ? parseFloat(filters.minAmount) : null;
    const maxAmount = filters.maxAmount ? parseFloat(filters.maxAmount) : null;
    const dateFrom = filters.dateFrom ? new Date(filters.dateFrom) : null;
    const dateTo = filters.dateTo ? new Date(filters.dateTo + "T23:59:59") : null;

    return allTransactions.filter((t) => {
      if (search) {
        const haystack = `${t.description} ${t.merchant} ${t.reference}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      if (filters.type !== "all" && t.type !== filters.type) return false;
      if (filters.category !== "all" && t.category !== filters.category) return false;

      const txnDate = new Date(t.date);
      if (dateFrom && txnDate < dateFrom) return false;
      if (dateTo && txnDate > dateTo) return false;

      if (minAmount !== null && t.amount < minAmount) return false;
      if (maxAmount !== null && t.amount > maxAmount) return false;

      return true;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pageTransactions = filteredTransactions.slice(pageStart, pageStart + pageSize);

  const handleExport = () => {
    import("./utils/csv").then(({ exportToCSV }) => {
      const stamp = new Date().toISOString().slice(0, 10);
      exportToCSV(filteredTransactions, `transactions_${stamp}.csv`);
    });
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-widest text-brass font-medium mb-1">
            Savings ** 4821
          </p>
          <h1 className="font-display text-2xl sm:text-3xl text-ink">Transactions</h1>
        </header>

        <SummaryStats transactions={filteredTransactions} />

        <Toolbar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          onExport={handleExport}
          resultCount={filteredTransactions.length}
        />

        <TransactionsTable transactions={pageTransactions} onSelect={setSelectedTransaction} />

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredTransactions.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </main>

      <TransactionDetailsDrawer
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  );
}

export default App;
