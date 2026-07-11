// Deterministic mock data generator for the transaction dashboard.
// No backend — this simulates what an API response would look like.

const CREDIT_DESCRIPTIONS = [
  { desc: "Salary Deposit", category: "Income", merchant: "Acme Corp Payroll" },
  { desc: "Freelance Payment", category: "Income", merchant: "Upwork Inc." },
  { desc: "Interest Credit", category: "Interest", merchant: "Ledgerline Bank" },
  { desc: "Refund", category: "Refund", merchant: "Amazon Retail" },
  { desc: "Peer Transfer Received", category: "Transfer", merchant: "M. Sharma" },
  { desc: "Dividend Payout", category: "Investment", merchant: "Bluechip Holdings" },
];

const DEBIT_DESCRIPTIONS = [
  { desc: "Grocery Purchase", category: "Groceries", merchant: "FreshMart" },
  { desc: "Electricity Bill", category: "Utilities", merchant: "State Power Co." },
  { desc: "Streaming Subscription", category: "Subscription", merchant: "Streamly" },
  { desc: "ATM Withdrawal", category: "Cash", merchant: "Ledgerline ATM #4471" },
  { desc: "Dining", category: "Dining", merchant: "The Copper Pot" },
  { desc: "Online Shopping", category: "Shopping", merchant: "Amazon Retail" },
  { desc: "Ride Share", category: "Transport", merchant: "GoCab" },
  { desc: "Rent Payment", category: "Housing", merchant: "Meridian Properties" },
  { desc: "Mobile Recharge", category: "Utilities", merchant: "Telco One" },
  { desc: "Gym Membership", category: "Subscription", merchant: "IronWorks Fitness" },
  { desc: "Insurance Premium", category: "Insurance", merchant: "Shieldline Insurance" },
  { desc: "Peer Transfer Sent", category: "Transfer", merchant: "R. Verma" },
];

const STATUSES = ["Completed", "Completed", "Completed", "Pending", "Failed"];
const METHODS = ["UPI", "Debit Card", "Credit Card", "Net Banking", "NEFT", "Cash"];

// simple seeded PRNG so the dataset is stable across reloads
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260711);

function pick(arr) {
  return arr[Math.floor(rand() * arr.length)];
}

function randomDateWithinLastMonths(months) {
  const now = new Date("2026-07-11T12:00:00");
  const past = new Date(now);
  past.setMonth(past.getMonth() - months);
  const t = past.getTime() + rand() * (now.getTime() - past.getTime());
  return new Date(t);
}

function generateTransactions(count = 180) {
  const rows = [];
  for (let i = 0; i < count; i++) {
    const isCredit = rand() < 0.32;
    const source = isCredit ? pick(CREDIT_DESCRIPTIONS) : pick(DEBIT_DESCRIPTIONS);
    const date = randomDateWithinLastMonths(8);
    const amount = isCredit
      ? Math.round((rand() * 45000 + 500) * 100) / 100
      : Math.round((rand() * 8000 + 50) * 100) / 100;

    rows.push({
      id: `TXN${String(100000 + i)}`,
      date: date.toISOString(),
      description: source.desc,
      merchant: source.merchant,
      category: source.category,
      type: isCredit ? "credit" : "debit",
      amount,
      status: STATUSES[Math.floor(rand() * STATUSES.length)],
      method: pick(METHODS),
      account: rand() < 0.5 ? "Savings •• 4821" : "Checking •• 1190",
      reference: `REF-${Math.floor(rand() * 900000 + 100000)}`,
      balanceAfter: 0, // computed below
      notes:
        rand() < 0.2
          ? "Recurring transaction — auto-scheduled."
          : "",
    });
  }

  rows.sort((a, b) => new Date(a.date) - new Date(b.date));

  let runningBalance = 124500;
  for (const row of rows) {
    runningBalance += row.type === "credit" ? row.amount : -row.amount;
    row.balanceAfter = Math.round(runningBalance * 100) / 100;
  }

  return rows.reverse(); // most recent first
}

export const transactions = generateTransactions(180);

export const CATEGORY_OPTIONS = Array.from(
  new Set(transactions.map((t) => t.category))
).sort();
