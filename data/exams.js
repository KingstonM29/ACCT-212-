/*
 * Exam prep pages. `id` matches the `exam` field of an exam event in data/calendar.js.
 * problems use the same format as chapter examples (see data/chapters.js).
 * Chapter checklists ("I can…") live on each chapter in data/chapters.js.
 */
window.EXAMS = [
  {
    id: "midterm-1",
    title: "Midterm Exam 1",
    chapters: [1, 3, 2, 4],
    format: [
      "In class, on paper, during your regular 80-minute class (9:30–10:50).",
      "Closed book. Bring a real calculator, because phones aren't allowed.",
      "Covers Chapters 1–4: financial statements, the accounting equation, debits & credits, journal entries, trial balances, the classified balance sheet, ratios, adjusting entries and closing."
    ],
    tips: [
      "Write every journal entry with debits first and credits indented, and check that debits = credits before moving on.",
      "For adjusting entries, ask two questions: <b>which balance sheet account</b> is wrong, and <b>which income statement account</b> goes with it? Cash is never in an adjusting entry.",
      "Calculate income tax <b>last</b>, after all the other adjustments.",
      "Prepare statements in order: income statement, then retained earnings, then balance sheet. Net income flows into RE, and ending RE flows into the balance sheet.",
      "Dividends are <b>never</b> on the income statement.",
      "Accumulated depreciation is subtracted from the asset on the balance sheet. Don't list it as a liability.",
      "Show your work on every calculation. Part marks are common on paper exams.",
      "Know the IFRS vs ASPE differences: statement of changes in equity vs statement of retained earnings, and 5-step revenue recognition vs 3 conditions."
    ],
    problems: [
      {
        title: "Problem 1: Journalize & trial balance (Ch 1, 3)",
        prompt: `<p><b>Northside Tutoring Inc.</b> started business on June 1. Journalize the June transactions, then prepare a trial balance at June 30.</p>
<ol>
<li>Issued common shares for $20,000 cash.</li>
<li>Bought equipment for $9,000: paid $3,000 cash and signed a 6%, 3-year note payable for the rest.</li>
<li>Paid $2,400 for a 12-month insurance policy starting June 1.</li>
<li>Purchased $800 of supplies on account.</li>
<li>Received $1,500 in advance for tutoring to be provided in July and August.</li>
<li>Billed clients $4,200 for tutoring provided in June.</li>
<li>Paid salaries of $1,600.</li>
<li>Collected $2,500 from clients on account.</li>
<li>Paid $500 to suppliers on account.</li>
<li>Declared and paid a $400 cash dividend.</li>
</ol>`,
        steps: [
          { label: "Journal entries", entries: [
            { date: "1", lines: [["Cash", 20000, null], ["Common Shares", null, 20000]] },
            { date: "2", lines: [["Equipment", 9000, null], ["Cash", null, 3000], ["Notes Payable", null, 6000]] },
            { date: "3", memo: "Paid in advance, so it's an asset", lines: [["Prepaid Insurance", 2400, null], ["Cash", null, 2400]] },
            { date: "4", lines: [["Supplies", 800, null], ["Accounts Payable", null, 800]] },
            { date: "5", memo: "Not earned yet, so it's a liability", lines: [["Cash", 1500, null], ["Unearned Revenue", null, 1500]] },
            { date: "6", lines: [["Accounts Receivable", 4200, null], ["Service Revenue", null, 4200]] },
            { date: "7", lines: [["Salaries Expense", 1600, null], ["Cash", null, 1600]] },
            { date: "8", lines: [["Cash", 2500, null], ["Accounts Receivable", null, 2500]] },
            { date: "9", lines: [["Accounts Payable", 500, null], ["Cash", null, 500]] },
            { date: "10", memo: "Dividends reduce RE, not an expense", lines: [["Dividends Declared", 400, null], ["Cash", null, 400]] }
          ]},
          { label: "Trial balance", tb: { title: "Northside Tutoring Inc. — Trial Balance, June 30", rows: [
            ["Cash", 16100, null], ["Accounts Receivable", 1700, null], ["Supplies", 800, null], ["Prepaid Insurance", 2400, null], ["Equipment", 9000, null],
            ["Accounts Payable", null, 300], ["Unearned Revenue", null, 1500], ["Notes Payable", null, 6000], ["Common Shares", null, 20000],
            ["Dividends Declared", 400, null], ["Service Revenue", null, 4200], ["Salaries Expense", 1600, null]
          ]}, after: "Cash: 20,000 − 3,000 − 2,400 + 1,500 − 1,600 + 2,500 − 500 − 400 = 16,100." }
        ]
      },
      {
        title: "Problem 2: Adjusting entries (Ch 4)",
        prompt: `<p>Continue with Northside Tutoring. Prepare the June 30 adjusting entries.</p>
<ol type="a">
<li>One month of the insurance policy has expired.</li>
<li>A count shows $350 of supplies on hand.</li>
<li>The equipment has a 5-year life and a $600 residual value (straight-line).</li>
<li>Interest on the 6% note for June has not been recorded.</li>
<li>$500 of the tutoring paid for in advance was actually provided in June.</li>
<li>Tutoring of $700 was provided on June 30 but not yet billed.</li>
<li>Salaries of $300 are owed to staff at June 30.</li>
<li>The company's income tax rate is 20%.</li>
</ol>`,
        steps: [
          { label: "Adjusting entries", entries: [
            { date: "a", memo: "2,400 ÷ 12 months", lines: [["Insurance Expense", 200, null], ["Prepaid Insurance", null, 200]] },
            { date: "b", memo: "800 on hand − 350 left = 450 used", lines: [["Supplies Expense", 450, null], ["Supplies", null, 450]] },
            { date: "c", memo: "(9,000 − 600) ÷ 5 = 1,680/yr ÷ 12 = 140/month", lines: [["Depreciation Expense", 140, null], ["Accumulated Depreciation — Equipment", null, 140]] },
            { date: "d", memo: "6,000 × 6% × 1/12", lines: [["Interest Expense", 30, null], ["Interest Payable", null, 30]] },
            { date: "e", memo: "Unearned revenue now earned", lines: [["Unearned Revenue", 500, null], ["Service Revenue", null, 500]] },
            { date: "f", memo: "Accrued revenue", lines: [["Accounts Receivable", 700, null], ["Service Revenue", null, 700]] },
            { date: "g", memo: "Accrued expense", lines: [["Salaries Expense", 300, null], ["Salaries Payable", null, 300]] },
            { date: "h", memo: "Done LAST: see calculation below", lines: [["Income Tax Expense", 536, null], ["Income Tax Payable", null, 536]] }
          ]},
          { label: "Income tax calculation", html: `
<ul class="calc">
<li>Revenue = 4,200 + 500 + 700 = 5,400</li>
<li>Expenses = Salaries 1,900 + Insurance 200 + Supplies 450 + Depreciation 140 + Interest 30 = 2,720</li>
<li>Income before tax = 5,400 − 2,720 = 2,680</li>
<li>Income tax = 2,680 × 20% = <b>536</b></li>
</ul>` },
          { label: "Adjusted trial balance", tb: { title: "Northside Tutoring Inc. — Adjusted Trial Balance, June 30", rows: [
            ["Cash", 16100, null], ["Accounts Receivable", 2400, null], ["Supplies", 350, null], ["Prepaid Insurance", 2200, null], ["Equipment", 9000, null],
            ["Accumulated Depreciation — Equipment", null, 140], ["Accounts Payable", null, 300], ["Unearned Revenue", null, 1000], ["Salaries Payable", null, 300],
            ["Interest Payable", null, 30], ["Income Tax Payable", null, 536], ["Notes Payable", null, 6000], ["Common Shares", null, 20000],
            ["Dividends Declared", 400, null], ["Service Revenue", null, 5400], ["Salaries Expense", 1900, null], ["Insurance Expense", 200, null],
            ["Supplies Expense", 450, null], ["Depreciation Expense", 140, null], ["Interest Expense", 30, null], ["Income Tax Expense", 536, null]
          ]}}
        ]
      },
      {
        title: "Problem 3: Financial statements & ratios (Ch 1, 2)",
        prompt: "<p>Using the adjusted trial balance from Problem 2, prepare (a) an income statement, (b) a statement of retained earnings and (c) a classified statement of financial position for Northside Tutoring at June 30. Then calculate working capital, the current ratio and debt to total assets. The note payable is due in 3 years.</p>",
        steps: [
          { label: "a) Income statement", html: `
<div class="table-wrap"><table class="fs"><thead><tr><th colspan="3">Northside Tutoring Inc. — Income Statement, Month Ended June 30</th></tr></thead><tbody>
<tr><td>Service revenue</td><td></td><td>$5,400</td></tr>
<tr class="h"><td colspan="3">Expenses</td></tr>
<tr><td class="i1">Salaries expense</td><td>$1,900</td><td></td></tr>
<tr><td class="i1">Supplies expense</td><td>450</td><td></td></tr>
<tr><td class="i1">Insurance expense</td><td>200</td><td></td></tr>
<tr><td class="i1">Depreciation expense</td><td>140</td><td></td></tr>
<tr><td class="i1">Interest expense</td><td class="u">30</td><td class="u">2,720</td></tr>
<tr class="h"><td>Income before income tax</td><td></td><td>2,680</td></tr>
<tr><td>Income tax expense</td><td></td><td class="u">536</td></tr>
<tr class="h"><td>Net income</td><td></td><td class="uu">$2,144</td></tr>
</tbody></table></div>` },
          { label: "b) Statement of retained earnings", html: `
<div class="table-wrap"><table class="fs"><thead><tr><th colspan="3">Northside Tutoring Inc. — Statement of Retained Earnings, Month Ended June 30</th></tr></thead><tbody>
<tr><td>Retained earnings, June 1</td><td></td><td>$0</td></tr>
<tr><td>Add: Net income</td><td></td><td class="u">2,144</td></tr>
<tr><td></td><td></td><td>2,144</td></tr>
<tr><td>Less: Dividends declared</td><td></td><td class="u">400</td></tr>
<tr class="h"><td>Retained earnings, June 30</td><td></td><td class="uu">$1,744</td></tr>
</tbody></table></div>` },
          { label: "c) Classified statement of financial position", html: `
<div class="table-wrap"><table class="fs"><thead><tr><th colspan="3">Northside Tutoring Inc. — Statement of Financial Position, June 30</th></tr></thead><tbody>
<tr class="h"><td colspan="3">Assets</td></tr>
<tr class="h"><td class="i1" colspan="3">Current assets</td></tr>
<tr><td class="i2">Cash</td><td>$16,100</td><td></td></tr>
<tr><td class="i2">Accounts receivable</td><td>2,400</td><td></td></tr>
<tr><td class="i2">Supplies</td><td>350</td><td></td></tr>
<tr><td class="i2">Prepaid insurance</td><td class="u">2,200</td><td></td></tr>
<tr><td class="i2">Total current assets</td><td></td><td>$21,050</td></tr>
<tr class="h"><td class="i1" colspan="3">Property, plant & equipment</td></tr>
<tr><td class="i2">Equipment</td><td>9,000</td><td></td></tr>
<tr><td class="i2">Less: Accumulated depreciation</td><td class="u">140</td><td class="u">8,860</td></tr>
<tr class="h"><td>Total assets</td><td></td><td class="uu">$29,910</td></tr>
<tr class="h"><td colspan="3">Liabilities and Shareholders’ Equity</td></tr>
<tr class="h"><td class="i1" colspan="3">Current liabilities</td></tr>
<tr><td class="i2">Accounts payable</td><td>$300</td><td></td></tr>
<tr><td class="i2">Unearned revenue</td><td>1,000</td><td></td></tr>
<tr><td class="i2">Salaries payable</td><td>300</td><td></td></tr>
<tr><td class="i2">Interest payable</td><td>30</td><td></td></tr>
<tr><td class="i2">Income tax payable</td><td class="u">536</td><td></td></tr>
<tr><td class="i2">Total current liabilities</td><td></td><td>$2,166</td></tr>
<tr class="h"><td class="i1" colspan="3">Non-current liabilities</td></tr>
<tr><td class="i2">Notes payable</td><td></td><td class="u">6,000</td></tr>
<tr><td class="i1">Total liabilities</td><td></td><td>8,166</td></tr>
<tr class="h"><td class="i1" colspan="3">Shareholders’ equity</td></tr>
<tr><td class="i2">Common shares</td><td>20,000</td><td></td></tr>
<tr><td class="i2">Retained earnings</td><td class="u">1,744</td><td class="u">21,744</td></tr>
<tr class="h"><td>Total liabilities and shareholders’ equity</td><td></td><td class="uu">$29,910</td></tr>
</tbody></table></div>` },
          { label: "d) Ratios", html: `
<ul class="calc">
<li>Working capital = 21,050 − 2,166 = <b>$18,884</b></li>
<li>Current ratio = 21,050 ÷ 2,166 = <b>9.72 : 1</b> (very liquid)</li>
<li>Debt to total assets = 8,166 ÷ 29,910 = <b>27.3%</b></li>
</ul>` }
        ]
      },
      {
        title: "Problem 4: Closing entries (Ch 4)",
        prompt: "<p>Prepare Northside Tutoring's closing entries at June 30 and state the post-closing balance of Retained Earnings.</p>",
        steps: [
          { label: "Closing entries", entries: [
            { date: "1", memo: "Close revenues", lines: [["Service Revenue", 5400, null], ["Income Summary", null, 5400]] },
            { date: "2", memo: "Close expenses (incl. income tax)", lines: [["Income Summary", 3256, null], ["Salaries Expense", null, 1900], ["Insurance Expense", null, 200], ["Supplies Expense", null, 450], ["Depreciation Expense", null, 140], ["Interest Expense", null, 30], ["Income Tax Expense", null, 536]] },
            { date: "3", memo: "Close Income Summary (net income)", lines: [["Income Summary", 2144, null], ["Retained Earnings", null, 2144]] },
            { date: "4", memo: "Close dividends", lines: [["Retained Earnings", 400, null], ["Dividends Declared", null, 400]] }
          ], after: "Retained Earnings after closing: 0 + 2,144 − 400 = <b>$1,744</b>, which matches the statement of retained earnings." }
        ]
      },
      {
        title: "Problem 5: What if you forgot? (Ch 4)",
        prompt: "<p>For each adjustment that was <b>not</b> recorded, state whether assets, liabilities, equity and net income are overstated (O), understated (U) or have no effect (NE).</p><ol><li>Depreciation of $140</li><li>Accrued salaries of $300</li><li>$500 of unearned revenue that was earned</li><li>$700 of accrued revenue</li></ol>",
        steps: [
          { label: "Answers", html: `
<div class="table-wrap"><table><thead><tr><th>Missed adjustment</th><th>Assets</th><th>Liabilities</th><th>Equity</th><th>Net income</th></tr></thead><tbody>
<tr><td>1. Depreciation</td><td>O</td><td>NE</td><td>O</td><td>O</td></tr>
<tr><td>2. Accrued salaries</td><td>NE</td><td>U</td><td>O</td><td>O</td></tr>
<tr><td>3. Unearned revenue earned</td><td>NE</td><td>O</td><td>U</td><td>U</td></tr>
<tr><td>4. Accrued revenue</td><td>U</td><td>NE</td><td>U</td><td>U</td></tr>
</tbody></table></div>
<p class="muted">Tip: a missing <b>expense</b> always makes net income <b>too high</b>; a missing <b>revenue</b> makes it <b>too low</b>. Equity always moves the same way as net income.</p>` }
        ]
      }
    ]
  },
  {
    id: "midterm-2",
    title: "Midterm Exam 2",
    chapters: [5, 6, 7, 8],
    format: [
      "In class, on paper, during your regular class.",
      "Closed book. Bring a real calculator.",
      "Covers Chapters 5–8: merchandising, inventory, internal control & cash, receivables."
    ],
    tips: [
      "Perpetual system: every sale needs TWO entries (revenue and cost).",
      "Freight on purchases (FOB shipping point) goes into Inventory. Freight out is an operating expense.",
      "Check the discount window (2/10, n/30) against the payment date before taking the discount."
    ],
    problems: []
  },
  {
    id: "final",
    title: "Final Exam",
    chapters: [1, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14],
    format: [
      "Cumulative, with emphasis on Chapters 9–11, 13 and 14.",
      "In person. Date and time are set by the Registrar (Dec 9–18); check myStudentSystem.",
      "Closed book. Bring a real calculator."
    ],
    tips: [],
    problems: []
  }
];
