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
      "Proprietorship: <b>Statement of owner’s equity</b> = Beginning capital + investments + net income − drawings = ending capital (shown on the balance sheet).",
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
<p><a class="btn" href="#/statements">Practise preparing all three statements in the Statement Lab →</a></p>
<div class="callout">Under <b>IFRS</b> a <em>statement of changes in equity</em> is required (shows changes in <b>all</b> equity components — share capital and retained earnings). Under <b>ASPE</b> a <em>statement of retained earnings</em> is presented (only retained earnings).</div>
<div data-diagram="flow"></div>`
      },
      {
        title: "Statement of owner’s equity (proprietorship)",
        html: `
<p>A <b>proprietorship</b> has no retained earnings or shares, so its second statement is the <b>statement of owner’s equity</b> instead of the statement of retained earnings.</p>
<div class="stack formula-stack"><span>Owner’s capital, beginning</span><span>+ Owner investments</span><span>+ Net income (or − net loss)</span><span>− Drawings</span><span class="total">= Owner’s capital, ending</span></div>
<div class="table-wrap"><table>
<thead><tr><th></th><th>Proprietorship</th><th>Corporation</th></tr></thead>
<tbody>
<tr><td>Equity accounts</td><td>Owner’s Capital</td><td>Share Capital + Retained Earnings</td></tr>
<tr><td>Owner contributes cash</td><td>Credit Owner’s Capital</td><td>Credit Common Shares</td></tr>
<tr><td>Distributions to owners</td><td>Drawings (debit balance)</td><td>Dividends (debit balance)</td></tr>
<tr><td>2nd statement</td><td>Statement of owner’s equity</td><td>Statement of retained earnings (ASPE) / changes in equity (IFRS)</td></tr>
<tr><td>Closing goes to</td><td>Owner’s Capital</td><td>Retained Earnings</td></tr>
<tr><td>Income tax expense?</td><td>No: the owner pays personally</td><td>Yes: the corporation pays</td></tr>
</tbody></table></div>
<div class="callout tip">Owner investments go on the statement of owner’s equity. They are <b>never revenue</b>. Drawings are <b>never an expense</b>. Ending capital is the figure that appears on the balance sheet.</div>`
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
      { q: "Revenue is recorded along with…", a: "An increase in an asset or a decrease in a liability." },
      { q: "Statement of owner’s equity format?", a: "Beginning capital + investments + net income − drawings = ending capital" },
      { q: "Internal vs external users, give an example of each.", a: "Internal: managers, employees. External: investors, creditors/banks, CRA, customers." }
    ],
    quiz: [
      { q: "A company buys equipment for cash. Effect on the accounting equation?", options: ["Assets ↑, Equity ↑", "One asset ↑, another asset ↓ — totals unchanged", "Assets ↑, Liabilities ↑", "Assets ↓, Equity ↓"], answer: 1, why: "Equipment goes up and Cash goes down by the same amount. Total assets don’t change." },
      { q: "Paying a dividend affects…", options: ["The income statement only", "Retained earnings (↓) and cash (↓)", "Expenses (↑)", "Liabilities (↑)"], answer: 1, why: "Dividends reduce retained earnings directly; they are not expenses." },
      { q: "Signing a contract to perform services next month is…", options: ["Recorded as revenue", "Recorded as a receivable", "Not recorded — nothing has changed in A, L or E yet", "Recorded as deferred revenue"], answer: 2, why: "Only events that change assets, liabilities or equity are recorded." },
      { q: "Under IFRS, which equity statement is required?", options: ["Statement of retained earnings", "Statement of changes in equity", "Statement of owner’s capital", "None"], answer: 1, why: "IFRS shows changes in ALL equity components; ASPE uses a statement of retained earnings." },
      { q: "A private company chose IFRS last year. This year it…", options: ["Can switch back to ASPE anytime", "Must apply IFRS consistently", "Must use both", "Uses whichever gives higher income"], answer: 1, why: "Once the choice is made it must be applied consistently." },
      { q: "Performed services for $900 on account. Effect?", options: ["Assets ↑, Liabilities ↑", "Assets ↑, Equity ↑", "Liabilities ↓, Equity ↑", "No effect until cash is received"], answer: 1, why: "A/R (asset) ↑ and revenue increases equity. Revenue is earned when the service is done." },
      { q: "An owner invests $10,000 cash in their proprietorship. The credit is to…", options: ["Service Revenue", "Owner’s Capital", "Owner’s Drawings", "Common Shares"], answer: 1, why: "Investments increase owner’s capital. They are not revenue, and a proprietorship has no shares." },
      { src: "PQ1 #1", q: "Internal users of accounting information include a company’s shareholders.", options: ["True", "False"], answer: 1, why: "Shareholders are outside the business, so they’re external users. Internal users are managers and employees." },
      { src: "PQ1 #2", q: "The issue of shares and the distribution of dividends do not affect net income.", options: ["True", "False"], answer: 0, why: "Share issues increase share capital and dividends reduce retained earnings directly. Neither is a revenue or an expense." },
      { src: "PQ1 #3", q: "Proprietorships and partnerships are taxable entities.", options: ["True", "False"], answer: 1, why: "Their profits are taxed on the owners’ personal returns. Only corporations pay their own income tax." },
      { src: "PQ1 #5", q: "An important feature of corporations is their unlimited liability.", options: ["True", "False"], answer: 1, why: "Corporations give shareholders LIMITED liability. Proprietors and partners have unlimited liability." },
      { src: "PQ1 #6", q: "Notes to financial statements are not required.", options: ["True", "False"], answer: 1, why: "The notes are an integral part of the financial statements and must be included." },
      { src: "PQ1 #10", q: "Which of the following is NOT an external user of accounting data?", options: ["Labour union", "Customers", "Economic planners", "Finance directors"], answer: 3, why: "Finance directors work inside the company, so they’re internal users." },
      { src: "PQ1 #12", q: "Which type of company must adopt International Financial Reporting Standards?", options: ["Proprietorship", "Publicly traded corporations", "Partnerships", "Private corporations"], answer: 1, why: "Publicly traded corporations must use IFRS. Private companies usually use ASPE (they may choose IFRS)." },
      { src: "PQ1 #13", q: "Identify the correct accounting equation.", options: ["A + L = E", "A + E = L", "A − L = E", "L = A + E"], answer: 2, why: "A = L + E rearranges to A − L = E: equity is what’s left after liabilities." },
      { src: "PQ1 #14", q: "Internal users want answers to all of the following questions EXCEPT:", options: ["What is the cost of manufacturing each unit?", "Which product line is more profitable?", "Is the company earning enough to give me a return on my investment?", "Is cash sufficient to pay the bills?"], answer: 2, why: "“A return on MY investment” is an investor’s (external user’s) question." },
      { src: "PQ1 #15", q: "Which question is relevant to internal users?", options: ["What does the advertising cost?", "What does the employees’ training cost?", "What does the labour cost?", "All of these"], answer: 3, why: "Managers need all of these costs to run the business." },
      { src: "PQ1 #16", q: "The statement of financial position and the statement of changes in equity are interrelated because…", options: ["The beginning retained earnings on the statement of changes in equity is reported on the statement of financial position", "Assets on the statement of financial position are reported on the statement of changes in equity", "The ENDING amount of each equity component on the statement of changes in equity is reported on the statement of financial position", "Liabilities on the statement of financial position are reported on the statement of changes in equity"], answer: 2, why: "Ending equity balances flow from the statement of changes in equity onto the balance sheet. Beginning balances don’t." },
      { src: "PQ1 #17", q: "Easy transfer of ownership is a characteristic of which form of business organization?", options: ["Proprietorship", "Partnership", "Publicly traded corporation", "All of these"], answer: 2, why: "Shares of a public corporation can be bought and sold easily." },
      { src: "PQ1 #18", q: "Unlimited life is a characteristic of which form of business organization?", options: ["Proprietorship", "Partnership", "Corporation", "All of these"], answer: 2, why: "A corporation continues regardless of changes in its owners. Proprietorships and partnerships have limited lives." },
      { src: "PQ1 #19", q: "The statement of financial position reports…", options: ["Assets owned by the business", "Claims to assets by creditors", "Claims to assets by shareholders", "All of these"], answer: 3, why: "Assets = Liabilities (creditors’ claims) + Equity (shareholders’ claims)." },
      { src: "PQ1 #20", q: "The financial statement that reports revenues and expenses is the…", options: ["Statement of changes in equity", "Statement of financial position", "Statement of income", "Statement of cash flows"], answer: 2, why: "Revenues − expenses = net income, on the income statement." },
      { src: "PQ1 #21", q: "The statement dated at a specific point in time is the…", options: ["Statement of cash flows", "Statement of financial position", "Statement of changes in equity", "Both b and c"], answer: 1, why: "The balance sheet is “as at” one date. The others cover a period (“for the year ended”)." },
      { src: "PQ1 #26", q: "In which order are the financial statements usually prepared?", options: ["Income, Financial position, Changes in equity, Cash flows", "Financial position, Changes in equity, Cash flows, Income", "Financial position, Cash flows, Income, Changes in equity", "Income, Changes in equity, Financial position, Cash flows"], answer: 3, why: "Net income feeds the equity statement; ending equity feeds the balance sheet; cash flows come last." },
      { src: "PQ1 #28", q: "Which of the following would NOT appear on the statement of income?", options: ["Service revenue", "Interest expense", "Net income", "Dividends declared"], answer: 3, why: "Dividends are distributions of profit, not expenses. They go on the statement of changes in equity." },
      { src: "PQ1 #29", q: "Which of the following would NOT appear on the statement of financial position?", options: ["Cash", "Accounts payable", "Dividends declared", "Common shares"], answer: 2, why: "Dividends declared is a temporary account on the statement of changes in equity." },
      { src: "PQ1 #30", q: "Which of the following would NOT appear directly on the statement of changes in equity?", options: ["Beginning retained earnings", "Dividends declared", "Service revenue", "Net income"], answer: 2, why: "Service revenue is on the income statement. Only the resulting net income appears on the equity statement." },
      { src: "PQ1 #31", q: "Saira’s Maid Service Ltd. began the year with total assets of $120,000 and shareholders’ equity of $40,000. It earned $90,000 net income and paid $20,000 in dividends. Total assets at year end were $215,000. Shareholders’ equity at year end was…", options: ["$130,000", "$110,000", "$150,000", "$135,000"], answer: 1, why: "40,000 + 90,000 − 20,000 = 110,000. The asset totals are distractors." },
      { src: "PQ1 #33", q: "Financial statements are prepared to provide information to which users?", options: ["Regulators", "Bondholders", "Investors", "All of these"], answer: 3, why: "All are external users who rely on general-purpose financial statements." },
      { src: "PQ1 #34", q: "The statement of changes in equity depends on the results of the…", options: ["Statement of income", "Statement of financial position", "Statement of cash flows", "Statement of assets and liabilities"], answer: 0, why: "It needs net income (or loss) from the income statement." },
      { src: "PQ1 #35", q: "Which of the following would appear on the statement of financial position?", options: ["Service revenue", "Interest expense", "Net income", "Accounts receivable"], answer: 3, why: "Accounts receivable is an asset. The others belong on the income statement." }
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
</ol>
<h4>Why not enter transactions straight into the ledger?</h4>
<ul>
<li>The journal keeps the <b>complete debit and credit effect</b> of each transaction together in one place.</li>
<li>It preserves <b>chronological order</b>, so you can see what happened and when.</li>
<li>It makes errors easier to find <b>before</b> amounts are split across separate ledger accounts.</li>
</ul>
<p class="muted">If a transaction is never journalized, there is nothing to post, so it’s missing from the ledger, the trial balance <b>and</b> the financial statements.</p>`
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
<div class="two-col">
<div class="card-lite down"><h4>Errors it CAN catch (totals won’t match)</h4><ul><li>Posting only one side of an entry</li><li>Debit and credit amounts that differ</li><li>Posting to the wrong side</li><li>Adding or transferring a balance incorrectly</li></ul></div>
<div class="card-lite"><h4>Errors it CAN’T catch (still balances)</h4><ul><li>A transaction never journalized</li><li>Posting to the wrong account on the correct side</li><li>An entry recorded twice</li><li>Offsetting errors of the same amount</li></ul></div>
</div>
<p class="muted">A trial balance is prepared at one point in time. To know an account’s <b>current</b> balance in the middle of a period, look at the ledger account, not an old trial balance.</p>`
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
      },
      {
        title: "Homework journal entry set (March)",
        prompt: "Cover the solution and journalize each March transaction: (Mar 2) issued common shares for $11,000 cash; (Mar 4) bought a $9,600 vehicle, paying $1,000 and owing the rest; (Mar 10) provided $2,400 of services on account; (Mar 13) paid $350 for advertising; (Mar 25) collected $1,000 of the receivable; (Mar 27) paid the vehicle payable; (Mar 30) received $700 before performing services; (Mar 31) declared and paid a $300 cash dividend.",
        steps: [
          { label: "Journal entries", entries: [
            { date: "Mar 2", lines: [["Cash", 11000, null], ["Common Shares", null, 11000]] },
            { date: "Mar 4", lines: [["Vehicles", 9600, null], ["Cash", null, 1000], ["Accounts Payable", null, 8600]] },
            { date: "Mar 10", lines: [["Accounts Receivable", 2400, null], ["Service Revenue", null, 2400]] },
            { date: "Mar 13", lines: [["Advertising Expense", 350, null], ["Cash", null, 350]] },
            { date: "Mar 25", memo: "No revenue here: it was recorded on Mar 10", lines: [["Cash", 1000, null], ["Accounts Receivable", null, 1000]] },
            { date: "Mar 27", lines: [["Accounts Payable", 8600, null], ["Cash", null, 8600]] },
            { date: "Mar 30", memo: "Not earned yet, so it’s a liability", lines: [["Cash", 700, null], ["Deferred Revenue", null, 700]] },
            { date: "Mar 31", memo: "Dividends reduce retained earnings; not an expense", lines: [["Dividends Declared", 300, null], ["Cash", null, 300]] }
          ]},
          { label: "Normal side of the homework’s ledger balances", html: `
