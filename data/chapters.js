/*
 * ACCT 212 study guide — chapter content.
 *
 * HOW TO ADD A CHAPTER
 * Copy one of the objects below, give it a new `id` and the chapter `number`,
 * and fill in the fields. Class order, dates and which exam it's on come from
 * data/calendar.js (COURSE.chapters). Everything is optional except id, number and title. HTML is allowed inside `html` strings.
 *
 *   checklist   – "I can…" skills, used for the exam-prep readiness checklist
 *   summary     – short bullet points for the "Quick summary" tab and the Overall Notes page
 *   terms       – key vocabulary  { term, def }
 *   sections    – full notes      { title, html }
 *   examples    – worked examples { title, prompt, steps: [{ label, entries | html }] }
 *                 entries = [{ date, lines: [[account, debit, credit]], memo }]
 *   flashcards  – { q, a }
 *   quiz        – { q, options: [...], answer: <index>, why }
 */
window.CHAPTERS = [
  /* ------------------------------------------------------------------ */
  {
    id: "ch1",
    number: 1,
    deck: "Class PowerPoints – 1",
    title: "The Purpose and Use of Financial Statements",
    blurb: "What accounting is, who uses it, the four financial statements and the accounting equation.",
    checklist: [
      "Name internal vs external users and what each needs",
      "Compare proprietorships, partnerships and corporations",
      "List the four financial statements in order and what each reports",
      "Show how a transaction affects A = L + E",
      "Prepare an income statement, statement of retained earnings and balance sheet",
      "Explain the IFRS vs ASPE differences covered in class",
      "Apply the 3-step ethics process"
    ],
    summary: [
      "Accounting <b>identifies, records and communicates</b> the economic events of an organization to decision makers.",
      "Two groups of users: <b>internal</b> (managers, employees) and <b>external</b> (investors, creditors, CRA, customers).",
      "Three business forms: <b>proprietorship</b>, <b>partnership</b>, <b>corporation</b> — only the corporation has limited liability and pays its own tax.",
      "Four statements, in order: <b>Income Statement → Statement of Retained Earnings → Statement of Financial Position → Statement of Cash Flows</b>.",
      "<b>Assets = Liabilities + Equity</b>. It must balance after every transaction — every transaction has a <b>dual effect</b>.",
      "Revenues <b>increase</b> equity; expenses and drawings/dividends <b>decrease</b> equity. Drawings/dividends are <b>not</b> expenses.",
      "Only events that change assets, liabilities or equity get recorded.",
      "Public companies must use <b>IFRS</b>; private companies usually use <b>ASPE</b> (but may choose IFRS and must then be consistent).",
      "Ethical dilemma: (1) identify who is affected, (2) identify alternatives, (3) choose the most ethical one."
    ],
    terms: [
      { term: "Accounting", def: "A system of analyzing, recording and summarizing a business’s activities and reporting the results to decision makers." },
      { term: "Asset", def: "A resource owned or controlled by a business that is expected to provide future benefits." },
      { term: "Liability", def: "A present obligation, arising from past events, to pay assets or provide services in the future." },
      { term: "Owner’s / Shareholders’ equity", def: "The owners’ claim on assets: Assets − Liabilities (the residual)." },
      { term: "Revenue", def: "Increase in equity from business activities performed to earn profit. Comes with an increase in an asset or decrease in a liability." },
      { term: "Expense", def: "The cost of assets consumed or services used to earn revenue. Decreases equity. Excludes owner withdrawals." },
      { term: "Drawings / Dividends", def: "Distributions to owners. Reduce equity but are NOT expenses (they don’t appear on the income statement)." },
      { term: "IFRS", def: "International Financial Reporting Standards — required for publicly traded companies in Canada." },
      { term: "ASPE", def: "Accounting Standards for Private Enterprises — used by most private companies, proprietorships and partnerships." }
    ],
    sections: [
      {
        title: "Accounting for business decisions",
        html: `
<p><b>Accounting</b> is a system of analyzing, recording and summarizing the results of a business’s activities and then reporting the results to decision makers.</p>
<p>The main goal of an accounting system is to capture information about a company’s three kinds of activities so it can be reported to people inside and outside the business:</p>
<div class="chips"><span class="chip">Operating</span><span class="chip">Investing</span><span class="chip">Financing</span></div>`
      },
      {
        title: "Uses and users of accounting",
        html: `
<p>Accounting identifies and records the economic events of an organization and communicates them to interested users.</p>
<div class="two-col">
  <div class="card-lite"><h4>Internal users</h4><p>Work <em>for</em> the business and make its day-to-day decisions — managers, officers, department heads, employees.</p></div>
  <div class="card-lite"><h4>External users</h4><p>Outside the business — investors (shareholders), lenders/creditors, the Canada Revenue Agency, customers, labour unions, regulators.</p></div>
</div>`
      },
      {
        title: "Forms of business organization",
        html: `
<div class="table-wrap"><table>
<thead><tr><th>Characteristic</th><th>Proprietorship</th><th>Partnership</th><th>Corporation</th></tr></thead>
<tbody>
<tr><td>Owners</td><td>Proprietor: one</td><td>Partners: two or more</td><td>Shareholders: one or more</td></tr>
<tr><td>Owner’s liability</td><td>Unlimited</td><td>Unlimited</td><td>Limited</td></tr>
<tr><td>Private or public</td><td>Private</td><td>Usually private</td><td>Private or public</td></tr>
<tr><td>Taxation of profits</td><td>Paid by the owner</td><td>Paid by the partners</td><td>Paid by the corporation</td></tr>
<tr><td>Life of organization</td><td>Limited</td><td>Limited</td><td>Unlimited</td></tr>
</tbody></table></div>
<p class="muted">Equity naming: a proprietorship uses <b>Owner’s Capital</b> and <b>Drawings</b>; a corporation uses <b>Share Capital</b> (common shares) and <b>Retained Earnings</b>, and pays <b>Dividends</b>.</p>`
      },
      {
        title: "The four financial statements",
        html: `
<p>Typically prepared <b>in this order</b> (each one feeds the next):</p>
<ol class="flow">
  <li><b>Income Statement</b><span>Revenues − Expenses = Net Income</span></li>
  <li><b>Statement of Retained Earnings</b><span>Beginning RE + Net Income − Dividends = Ending RE</span></li>
  <li><b>Statement of Financial Position</b> (Balance Sheet)<span>Assets = Liabilities + Shareholders’ Equity</span></li>
  <li><b>Statement of Cash Flows</b><span>± Operating ± Investing ± Financing = Change in cash</span></li>
</ol>
<div class="table-wrap"><table>
<thead><tr><th>Statement</th><th>Purpose: to report…</th><th>Examples of content</th></tr></thead>
<tbody>
<tr><td>Income Statement</td><td>Financial performance during the current accounting <b>period</b>.</td><td>Sales revenue, wages expense, supplies expense, rent expense</td></tr>
<tr><td>Statement of Retained Earnings</td><td>Earnings kept in the business this period compared with prior periods.</td><td>Net income (from the income statement), dividends</td></tr>
<tr><td>Balance Sheet</td><td>Financial position at a <b>point in time</b>.</td><td>Cash, receivables, supplies, equipment, payables, notes payable, share capital, retained earnings</td></tr>
<tr><td>Statement of Cash Flows</td><td>Activities that increased and decreased cash during the period.</td><td>Cash from customers, cash paid to suppliers, equipment purchased, bank loans, shares issued</td></tr>
</tbody></table></div>
<div class="callout">Under <b>IFRS</b> a <em>statement of changes in equity</em> is required (shows changes in <b>all</b> equity components — share capital and retained earnings). Under <b>ASPE</b> a <em>statement of retained earnings</em> is presented (only retained earnings).</div>
<div data-diagram="flow"></div>`
      },
      {
        title: "Statement of financial position: assets & liabilities",
        html: `
<div class="two-col">
  <div class="card-lite"><h4>Assets</h4><ul>
    <li>Resources owned or controlled by a business</li>
    <li>Used to carry out activities like production and distribution</li>
    <li>Provide future services or benefits</li></ul></div>
  <div class="card-lite"><h4>Liabilities</h4><ul>
    <li>Obligations arising from past events to make a future payment of assets or services</li>
    <li>Present debts and obligations</li></ul></div>
</div>`
      },
      {
        title: "The accounting equation",
        html: `
<div class="formula">Assets = Liabilities + Owner’s Equity</div>
<ul>
<li>Assets (resources) must equal the claims against those resources.</li>
<li>Liabilities are listed <b>before</b> equity because creditors’ claims are paid before owners’ claims.</li>
</ul>
<h4>Expanded equation</h4>
<div class="formula small">Assets = Liabilities + Owner’s Capital − Drawings + Revenues − Expenses</div>
<div class="formula small">Corporation: Assets = Liabilities + Share Capital + Retained Earnings<br><span class="muted">where Retained Earnings = Beginning RE + Revenues − Expenses − Dividends</span></div>
<div data-diagram="equation"></div>`
      },
      {
        title: "Income statement: revenues & expenses",
        html: `
<div class="two-col">
  <div class="card-lite up"><h4>Revenues ↑ equity</h4><ul>
    <li>Result from activities performed to earn profit</li>
    <li>Come with an <b>increase in an asset</b> or a <b>decrease in a liability</b></li></ul></div>
  <div class="card-lite down"><h4>Expenses ↓ equity</h4><ul>
    <li>The cost of assets consumed or services used</li>
    <li>Come with a <b>decrease in an asset</b> or an <b>increase in a liability</b></li>
    <li><b>Exclude</b> withdrawals/dividends to owners</li></ul></div>
</div>`
      },
      {
        title: "Transaction analysis",
        html: `
<ul>
<li>Only events that cause a change in <b>assets, liabilities or equity</b> are recorded (signing a contract or hiring someone is not a transaction until something is exchanged).</li>
<li>The accounting equation must <b>always</b> balance.</li>
<li>Each transaction has a <b>dual effect</b> on the equation — at least two items change.</li>
</ul>
<p>Try it: walk through the <a href="#/chapter/ch1/examples">Softbyte example</a> and watch the equation stay balanced.</p>`
      },
      {
        title: "Ethical conduct",
        html: `
<p><b>Ethics</b> = standards of conduct for judging right from wrong, honest from dishonest, and fair from unfair. CPA Canada requires all members to follow a <b>Code of Professional Conduct</b>.</p>
<ol class="steps"><li>Identify who will be affected by the situation.</li><li>Identify the alternative courses of action.</li><li>Choose the alternative that is the most ethical.</li></ol>`
      },
      {
        title: "IFRS vs ASPE",
        html: `
<div class="table-wrap"><table>
<thead><tr><th>Topic</th><th>IFRS</th><th>ASPE</th></tr></thead>
<tbody>
<tr><td>Who uses it</td><td>Publicly traded corporations <b>must</b> use IFRS.</td><td>Private corporations normally use ASPE but can choose IFRS — once chosen it must be applied consistently. Proprietorships and partnerships generally follow ASPE.</td></tr>
<tr><td>Equity statement</td><td>Statement of changes in equity (all components of equity).</td><td>Statement of retained earnings (retained earnings only).</td></tr>
</tbody></table></div>`
      }
    ],
    examples: [
      {
        title: "Softbyte — transaction analysis",
        interactive: "equation",
        prompt: "Analyze each Softbyte transaction and show its effect on the accounting equation.",
        columns: ["Cash", "Accounts Receivable", "Supplies", "Equipment", "|", "Accounts Payable", "|", "Common Shares", "Retained Earnings"],
        rows: [
          { t: "1. Shareholders invest $15,000 cash in exchange for common shares", v: [15000, 0, 0, 0, 0, 15000, 0] },
          { t: "2. Purchases computer equipment for $7,000 cash", v: [-7000, 0, 0, 7000, 0, 0, 0] },
          { t: "3. Purchases supplies (lasting several months) for $1,600 on account", v: [0, 0, 1600, 0, 1600, 0, 0] },
          { t: "4. Receives $1,200 cash from customers for programming services provided", v: [1200, 0, 0, 0, 0, 0, 1200], note: "Service revenue" },
          { t: "5. Receives a $250 advertising bill, to be paid later", v: [0, 0, 0, 0, 250, 0, -250], note: "Advertising expense" },
          { t: "6. Provides $3,500 of services; receives $1,500 cash, rest on account", v: [1500, 2000, 0, 0, 0, 0, 3500], note: "Service revenue" },
          { t: "7. Pays rent of $600 and salaries of $900 in cash", v: [-1500, 0, 0, 0, 0, 0, -1500], note: "Rent expense $600, Salaries expense $900" }
        ],
        takeaway: "Ending totals: Assets $19,800 = Liabilities $1,850 + Equity $17,950. Net income = revenues $4,700 − expenses $1,750 = $2,950."
      }
    ],
    flashcards: [
      { q: "What is the accounting equation?", a: "Assets = Liabilities + Equity" },
      { q: "In what order are the four financial statements prepared?", a: "Income Statement → Statement of Retained Earnings → Statement of Financial Position → Statement of Cash Flows" },
      { q: "Which business form has limited liability?", a: "Corporation" },
      { q: "Are dividends / drawings an expense?", a: "No — they reduce equity directly and never appear on the income statement." },
      { q: "Balance sheet: point in time or period of time?", a: "Point in time (e.g. 'as at December 31'). The income statement covers a period." },
      { q: "Who must use IFRS in Canada?", a: "Publicly traded corporations. Private companies usually use ASPE." },
      { q: "Name the 3 steps for an ethical dilemma.", a: "1) Identify who is affected 2) Identify alternatives 3) Choose the most ethical alternative" },
      { q: "Revenue is recorded along with…", a: "An increase in an asset or a decrease in a liability." }
    ],
    quiz: [
      { q: "A company buys equipment for cash. Effect on the accounting equation?", options: ["Assets ↑, Equity ↑", "One asset ↑, another asset ↓ — totals unchanged", "Assets ↑, Liabilities ↑", "Assets ↓, Equity ↓"], answer: 1, why: "Equipment goes up and Cash goes down by the same amount. Total assets don’t change." },
      { q: "Supplies bought on account. Effect?", options: ["Assets ↑, Liabilities ↑", "Assets ↑, Equity ↑", "Assets ↓, Liabilities ↓", "No effect"], answer: 0, why: "Supplies (asset) up, Accounts Payable (liability) up." },
      { q: "Which statement is prepared FIRST?", options: ["Balance sheet", "Statement of cash flows", "Income statement", "Statement of retained earnings"], answer: 2, why: "Net income from the income statement is needed for the statement of retained earnings." },
      { q: "Paying a dividend affects…", options: ["The income statement only", "Retained earnings (↓) and cash (↓)", "Expenses (↑)", "Liabilities (↑)"], answer: 1, why: "Dividends reduce retained earnings directly; they are not expenses." },
      { q: "Signing a contract to perform services next month is…", options: ["Recorded as revenue", "Recorded as a receivable", "Not recorded — nothing has changed in A, L or E yet", "Recorded as deferred revenue"], answer: 2, why: "Only events that change assets, liabilities or equity are recorded." },
      { q: "Assets $50,000, Liabilities $18,000. Equity = ?", options: ["$68,000", "$32,000", "$18,000", "$50,000"], answer: 1, why: "Equity = Assets − Liabilities = 50,000 − 18,000." },
      { q: "Beginning RE $12,000, net income $5,000, dividends $2,000. Ending RE?", options: ["$19,000", "$15,000", "$9,000", "$17,000"], answer: 1, why: "12,000 + 5,000 − 2,000 = 15,000." },
      { q: "Under IFRS, which equity statement is required?", options: ["Statement of retained earnings", "Statement of changes in equity", "Statement of owner’s capital", "None"], answer: 1, why: "IFRS shows changes in ALL equity components; ASPE uses a statement of retained earnings." },
      { q: "A private company chose IFRS last year. This year it…", options: ["Can switch back to ASPE anytime", "Must apply IFRS consistently", "Must use both", "Uses whichever gives higher income"], answer: 1, why: "Once the choice is made it must be applied consistently." },
      { q: "Performed services for $900 on account. Effect?", options: ["Assets ↑, Liabilities ↑", "Assets ↑, Equity ↑", "Liabilities ↓, Equity ↑", "No effect until cash is received"], answer: 1, why: "A/R (asset) ↑ and revenue increases equity. Revenue is earned when the service is done." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "ch3",
    number: 3,
    deck: "Class PowerPoints – 3 (do before Ch 2)",
    title: "The Accounting Information System",
    blurb: "Debits and credits, journalizing, posting to the ledger and preparing a trial balance.",
    checklist: [
      "State the debit/credit rules for every account type",
      "Journalize transactions in the general journal",
      "Post to T-accounts and calculate balances",
      "Prepare a trial balance",
      "Explain which errors a trial balance can't find"
    ],
    summary: [
      "The 9-step <b>accounting cycle</b>: Analyze → Journalize → Post → Unadjusted TB → Adjust → Adjusted TB → Statements → Close → Post-closing TB.",
      "<b>Debit = left, Credit = right.</b> Debits aren’t “good” or “bad”, and aren’t always increases.",
      "<b>Debits = Credits. Always!</b> Every transaction affects at least two accounts.",
      "Debit to increase: <b>Assets, Expenses, Dividends/Drawings</b>. Credit to increase: <b>Liabilities, Equity (capital), Revenues</b>.",
      "The <b>journal</b> is the book of original entry (chronological). <b>Posting</b> transfers entries to the <b>ledger</b> (accounts).",
      "Chart of accounts numbering: <b>1 Assets, 2 Liabilities, 3 Equity, 4 Revenues, 5 Expenses</b>.",
      "Account balance = total debits − total credits (the bigger side is the balance side).",
      "A <b>trial balance</b> lists every account balance to prove total debits = total credits — but it can’t catch every error."
    ],
    terms: [
      { term: "Account", def: "An individual record of increases and decreases in a specific asset, liability or equity item." },
      { term: "T-account", def: "Simple form of an account: title on top, debit (left) side, credit (right) side." },
      { term: "Debit (Dr)", def: "The left side of an account." },
      { term: "Credit (Cr)", def: "The right side of an account." },
      { term: "Normal balance", def: "The side (debit or credit) on which an account increases." },
      { term: "Journal", def: "The book of original entry — transactions recorded in chronological order." },
      { term: "Ledger", def: "The collection of all the company’s accounts." },
      { term: "Posting", def: "Transferring journal entries to the ledger accounts." },
      { term: "Chart of accounts", def: "A numbered list of all accounts used by the entity." },
      { term: "Trial balance", def: "A list of accounts and balances at a point in time that proves debits = credits." }
    ],
    sections: [
      {
        title: "The accounting cycle",
        html: `
<ol class="cycle">
<li>Analyze transactions</li><li>Journalize</li><li>Post</li><li>Prepare unadjusted trial balance</li><li>Adjust</li><li>Prepare adjusted trial balance</li><li>Prepare statements</li><li>Close</li><li>Prepare post-closing trial balance</li>
</ol>
<p class="muted">Steps 1–4 are Chapter 3. Steps 5–9 are Chapter 4.</p>
<div data-diagram="cycle"></div>`
      },
      {
        title: "The recording process (first three steps)",
        html: `
<ol class="steps">
<li><b>Analyze</b> business transactions — determine the effect on accounts.</li>
<li><b>Journalize</b> the transactions — the journal is the <em>book of original entry</em>.</li>
<li><b>Post</b> to the ledger accounts.</li>
</ol>`
      },
      {
        title: "Double-entry accounting",
        html: `
<ul><li>Transactions are recorded using debits and credits.</li><li>Every transaction affects <b>at least two</b> accounts.</li><li>Equal debits and credits keep the accounting equation in balance.</li></ul>
<div class="formula">Debits = Credits &nbsp;·&nbsp; Always!</div>
<h4>The T-account</h4>
<div class="taccount"><div class="t-title">Account Title</div><div class="t-left">Debit (Dr)<br><small>LEFT side</small></div><div class="t-right">Credit (Cr)<br><small>RIGHT side</small></div></div>
<div class="callout">Debits are not “good” or “bad.” Neither are credits. Debits are not always increases and credits are not always decreases. <b>Debit simply means left side, and credit means right side.</b></div>`
      },
      {
        title: "Debit & credit rules",
        html: `
<div class="table-wrap"><table class="rules">
<thead><tr><th>Account type</th><th>Increase</th><th>Decrease</th><th>Normal balance</th></tr></thead>
<tbody>
<tr><td>Assets</td><td class="dr">Debit</td><td class="cr">Credit</td><td class="dr">Debit</td></tr>
<tr><td>Liabilities</td><td class="cr">Credit</td><td class="dr">Debit</td><td class="cr">Credit</td></tr>
<tr><td>Equity — Capital / Share capital</td><td class="cr">Credit</td><td class="dr">Debit</td><td class="cr">Credit</td></tr>
<tr><td>Withdrawals / Dividends</td><td class="dr">Debit</td><td class="cr">Credit</td><td class="dr">Debit</td></tr>
<tr><td>Revenues</td><td class="cr">Credit</td><td class="dr">Debit</td><td class="cr">Credit</td></tr>
<tr><td>Expenses</td><td class="dr">Debit</td><td class="cr">Credit</td><td class="dr">Debit</td></tr>
</tbody></table></div>
<div class="callout tip"><b>Memory trick — “DEALER”:</b> <b>D</b>ividends, <b>E</b>xpenses, <b>A</b>ssets increase with a <b>debit</b>; <b>L</b>iabilities, <b>E</b>quity, <b>R</b>evenues increase with a <b>credit</b>.</div>
<p class="muted">Why? Revenues increase equity so they behave like equity (credit). Expenses and dividends reduce equity so they behave the opposite way (debit).</p>`
      },
      {
        title: "Chart of accounts",
        html: `
<p>A list of all accounts used by the entity, with names and numbers. Numbering usually follows this structure:</p>
<div class="table-wrap"><table><tbody>
<tr><td><b>1xx</b></td><td>Assets</td></tr><tr><td><b>2xx</b></td><td>Liabilities</td></tr><tr><td><b>3xx</b></td><td>Shareholders’ equity</td></tr><tr><td><b>4xx</b></td><td>Revenues</td></tr><tr><td><b>5xx</b></td><td>Expenses</td></tr>
</tbody></table></div>`
      },
      {
        title: "Posting & calculating an account balance",
        html: `
<ol class="steps"><li>Add the amounts on the debit side.</li><li>Add the amounts on the credit side.</li><li>Calculate the difference — the balance sits on the side with the larger total.</li></ol>
<div class="taccount wide"><div class="t-title">Cash</div>
<div class="t-left">10,000<br>3,200<br>1,900<hr><b>Bal. 10,200</b></div>
<div class="t-right">3,200<br>1,200<br>500<hr>&nbsp;</div></div>
<p class="muted">Debits 15,100 − Credits 4,900 = 10,200 debit balance (from the Shelby Kindall example).</p>
<div data-diagram="posting"></div>`
      },
      {
        title: "The trial balance",
        html: `
<ul>
<li>Lists every ledger account and its balance at a point in time — debit balances in the left column, credit balances in the right.</li>
<li>Proves that total debits = total credits after posting.</li>
<li>Helps find errors in journalizing and posting, and is the starting point for preparing the financial statements.</li>
</ul>
<div class="callout warn"><b>A trial balance can balance and still be wrong.</b> It won’t catch: a transaction that was never journalized, an entry posted to the wrong account (but the correct side), an entry recorded twice, or offsetting errors of the same amount.</div>`
      }
    ],
    examples: [
      {
        title: "Shelby Kindall — March transactions",
        prompt: "Journalize each March transaction, then prepare a trial balance.",
        steps: [
          { label: "Journal entries", entries: [
            { date: "1", memo: "Purchased 1,000 common shares for $10,000 cash", lines: [["Cash", 10000, null], ["Common Shares", null, 10000]] },
            { date: "2", memo: "Purchased supplies for $3,200 cash", lines: [["Supplies", 3200, null], ["Cash", null, 3200]] },
            { date: "3", memo: "Purchased $2,100 of supplies on credit", lines: [["Supplies", 2100, null], ["Accounts Payable", null, 2100]] },
            { date: "4", memo: "Purchased $8,500 of equipment; signed a promissory note", lines: [["Equipment", 8500, null], ["Notes Payable", null, 8500]] },
            { date: "5", memo: "Provided services for $3,200 cash", lines: [["Cash", 3200, null], ["Service Revenue", null, 3200]] },
            { date: "6", memo: "Paid $1,200 rent in cash", lines: [["Rent Expense", 1200, null], ["Cash", null, 1200]] },
            { date: "7", memo: "Paid $500 salaries in cash", lines: [["Salaries Expense", 500, null], ["Cash", null, 500]] },
            { date: "8", memo: "Service contract signed for May", none: "No entry — nothing has been exchanged yet, so A, L and E are unchanged." },
            { date: "9", memo: "Earned $1,900 on credit ($1,600 food service, $300 coaching)", lines: [["Accounts Receivable", 1900, null], ["Food Service Revenue", null, 1600], ["Coaching Revenue", null, 300]] },
            { date: "10", memo: "Received $1,900 cash on account", lines: [["Cash", 1900, null], ["Accounts Receivable", null, 1900]] }
          ]},
          { label: "Trial balance", tb: { title: "Shelby Kindall — Trial Balance, March 31", rows: [
            ["Cash", 10200, null], ["Accounts Receivable", 0, null], ["Supplies", 5300, null], ["Equipment", 8500, null],
            ["Accounts Payable", null, 2100], ["Notes Payable", null, 8500], ["Common Shares", null, 10000],
            ["Service Revenue", null, 3200], ["Food Service Revenue", null, 1600], ["Coaching Revenue", null, 300],
            ["Rent Expense", 1200, null], ["Salaries Expense", 500, null]
          ]}}
        ]
      }
    ],
    flashcards: [
      { q: "Debit means…", a: "Left side. That’s it — not ‘increase’, not ‘good’." },
      { q: "Normal balance of Revenue?", a: "Credit" },
      { q: "Normal balance of Dividends / Drawings?", a: "Debit (they reduce equity)" },
      { q: "What is the book of original entry?", a: "The journal" },
      { q: "What is posting?", a: "Transferring journal entries to the ledger accounts." },
      { q: "Chart of accounts: what does an account number starting with 4 mean?", a: "Revenue (1 Assets, 2 Liabilities, 3 Equity, 4 Revenues, 5 Expenses)" },
      { q: "Name two errors a trial balance will NOT catch.", a: "Omitted transaction; posted to the wrong account on the correct side; duplicated entry; offsetting errors." },
      { q: "Steps 1–4 of the accounting cycle?", a: "Analyze transactions, Journalize, Post, Prepare unadjusted trial balance" }
    ],
    quiz: [
      { q: "To increase Accounts Payable you…", options: ["Debit it", "Credit it"], answer: 1, why: "Liabilities increase on the credit side." },
      { q: "Paid rent in cash. The entry is:", options: ["Dr Cash, Cr Rent Expense", "Dr Rent Expense, Cr Cash", "Dr Rent Expense, Cr Accounts Payable", "Dr Prepaid Rent, Cr Rent Expense"], answer: 1, why: "Expense ↑ (debit), Cash ↓ (credit)." },
      { q: "Collected cash from a customer on account:", options: ["Dr Cash, Cr Service Revenue", "Dr Accounts Receivable, Cr Cash", "Dr Cash, Cr Accounts Receivable", "Dr Service Revenue, Cr Cash"], answer: 2, why: "The revenue was already recorded when earned. Now one asset (Cash) replaces another (A/R)." },
      { q: "Which account has a normal DEBIT balance?", options: ["Unearned Revenue", "Common Shares", "Supplies Expense", "Notes Payable"], answer: 2, why: "Expenses increase with debits." },
      { q: "A trial balance proves that…", options: ["No errors were made", "Total debits equal total credits", "All transactions were recorded", "Net income is correct"], answer: 1, why: "It only proves the ledger is in balance." },
      { q: "An account shows debits of $8,000 and credits of $5,500. Its balance is…", options: ["$2,500 credit", "$13,500 debit", "$2,500 debit", "$5,500 credit"], answer: 2, why: "8,000 − 5,500 = 2,500 on the larger (debit) side." },
      { q: "Purchased equipment by signing a note payable. The entry is:", options: ["Dr Equipment / Cr Cash", "Dr Notes Payable / Cr Equipment", "Dr Equipment / Cr Notes Payable", "Dr Equipment / Cr Accounts Receivable"], answer: 2, why: "Asset ↑ (debit), liability ↑ (credit)." },
      { q: "Received cash in advance for services to be done next month:", options: ["Dr Cash / Cr Service Revenue", "Dr Cash / Cr Unearned Revenue", "Dr Unearned Revenue / Cr Cash", "Dr Accounts Receivable / Cr Revenue"], answer: 1, why: "Not earned yet, so it’s a liability until the work is done." },
      { q: "A $500 payment on account was posted as a debit to Cash and a credit to A/P. Will the trial balance balance?", options: ["Yes, but both accounts are wrong", "No, debits will exceed credits", "No, credits will exceed debits", "Yes, and it’s correct"], answer: 0, why: "Equal debit and credit were posted, just reversed. Trial balances don’t catch this." },
      { q: "The journal is organized…", options: ["By account", "Alphabetically", "Chronologically", "By account number"], answer: 2, why: "The journal is the book of original entry, in date order. The ledger is organized by account." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "ch2",
    number: 2,
    deck: "Class PowerPoints – 2 (do after Ch 3)",
    title: "A Further Look at Financial Statements",
    blurb: "The classified statement of financial position, GAAP concepts and intro to ratio analysis.",
    checklist: [
      "Prepare a classified statement of financial position",
      "Define current using one year or the operating cycle",
      "Calculate carrying amount (cost − accumulated depreciation)",
      "Explain the GAAP concepts (entity, going concern, currency, revenue recognition, measurement, cost constraint)",
      "Calculate and interpret working capital, current ratio and debt to total assets"
    ],
    summary: [
      "A <b>classified</b> statement of financial position groups items: current assets, non-current assets, current liabilities, non-current liabilities, shareholders’ equity.",
      "<b>Current</b> = converted to cash, sold or used within <b>one year or one operating cycle, whichever is longer</b>.",
      "<b>Operating cycle</b> = time from paying cash for products/services to collecting cash from customers.",
      "Current assets are usually listed in order of <b>liquidity</b> (reverse order is also allowed).",
      "Non-current assets: long-term investments, property plant & equipment, intangible assets, goodwill.",
      "PP&E is shown at <b>carrying amount = Cost − Accumulated Depreciation</b>. Accumulated depreciation is a <b>contra asset</b>. Land is not depreciated.",
      "Shareholders’ equity = <b>Share capital + Retained earnings</b>.",
      "GAAP concepts: business entity, going concern, currency, revenue recognition, measurement, cost constraint.",
      "Ratios fall into three groups: <b>profitability</b>, <b>liquidity</b> (short-term), <b>solvency</b> (long-term survival)."
    ],
    terms: [
      { term: "Operating cycle", def: "Average time between paying cash for products/services and receiving cash from customers for them." },
      { term: "Liquidity", def: "How quickly an asset can be converted to cash." },
      { term: "Contra asset", def: "An account that reduces a related asset, e.g. Accumulated Depreciation (normal credit balance)." },
      { term: "Carrying amount", def: "Cost of an asset minus its accumulated depreciation." },
      { term: "Intangible asset", def: "Long-lived asset without physical substance that gives rights/privileges (patents, trademarks, licences)." },
      { term: "Goodwill", def: "A type of intangible asset (arises when one company buys another for more than the fair value of its identifiable net assets)." },
      { term: "GAAP", def: "Generally Accepted Accounting Principles — the concepts that make up acceptable accounting practice." },
      { term: "Data analytics", def: "Analyzing large amounts of data to find patterns, correlations, trends and insights to improve decisions." }
    ],
    sections: [
      {
        title: "Classified statement of financial position",
        html: `
<div class="two-col">
<div class="card-lite"><h4>Assets</h4>
<p><b>Current assets</b><br>Cash · Trading investments · Accounts receivable · Notes receivable · Inventory · Supplies · Prepaid expenses</p>
<p><b>Non-current assets</b><br>Long-term investments · Property, plant & equipment · Intangible assets · Goodwill</p></div>
<div class="card-lite"><h4>Liabilities & Shareholders’ Equity</h4>
<p><b>Current liabilities</b><br>Bank indebtedness · Accounts payable · Deferred (unearned) revenue · Notes payable · Current portion of long-term debt</p>
<p><b>Non-current liabilities</b><br>Notes payable · Bank loan payable</p>
<p><b>Shareholders’ equity</b><br>Share capital · Retained earnings</p></div>
</div>
<div data-diagram="sorter"></div>`
      },
      {
        title: "Current assets",
        html: `
<ul>
<li>Assets expected to be converted to cash, sold or used within <b>one year</b> of the statement date <b>or one operating cycle, whichever is longer</b>.</li>
<li><b>Operating cycle</b>: average time between when a business pays cash to obtain products/services and when it receives cash from customers for them.</li>
<li>Usually listed in <b>order of liquidity</b> (the order they’re expected to be converted to cash, sold or used up). Reverse order of liquidity is also possible.</li>
<li>Examples: cash, trading investments, accounts receivable, inventory, supplies, prepaid expenses.</li>
</ul>`
      },
      {
        title: "Non-current assets",
        html: `
<div class="table-wrap"><table><tbody>
<tr><td><b>Long-term investments</b></td><td>Investments in debt or equity expected to be held for many years. Not readily marketable or expected to be converted into cash within one year.</td></tr>
<tr><td><b>Property, plant & equipment</b></td><td>Long-lived, <b>tangible</b> assets used in the business and <b>not intended for sale</b>.</td></tr>
<tr><td><b>Intangible assets</b></td><td>Long-lived assets with <b>no physical substance</b> that give a company rights and privileges. Goodwill is a type of intangible asset.</td></tr>
</tbody></table></div>`
      },
      {
        title: "Depreciation & carrying amount",
        html: `
<ul>
<li>Assets with indefinite lives (e.g. <b>land</b>) are <b>not</b> depreciated.</li>
<li><b>Accumulated depreciation</b> = total depreciation expense recorded to date. It is a <b>contra asset</b> account (credit balance).</li>
<li>Depreciable assets are presented at their carrying amount:</li>
</ul>
<div class="formula">Carrying amount = Cost − Accumulated depreciation</div>`
      },
      {
        title: "Liabilities",
        html: `
<div class="two-col">
<div class="card-lite"><h4>Current liabilities</h4><p>Paid or settled within the longer of one year or one operating cycle.</p><ul><li>Bank indebtedness</li><li>Accounts payable</li><li>Deferred revenue</li><li>Bank loan / notes payable</li><li>Current portion of long-term debt</li></ul></div>
<div class="card-lite"><h4>Non-current liabilities</h4><p>Expected to be paid or settled after one year. Usually come with extensive notes.</p><ul><li>Bank loan / notes payable</li><li>Lease liabilities</li><li>Pension & benefit obligations</li><li>Deferred liabilities</li></ul></div>
</div>`
      },
      {
        title: "Shareholders’ equity",
        html: `
<p>The residual amount equal to assets minus liabilities. Two components:</p>
<ul>
<li><b>Share capital</b> — investment of cash (or other assets) by shareholders in exchange for preferred or common shares.</li>
<li><b>Retained earnings</b> — cumulative net income (earnings) kept for use in the company.</li>
</ul>`
      },
      {
        title: "Using the statements — data analytics",
        html: `
<ul>
<li>Analyzing large amounts of data to find patterns, correlations, trends and insights.</li>
<li>Used to enhance decision making, including decisions impacting financial reporting.</li>
<li>Starts with developing the <b>questions</b> the data will help answer.</li>
<li>Data sources can be internal and external.</li>
</ul>`
      },
      {
        title: "GAAP, IFRS & ASPE",
        html: `
<p><b>GAAP</b> are the underlying concepts that make up acceptable accounting practice. Canada has adopted <b>IFRS</b> for publicly accountable enterprises (PAEs); <b>ASPE</b> is the other set of standards, for private enterprises.</p>
<h4>GAAP framework</h4>
<div class="table-wrap"><table><tbody>
<tr><td><b>Business entity</b></td><td>The business’s activities are kept separate from its owners’ personal activities.</td></tr>
<tr><td><b>Going concern</b></td><td>Assume the business will keep operating for the foreseeable future (this is why assets are shown at cost, not liquidation value).</td></tr>
<tr><td><b>Currency</b> (monetary unit)</td><td>Only items that can be expressed in money are recorded.</td></tr>
<tr><td><b>Revenue recognition</b></td><td>Record revenue when it is earned (performance obligation satisfied), not necessarily when cash is received.</td></tr>
<tr><td><b>Measurement</b></td><td>How amounts are valued — mainly historical cost; some items at fair value.</td></tr>
<tr><td><b>Cost constraint</b></td><td>The benefit of reporting information should be greater than the cost of providing it.</td></tr>
</tbody></table></div>`
      },
      {
        title: "Ratio analysis",
        html: `
<div class="three-col">
<div class="card-lite"><h4>Profitability</h4><p>Measure a company’s income or operating success for a period. <br><span class="muted">Revenue − Expenses = Net Income</span></p></div>
<div class="card-lite"><h4>Liquidity</h4><p>Measure short-term ability to pay maturing obligations and meet unexpected needs for cash.</p></div>
<div class="card-lite"><h4>Solvency</h4><p>Measure ability to survive over a long period of time.</p></div>
</div>
<h4>Common Chapter 2 ratios</h4>
<p class="muted">The slide only shows the three categories — these are the standard textbook ratios for this chapter. Check which ones your instructor expects.</p>
<div class="table-wrap"><table><thead><tr><th>Ratio</th><th>Formula</th><th>Type</th></tr></thead><tbody>
<tr><td>Working capital</td><td>Current assets − Current liabilities</td><td>Liquidity</td></tr>
<tr><td>Current ratio</td><td>Current assets ÷ Current liabilities</td><td>Liquidity</td></tr>
<tr><td>Debt to total assets</td><td>Total liabilities ÷ Total assets</td><td>Solvency</td></tr>
<tr><td>Basic earnings per share</td><td>(Net income − Preferred dividends) ÷ Weighted average # common shares</td><td>Profitability</td></tr>
</tbody></table></div>
<div data-diagram="ratios"></div>`
      }
    ],
    examples: [
      {
        title: "Classify it — current or non-current?",
        prompt: "Decide where each item goes on a classified statement of financial position.",
        steps: [
          { label: "Answers", html: `
<div class="table-wrap"><table><thead><tr><th>Item</th><th>Classification</th></tr></thead><tbody>
<tr><td>Prepaid insurance (12 months)</td><td>Current asset</td></tr>
<tr><td>Land held for a future building site</td><td>Long-term investment (not used in operations yet)</td></tr>
<tr><td>Delivery truck</td><td>Property, plant & equipment</td></tr>
<tr><td>Accumulated depreciation — truck</td><td>Contra asset (deducted from PP&E)</td></tr>
<tr><td>Patent</td><td>Intangible asset</td></tr>
<tr><td>Unearned (deferred) revenue</td><td>Current liability</td></tr>
<tr><td>Mortgage payable, portion due in 5 years</td><td>Non-current liability</td></tr>
<tr><td>Portion of long-term debt due next year</td><td>Current liability</td></tr>
<tr><td>Retained earnings</td><td>Shareholders’ equity</td></tr>
</tbody></table></div>` }
        ]
      },
      {
        title: "Liquidity & solvency ratios",
        prompt: "Current assets $60,000; non-current assets $140,000; current liabilities $25,000; non-current liabilities $55,000. Calculate working capital, current ratio and debt to total assets.",
        steps: [
          { label: "Solution", html: `
<ul class="calc">
<li>Working capital = 60,000 − 25,000 = <b>$35,000</b></li>
<li>Current ratio = 60,000 ÷ 25,000 = <b>2.4 : 1</b> — $2.40 of current assets for every $1 of current liabilities</li>
<li>Total assets = 200,000; total liabilities = 80,000</li>
<li>Debt to total assets = 80,000 ÷ 200,000 = <b>40%</b> — creditors finance 40% of assets</li>
</ul>` }
        ]
      }
    ],
    flashcards: [
      { q: "Definition of 'current' for assets and liabilities?", a: "Within one year or one operating cycle, whichever is longer." },
      { q: "What is the operating cycle?", a: "Average time from paying cash for products/services until cash is collected from customers." },
      { q: "Carrying amount formula?", a: "Cost − Accumulated depreciation" },
      { q: "Is land depreciated?", a: "No — it has an indefinite life." },
      { q: "Two components of shareholders’ equity?", a: "Share capital and retained earnings." },
      { q: "Going concern assumption?", a: "The business will continue operating for the foreseeable future." },
      { q: "Cost constraint?", a: "The benefit of reporting information must exceed the cost of providing it." },
      { q: "Liquidity vs solvency ratios?", a: "Liquidity = short-term ability to pay obligations. Solvency = ability to survive long term." },
      { q: "Current ratio formula?", a: "Current assets ÷ Current liabilities" }
    ],
    quiz: [
      { q: "Accumulated depreciation is a…", options: ["Liability", "Contra asset", "Expense", "Revenue"], answer: 1, why: "It reduces the related asset and has a credit balance." },
      { q: "Which is NOT a current asset?", options: ["Supplies", "Prepaid rent", "Patent", "Accounts receivable"], answer: 2, why: "A patent is a long-lived intangible asset." },
      { q: "A company records its owner’s personal car loan on the company books. Which concept is violated?", options: ["Going concern", "Business entity", "Currency", "Cost constraint"], answer: 1, why: "Business and owner activities must be kept separate." },
      { q: "Equipment cost $20,000, accumulated depreciation $6,000. Carrying amount?", options: ["$26,000", "$20,000", "$14,000", "$6,000"], answer: 2, why: "20,000 − 6,000." },
      { q: "The current ratio measures…", options: ["Profitability", "Liquidity", "Solvency", "Market value"], answer: 1, why: "Short-term ability to pay current obligations." },
      { q: "Current assets are usually listed in order of…", options: ["Size", "Liquidity", "Alphabetical order", "Date acquired"], answer: 1, why: "Order they’ll be converted to cash, sold or used up." },
      { q: "Current assets $45,000, current liabilities $30,000. Current ratio?", options: ["0.67 : 1", "1.5 : 1", "$15,000", "75 : 1"], answer: 1, why: "45,000 ÷ 30,000 = 1.5. ($15,000 is working capital.)" },
      { q: "Total liabilities $120,000, total assets $300,000. Debt to total assets?", options: ["40%", "250%", "60%", "30%"], answer: 0, why: "120,000 ÷ 300,000 = 40%." },
      { q: "Assets are reported at cost rather than liquidation value because of the…", options: ["Currency assumption", "Going concern assumption", "Cost constraint", "Business entity concept"], answer: 1, why: "The business is assumed to keep operating, so selling everything isn’t expected." },
      { q: "A company’s operating cycle is 18 months. Receivables collectible in 15 months are…", options: ["Non-current", "Current", "Long-term investments", "Not reported"], answer: 1, why: "Current = one year OR one operating cycle, whichever is longer (18 months)." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "ch4",
    number: 4,
    deck: "Class PowerPoints – 4",
    title: "Accrual Accounting Concepts",
    blurb: "Adjusting entries, the adjusted trial balance and the closing process.",
    checklist: [
      "Identify the five types of adjusting entries",
      "Journalize prepaid, depreciation, unearned, accrued expense and accrued revenue adjustments",
      "Calculate income tax expense after all other adjustments",
      "Prepare an adjusted trial balance",
      "Prepare closing entries and a post-closing trial balance",
      "Compare IFRS 5-step revenue recognition with ASPE"
    ],
    summary: [
      "Adjusting entries are made at the <b>end of every period</b> so revenues and expenses land in the right period and assets/liabilities are stated correctly.",
      "Five types: <b>prepaid expenses, depreciation (amortization), unearned revenues, accrued expenses, accrued revenues</b>.",
      "Every adjusting entry hits <b>one balance-sheet account and one income-statement account</b> — and <b>never Cash</b>.",
      "Straight-line depreciation = <b>(Cost − Residual value) ÷ Useful life</b>, credited to Accumulated Depreciation.",
      "Income tax expense is calculated <b>after</b> all other adjustments: adjusted income before tax × tax rate.",
      "<b>Dividends are not expenses</b> — they reduce retained earnings.",
      "<b>Permanent</b> accounts (balance sheet) carry forward. <b>Temporary</b> accounts (revenues, expenses, dividends) are closed to zero.",
      "Closing: (1) revenues → Income Summary, (2) expenses → Income Summary, (3) Income Summary → Retained Earnings, (4) Dividends → Retained Earnings.",
      "<b>IFRS</b> revenue recognition uses a <b>5-step model</b>; <b>ASPE</b> recognizes revenue when performance is substantially complete, measurable and collection is reasonably certain."
    ],
    terms: [
      { term: "Adjusting entry", def: "End-of-period entry that records revenues/expenses in the correct period and states assets/liabilities at the right amounts." },
      { term: "Prepaid expense", def: "Expense paid in cash before it is used up (asset first, then expensed as used). E.g. insurance, rent, supplies." },
      { term: "Unearned (deferred) revenue", def: "Cash received before the service is performed — a liability until earned." },
      { term: "Accrued expense", def: "Expense incurred but not yet paid or recorded (e.g. salaries, interest). Creates a payable." },
      { term: "Accrued revenue", def: "Revenue earned but not yet received or recorded. Creates a receivable." },
      { term: "Depreciation", def: "Allocation of the cost of a long-lived asset to expense over its useful life." },
      { term: "Residual (salvage) value", def: "Estimated value of an asset at the end of its useful life." },
      { term: "Temporary accounts", def: "Revenues, expenses and dividends — closed to zero at year end." },
      { term: "Permanent accounts", def: "Balance sheet accounts — balances carry forward to the next year." },
      { term: "Income Summary", def: "Temporary clearing account used during closing; its balance equals net income (or loss)." }
    ],
    sections: [
      {
        title: "Why adjustments are needed",
        html: `
<ul>
<li>Adjusting entries are made at the <b>end of every accounting period</b> to report revenues and expenses in the proper period and assets and liabilities at appropriate amounts.</li>
<li>Adjusting journal entries use the normal <b>debits = credits</b> format.</li>
</ul>
<div class="callout tip"><b>Golden rules:</b> every adjusting entry affects one <b>balance sheet</b> account and one <b>income statement</b> account, and <b>Cash is never used</b> in an adjusting entry.</div>`
      },
      {
        title: "The five types of adjusting entries",
        html: `
<div class="table-wrap"><table>
<thead><tr><th>Type</th><th>Initial entry</th><th>Before adjustment…</th><th>Adjusting entry</th></tr></thead>
<tbody>
<tr><td><b>Prepaid expenses</b></td><td>Dr Prepaid Expense<br>Cr Cash</td><td>Expenses understated; assets overstated → net income & equity overstated</td><td>Dr Expense<br>Cr Prepaid Expense</td></tr>
<tr><td><b>Depreciation</b></td><td>Dr Equipment<br>Cr Cash</td><td>Expenses understated; assets overstated</td><td>Dr Depreciation Expense<br>Cr Accumulated Depreciation</td></tr>
<tr><td><b>Unearned (deferred) revenue</b></td><td>Dr Cash<br>Cr Deferred Revenue</td><td>Revenues & net income understated; liabilities overstated</td><td>Dr Deferred Revenue<br>Cr Revenue</td></tr>
<tr><td><b>Accrued expenses</b></td><td>None</td><td>Expenses understated; liabilities understated → net income overstated</td><td>Dr Expense<br>Cr Payable</td></tr>
<tr><td><b>Accrued revenues</b></td><td>None</td><td>Revenues understated; assets understated → net income understated</td><td>Dr Receivable<br>Cr Revenue</td></tr>
</tbody></table></div>
<p class="muted">Prepaids + unearned revenue = <b>prepayments / deferrals</b> (cash first). Accrued expenses + accrued revenues = <b>accruals</b> (cash later).</p>
<div data-diagram="timing"></div>`
      },
      {
        title: "Depreciation",
        html: `
<ul>
<li>Allocates the cost of long-lived assets to expense over their useful lives.</li>
<li>The portion used up each period is reported as an expense.</li>
</ul>
<div class="formula">Straight-line depreciation = (Cost − Residual value) ÷ Estimated useful life</div>
<p>Entry: <b>Dr Depreciation Expense / Cr Accumulated Depreciation</b> (contra asset — the asset account itself is never credited).</p>
<div data-diagram="depreciation"></div>`
      },
      {
        title: "Income tax expense",
        html: `
<ul>
<li>Calculated by multiplying the company’s <b>adjusted</b> income before tax by its tax rate.</li>
<li>Calculate it <b>after all other revenue and expense adjustments</b>.</li>
<li>Pizza Palace example: adjusted income before tax $1,000 × 40% = <b>$400</b>.</li>
</ul>
<div class="je-inline">Dr Income Tax Expense 400 / Cr Income Tax Payable 400</div>`
      },
      {
        title: "Dividends",
        html: `
<ul>
<li>Pizza Palace declares and pays a $500 cash dividend. Dividends are really a day-to-day transaction, not an adjustment — shown here for convenience.</li>
<li><b>Dividends are not expenses</b>; they are a reduction of retained earnings.</li>
</ul>
<div class="je-inline">Declared: Dr Dividends Declared 500 / Cr Dividends Payable 500<br>Paid: Dr Dividends Payable 500 / Cr Cash 500</div>`
      },
      {
        title: "Adjusted trial balance",
        html: `
<ul><li>Prepared <b>after</b> adjusting entries are journalized and posted.</li><li>Proves total debits = total credits after all adjustments.</li><li>Used to prepare the financial statements.</li></ul>`
      },
      {
        title: "Closing temporary accounts",
        html: `
<ul>
<li>The closing process is the last step of the accounting cycle.</li>
<li><b>Permanent accounts</b> track results year to year — ending balances carry forward. All balance sheet accounts are permanent.</li>
<li><b>Temporary accounts</b> track results for a limited time — zeroed at year end. Revenues, expenses and dividends declared are temporary.</li>
</ul>
<h4>The closing process</h4>
<ol class="steps">
<li><b>Close revenues:</b> Dr each revenue account / Cr Income Summary (total revenues).</li>
<li><b>Close expenses:</b> Dr Income Summary (total expenses) / Cr each expense account.</li>
<li><b>Close Income Summary:</b> Dr Income Summary / Cr Retained Earnings for net income (reverse it for a loss).</li>
<li><b>Close dividends:</b> Dr Retained Earnings / Cr Dividends.</li>
</ol>
<p class="muted">Proprietorship: steps 3 and 4 go to <b>Owner’s Capital</b> instead of Retained Earnings, and <b>Drawings</b> replaces Dividends.</p>
<h4>Post-closing trial balance</h4>
<p>Lists only <b>permanent</b> (balance sheet) accounts after closing, proving debits still equal credits going into the new period.</p>
<div data-diagram="closing"></div>`
      },
      {
        title: "Revenue recognition — IFRS vs ASPE",
        html: `
<div class="two-col">
<div class="card-lite"><h4>IFRS — 5-step model</h4><ol>
<li>Identify the contract with the customer.</li>
<li>Identify the performance obligations in the contract.</li>
<li>Determine the transaction price.</li>
<li>Allocate the price to the performance obligations.</li>
<li>Recognize revenue when (or as) each performance obligation is satisfied.</li></ol></div>
<div class="card-lite"><h4>ASPE</h4><p>Revenue is recognized when:</p><ul>
<li>Performance is substantially complete,</li>
<li>The amount can be reliably measured, and</li>
<li>Collection is reasonably certain.</li></ul></div>
</div>`
      }
    ],
    examples: [
      {
        title: "Prepaid insurance",
        prompt: "On October 31 a company purchased an insurance policy for $12,000. Year end is December 31. What is the adjusting entry? <span class='muted'>(The slide doesn’t state the policy length — this solution assumes a 12-month policy.)</span>",
        steps: [
          { label: "Solution", html: "<p>$12,000 ÷ 12 months = $1,000/month. Nov + Dec = 2 months used → <b>$2,000</b> expired.</p>", entries: [
            { date: "Oct 31", memo: "Original purchase", lines: [["Prepaid Insurance", 12000, null], ["Cash", null, 12000]] },
            { date: "Dec 31", memo: "Adjusting entry — 2 months expired", lines: [["Insurance Expense", 2000, null], ["Prepaid Insurance", null, 2000]] }
          ], after: "Prepaid Insurance balance on Dec 31: $10,000 (10 months remaining)." }
        ]
      },
      {
        title: "Depreciation of a car",
        prompt: "January 1, 2016: purchased a car for $40,000. Expected life 10 years, residual value $1,000. What is the adjusting entry at December 31, 2016?",
        steps: [
          { label: "Solution", html: "<p>(40,000 − 1,000) ÷ 10 = <b>$3,900 per year</b></p>", entries: [
            { date: "Dec 31", memo: "Annual depreciation", lines: [["Depreciation Expense", 3900, null], ["Accumulated Depreciation — Vehicle", null, 3900]] }
          ], after: "Carrying amount at Dec 31, 2016 = 40,000 − 3,900 = $36,100." }
        ]
      },
      {
        title: "Unearned revenue — snow removal",
        prompt: "On January 1, 2016 a company received a $3,000 deposit for snow removal for the following three months. What is the adjusting entry on February 28, 2016?",
        steps: [
          { label: "Solution", html: "<p>$3,000 ÷ 3 months = $1,000/month. By Feb 28, two months (Jan & Feb) are earned. Assuming no adjustment was made on Jan 31 → <b>$2,000</b>. <span class='muted'>(If the company adjusts monthly, it would record $1,000 on Jan 31 and another $1,000 on Feb 28.)</span></p>", entries: [
            { date: "Jan 1", memo: "Deposit received", lines: [["Cash", 3000, null], ["Unearned Revenue", null, 3000]] },
            { date: "Feb 28", memo: "Adjusting entry — 2 months earned", lines: [["Unearned Revenue", 2000, null], ["Service Revenue", null, 2000]] }
          ], after: "Unearned Revenue remaining: $1,000 (March still owed to the customer)." }
        ]
      },
      {
        title: "Accrued revenue — the vet",
        prompt: "Dr. Smith, a vet, saw animals on Dec 31 in the morning and earned $1,000 on credit. The staff left for the day before it was recorded. Year end is December 31. Adjusting entry?",
        steps: [
          { label: "Solution", html: "<p>Revenue was earned in this period but nothing was recorded — accrue it.</p>", entries: [
            { date: "Dec 31", memo: "Accrue revenue earned", lines: [["Accounts Receivable", 1000, null], ["Service Revenue", null, 1000]] }
          ]}
        ]
      },
      {
        title: "Accrued expense — salaries (extra practice)",
        prompt: "Employees earn $500 per day and are paid every Friday for a 5-day week. Year end (Dec 31) falls on a Wednesday. Adjusting entry?",
        steps: [
          { label: "Solution", html: "<p>Mon–Wed = 3 days × $500 = <b>$1,500</b> earned but unpaid.</p>", entries: [
            { date: "Dec 31", memo: "Accrue 3 days of salaries", lines: [["Salaries Expense", 1500, null], ["Salaries Payable", null, 1500]] }
          ]}
        ]
      },
      {
        title: "Closing entries — Lynk Software Services",
        prompt: "Using Lynk Software Services’ adjusted trial balance at October 31, 2017 (a proprietorship owned by T. Jacobs), prepare the closing entries.",
        steps: [
          { label: "Adjusted trial balance", tb: { title: "Lynk Software Services — Adjusted Trial Balance, Oct 31, 2017", rows: [
            ["Cash", 14250, null], ["Accounts Receivable", 1200, null], ["Supplies", 1000, null], ["Prepaid Insurance", 550, null], ["Equipment", 5000, null],
            ["Accumulated Depreciation — Equipment", null, 83], ["Notes Payable", null, 5000], ["Accounts Payable", null, 1750], ["Unearned Revenue", null, 800],
            ["Salaries Payable", null, 800], ["Interest Payable", null, 25], ["T. Jacobs, Capital", null, 10000], ["T. Jacobs, Drawings", 500, null],
            ["Service Revenue", null, 11400], ["Depreciation Expense", 83, null], ["Insurance Expense", 50, null], ["Rent Expense", 900, null],
            ["Salaries Expense", 4800, null], ["Supplies Expense", 1500, null], ["Interest Expense", 25, null]
          ]}},
          { label: "Closing entries", entries: [
            { date: "1", memo: "Close revenues", lines: [["Service Revenue", 11400, null], ["Income Summary", null, 11400]] },
            { date: "2", memo: "Close expenses", lines: [["Income Summary", 7358, null], ["Depreciation Expense", null, 83], ["Insurance Expense", null, 50], ["Rent Expense", null, 900], ["Salaries Expense", null, 4800], ["Supplies Expense", null, 1500], ["Interest Expense", null, 25]] },
            { date: "3", memo: "Close Income Summary (profit $4,042)", lines: [["Income Summary", 4042, null], ["T. Jacobs, Capital", null, 4042]] },
            { date: "4", memo: "Close drawings", lines: [["T. Jacobs, Capital", 500, null], ["T. Jacobs, Drawings", null, 500]] }
          ], after: "New capital balance: 10,000 + 4,042 − 500 = <b>$13,542</b>." },
          { label: "Post-closing trial balance", tb: { title: "Lynk Software Services — Post-Closing Trial Balance, Oct 31, 2017", rows: [
            ["Cash", 14250, null], ["Accounts Receivable", 1200, null], ["Supplies", 1000, null], ["Prepaid Insurance", 550, null], ["Equipment", 5000, null],
            ["Accumulated Depreciation — Equipment", null, 83], ["Notes Payable", null, 5000], ["Accounts Payable", null, 1750], ["Unearned Revenue", null, 800],
            ["Salaries Payable", null, 800], ["Interest Payable", null, 25], ["T. Jacobs, Capital", null, 13542]
          ]}}
        ]
      }
    ],
    flashcards: [
      { q: "The five types of adjusting entries?", a: "Prepaid expenses, depreciation, unearned revenues, accrued expenses, accrued revenues" },
      { q: "Is Cash ever in an adjusting entry?", a: "No." },
      { q: "Straight-line depreciation formula?", a: "(Cost − Residual value) ÷ Useful life" },
      { q: "Adjusting entry for unearned revenue earned?", a: "Dr Unearned Revenue / Cr Revenue" },
      { q: "Adjusting entry for accrued expense?", a: "Dr Expense / Cr Payable" },
      { q: "Adjusting entry for accrued revenue?", a: "Dr Receivable / Cr Revenue" },
      { q: "When is income tax expense calculated?", a: "After all other adjustments — adjusted income before tax × tax rate." },
      { q: "Which accounts are temporary?", a: "Revenues, expenses, dividends (drawings) — plus Income Summary." },
      { q: "4 closing steps?", a: "Close revenues → close expenses → close Income Summary to RE → close dividends to RE" },
      { q: "What appears on a post-closing trial balance?", a: "Only permanent (balance sheet) accounts." }
    ],
    quiz: [
      { q: "If an accrued expense is NOT recorded, then…", options: ["Net income is understated", "Liabilities are overstated", "Net income is overstated and liabilities understated", "Assets are overstated"], answer: 2, why: "Missing expense → income too high; missing payable → liabilities too low." },
      { q: "Supplies on hand $300; Supplies account shows $1,100. Adjusting entry?", options: ["Dr Supplies 800 / Cr Supplies Expense 800", "Dr Supplies Expense 800 / Cr Supplies 800", "Dr Supplies Expense 300 / Cr Supplies 300", "Dr Supplies Expense 1,100 / Cr Cash 1,100"], answer: 1, why: "$800 of supplies was used up." },
      { q: "Which account is NOT closed at year end?", options: ["Service Revenue", "Dividends", "Accumulated Depreciation", "Rent Expense"], answer: 2, why: "It’s a balance-sheet (permanent) contra asset." },
      { q: "Equipment $30,000, residual $2,000, 7-year life. Annual straight-line depreciation?", options: ["$4,286", "$4,000", "$4,571", "$2,000"], answer: 1, why: "(30,000 − 2,000) ÷ 7 = 4,000." },
      { q: "Under IFRS, revenue is recognized when…", options: ["Cash is received", "The contract is signed", "A performance obligation is satisfied", "The invoice is sent"], answer: 2, why: "Step 5 of the IFRS 5-step model." },
      { q: "Closing the Income Summary when there is a net LOSS:", options: ["Dr Income Summary / Cr Retained Earnings", "Dr Retained Earnings / Cr Income Summary", "Dr Dividends / Cr Income Summary", "No entry needed"], answer: 1, why: "A loss reduces retained earnings (debit)." },
      { q: "$3,600 received on Nov 1 for 6 months of service, credited to Unearned Revenue. Dec 31 adjustment?", options: ["Dr Unearned Revenue 1,200 / Cr Revenue 1,200", "Dr Revenue 1,200 / Cr Unearned Revenue 1,200", "Dr Unearned Revenue 2,400 / Cr Revenue 2,400", "Dr Cash 1,200 / Cr Revenue 1,200"], answer: 0, why: "3,600 ÷ 6 = 600/month × 2 months (Nov, Dec) = 1,200 earned." },
      { q: "A $10,000, 6% note was signed Oct 1. Accrued interest at Dec 31?", options: ["$600", "$150", "$50", "$450"], answer: 1, why: "10,000 × 6% × 3/12 = 150." },
      { q: "Which adjustment decreases net income AND increases liabilities?", options: ["Accrued revenue", "Unearned revenue earned", "Accrued expense", "Prepaid expense used"], answer: 2, why: "Dr Expense / Cr Payable." },
      { q: "Adjusted income before tax is $50,000 and the tax rate is 25%. Net income?", options: ["$50,000", "$12,500", "$37,500", "$62,500"], answer: 2, why: "Tax = 12,500; 50,000 − 12,500 = 37,500." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "ch5",
    number: 5,
    deck: "Class PowerPoints – 5",
    title: "Merchandising Operations",
    blurb: "Perpetual inventory, purchase & sales entries, freight terms, discounts and the multiple-step income statement.",
    checklist: [
      "Explain perpetual vs periodic inventory systems",
      "Record purchases incl. freight, returns, allowances and discounts",
      "Record sales with both the revenue and cost entries",
      "Prepare a multiple-step income statement",
      "Calculate gross profit % and profit margin"
    ],
    summary: [
      "A merchandiser buys and resells goods: <b>Sales − Cost of Goods Sold = Gross Profit</b>, then − Operating expenses = Profit.",
      "<b>Perpetual</b> system: continuous record of inventory on hand and COGS. <b>Periodic</b>: physical count needed at period end.",
      "Periodic COGS: <b>Beginning Inventory + Purchases = Goods Available for Sale − Ending Inventory = COGS</b>.",
      "<b>2/10, n/30</b> = 2% discount if paid within 10 days; full amount due within 30 days.",
      "Perpetual purchases: freight-in, returns, allowances and purchase discounts all adjust the <b>Inventory</b> account.",
      "<b>FOB shipping point</b>: buyer owns goods in transit and pays freight (Dr Inventory). <b>FOB destination</b>: seller pays (Dr Freight Out).",
      "Every perpetual sale needs <b>two entries</b>: record the sale (revenue) and record the cost (Dr COGS / Cr Inventory).",
      "<b>Gross profit % = (Net sales − COGS) ÷ Net sales × 100</b>. Higher = more left to cover operating expenses.",
      "<b>Profit margin = Profit ÷ Net sales</b>."
    ],
    terms: [
      { term: "Merchandise inventory", def: "Goods held for resale to customers." },
      { term: "Cost of goods sold (COGS)", def: "The cost of the merchandise sold during the period — an expense." },
      { term: "Gross profit (gross margin)", def: "Net sales − Cost of goods sold." },
      { term: "Perpetual inventory system", def: "Continuously updates inventory and COGS with every purchase and sale." },
      { term: "Periodic inventory system", def: "Updates inventory only at the end of the period after a physical count." },
      { term: "Purchase / sales discount", def: "Reduction of the invoice price offered to encourage early payment (e.g. 2/10, n/30)." },
      { term: "FOB shipping point", def: "Ownership passes to the buyer when goods leave the seller; buyer pays freight." },
      { term: "FOB destination", def: "Ownership passes when goods arrive at the buyer; seller pays freight (Freight Out expense)." },
      { term: "Sales returns & allowances", def: "Contra-revenue account for goods returned or price reductions given to customers." },
      { term: "Net sales", def: "Sales − Sales returns & allowances − Sales discounts." }
    ],
    sections: [
      {
        title: "Learning objectives",
        html: `
<ol class="steps">
<li>Identify the differences between service and merchandising companies and the inventory systems they use.</li>
<li>Record purchases under a perpetual inventory system.</li>
<li>Record sales under a perpetual inventory system.</li>
<li>Prepare a single-step and multiple-step statement of income.</li>
<li>Calculate the gross profit margin and profit margin.</li>
<li>Periodic system (Appendix 5A) — <b>not covered in class; up to the student to learn</b>.</li>
<li>Sales returns and sales discounts under ASPE (Appendix 5B).</li>
</ol>`
      },
      {
        title: "Service vs merchandising companies",
        html: `
<div class="two-col">
<div class="card-lite"><h4>Service company</h4><div class="stack"><span>Revenue</span><span>− Operating expenses</span><span class="total">= Profit (Loss)</span></div></div>
<div class="card-lite"><h4>Merchandising company</h4><div class="stack"><span>Sales</span><span>− Cost of goods sold</span><span class="sub">= Gross profit</span><span>− Operating expenses</span><span class="total">= Profit (Loss)</span></div></div>
</div>
<h4>Flow of costs</h4>
<div class="formula small">Beginning Inventory + Cost of Goods Purchased = Cost of Goods Available for Sale</div>
<p>Goods available for sale end up either as <b>Cost of Goods Sold</b> (income statement) or <b>Ending Inventory</b> (statement of financial position).</p>
<div data-diagram="inventory"></div>`
      },
      {
        title: "Perpetual vs periodic inventory",
        html: `
<div class="two-col">
<div class="card-lite"><h4>Perpetual</h4><p>Provides a <b>continuous</b> record of:</p><ul><li>Merchandise inventory on hand</li><li>Cost of goods sold to date</li></ul></div>
<div class="card-lite"><h4>Periodic</h4><p>Requires a <b>physical count</b> to determine:</p><ul><li>Merchandise inventory on hand</li><li>Cost of goods sold</li></ul></div>
</div>
<h4>Periodic COGS calculation</h4>
<div class="stack formula-stack"><span>Beginning Inventory</span><span>+ Purchases</span><span class="sub">= Goods Available for Sale</span><span>− Ending Inventory</span><span class="total">= Cost of Goods Sold</span></div>`
      },
      {
        title: "Purchase / sales discounts (credit terms)",
        html: `
<p>A discount is a deduction from the invoice price to encourage early payment. Example: <b>2/10, n/30</b>.</p>
<div class="timeline">
<div><b>Nov 2</b><span>Purchase or sale</span></div>
<div><b>Nov 2 – Nov 12</b><span>Discount period (10 days): pay full amount − 2%</span></div>
<div><b>Nov 13 – Dec 2</b><span>Credit period (30 days): pay full amount</span></div>
</div>
<div data-diagram="discount"></div>`
      },
      {
        title: "Recording purchases (perpetual)",
        html: `
<div class="table-wrap"><table>
<thead><tr><th>Transaction</th><th>Debit</th><th>Credit</th></tr></thead><tbody>
<tr><td>Purchase merchandise for resale</td><td>Inventory</td><td>Cash or Accounts Payable</td></tr>
<tr><td>Pay freight on purchases, FOB shipping point</td><td>Inventory</td><td>Cash</td></tr>
<tr><td>Purchase returns or allowances from suppliers</td><td>Cash or Accounts Payable</td><td>Inventory</td></tr>
<tr><td>Pay supplier <b>within</b> discount period</td><td>Accounts Payable</td><td>Inventory (discount)<br>Cash</td></tr>
<tr><td>Pay supplier <b>after</b> discount period</td><td>Accounts Payable</td><td>Cash</td></tr>
</tbody></table></div>`
      },
      {
        title: "Freight costs",
        html: `
<p>The purchase invoice shows when ownership transfers from seller to buyer.</p>
<div class="two-col">
<div class="card-lite"><h4>FOB Shipping Point</h4><ul><li>Buyer takes ownership at the place of shipping and <b>pays</b> shipping.</li><li>Buyer debits <b>Merchandise Inventory</b> for freight.</li></ul></div>
<div class="card-lite"><h4>FOB Destination</h4><ul><li>Buyer takes ownership when goods are delivered; <b>seller pays</b> freight.</li><li>Seller debits <b>Freight Out</b> (an operating expense).</li></ul></div>
</div>`
      },
      {
        title: "Recording sales (perpetual)",
        html: `
<p>Each sale needs <b>two entries</b>:</p>
<ol class="steps"><li><b>Revenue side</b> (at selling price): Dr Cash / Accounts Receivable, Cr Sales</li><li><b>Cost side</b> (at cost): Dr Cost of Goods Sold, Cr Inventory</li></ol>
<p><b>Sales return</b>: Dr Sales Returns & Allowances / Cr Cash or A/R — and if the goods come back into stock, Dr Inventory / Cr COGS (at cost).<br>
<b>Customer pays within the discount period</b>: Dr Cash, Dr Sales Discounts / Cr Accounts Receivable.</p>
<p class="muted">Sales Returns & Allowances and Sales Discounts are contra-revenue accounts (debit balance), matching the income statement format shown in class. Your textbook’s Appendix 5B covers these under ASPE.</p>`
      },
      {
        title: "Multiple-step income statement",
        html: `
<div class="table-wrap"><table class="fs">
<thead><tr><th colspan="3">Highpoint Audio & TV Supply — Income Statement, Year Ended May 31, 2017</th></tr></thead><tbody>
<tr class="h"><td colspan="3">Sales revenue</td></tr>
<tr><td class="i1">Sales</td><td></td><td>$480,000</td></tr>
<tr><td class="i2">Less: Sales returns and allowances</td><td>$16,700</td><td></td></tr>
<tr><td class="i2">Sales discounts</td><td class="u">4,300</td><td class="u">21,000</td></tr>
<tr><td class="i1">Net sales</td><td></td><td>459,000</td></tr>
<tr><td class="i1">Cost of goods sold</td><td></td><td class="u">315,000</td></tr>
<tr class="h"><td>Gross profit</td><td></td><td>144,000</td></tr>
<tr class="h"><td colspan="3">Operating expenses</td></tr>
<tr><td class="i1">Salaries expense</td><td>$45,000</td><td></td></tr>
<tr><td class="i1">Rent expense</td><td>19,000</td><td></td></tr>
<tr><td class="i1">Utilities expense</td><td>17,000</td><td></td></tr>
<tr><td class="i1">Advertising expense</td><td>16,000</td><td></td></tr>
<tr><td class="i1">Depreciation expense</td><td>8,000</td><td></td></tr>
<tr><td class="i1">Freight out</td><td>7,000</td><td></td></tr>
<tr><td class="i1">Insurance expense</td><td class="u">2,000</td><td></td></tr>
<tr><td class="i2">Total operating expenses</td><td></td><td class="u">114,000</td></tr>
<tr class="h"><td>Profit from operations</td><td></td><td>30,000</td></tr>
<tr class="h"><td colspan="3">Other revenues</td></tr>
<tr><td class="i1">Interest revenue</td><td>$1,000</td><td></td></tr>
<tr><td class="i1">Rent revenue</td><td class="u">2,400</td><td></td></tr>
<tr><td class="i2">Total non-operating revenues</td><td>3,400</td><td></td></tr>
<tr class="h"><td colspan="3">Other expenses</td></tr>
<tr><td class="i1">Interest expense</td><td class="u">1,800</td><td></td></tr>
<tr><td class="i2">Net non-operating revenues</td><td></td><td class="u">1,600</td></tr>
<tr class="h"><td>Profit</td><td></td><td class="uu">$31,600</td></tr>
</tbody></table></div>
<p>Three sections: (1) net sales → gross profit, (2) operating expenses → profit from operations, (3) non-operating activities → profit.</p>
<p class="muted">A <b>single-step</b> statement simply lists all revenues together and all expenses together: Total revenues − Total expenses = Profit.</p>`
      },
      {
        title: "Gross profit & profit margin",
        html: `
<div class="formula">Gross profit = Net sales − Cost of goods sold</div>
<div class="formula">Gross profit % = (Net sales − COGS) ÷ Net sales × 100</div>
<div class="formula">Profit margin = Profit ÷ Net sales</div>
<ul><li>Gross profit % shows how much profit is earned on each dollar of sales after deducting the cost of the products sold.</li>
<li>A <b>higher</b> ratio means more profit is available to cover operating and other expenses.</li></ul>
<p>Highpoint: 144,000 ÷ 459,000 = <b>31.4%</b> gross profit · 31,600 ÷ 459,000 = <b>6.9%</b> profit margin.</p>`
      }
    ],
    examples: [
      {
        title: "Mandy Moto — independent purchase transactions",
        prompt: "Mandy Moto buys purse inventory from Coach Manufacturing on Nov 15 totalling $12,000 on credit, terms 2/10, n/30. Treat each situation independently (perpetual system).",
        steps: [
          { label: "Solutions", entries: [
            { date: "1) Nov 15", memo: "Purchase on credit", lines: [["Merchandise Inventory", 12000, null], ["Accounts Payable", null, 12000]] },
            { date: "2) Nov 20", memo: "Paid within discount period (by Nov 25) → 2% × 12,000 = $240", lines: [["Accounts Payable", 12000, null], ["Merchandise Inventory", null, 240], ["Cash", null, 11760]] },
            { date: "3) Nov 28", memo: "Paid after the discount period — no discount", lines: [["Accounts Payable", 12000, null], ["Cash", null, 12000]] },
            { date: "4) Nov 17", memo: "Returned $3,000 of purses", lines: [["Accounts Payable", 3000, null], ["Merchandise Inventory", null, 3000]] },
            { date: "5) Nov 16", memo: "$300 allowance for slightly damaged purses", lines: [["Accounts Payable", 300, null], ["Merchandise Inventory", null, 300]] }
          ], after: "Watch out: if the return AND an early payment both happen, the discount applies only to the balance owing (e.g. 2% × 9,000 = $180)." }
        ]
      },
      {
        title: "Continental Canvas — sales transactions",
        prompt: "Jan 2: cash sales $10,000, COGS $6,000. Jan 3: sales on account $12,000, COGS $7,200, terms 2/10, n/30. Jan 5: the Jan 2 customer returns goods for $3,000 (cost $1,800). Jan 10: the Jan 3 customer pays the amount owing.",
        steps: [
          { label: "Journal entries", entries: [
            { date: "Jan 2", memo: "Cash sale — revenue", lines: [["Cash", 10000, null], ["Sales", null, 10000]] },
            { date: "Jan 2", memo: "Cash sale — cost", lines: [["Cost of Goods Sold", 6000, null], ["Merchandise Inventory", null, 6000]] },
            { date: "Jan 3", memo: "Credit sale — revenue", lines: [["Accounts Receivable", 12000, null], ["Sales", null, 12000]] },
            { date: "Jan 3", memo: "Credit sale — cost", lines: [["Cost of Goods Sold", 7200, null], ["Merchandise Inventory", null, 7200]] },
            { date: "Jan 5", memo: "Return from cash customer — refund", lines: [["Sales Returns & Allowances", 3000, null], ["Cash", null, 3000]] },
            { date: "Jan 5", memo: "Returned goods back into inventory (at cost)", lines: [["Merchandise Inventory", 1800, null], ["Cost of Goods Sold", null, 1800]] },
            { date: "Jan 10", memo: "Collected within discount period (by Jan 13): 2% × 12,000 = $240", lines: [["Cash", 11760, null], ["Sales Discounts", 240, null], ["Accounts Receivable", null, 12000]] }
          ]},
          { label: "Gross profit", html: `
<ul class="calc">
<li>Net sales = 22,000 − 3,000 − 240 = <b>$18,760</b></li>
<li>COGS = 6,000 + 7,200 − 1,800 = <b>$11,400</b></li>
<li>Gross profit = 18,760 − 11,400 = <b>$7,360</b></li>
<li>Gross profit % = 7,360 ÷ 18,760 = <b>39.2%</b></li>
</ul>` }
        ]
      }
    ],
    flashcards: [
      { q: "What does 2/10, n/30 mean?", a: "2% discount if paid within 10 days; otherwise the full amount is due within 30 days." },
      { q: "FOB shipping point — who pays freight?", a: "The buyer (debits Inventory)." },
      { q: "FOB destination — who pays freight?", a: "The seller (debits Freight Out)." },
      { q: "Perpetual: how many entries for a sale?", a: "Two — the sale at selling price, and COGS/Inventory at cost." },
      { q: "Perpetual: purchase discount is credited to…", a: "Merchandise Inventory" },
      { q: "Periodic COGS formula?", a: "Beginning inventory + Purchases − Ending inventory" },
      { q: "Gross profit %?", a: "(Net sales − COGS) ÷ Net sales × 100" },
      { q: "Net sales?", a: "Sales − Sales returns & allowances − Sales discounts" },
      { q: "Profit margin?", a: "Profit ÷ Net sales" }
    ],
    quiz: [
      { q: "Under a perpetual system, freight paid on incoming goods (FOB shipping point) is debited to…", options: ["Freight Out", "Merchandise Inventory", "Cost of Goods Sold", "Delivery Expense"], answer: 1, why: "It’s part of the cost of getting the inventory ready for sale." },
      { q: "$5,000 purchase, terms 2/10, n/30, paid within 10 days. Cash paid?", options: ["$5,000", "$4,900", "$4,000", "$5,100"], answer: 1, why: "5,000 × 98% = 4,900." },
      { q: "Net sales $200,000, COGS $130,000. Gross profit %?", options: ["65%", "35%", "53.8%", "30%"], answer: 1, why: "(200,000 − 130,000) ÷ 200,000 = 35%." },
      { q: "Which account is a contra-revenue account?", options: ["Freight Out", "Sales Discounts", "Cost of Goods Sold", "Merchandise Inventory"], answer: 1, why: "Sales discounts reduce sales to arrive at net sales." },
      { q: "Beginning inventory $8,000, purchases $40,000, ending inventory $10,000. COGS (periodic)?", options: ["$58,000", "$38,000", "$42,000", "$48,000"], answer: 1, why: "8,000 + 40,000 − 10,000 = 38,000." },
      { q: "Which system gives a continuous record of inventory on hand?", options: ["Periodic", "Perpetual"], answer: 1, why: "Perpetual updates with every purchase and sale." }
    ]
  }
];
