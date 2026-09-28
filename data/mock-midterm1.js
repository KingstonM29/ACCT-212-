/*
 * Interactive Mock Midterm 1, built from the instructor's "Summary for Midterm #1" topic list.
 * Every question is tagged with a topic id from TOPICS so results can be broken down by topic.
 * Question types: mc, classify, order, je (journal entries), numeric.
 * Journal entry lines are [account, debit, credit].
 */
(function () {
  const TOPICS = [
    { id: "users", label: "External and internal users", learn: [["Ch 1 notes", "#/chapter/ch1/notes"]] },
    { id: "org", label: "Business organization characteristics", learn: [["Ch 1 notes", "#/chapter/ch1/notes"]] },
    { id: "is", label: "Income statement", learn: [["Ch 1 notes", "#/chapter/ch1/notes"], ["Statement flow diagram", "#/visual#dg-flow"]] },
    { id: "oe", label: "Statement of retained earnings / owner’s equity (proprietorship)", learn: [["Ch 1 notes", "#/chapter/ch1/notes"], ["Statement flow diagram", "#/visual#dg-flow"]] },
    { id: "bs", label: "Classified balance sheet (statement of financial position)", learn: [["Ch 2 notes", "#/chapter/ch2/notes"], ["Sorting game", "#/visual#dg-sorter"]] },
    { id: "equation", label: "The accounting equation", learn: [["Equation diagram", "#/visual#dg-equation"]] },
    { id: "normal", label: "Normal balances of accounts", learn: [["Dr/Cr drill", "#/practice?mode=drill"], ["Ch 3 rules", "#/chapter/ch3/notes"]] },
    { id: "je", label: "General journal entries", learn: [["Ch 3 notes", "#/chapter/ch3/notes"], ["Worked examples", "#/chapter/ch3/examples"]] },
    { id: "adjusting", label: "The 5 adjusting entries", learn: [["Ch 4 notes", "#/chapter/ch4/notes"], ["Timing diagram", "#/visual#dg-timing"]] },
    { id: "closing", label: "The 4 closing entries", learn: [["Closing animation", "#/visual#dg-closing"], ["Ch 4 notes", "#/chapter/ch4/notes"]] },
    { id: "cycle", label: "The accounting cycle", learn: [["Cycle wheel", "#/visual#dg-cycle"]] },
    { id: "taccounts", label: "T accounts", learn: [["Posting animation", "#/visual#dg-posting"]] }
  ];

  const ACCOUNTS = ["Cash", "Accounts Receivable", "Supplies", "Prepaid Insurance", "Prepaid Rent", "Equipment", "Vehicle", "Accumulated Depreciation — Vehicle",
    "Accounts Payable", "Salaries Payable", "Interest Payable", "Unearned Revenue", "Notes Payable",
    "J. Lee, Capital", "J. Lee, Drawings", "Income Summary", "Service Revenue",
    "Salaries Expense", "Rent Expense", "Supplies Expense", "Insurance Expense", "Depreciation Expense", "Interest Expense"];

  window.MOCK_EXAMS = [{
    id: "midterm-1",
    exam: "midterm-1",
    title: "Mock Midterm 1",
    minutes: 80,
    topics: TOPICS,
    accounts: ACCOUNTS,
    intro: `<p>This mock follows your instructor’s <b>Summary for Midterm #1</b> topic list. Parts D–H follow one business, <b>Sparkle Cleaning Services</b>, a proprietorship owned by <b>Jordan Lee</b>, through December: journal entries → T-accounts → adjusting entries → statements → closing.</p>
<p class="muted">Work on paper first if you like, then enter your answers. Check each part as you go, or start the 80-minute timer and grade the whole exam at the end. Your answers are saved in this browser.</p>`,
    parts: [
      {
        id: "A", title: "Concepts", type: "mc", marksEach: 1,
        items: [
          { topic: "users", q: "Which of the following is an INTERNAL user of accounting information?", options: ["The Canada Revenue Agency", "A bank loan officer", "The company’s marketing manager", "A shareholder"], answer: 2, why: "Internal users work for the business and make its decisions. Shareholders, lenders and the CRA are outside the business." },
          { topic: "users", q: "Which question would an EXTERNAL user most likely ask?", options: ["Can the company repay its loan on time?", "Which product line is most profitable?", "Should we hire two more cleaners?", "How much overtime was worked last week?"], answer: 0, why: "Creditors (external) care about repayment. The others are day-to-day management decisions." },
          { topic: "org", q: "Which form of business gives its owners limited liability?", options: ["Proprietorship", "Partnership", "Corporation", "All three"], answer: 2, why: "Only a corporation’s owners (shareholders) have limited liability." },
          { topic: "org", q: "Income tax on a proprietorship’s profit is paid by…", options: ["The proprietorship", "The owner, on their personal return", "Its customers", "No one: proprietorships are tax-free"], answer: 1, why: "A proprietorship is not a separate taxpayer, so profits are taxed to the owner. A corporation pays its own tax." },
          { topic: "equation", q: "Assets are $80,000 and liabilities are $35,000. Owner’s equity is…", options: ["$115,000", "$45,000", "$35,000", "$80,000"], answer: 1, why: "Equity = Assets − Liabilities = 80,000 − 35,000." },
          { topic: "equation", q: "The owner withdraws $500 cash for personal use. The effect on the equation is:", options: ["Assets ↓, Owner’s equity ↓", "Assets ↓, Liabilities ↓", "Assets ↓, Expenses ↑", "No effect"], answer: 0, why: "Cash goes down and drawings reduce owner’s equity. Drawings are not an expense." },
          { topic: "is", q: "Which item appears on the income statement?", options: ["J. Lee, Drawings", "Unearned Revenue", "Rent Expense", "Prepaid Insurance"], answer: 2, why: "Only revenues and expenses go on the income statement." },
          { topic: "oe", q: "Beginning capital $20,000, owner investments $5,000, net LOSS $3,000, drawings $4,000. Ending capital?", options: ["$18,000", "$26,000", "$24,000", "$32,000"], answer: 0, why: "20,000 + 5,000 − 3,000 − 4,000 = 18,000." },
          { topic: "bs", q: "On a classified balance sheet, Unearned Revenue is a…", options: ["Current asset", "Current liability", "Revenue", "Non-current liability"], answer: 1, why: "It’s an obligation to provide services, normally within a year." },
          { topic: "normal", q: "Which account has a normal CREDIT balance?", options: ["J. Lee, Drawings", "Supplies", "Unearned Revenue", "Rent Expense"], answer: 2, why: "Liabilities increase with credits. Drawings, assets and expenses have debit balances." },
          { topic: "cycle", q: "Which step comes immediately AFTER preparing the adjusted trial balance?", options: ["Journalize adjusting entries", "Prepare financial statements", "Prepare the post-closing trial balance", "Post to the ledger"], answer: 1, why: "The adjusted trial balance is the source for the financial statements." },
          { topic: "closing", q: "Which account is NOT closed at year end?", options: ["Service Revenue", "J. Lee, Drawings", "Rent Expense", "J. Lee, Capital"], answer: 3, why: "Capital is a permanent account. It receives the closing entries." },
          { topic: "adjusting", q: "Which type of adjustment has NO original entry before the adjusting entry?", options: ["Prepaid expense", "Unearned revenue", "Accrued expense", "Depreciation"], answer: 2, why: "Accruals (expenses and revenues) haven’t been recorded at all yet. Prepayments were recorded when the cash moved." },
          { topic: "taccounts", q: "In a T-account, credits are recorded on the…", options: ["Left side", "Right side", "Top", "Side that increases the account"], answer: 1, why: "Credit = right, always. Whether that’s an increase depends on the account." }
        ]
      },
      {
        id: "B", title: "Normal balances & where accounts appear", type: "classify", marksEach: 1, topic: "normal",
        note: "For each account, choose its normal balance and the statement it appears on. Each row is worth 1 mark (½ per column).",
        columns: [
          { key: "bal", label: "Normal balance", options: ["Debit", "Credit"] },
          { key: "fs", label: "Appears on", options: ["Income statement", "Statement of owner’s equity", "Balance sheet"] }
        ],
        items: [
          { acct: "Accounts Receivable", bal: "Debit", fs: "Balance sheet", topics: ["normal", "bs"] },
          { acct: "Unearned Revenue", bal: "Credit", fs: "Balance sheet", topics: ["normal", "bs"] },
          { acct: "J. Lee, Drawings", bal: "Debit", fs: "Statement of owner’s equity", topics: ["normal", "oe"] },
          { acct: "Service Revenue", bal: "Credit", fs: "Income statement", topics: ["normal", "is"] },
          { acct: "Accumulated Depreciation — Vehicle", bal: "Credit", fs: "Balance sheet", topics: ["normal", "bs"] },
          { acct: "Rent Expense", bal: "Debit", fs: "Income statement", topics: ["normal", "is"] },
          { acct: "Prepaid Insurance", bal: "Debit", fs: "Balance sheet", topics: ["normal", "bs"] },
          { acct: "Interest Payable", bal: "Credit", fs: "Balance sheet", topics: ["normal", "bs"] },
          { acct: "Supplies Expense", bal: "Debit", fs: "Income statement", topics: ["normal", "is"] },
          { acct: "Notes Payable", bal: "Credit", fs: "Balance sheet", topics: ["normal", "bs"] }
        ]
      },
      {
        id: "C", title: "The accounting cycle", type: "order", marks: 5, topic: "cycle",
        note: "Put the 9 steps in order using the arrows. Marks are given for each step in the correct position.",
        items: ["Analyze transactions", "Journalize transactions", "Post to the ledger", "Prepare an unadjusted trial balance", "Journalize and post adjusting entries",
          "Prepare an adjusted trial balance", "Prepare financial statements", "Journalize and post closing entries", "Prepare a post-closing trial balance"],
        start: [4, 0, 7, 2, 8, 5, 1, 6, 3]
      },
      {
        id: "D", title: "General journal entries", type: "je", marksEach: 2, topic: "je",
        note: "Sparkle Cleaning Services began operations on December 1. Journalize each transaction. Use + line for compound entries. Explanations aren’t needed.",
        items: [
          { date: "Dec 1", text: "Jordan Lee invested $30,000 cash in the business.", lines: [["Cash", 30000, null], ["J. Lee, Capital", null, 30000]] },
          { date: "Dec 1", text: "Purchased a van for $24,000, paying $4,000 cash and signing a 2-year, 6% note payable for the rest.", lines: [["Vehicle", 24000, null], ["Cash", null, 4000], ["Notes Payable", null, 20000]] },
          { date: "Dec 2", text: "Paid $3,600 for a 12-month insurance policy that starts December 1.", lines: [["Prepaid Insurance", 3600, null], ["Cash", null, 3600]] },
          { date: "Dec 5", text: "Purchased cleaning supplies on account, $1,200.", lines: [["Supplies", 1200, null], ["Accounts Payable", null, 1200]] },
          { date: "Dec 10", text: "Received $2,400 in advance for cleaning to be done evenly over December, January and February.", lines: [["Cash", 2400, null], ["Unearned Revenue", null, 2400]] },
          { date: "Dec 15", text: "Performed cleaning services for $5,600: received $2,000 cash, the rest on account.", lines: [["Cash", 2000, null], ["Accounts Receivable", 3600, null], ["Service Revenue", null, 5600]] },
          { date: "Dec 20", text: "Paid December rent, $1,500.", lines: [["Rent Expense", 1500, null], ["Cash", null, 1500]] },
          { date: "Dec 22", text: "Paid $700 on account to the supplies vendor.", lines: [["Accounts Payable", 700, null], ["Cash", null, 700]] },
          { date: "Dec 28", text: "Collected $2,100 from customers on account.", lines: [["Cash", 2100, null], ["Accounts Receivable", null, 2100]] },
          { date: "Dec 30", text: "Jordan withdrew $1,000 cash for personal use.", lines: [["J. Lee, Drawings", 1000, null], ["Cash", null, 1000]] },
          { date: "Dec 31", text: "Paid salaries for December, $2,200.", lines: [["Salaries Expense", 2200, null], ["Cash", null, 2200]] }
        ]
      },
      {
        id: "E", title: "T accounts & trial balance", type: "numeric", marksEach: 1, topic: "taccounts",
        note: "Post your Part D entries to T-accounts. Enter the ending balance of each account and the unadjusted trial balance total.",
        items: [
          { label: "Cash, ending balance", answer: 23500, topics: ["taccounts"] },
          { label: "Accounts Receivable, ending balance", answer: 1500, topics: ["taccounts"] },
          { label: "Accounts Payable, ending balance", answer: 500, topics: ["taccounts"] },
          { label: "Unadjusted trial balance, total debits", answer: 58500, topics: ["taccounts", "je"] }
        ],
        solution: "taccounts"
      },
      {
        id: "F", title: "Adjusting entries", type: "je", marksEach: 2, topic: "adjusting",
        note: "Prepare the December 31 adjusting entries. After checking, you’ll see which of the 5 adjustment types each one is.",
        items: [
          { date: "a", text: "One month of the insurance policy purchased on Dec 2 has expired.", lines: [["Insurance Expense", 300, null], ["Prepaid Insurance", null, 300]], kind: "Prepaid expense · 3,600 ÷ 12" },
          { date: "b", text: "A count shows $450 of supplies still on hand.", lines: [["Supplies Expense", 750, null], ["Supplies", null, 750]], kind: "Prepaid expense · 1,200 − 450 used" },
          { date: "c", text: "The van has a 4-year useful life and a $4,800 residual value (straight-line). Record December’s depreciation.", lines: [["Depreciation Expense", 400, null], ["Accumulated Depreciation — Vehicle", null, 400]], kind: "Depreciation · (24,000 − 4,800) ÷ 4 ÷ 12" },
          { date: "d", text: "One month of the cleaning paid for in advance on Dec 10 has now been provided.", lines: [["Unearned Revenue", 800, null], ["Service Revenue", null, 800]], kind: "Unearned revenue · 2,400 ÷ 3" },
          { date: "e", text: "Interest on the 6% note for December has not been recorded.", lines: [["Interest Expense", 100, null], ["Interest Payable", null, 100]], kind: "Accrued expense · 20,000 × 6% × 1/12" },
          { date: "f", text: "Cleaning worth $900 was performed on Dec 31 but has not been billed or recorded.", lines: [["Accounts Receivable", 900, null], ["Service Revenue", null, 900]], kind: "Accrued revenue" }
        ]
      },
      {
        id: "G", title: "Financial statements", type: "numeric", marksEach: 1.5, topic: "is",
        note: "Use the adjusted trial balance below to prepare the income statement, statement of owner’s equity and classified balance sheet for the month ended December 31. The note payable is due in 2 years. Enter the key totals.",
        given: { title: "Sparkle Cleaning Services — Adjusted Trial Balance, December 31", rows: [
          ["Cash", 23500, null], ["Accounts Receivable", 2400, null], ["Supplies", 450, null], ["Prepaid Insurance", 3300, null], ["Vehicle", 24000, null],
          ["Accumulated Depreciation — Vehicle", null, 400], ["Accounts Payable", null, 500], ["Interest Payable", null, 100], ["Unearned Revenue", null, 1600],
          ["Notes Payable", null, 20000], ["J. Lee, Capital", null, 30000], ["J. Lee, Drawings", 1000, null], ["Service Revenue", null, 7300],
          ["Salaries Expense", 2200, null], ["Rent Expense", 1500, null], ["Supplies Expense", 750, null], ["Depreciation Expense", 400, null],
          ["Insurance Expense", 300, null], ["Interest Expense", 100, null]
        ]},
        items: [
          { label: "Income statement: total revenues", answer: 7300, topics: ["is"] },
          { label: "Income statement: total expenses", answer: 5250, topics: ["is"] },
          { label: "Income statement: net income", answer: 2050, topics: ["is"] },
          { label: "Statement of owner’s equity: J. Lee, Capital, Dec 31", answer: 31050, topics: ["oe"], hint: "The Capital balance in the TB is the Dec 1 investment." },
          { label: "Balance sheet: total current assets", answer: 29650, topics: ["bs"] },
          { label: "Balance sheet: carrying amount of the vehicle", answer: 23600, topics: ["bs"] },
          { label: "Balance sheet: total assets", answer: 53250, topics: ["bs", "equation"] },
          { label: "Balance sheet: total current liabilities", answer: 2200, topics: ["bs"] },
          { label: "Balance sheet: total liabilities", answer: 22200, topics: ["bs"] },
          { label: "Balance sheet: total liabilities + owner’s equity", answer: 53250, topics: ["equation", "bs"] }
        ],
        solution: "statements"
      },
      {
        id: "H", title: "Closing entries", type: "je", marksEach: 2, topic: "closing",
        note: "Using the adjusted trial balance in Part G, prepare the 4 closing entries at December 31.",
        items: [
          { date: "1", text: "Close the revenue account.", lines: [["Service Revenue", 7300, null], ["Income Summary", null, 7300]] },
          { date: "2", text: "Close the expense accounts.", lines: [["Income Summary", 5250, null], ["Salaries Expense", null, 2200], ["Rent Expense", null, 1500], ["Supplies Expense", null, 750], ["Depreciation Expense", null, 400], ["Insurance Expense", null, 300], ["Interest Expense", null, 100]] },
          { date: "3", text: "Close Income Summary.", lines: [["Income Summary", 2050, null], ["J. Lee, Capital", null, 2050]] },
          { date: "4", text: "Close the drawings account.", lines: [["J. Lee, Capital", 1000, null], ["J. Lee, Drawings", null, 1000]] }
        ]
      }
    ],
    solutions: {
      taccounts: `
<div class="tgrid">
  <div class="tacc"><div class="tacc-h">Cash</div><div class="tacc-b"><div class="tacc-l">30,000<br>2,400<br>2,000<br>2,100</div><div class="tacc-r">4,000<br>3,600<br>1,500<br>700<br>1,000<br>2,200</div></div><div class="tacc-bal">Bal <b class="d">23,500 Dr</b></div></div>
  <div class="tacc"><div class="tacc-h">Accounts Receivable</div><div class="tacc-b"><div class="tacc-l">3,600</div><div class="tacc-r">2,100</div></div><div class="tacc-bal">Bal <b class="d">1,500 Dr</b></div></div>
  <div class="tacc"><div class="tacc-h">Accounts Payable</div><div class="tacc-b"><div class="tacc-l">700</div><div class="tacc-r">1,200</div></div><div class="tacc-bal">Bal <b class="c">500 Cr</b></div></div>
</div>
<p class="muted">Unadjusted TB debits: Cash 23,500 + A/R 1,500 + Supplies 1,200 + Prepaid Insurance 3,600 + Vehicle 24,000 + Drawings 1,000 + Rent 1,500 + Salaries 2,200 = <b>58,500</b>. Credits: A/P 500 + Unearned 2,400 + Notes 20,000 + Capital 30,000 + Service Revenue 5,600 = <b>58,500</b>.</p>`,
      statements: `
<div class="two-col">
<div class="table-wrap"><table class="fs"><thead><tr><th colspan="3">Income Statement, Month Ended Dec 31</th></tr></thead><tbody>
<tr><td>Service revenue</td><td></td><td>$7,300</td></tr>
<tr class="h"><td colspan="3">Expenses</td></tr>
<tr><td class="i1">Salaries expense</td><td>$2,200</td><td></td></tr>
<tr><td class="i1">Rent expense</td><td>1,500</td><td></td></tr>
<tr><td class="i1">Supplies expense</td><td>750</td><td></td></tr>
<tr><td class="i1">Depreciation expense</td><td>400</td><td></td></tr>
<tr><td class="i1">Insurance expense</td><td>300</td><td></td></tr>
<tr><td class="i1">Interest expense</td><td class="u">100</td><td class="u">5,250</td></tr>
<tr class="h"><td>Net income</td><td></td><td class="uu">$2,050</td></tr>
</tbody></table></div>
<div class="table-wrap"><table class="fs"><thead><tr><th colspan="3">Statement of Owner’s Equity, Month Ended Dec 31</th></tr></thead><tbody>
<tr><td>J. Lee, Capital, Dec 1</td><td></td><td>$0</td></tr>
<tr><td>Add: Investments</td><td>$30,000</td><td></td></tr>
<tr><td class="i1">Net income</td><td class="u">2,050</td><td class="u">32,050</td></tr>
<tr><td></td><td></td><td>32,050</td></tr>
<tr><td>Less: Drawings</td><td></td><td class="u">1,000</td></tr>
<tr class="h"><td>J. Lee, Capital, Dec 31</td><td></td><td class="uu">$31,050</td></tr>
</tbody></table></div>
</div>
<div class="table-wrap"><table class="fs"><thead><tr><th colspan="3">Sparkle Cleaning Services — Balance Sheet, December 31</th></tr></thead><tbody>
<tr class="h"><td colspan="3">Assets</td></tr>
<tr class="h"><td class="i1" colspan="3">Current assets</td></tr>
<tr><td class="i2">Cash</td><td>$23,500</td><td></td></tr>
<tr><td class="i2">Accounts receivable</td><td>2,400</td><td></td></tr>
<tr><td class="i2">Supplies</td><td>450</td><td></td></tr>
<tr><td class="i2">Prepaid insurance</td><td class="u">3,300</td><td></td></tr>
<tr><td class="i2">Total current assets</td><td></td><td>$29,650</td></tr>
<tr class="h"><td class="i1" colspan="3">Property, plant & equipment</td></tr>
<tr><td class="i2">Vehicle</td><td>24,000</td><td></td></tr>
<tr><td class="i2">Less: Accumulated depreciation</td><td class="u">400</td><td class="u">23,600</td></tr>
<tr class="h"><td>Total assets</td><td></td><td class="uu">$53,250</td></tr>
<tr class="h"><td colspan="3">Liabilities and Owner’s Equity</td></tr>
<tr class="h"><td class="i1" colspan="3">Current liabilities</td></tr>
<tr><td class="i2">Accounts payable</td><td>$500</td><td></td></tr>
<tr><td class="i2">Interest payable</td><td>100</td><td></td></tr>
<tr><td class="i2">Unearned revenue</td><td class="u">1,600</td><td></td></tr>
<tr><td class="i2">Total current liabilities</td><td></td><td>$2,200</td></tr>
<tr class="h"><td class="i1" colspan="3">Non-current liabilities</td></tr>
<tr><td class="i2">Notes payable (due in 2 years)</td><td></td><td class="u">20,000</td></tr>
<tr><td class="i1">Total liabilities</td><td></td><td>22,200</td></tr>
<tr class="h"><td class="i1" colspan="3">Owner’s equity</td></tr>
<tr><td class="i2">J. Lee, Capital</td><td></td><td class="u">31,050</td></tr>
<tr class="h"><td>Total liabilities and owner’s equity</td><td></td><td class="uu">$53,250</td></tr>
</tbody></table></div>
<p class="muted">Accounting equation check: Assets $53,250 = Liabilities $22,200 + Owner’s equity $31,050.</p>`
    }
  }];
})();