<div class="table-wrap"><table><thead><tr><th>Account</th><th>Ending balance</th><th>Normal side</th></tr></thead><tbody>
<tr><td>Cash</td><td>$3,450</td><td class="dr">Debit</td></tr>
<tr><td>Accounts Receivable</td><td>$280</td><td class="dr">Debit</td></tr>
<tr><td>Supplies</td><td>$700</td><td class="dr">Debit</td></tr>
<tr><td>Accounts Payable</td><td>$0</td><td class="cr">Credit (when not zero)</td></tr>
<tr><td>Deferred Revenue</td><td>$650</td><td class="cr">Credit</td></tr>
<tr><td>Common Shares</td><td>$3,400</td><td class="cr">Credit</td></tr>
<tr><td>Service Revenue</td><td>$930</td><td class="cr">Credit</td></tr>
<tr><td>Income Tax Expense</td><td>$550</td><td class="dr">Debit</td></tr>
</tbody></table></div>
<p class="muted">That homework’s completed trial balance totalled $10,290 debits = $10,290 credits. Equal totals prove debits = credits were posted. They don’t prove the right accounts were used or that nothing was left out.</p>` }
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
      { q: "Name two errors a trial balance WILL catch.", a: "Posting only one side of an entry; unequal debit and credit amounts; posting to the wrong side; an addition error." },
      { q: "Why journalize first instead of posting straight to the ledger?", a: "It keeps each transaction’s full debit/credit effect together, keeps chronological order, and makes errors easier to find." },
      { q: "Steps 1–4 of the accounting cycle?", a: "Analyze transactions, Journalize, Post, Prepare unadjusted trial balance" }
    ],
    quiz: [
      { q: "Paid rent in cash. The entry is:", options: ["Dr Cash, Cr Rent Expense", "Dr Rent Expense, Cr Cash", "Dr Rent Expense, Cr Accounts Payable", "Dr Prepaid Rent, Cr Rent Expense"], answer: 1, why: "Expense ↑ (debit), Cash ↓ (credit)." },
      { q: "A $500 payment on account was posted as a debit to Cash and a credit to A/P. Will the trial balance balance?", options: ["Yes, but both accounts are wrong", "No, debits will exceed credits", "No, credits will exceed debits", "Yes, and it’s correct"], answer: 0, why: "Equal debit and credit were posted, just reversed. Trial balances don’t catch this." },
      { q: "Equipment costing $20,000 is bought with $5,000 cash and a $15,000 note payable. The entry is:", options: ["Dr Equipment 20,000 / Cr Cash 20,000", "Dr Equipment 20,000 / Cr Cash 5,000, Cr Notes Payable 15,000", "Dr Equipment 5,000 / Cr Cash 5,000", "Dr Equipment 15,000, Dr Cash 5,000 / Cr Notes Payable 20,000"], answer: 1, why: "Record the full cost; the financing is part cash, part new liability. Debits 20,000 = credits 20,000." },
      { q: "Balances: Equipment $5,000, Notes Payable $5,000, Cash $28,000, Prepaid Rent $6,000, Service Revenue $24,000, Salaries Payable $10,000. Total CREDIT balances?", options: ["$39,000", "$78,000", "$34,000", "$29,000"], answer: 0, why: "Credits: Notes Payable 5,000 + Service Revenue 24,000 + Salaries Payable 10,000." },
      { q: "Cash receipts $2,000, $7,000, $5,500; payments $1,800, $7,200, $3,000; opening balance 0. Ending Cash?", options: ["$2,500 credit", "$2,500 debit", "$14,500 debit", "$12,000 credit"], answer: 1, why: "14,500 in − 12,000 out = 2,500. Receipts exceed payments, so it’s a debit balance." },
      { q: "$6,000 received in November for December services was credited to Service Revenue. Result?", options: ["Everything is correct", "Revenue overstated $6,000; Deferred Revenue understated $6,000", "Cash overstated $6,000", "Revenue understated $6,000"], answer: 1, why: "Cash is right, but it isn’t earned yet: it should be Cr Deferred Revenue." },
      { q: "Which error makes the trial balance totals unequal?", options: ["Omitting a transaction", "Debiting the wrong expense account", "Posting only the credit side of an entry", "Recording an entry twice"], answer: 2, why: "A one-sided posting breaks debits = credits. The others keep both sides equal." },
      { q: "A cash receipt is never entered in the journal, but every later step is done correctly. The receipt will be…", options: ["In the ledger but not the statements", "Missing from both the ledger and the statements", "Caught by the trial balance", "Recorded automatically at closing"], answer: 1, why: "Nothing is journalized, so nothing is posted, so it never reaches the statements." },
      { src: "PQ3 #1", q: "Every transaction affects at least two accounts.", options: ["True", "False"], answer: 0, why: "Double-entry: every transaction has a dual effect." },
      { src: "PQ3 #2", q: "Every account has a left or credit side and a right or debit side.", options: ["True", "False"], answer: 1, why: "Reversed: debit is LEFT, credit is RIGHT." },
      { src: "PQ3 #3", q: "Assets are increased with credits.", options: ["True", "False"], answer: 1, why: "Assets increase with debits." },
      { src: "PQ3 #4", q: "Transactions are recorded in chronological order in the general journal.", options: ["True", "False"], answer: 0, why: "The journal is the book of original entry, in date order." },
      { src: "PQ3 #6", q: "Expenses decrease retained earnings and should only be recorded when cash is paid out.", options: ["True", "False"], answer: 1, why: "Accrual accounting records expenses when INCURRED, whether or not cash has been paid." },
      { src: "PQ3 #7", q: "Which part of the recording process shows the complete effect of a transaction in one place?", options: ["Source documents", "Chart of accounts", "General ledger", "General journal"], answer: 3, why: "A journal entry shows every debit and credit of the transaction together." },
      { src: "PQ3 #8", q: "The primary purpose of a trial balance is to…", options: ["Prove the correct accounts were used", "List all account titles", "Prove the mathematical equality of debits and credits after posting", "Find all errors"], answer: 2, why: "It proves debits = credits. It can’t prove the right accounts were used or find every error." },
      { src: "PQ3 #9", q: "If cash is received in advance from a customer, then…", options: ["Assets will decrease", "Retained earnings will increase", "Liabilities will increase", "Shareholders’ equity will decrease"], answer: 2, why: "Cash ↑ and Deferred Revenue (a liability) ↑ until the work is done." },
      { src: "PQ3 #10", q: "Which accounts are affected when a cash dividend is declared and paid at the same time?", options: ["Dr Accounts Receivable, Cr Dividends Payable", "Dr Cash, Cr Dividends Payable", "Dr Dividends Declared, Cr Cash", "Dr Dividends Declared, Cr Dividends Payable"], answer: 2, why: "Declared and paid together, so no payable is needed: Dividends Declared ↑, Cash ↓." },
      { src: "PQ3 #11", q: "Accounts with normal DEBIT balances include…", options: ["Assets and liabilities", "Liabilities and expenses", "Shareholders’ equity and revenues", "Expenses and assets"], answer: 3, why: "DEALER: Dividends, Expenses and Assets are debit accounts." },
      { src: "PQ3 #12", q: "Retained earnings are decreased by…", options: ["Revenues", "Liabilities", "Expenses", "Common shares"], answer: 2, why: "Expenses reduce net income, which reduces retained earnings." },
      { src: "PQ3 #13", q: "Accounts with normal CREDIT balances include…", options: ["Assets and liabilities", "Revenues and expenses", "Liabilities and shareholders’ equity", "Revenues and assets"], answer: 2, why: "Liabilities, Equity and Revenues are credit accounts." },
      { src: "PQ3 #14", q: "Issuing shares to investors for cash would result in…", options: ["Dr Common Shares, Cr Cash", "Dr Cash, Cr Common Shares", "Dr Investments in Common Shares, Cr Cash", "Dr Cash, Cr Sales"], answer: 1, why: "Cash (asset) ↑ with a debit; Common Shares (equity) ↑ with a credit." },
      { src: "PQ3 #15", q: "Which of the following is NOT part of a complete journal entry?", options: ["The balance of each account affected", "The accounts and amounts debited and credited", "The date of the transaction", "A brief explanation"], answer: 0, why: "Balances live in the ledger, not the journal." },
      { src: "PQ3 #16", q: "The process of transferring entries from the journal to the ledger is called…", options: ["Journalizing", "Transferring", "Posting", "Balancing"], answer: 2, why: "Posting moves each journal line to its ledger account." },
      { src: "PQ3 #17", q: "The first place every transaction is recorded is the…", options: ["General ledger", "Account", "Trial balance", "General journal"], answer: 3, why: "The journal is the book of original entry." },
      { src: "PQ3 #19", q: "Accounts are normally listed on the trial balance in…", options: ["Chronological order", "The order they appear in the ledger", "Alphabetical order", "The order they were posted"], answer: 1, why: "Ledger (chart of accounts) order: assets, liabilities, equity, revenues, expenses." },
      { src: "PQ3 #21", q: "If supplies are purchased but not paid for immediately, then…", options: ["Liabilities will increase", "Retained earnings will increase", "Assets will decrease", "Expenses will decrease"], answer: 0, why: "Supplies ↑ (asset) and Accounts Payable ↑ (liability)." },
      { src: "PQ3 #22", q: "Collecting cash in advance from customers for a service to be performed later results in…", options: ["Dr Cash, Cr Service Revenue", "Dr Cash, Cr Deferred Revenue", "Dr Prepaid Services, Cr Cash", "No entry until the service is performed"], answer: 1, why: "Cash has moved, so record it, but as a liability until it’s earned." },
      { src: "PQ3 #24", q: "Which account has a normal credit balance?", options: ["Cash", "Utilities Expense", "Accounts Payable", "Inventory"], answer: 2, why: "Accounts Payable is a liability." },
      { src: "PQ3 #25", q: "Collecting an account receivable results in…", options: ["Dr Cash, Cr Accounts Receivable", "Dr Accounts Receivable, Cr Cash", "Dr Cash, Cr Revenue", "None of these"], answer: 0, why: "One asset replaces another. Revenue was already recorded when earned." },
      { src: "PQ3 #26", q: "On Jan 1, 2024, Martin Corporation borrowed $6,000 from Scotiabank at 5% to purchase equipment, repaying the loan and interest on Dec 31, 2024. Which is part of the correct Jan 1 entry for the equipment purchase?", options: ["Credit Equipment $6,000", "Debit Bank Loan Payable $6,000", "Debit Accounts Receivable $6,000", "Debit Equipment $6,000"], answer: 3, why: "Equipment (asset) ↑ with a debit; the loan is credited to Bank Loan Payable. No interest is recorded on Jan 1." },
      { src: "PQ3 #27", q: "Every transaction has at least a dual effect. If an individual asset INCREASED, which corresponding effect is INCORRECT?", options: ["Decrease in another asset", "Increase in a specific liability", "Increase in common shares or revenues", "Increase in another asset"], answer: 3, why: "Two assets rising with nothing else changing would unbalance A = L + E." }
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
<tr><td><b>Long-term investments</b></td><td>Investments in debt or equity expected to be held for many years. Not readily marketable or expected to be converted into cash within one year. Land held only as an investment (to resell later) also goes here.</td></tr>
<tr><td><b>Property, plant & equipment</b></td><td>Long-lived, <b>tangible</b> assets used in the business and <b>not intended for sale</b>. Homework example: land bought to build and operate a manufacturing centre for many years is PP&E, a non-current operating asset.</td></tr>
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
<div class="card-lite"><h4>Non-current liabilities</h4><p>Expected to be paid or settled after one year. Usually come with extensive notes. A company may list each long-term liability separately <b>or</b> show one total with the details in the notes. Both are acceptable, because the notes are part of the financial statements.</p><ul><li>Bank loan / notes payable</li><li>Lease liabilities</li><li>Pension & benefit obligations</li><li>Deferred liabilities</li></ul></div>
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
<tr><td><b>Measurement</b></td><td>How amounts are valued. <b>Historical cost</b> reports the original transaction price. <b>Fair value</b> (current market price) is used when the rules permit it and the asset is actively traded with reliable prices available, because it’s more relevant.</td></tr>
<tr><td><b>Cost constraint</b></td><td>The benefit of reporting information should be greater than the cost of providing it.</td></tr>
</tbody></table></div>
<h4>Qualitative characteristics</h4>
<div class="two-col">
<div class="card-lite"><h4>Relevance</h4><p>Information that can make a difference in a decision (it helps predict or confirm).</p></div>
<div class="card-lite"><h4>Faithful representation</h4><p>A truthful, transparent picture of what exists or what happened. It is supported by being <b>complete</b>, <b>neutral</b> and <b>free from material error</b>.</p></div>
</div>`
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
<tr><td>Land bought to build and operate a manufacturing centre</td><td>Property, plant & equipment (used in operations long term)</td></tr>
<tr><td>Land held only as an investment, to resell later</td><td>Long-term investment</td></tr>
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
        title: "Current ratio: before and after a transaction",
        prompt: "(a) Current assets $180,000; current liabilities $120,000. Find working capital and the current ratio. (b) Another company has current assets of $2,500,000 and current liabilities of $1,000,000. What is the current ratio after it issues $50,000 of shares for cash? (c) What if it instead borrowed $50,000 on a short-term note?",
        steps: [
          { label: "Solution", html: `
<ul class="calc">
<li>(a) Working capital = 180,000 − 120,000 = <b>$60,000</b>. Current ratio = 180,000 ÷ 120,000 = <b>1.50 : 1</b></li>
<li>(b) Before: 2,500,000 ÷ 1,000,000 = 2.50. The share issue adds cash (current assets ↑) and no liability: 2,550,000 ÷ 1,000,000 = <b>2.55 : 1</b>, so liquidity improves</li>
<li>(c) A short-term loan adds the same $50,000 to <b>both</b> sides: 2,550,000 ÷ 1,050,000 = <b>2.43 : 1</b>, so the ratio falls even though cash went up</li>
</ul>
<p class="muted">Trick for any “what happens to the ratio” question: write the new current assets and current liabilities, then divide. Don’t guess from the direction of cash alone.</p>` }
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
      { q: "Current ratio formula?", a: "Current assets ÷ Current liabilities" },
      { q: "Faithful representation means…", a: "A truthful, transparent picture of what happened: complete, neutral and free from material error." },
      { q: "Share issue for cash vs a new short-term loan: effect on the current ratio?", a: "Share issue: current assets ↑ only, so the ratio ↑. Short-term loan: both ↑ by the same amount, so the ratio moves toward 1 (falls when it was above 1)." },
      { q: "Land bought to build a manufacturing centre is classified as…", a: "Property, plant & equipment (a non-current operating asset)" }
    ],
    quiz: [
      { q: "Accumulated depreciation is a…", options: ["Liability", "Contra asset", "Expense", "Revenue"], answer: 1, why: "It reduces the related asset and has a credit balance." },
      { q: "A company records its owner’s personal car loan on the company books. Which concept is violated?", options: ["Going concern", "Business entity", "Currency", "Cost constraint"], answer: 1, why: "Business and owner activities must be kept separate." },
      { q: "Equipment cost $20,000, accumulated depreciation $6,000. Carrying amount?", options: ["$26,000", "$20,000", "$14,000", "$6,000"], answer: 2, why: "20,000 − 6,000." },
      { q: "The current ratio measures…", options: ["Profitability", "Liquidity", "Solvency", "Market value"], answer: 1, why: "Short-term ability to pay current obligations." },
      { q: "Total liabilities $120,000, total assets $300,000. Debt to total assets?", options: ["40%", "250%", "60%", "30%"], answer: 0, why: "120,000 ÷ 300,000 = 40%." },
      { q: "A company’s operating cycle is 18 months. Receivables collectible in 15 months are…", options: ["Non-current", "Current", "Long-term investments", "Not reported"], answer: 1, why: "Current = one year OR one operating cycle, whichever is longer (18 months)." },
      { q: "Current assets $2,500,000, current liabilities $1,000,000. The company issues $50,000 of shares for cash. New current ratio?", options: ["2.50 : 1", "2.55 : 1", "2.43 : 1", "2.45 : 1"], answer: 1, why: "Cash ↑ 50,000, liabilities unchanged: 2,550,000 ÷ 1,000,000." },
      { q: "A company buys land to build and operate a manufacturing centre for many years. Classify the land as…", options: ["Current asset", "Intangible asset", "Property, plant & equipment", "Long-term investment"], answer: 2, why: "It’s tangible and used in operations long term." },
      { q: "An asset is actively traded with reliable market prices. Which measurement is most relevant (if the rules permit it)?", options: ["Historical cost", "Fair value", "Liquidation value", "Replacement cost"], answer: 1, why: "A current market price shows what the asset could be sold for today." },
      { q: "Information that shows a truthful, transparent picture of what happened has which qualitative characteristic?", options: ["Relevance", "Faithful representation", "Timeliness", "Going concern"], answer: 1, why: "Faithful representation: complete, neutral, free from material error." },
      { src: "PQ2 #3", q: "Current assets are assets expected to be converted to cash or used in the business within two years.", options: ["True", "False"], answer: 1, why: "Current = within ONE year (or one operating cycle, if longer)." },
      { src: "PQ2 #6", q: "The debt to total assets ratio is an overall measure of profitability.", options: ["True", "False"], answer: 1, why: "Debt to total assets measures solvency (long-term survival), not profitability." },
      { src: "PQ2 #7", q: "The profit margin is an overall measure of profitability.", options: ["True", "False"], answer: 0, why: "Profit margin = net income ÷ revenue: how much profit each sales dollar produces." },
      { src: "PQ2 #11", q: "Which best shows the REVERSE order of liquidity for assets on the statement of financial position?", options: ["Goodwill; Property, plant & equipment; Prepaid insurance; Cash", "PP&E; Goodwill; Accounts receivable; Inventory; Cash", "Goodwill; PP&E; Long-term investments; Cash; Inventory", "PP&E; Long-term investments; Accounts receivable; Prepaid insurance; Cash"], answer: 0, why: "Reverse liquidity lists the least liquid assets first and ends with cash, keeping each group in consistent order." },
      { src: "PQ2 #12", q: "Which basic assumption states that a business will remain in operation for the foreseeable future?", options: ["Time period assumption", "Monetary unit assumption", "Economic entity assumption", "Going concern assumption"], answer: 3, why: "Going concern: assume the business keeps operating." },
      { src: "PQ2 #13", q: "Which of the following would NOT be classified as a current asset?", options: ["Prepaid expenses", "Accounts receivable", "Patents", "Inventory"], answer: 2, why: "A patent is a long-lived intangible asset." },
      { src: "PQ2 #14", q: "What is the usual order of current assets on a Canadian company’s statement of financial position?", options: ["Cash, Accounts receivable, Prepaid expenses, Inventory, Trading investments", "Cash, Trading investments, Inventory, Prepaid expenses, Accounts receivable", "Cash, Accounts receivable, Inventory, Trading investments, Prepaid expenses", "Cash, Trading investments, Accounts receivable, Inventory, Prepaid expenses"], answer: 3, why: "Order of liquidity: cash, trading investments, receivables, inventory, prepaids." },
      { src: "PQ2 #15", q: "Which of the following is an intangible asset?", options: ["Accounts receivable", "Trademarks", "Prepaid expenses", "Trading investments"], answer: 1, why: "Trademarks are rights with no physical substance." },
      { src: "PQ2 #17", q: "The purpose of the earnings per share ratio is…", options: ["To measure the net income for each common share", "To measure the revenue earned for each common share", "To compare low-turnover and high-turnover businesses", "To measure gross profit to sales"], answer: 0, why: "EPS = (net income − preferred dividends) ÷ weighted average common shares." },
      { src: "PQ2 #19", q: "The current ratio is calculated by dividing current assets by…", options: ["Total assets", "Non-current liabilities", "Current liabilities", "The number of common shares"], answer: 2, why: "Current ratio = current assets ÷ current liabilities." },
      { src: "PQ2 #20", q: "Which statement about the current ratio is true?", options: ["A limitation is that it doesn’t consider the composition of the current assets", "Working capital is a more reliable indicator of liquidity than the current ratio", "The current ratio will reflect a decline in sales and cause inventory to rise", "The current ratio should be similar for all types of organizations"], answer: 0, why: "A high ratio could be mostly slow-moving inventory; the ratio can’t tell you." },
      { src: "PQ2 #21", q: "While IFRS uses the term depreciation for tangible assets, ASPE uses the term…", options: ["Depletion", "Capital cost allowance", "Amortization", "Any of these"], answer: 2, why: "ASPE calls it amortization. Capital cost allowance is the tax term." },
      { src: "PQ2 #23", q: "Which classifications are generally contained on a classified statement of financial position?", options: ["Current liabilities", "Non-current liabilities", "Shareholders’ equity", "All of these"], answer: 3, why: "A classified SFP groups current/non-current assets and liabilities plus equity." },
      { src: "PQ2 #24", q: "Which of the following should be classified as current liabilities?", options: ["Cash, Prepaid expenses, Income tax payable", "Accounts receivable, Cash, Prepaid expenses", "Accounts payable, Income tax payable, Accrued liabilities", "Prepaid expenses, Equipment, Long-term investments"], answer: 2, why: "Only option c lists obligations due within a year. The others include assets." }
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
      "Calculate partial-year depreciation and interest accruals (× months ÷ 12)",
      "Work backward through a T-account to find a missing amount",
      "Prepare an adjusted trial balance",
      "Prepare closing entries and a post-closing trial balance",
      "Compare IFRS 5-step revenue recognition with ASPE"
    ],
    summary: [
      "Adjusting entries are made at the <b>end of every period</b> so revenues and expenses land in the right period and assets/liabilities are stated correctly.",
      "Five types: <b>prepaid expenses, depreciation (amortization), unearned revenues, accrued expenses, accrued revenues</b>.",
      "Every adjusting entry hits <b>one balance-sheet account and one income-statement account</b> — and <b>never Cash</b>.",
      "Straight-line depreciation = <b>(Cost − Residual value) ÷ Useful life</b>, credited to Accumulated Depreciation. Partial year: × months used ÷ 12.",
      "Interest = <b>Principal × Rate × Time</b>. It accrues with the passage of time, before any cash moves.",
      "Collecting a receivable is <b>Dr Cash / Cr A/R</b>, never revenue again. Deferred revenue is a liability until earned.",
      "Missing numbers? Use the T-account: <b>Beginning + Additions − Used = Ending</b>, then solve for the unknown.",
      "Income tax expense is calculated <b>after</b> all other adjustments: adjusted income before tax × tax rate.",
      "<b>Dividends are not expenses</b> — they reduce retained earnings.",
      "<b>Permanent</b> accounts (balance sheet) carry forward. <b>Temporary</b> accounts (revenues, expenses, dividends) are closed to zero.",
      "Closing: (1) revenues → Income Summary, (2) expenses → Income Summary, (3) Income Summary → Retained Earnings, (4) Dividends → Retained Earnings.",
      "<b>IFRS</b> revenue recognition uses a <b>5-step model</b>; <b>ASPE</b> recognizes revenue when performance is substantially complete, measurable and collection is reasonably certain."
    ],
    terms: [
      { term: "Accrual accounting", def: "Revenue is recorded when earned and expenses when incurred, regardless of when cash changes hands." },
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
        title: "Accrual accounting & why adjustments are needed",
        html: `
<div class="formula small">Accrual accounting: record revenue when it is <b>earned</b> and expenses when they are <b>incurred</b>, regardless of when cash changes hands.</div>
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
        title: "Prepaid expenses in detail",
        html: `
<p>Payments for future benefits are first recorded as <b>assets</b>. As the benefit is used up, move the used portion to <b>expense</b>.</p>
<p><b>Example:</b> pay $12,000 on July 1 for six months’ rent. Monthly expense = $12,000 ÷ 6 = <b>$2,000</b>.</p>
<div class="table-wrap"><table class="je"><thead><tr><th>Date</th><th>Account</th><th class="num">Debit</th><th class="num">Credit</th></tr></thead><tbody>
<tr class="first"><td class="date">Jul 1</td><td>Prepaid Rent</td><td class="num d">12,000</td><td class="num c"></td></tr>
<tr><td></td><td class="credit-acct">Cash</td><td class="num d"></td><td class="num c">12,000</td></tr>
<tr class="first"><td class="date">Jul 31</td><td>Rent Expense</td><td class="num d">2,000</td><td class="num c"></td></tr>
<tr><td></td><td class="credit-acct">Prepaid Rent</td><td class="num d"></td><td class="num c">2,000</td></tr>
</tbody></table></div>
<h4>From the homework</h4>
<ul class="calc">
<li>Insurance: $2,340 ÷ 12 × 7 months = <b>$1,365</b> expense</li>
<li>Rent: $6,700 ÷ 5 × 4 months = <b>$5,360</b> expense</li>
<li>Prepaid cleaning, one month used: Dr Repairs and Maintenance Expense <b>$1,040</b> / Cr Prepaid Cleaning $1,040</li>
</ul>
<p class="muted">Pattern: (total prepaid ÷ months covered) × months used. The expense account doesn’t always share the prepaid’s name (prepaid cleaning → repairs and maintenance expense).</p>`
      },
      {
        title: "Deferred (unearned) revenue in detail",
        html: `
<p>Cash received <b>before</b> the revenue is earned creates a <b>liability</b>. “Deferred revenue” and “unearned revenue” mean the same thing.</p>
<div class="two-col">
<div class="card-lite"><h4>When cash is received</h4><p>Dr Cash<br>&nbsp;&nbsp;&nbsp;&nbsp;Cr Deferred Revenue</p></div>
<div class="card-lite"><h4>When the service is performed</h4><p>Dr Deferred Revenue<br>&nbsp;&nbsp;&nbsp;&nbsp;Cr Service Revenue (or the right revenue account)</p></div>
</div>
<h4>From the homework</h4>
<ul class="calc">
<li>$3,870 received for nine monthly sponsorships → $430/month × 4 months = <b>$1,720</b> earned</li>
<li>$1,500 received, $530 still unearned at year end → $1,500 − $530 = <b>$970</b> revenue recognized</li>
</ul>
<p class="muted">Watch the wording: “still unearned” gives you the <i>ending liability</i>, so revenue = amount received − amount still unearned.</p>`
      },
      {
        title: "Accrued revenue in detail",
        html: `
<p>Revenue has been <b>earned</b> but not yet recorded or collected.</p>
<div class="two-col">
<div class="card-lite"><h4>Adjusting entry</h4><p>Dr Accounts Receivable (or Interest Receivable)<br>&nbsp;&nbsp;&nbsp;&nbsp;Cr Service Revenue (or Interest Income)</p></div>
<div class="card-lite"><h4>When the customer later pays</h4><p>Dr Cash<br>&nbsp;&nbsp;&nbsp;&nbsp;Cr Accounts Receivable</p></div>
</div>
<div class="callout warn"><b>Don’t record revenue twice.</b> Collecting an existing receivable is just one asset replacing another. The revenue was already recorded when it was earned.</div>
<div class="callout tip"><b>Accrued vs deferred revenue:</b> before adjusting, <b>accrued</b> revenue is earned but <i>unrecorded</i> (no entry yet). <b>Deferred</b> revenue has already been recorded, as a <i>liability</i>, because the cash came first.</div>`
      },
      {
        title: "Accrued expenses in detail",
        html: `
<p>Expenses have been <b>incurred</b> but not yet recorded or paid.</p>
<div class="je-inline">Dr (the right) Expense / Cr (the matching) Payable &nbsp;·&nbsp; e.g. Dr Salaries Expense / Cr Salaries Payable</div>
<p>Common examples: salaries earned by employees since the last payday, interest owed on a loan, utilities used but not billed. When the bill is later paid: Dr the Payable / Cr Cash. The expense is not recorded again.</p>`
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
<h4>Partial year</h4>
<p>If the asset was used for only part of the year: <b>annual depreciation × months used ÷ 12</b>. The homework examples used no residual value.</p>
<div class="table-wrap"><table><thead><tr><th>Homework example</th><th>Calculation</th><th>Depreciation</th></tr></thead><tbody>
<tr><td>$40,000 equipment, 4-year life, bought July 1</td><td>$40,000 ÷ 4 × 6/12</td><td><b>$5,000</b></td></tr>
<tr><td>$28,590 vehicle, 3-year life, full year</td><td>$28,590 ÷ 3</td><td><b>$9,530</b></td></tr>
<tr><td>$14,050 equipment, 5-year life, bought July 1</td><td>$14,050 ÷ 5 × 6/12</td><td><b>$1,405</b></td></tr>
</tbody></table></div>
<h4>Annual expense vs accumulated depreciation</h4>
<p>The vehicle above had <b>two years</b> of use at December 31, 2024:</p>
<ul class="calc"><li>Depreciation expense for 2024 = $9,530 (one year only)</li><li>Accumulated depreciation = $9,530 × 2 = <b>$19,060</b></li><li>Carrying amount = $28,590 − $19,060 = <b>$9,530</b></li></ul>
<p class="muted">Accumulated Depreciation is a contra-asset (permanent) account, so it is <b>not closed</b> at year end. Depreciation Expense is closed.</p>
<div data-diagram="depreciation"></div>`
      },
      {
        title: "Interest accruals",
        html: `
<div class="formula">Interest = Principal × Annual rate × Time (in years)</div>
<p>Interest is earned (or incurred) with the <b>passage of time</b>, even before any cash is collected or paid.</p>
<p><b>Homework example:</b> a bank lends $41,000 at 6% for 18 months.</p>
<ul class="calc">
<li>First six months: $41,000 × 6% × 6/12 = <b>$1,230</b></li>
<li>Following twelve months: $41,000 × 6% × 12/12 = <b>$2,460</b></li>
<li>Total interest: $1,230 + $2,460 = <b>$3,690</b></li>
<li>Total collected at maturity: $41,000 + $3,690 = <b>$44,690</b></li>
</ul>
<div class="table-wrap"><table><thead><tr><th>On the lender’s books</th><th>Debit</th><th>Credit</th></tr></thead><tbody>
<tr><td>Make the loan</td><td>Bank Loan Receivable</td><td>Cash</td></tr>
<tr><td>Accrue interest (each year end)</td><td>Interest Receivable</td><td>Interest Income</td></tr>
<tr><td>Collect at maturity</td><td>Cash</td><td>Bank Loan Receivable and Interest Receivable</td></tr>
</tbody></table></div>
<p class="muted">The borrower records the mirror image: Dr Interest Expense / Cr Interest Payable.</p>`
      },
      {
        title: "Working backward with T-accounts",
        html: `
<p>Many homework questions give three of the four numbers in an account and ask for the missing one. Set up the T-account and solve.</p>
<div class="two-col">
<div class="card-lite"><h4>Assets (Supplies, Prepaid Insurance, A/R)</h4><p class="mono-line">Beginning + Additions − Amount used = Ending</p></div>
<div class="card-lite"><h4>Liabilities (Deferred Revenue, Payables)</h4><p class="mono-line">Beginning + Increases − Reductions = Ending</p></div>
</div>
<div class="table-wrap"><table><thead><tr><th>Find</th><th>Rearranged</th><th>Homework numbers</th></tr></thead><tbody>
<tr><td>Supplies used</td><td>Beginning + Purchased − Ending</td><td>$3,200 + $7,600 − $2,600 = <b>$8,200</b></td></tr>
<tr><td>Insurance purchased</td><td>Ending + Expense − Beginning</td><td>$19,200 + $22,000 − $16,100 = <b>$25,100</b></td></tr>
<tr><td>Cash collected from customers</td><td>Beginning A/R + Sales on account − Ending A/R</td><td>$43,800 + $123,100 − $55,900 = <b>$111,000</b></td></tr>
<tr><td>Deferred revenue earned</td><td>Beginning + Cash received − Ending</td><td>$20,100 + $31,500 − $16,300 = <b>$35,300</b></td></tr>
<tr><td>Opening income tax payable</td><td>Ending − Accrued + Paid</td><td>$130 − $90 + $73 = <b>$113</b></td></tr>
</tbody></table></div>
<h4>Other backward calculations</h4>
<ul class="calc">
<li>Months of use: $3,000 accumulated depreciation ÷ $120 per month = <b>25 months</b></li>
<li>Coverage left: $1,260 prepaid insurance ÷ $420 per month = <b>3 months</b></li>
<li>Annual premium: $420 × 12 = <b>$5,040</b></li>
</ul>`
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
<ul><li>Prepared <b>after</b> adjusting entries are journalized and posted.</li><li>Proves total debits = total credits after all adjustments.</li><li>It is the <b>main source</b> for preparing the financial statements.</li></ul>
<h4>From the adjusted trial balance to the statements</h4>
<p>Prepare the <b>income statement first</b>: its net income is needed for the statement of changes in equity (retained earnings).</p>
<div class="formula small">Net income = Revenues − Expenses &nbsp;·&nbsp; Ending RE = Beginning RE + Net income − Dividends</div>
<ul class="calc"><li>Homework: revenue $134,100 − total expenses $97,300 = net income <b>$36,800</b></li>
<li>Ending retained earnings = $47,800 + $36,800 − $5,300 = <b>$79,300</b></li></ul>
<p><a class="btn" href="#/statements">Practise with fresh trial balances in the Statement Lab →</a></p>`
      },
      {
        title: "Closing temporary accounts",
        html: `
<ul>
<li>The closing process is the last step of the accounting cycle.</li>
<li><b>Permanent accounts</b> track results year to year: ending balances carry forward. All balance sheet accounts are permanent: assets (including contra accounts like Accumulated Depreciation), liabilities, and equity such as Common Shares and Retained Earnings.</li>
<li><b>Temporary accounts</b> track results for a limited time and are reset to zero at year end: revenues, expenses, dividends declared and Income Summary itself.</li>
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
        title: "Common mistakes to avoid",
        html: `
<div class="mistakes">
<div><b>Expensing an entire prepayment</b><span>Only the portion that has expired becomes expense.</span></div>
<div><b>Recording advance payments as revenue</b><span>Cash received before the work is done is a liability (deferred revenue).</span></div>
<div><b>Recording revenue twice</b><span>Collecting Accounts Receivable is Dr Cash / Cr A/R. No revenue.</span></div>
<div><b>Full-year depreciation on a mid-year purchase</b><span>Multiply by months used ÷ 12.</span></div>
<div><b>Mixing up depreciation expense and accumulated depreciation</b><span>Expense = this year only. Accumulated = total to date.</span></div>
<div><b>Closing permanent accounts</b><span>Never close assets, liabilities or Accumulated Depreciation.</span></div>
<div><b>Treating dividends as an expense</b><span>Dividends reduce retained earnings directly and never appear on the income statement.</span></div>
<div><b>Using Cash in an adjusting entry</b><span>Adjustments pair one income statement account with one balance sheet account.</span></div>
</div>`
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
        title: "Prepaid rent — six months",
        prompt: "On July 1 a company pays $12,000 for six months’ rent. Record the payment and the July 31 adjusting entry. What is the Prepaid Rent balance at July 31?",
        steps: [
          { label: "Solution", html: "<p>$12,000 ÷ 6 months = <b>$2,000</b> per month.</p>", entries: [
            { date: "Jul 1", memo: "Payment for future benefit → asset", lines: [["Prepaid Rent", 12000, null], ["Cash", null, 12000]] },
            { date: "Jul 31", memo: "One month used", lines: [["Rent Expense", 2000, null], ["Prepaid Rent", null, 2000]] }
          ], after: "Prepaid Rent at July 31 = 12,000 − 2,000 = $10,000 (five months left)." }
        ]
      },
      {
        title: "Partial-year depreciation & carrying amount",
        prompt: "(a) $14,050 of equipment with a 5-year life and no residual is bought July 1. Depreciation for the year ending Dec 31? (b) A $28,590 vehicle has a 3-year life and no residual. At the end of its second full year, what are the year’s depreciation expense, the accumulated depreciation and the carrying amount?",
        steps: [
          { label: "Solution", html: `<ul class="calc"><li>(a) 14,050 ÷ 5 = 2,810 per year × 6/12 = <b>$1,405</b></li><li>(b) Depreciation expense for the year = 28,590 ÷ 3 = <b>$9,530</b></li><li>(b) Accumulated depreciation = 9,530 × 2 = <b>$19,060</b></li><li>(b) Carrying amount = 28,590 − 19,060 = <b>$9,530</b></li></ul><p class="muted">Classic trap: the year’s expense is one year; accumulated depreciation is every year so far.</p>`, entries: [
            { date: "(a) Dec 31", lines: [["Depreciation Expense", 1405, null], ["Accumulated Depreciation — Equipment", null, 1405]] }
          ]}
        ]
      },
      {
        title: "Interest on a bank loan (lender’s books)",
        prompt: "A bank lends $41,000 at 6% for 18 months. Six months pass before the bank’s first year end. Record the loan, the interest accrual at the first year end, the accrual for the following twelve months, and the collection at maturity.",
        steps: [
          { label: "Solution", html: `<ul class="calc"><li>First 6 months: 41,000 × 6% × 6/12 = 1,230</li><li>Next 12 months: 41,000 × 6% × 12/12 = 2,460</li><li>Total interest 3,690 · Collected at maturity 44,690</li></ul>`, entries: [
            { date: "Start", memo: "Make the loan", lines: [["Bank Loan Receivable", 41000, null], ["Cash", null, 41000]] },
            { date: "Year end 1", memo: "6 months of interest earned", lines: [["Interest Receivable", 1230, null], ["Interest Income", null, 1230]] },
            { date: "Year end 2", memo: "Next 12 months of interest earned", lines: [["Interest Receivable", 2460, null], ["Interest Income", null, 2460]] },
            { date: "Maturity", memo: "Collect principal + all interest", lines: [["Cash", 44690, null], ["Bank Loan Receivable", null, 41000], ["Interest Receivable", null, 3690]] }
          ]}
        ]
      },
      {
        title: "Working backward with T-accounts",
        prompt: "(a) Supplies: beginning $3,200, purchases $7,600, ending $2,600. Supplies used? (b) Accounts Receivable: beginning $43,800, sales on account $123,100, ending $55,900. Cash collected? (c) Deferred revenue: beginning $20,100, cash received in advance $31,500, ending $16,300. Revenue earned? (d) Accumulated depreciation is $3,000 and monthly depreciation is $120. How many months has the asset been used?",
        steps: [
          { label: "Solution", html: `
<div class="tgrid">
<div class="tacc"><div class="tacc-h">Supplies</div><div class="tacc-b"><div class="tacc-l">Beg 3,200<br>7,600</div><div class="tacc-r"><b>8,200</b> used</div></div><div class="tacc-bal">End <b class="d">2,600 Dr</b></div></div>
<div class="tacc"><div class="tacc-h">Accounts Receivable</div><div class="tacc-b"><div class="tacc-l">Beg 43,800<br>123,100</div><div class="tacc-r"><b>111,000</b> collected</div></div><div class="tacc-bal">End <b class="d">55,900 Dr</b></div></div>
<div class="tacc"><div class="tacc-h">Deferred Revenue</div><div class="tacc-b"><div class="tacc-l"><b>35,300</b> earned</div><div class="tacc-r">Beg 20,100<br>31,500</div></div><div class="tacc-bal">End <b class="c">16,300 Cr</b></div></div>
</div>
<ul class="calc"><li>(a) 3,200 + 7,600 − 2,600 = <b>8,200</b></li><li>(b) 43,800 + 123,100 − 55,900 = <b>111,000</b></li><li>(c) 20,100 + 31,500 − 16,300 = <b>35,300</b></li><li>(d) 3,000 ÷ 120 = <b>25 months</b></li></ul>` }
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
      { q: "What appears on a post-closing trial balance?", a: "Only permanent (balance sheet) accounts." },
      { q: "Partial-year depreciation formula?", a: "(Cost − Residual) ÷ Life × months used ÷ 12" },
      { q: "Interest formula?", a: "Principal × Annual rate × Time in years" },
      { q: "Customer pays an invoice you already recorded. Entry?", a: "Dr Cash / Cr Accounts Receivable. No revenue, because it was recorded when earned." },
      { q: "Supplies used, working backward?", a: "Beginning supplies + Purchases − Ending supplies" },
      { q: "Is Accumulated Depreciation closed at year end?", a: "No. It’s a permanent contra-asset account. Only Depreciation Expense is closed." }
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
      { q: "Adjusted income before tax is $50,000 and the tax rate is 25%. Net income?", options: ["$50,000", "$12,500", "$37,500", "$62,500"], answer: 2, why: "Tax = 12,500; 50,000 − 12,500 = 37,500." },
      { q: "$40,000 equipment, 4-year life, no residual, purchased July 1. Depreciation for the year ending Dec 31?", options: ["$10,000", "$5,000", "$20,000", "$3,333"], answer: 1, why: "40,000 ÷ 4 = 10,000 per year × 6/12 = 5,000." },
      { q: "$1,500 was received in advance; at year end $530 is still unearned. Revenue to recognize?", options: ["$1,500", "$530", "$970", "$2,030"], answer: 2, why: "1,500 − 530 = 970 has been earned." },
      { q: "Supplies: beginning $3,200, purchased $7,600, ending count $2,600. Supplies expense?", options: ["$8,200", "$13,400", "$7,000", "$2,600"], answer: 0, why: "3,200 + 7,600 − 2,600 = 8,200 used." },
      { q: "A $41,000, 6% loan is outstanding for 6 months at year end. Accrued interest?", options: ["$2,460", "$1,230", "$3,690", "$205"], answer: 1, why: "41,000 × 6% × 6/12 = 1,230." },
      { q: "A vehicle cost $28,590 with a 3-year life and no residual. After 2 full years, its carrying amount is…", options: ["$19,060", "$9,530", "$28,590", "$14,295"], answer: 1, why: "Accumulated depreciation = 9,530 × 2 = 19,060. Carrying amount = 28,590 − 19,060 = 9,530." }
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
