const NAV_ITEMS = [
  { label: "Transactions", active: true },
  { label: "Accounts", active: false },
  { label: "Cards", active: false },
  { label: "Statements", active: false },
  { label: "Settings", active: false },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-ink text-paper min-h-screen px-6 py-8">
      <div className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 rounded-sm bg-brass flex items-center justify-center">
          <span className="font-display text-ink text-lg font-semibold leading-none">B</span>
        </div>
        <span className="font-display text-xl tracking-tight">Banking Dashboard</span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`text-left px-3 py-2.5 rounded-md text-sm transition-colors ${
              item.active
                ? "bg-white/10 text-paper font-medium"
                : "text-paper/55 hover:text-paper/90 hover:bg-white/5"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/10">
        <p className="text-xs uppercase tracking-widest text-paper/40 mb-2">Signed in as</p>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brass-soft/20 border border-white/15 flex items-center justify-center font-display text-sm">
            AK
          </div>
          <div className="leading-tight">
            <p className="text-sm text-paper/90">Snehasish Mitra</p>
            <p className="text-xs text-paper/45">Savings ** 4821</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
