/*
 * Instructor practice sets (Practice Questions – Journal Entries / Closing Entries), made interactive.
 * They reuse the mock exam engine (assets/mock.js). `practice: true` keeps them out of the exam countdown.
 * An item with `lines: []` and a `none` note means "no entry required".
 */
(function () {
  const TOPICS_JE = [
    { id: "je", label: "General journal entries", learn: [["Ch 3 notes", "#/chapter/ch3/notes"], ["Posting animation", "#/visual#dg-posting"]] },
    { id: "notrans", label: "Spotting events that are NOT transactions", learn: [["Transaction analysis", "#/chapter/ch1/notes"]] }
  ];
  const TOPICS_CL = [
    { id: "closing", label: "The 4 closing entries", learn: [["Closing animation", "#/visual#dg-closing"], ["Ch 4 notes", "#/chapter/ch4/notes"]] },
    { id: "capital", label: "Net income / loss and ending capital", learn: [["Statement Lab", "#/statements"]] }
  ];

  window.MOCK_EXAMS = window.MOCK_EXAMS || [];

  window.MOCK_EXAMS.push({
    id: "je-practice",
    practice: true,
    title: "Journal Entry Practice Sets",
    minutes: null,
    topics: TOPICS_JE,
    accounts: [],
    intro: `<p>Your instructor’s three journal entry practice questions, rebuilt so you can enter each entry and get it graded. Choose accounts only from each company’s chart of accounts. Some events are <b>not transactions</b>: leave every line blank for “no entry”.</p>
<p class="muted">Each entry is worth 2 marks, with part marks for each correct line. Answers are saved in this browser.</p>`,
    parts: [
      {
        id: "Q1", title: "Mountain Adventure Travel Tours (May)", type: "je", marksEach: 2, topic: "je",
        note: "Mountain Adventure Travel Tours was started on May 1 by Dustin Tanner. Journalize the May transactions.",
        accounts: ["Cash", "Accounts Receivable", "Land", "Building", "Equipment", "Accounts Payable", "Notes Payable", "D. Tanner, Capital", "D. Tanner, Drawings", "Service Revenue", "Advertising Expense", "Insurance Expense", "Salaries Expense", "Interest Expense"],
        items: [
          { date: "May 1", text: "Tanner invested $70,000 cash in the business.", lines: [["Cash", 70000, null], ["D. Tanner, Capital", null, 70000]] },
          { date: "May 3", text: "Purchased a country resort for $355,000, paying $35,000 cash and signing a five-year, 4.5% note payable for the balance. The price consisted of land $225,000, building $75,000 and equipment $55,000.", lines: [["Land", 225000, null], ["Building", 75000, null], ["Equipment", 55000, null], ["Cash", null, 35000], ["Notes Payable", null, 320000]], kind: "Split the purchase price across each asset; the note is 355,000 − 35,000." },
          { date: "May 3", text: "Obtained a one-year insurance policy effective May 1 for $9,360. Paid the first month’s premium of $780.", lines: [["Insurance Expense", 780, null], ["Cash", null, 780]], kind: "Only the $780 paid is recorded. The rest hasn’t been paid or used yet." },
          { date: "May 8", text: "Paid $1,950 for advertising expenses.", lines: [["Advertising Expense", 1950, null], ["Cash", null, 1950]] },
          { date: "May 15", text: "Received $5,400 cash from customers for travel services provided.", lines: [["Cash", 5400, null], ["Service Revenue", null, 5400]], kind: "The chart of accounts uses Service Revenue." },
          { date: "May 16", text: "Paid salaries to employees, $2,600.", lines: [["Salaries Expense", 2600, null], ["Cash", null, 2600]] },
          { date: "May 20", text: "Billed Celtic Fern Ltd. $2,750 for bus tours provided. Celtic Fern paid $500 cash and agreed to pay the rest within 10 days.", lines: [["Cash", 500, null], ["Accounts Receivable", 2250, null], ["Service Revenue", null, 2750]], kind: "The full $2,750 is earned now; $2,250 is still owed." },
          { date: "May 22", text: "Hired a manager to start June 1 at a salary of $4,000 per month.", lines: [], none: "No entry: hiring someone isn’t a transaction until they work and are owed pay.", topics: ["notrans"] },
          { date: "May 29", text: "Received the balance owing from Celtic Fern Ltd. for the May 20 transaction.", lines: [["Cash", 2250, null], ["Accounts Receivable", null, 2250]], kind: "No revenue: it was recorded on May 20." },
          { date: "May 30", text: "Received $5,750 cash for travel services provided.", lines: [["Cash", 5750, null], ["Service Revenue", null, 5750]] },
          { date: "May 31", text: "Paid $6,533 on the note payable, of which $1,200 is interest expense.", lines: [["Interest Expense", 1200, null], ["Notes Payable", 5333, null], ["Cash", null, 6533]], kind: "Split the payment: interest is an expense; the rest reduces the note." },
          { date: "May 31", text: "Dustin Tanner, the owner, withdrew $1,800 cash for his personal use.", lines: [["D. Tanner, Drawings", 1800, null], ["Cash", null, 1800]] },
          { date: "May 31", text: "Paid salaries to employees, $3,800.", lines: [["Salaries Expense", 3800, null], ["Cash", null, 3800]] }
        ]
      },
      {
        id: "Q2", title: "Highland Theatre (July)", type: "je", marksEach: 2, topic: "je",
        note: "Highland Theatre is owned by Finnean Ferguson. At June 30 the ledger showed: Cash $6,000, Land $100,000, Buildings $80,000, Equipment $25,000, Accounts Payable $5,000, Mortgage Payable $125,000, F. Ferguson, Capital $81,000. Journalize the July transactions.",
        accounts: ["Cash", "Accounts Receivable", "Prepaid Film Rental", "Land", "Buildings", "Equipment", "Accounts Payable", "Mortgage Payable", "F. Ferguson, Capital", "F. Ferguson, Drawings", "Admission Revenue", "Concession Revenue", "Advertising Expense", "Film Rental Expense", "Repairs Expense", "Salaries Expense", "Interest Expense"],
        items: [
          { date: "Jul 2", text: "Paid film rental of $800 on the first movie to run in July.", lines: [["Film Rental Expense", 800, null], ["Cash", null, 800]] },
          { date: "Jul 2", text: "Paid advertising expenses, $620.", lines: [["Advertising Expense", 620, null], ["Cash", null, 620]] },
          { date: "Jul 3", text: "Ordered two additional films at $750 each.", lines: [], none: "No entry: an order isn’t a transaction. Nothing has been received or owed yet.", topics: ["notrans"] },
          { date: "Jul 5", text: "Contracted with Seibert Company to operate a concession stand. Seibert will pay 20% of gross concession receipts, monthly.", lines: [], none: "No entry: signing a contract isn’t a transaction.", topics: ["notrans"] },
          { date: "Jul 10", text: "Received $1,950 cash from admissions.", lines: [["Cash", 1950, null], ["Admission Revenue", null, 1950]] },
          { date: "Jul 11", text: "Paid $2,000 of the mortgage principal. Also paid $500 interest on the mortgage.", lines: [["Mortgage Payable", 2000, null], ["Interest Expense", 500, null], ["Cash", null, 2500]] },
          { date: "Jul 12", text: "Paid $350 cash to have the projection equipment repaired.", lines: [["Repairs Expense", 350, null], ["Cash", null, 350]] },
          { date: "Jul 16", text: "Paid $2,800 of the accounts payable.", lines: [["Accounts Payable", 2800, null], ["Cash", null, 2800]] },
          { date: "Jul 19", text: "Received one of the films ordered on July 3 and was billed $750. The film will be shown in July.", lines: [["Film Rental Expense", 750, null], ["Accounts Payable", null, 750]], kind: "Shown this month, so it’s an expense now, on account." },
          { date: "Jul 29", text: "Received $3,500 cash from customers for admissions.", lines: [["Cash", 3500, null], ["Admission Revenue", null, 3500]] },
          { date: "Jul 30", text: "Paid Finnean Ferguson $1,200 for his personal use.", lines: [["F. Ferguson, Drawings", 1200, null], ["Cash", null, 1200]] },
          { date: "Jul 30", text: "Prepaid a $700 rental on a special film to be shown in August.", lines: [["Prepaid Film Rental", 700, null], ["Cash", null, 700]], kind: "Shown next month, so it’s an asset (prepaid) for now." },
          { date: "Jul 31", text: "Paid salaries, $1,900.", lines: [["Salaries Expense", 1900, null], ["Cash", null, 1900]] },
          { date: "Jul 31", text: "Received a statement from Seibert showing gross concession receipts of $2,600 and a balance due of $520 ($2,600 × 20%) for July. Seibert paid half and will pay the rest on August 5.", lines: [["Cash", 260, null], ["Accounts Receivable", 260, null], ["Concession Revenue", null, 520]], kind: "The full 20% share ($520) is earned in July; half is still owed." }
        ]
      },
      {
        id: "Q3", title: "Nguyen Import Services (August)", type: "je", marksEach: 2, topic: "je",
        note: "Thanh Nguyen started Nguyen Import Services on August 1. Chart of accounts: 101 Cash; 112 Accounts Receivable; 126 Supplies; 151 Equipment; 201 Accounts Payable; 209 Unearned Revenue; 301 T. Nguyen, Capital; 306 T. Nguyen, Drawings; 400 Service Revenue; 610 Advertising Expense; 726 Rent Expense; 737 Utilities Expense. Journalize the August transactions.",
        accounts: ["Cash", "Accounts Receivable", "Supplies", "Equipment", "Accounts Payable", "Unearned Revenue", "T. Nguyen, Capital", "T. Nguyen, Drawings", "Service Revenue", "Advertising Expense", "Rent Expense", "Utilities Expense"],
        items: [
          { date: "Aug 1", text: "Thanh transferred $25,000 cash from his personal bank account to a bank account under the company name.", lines: [["Cash", 25000, null], ["T. Nguyen, Capital", null, 25000]] },
          { date: "Aug 1", text: "Signed a one-year rental agreement for $750 per month. Paid the first month’s rent.", lines: [["Rent Expense", 750, null], ["Cash", null, 750]], kind: "Only the month paid (and used) is recorded. Signing the agreement itself isn’t a transaction." },
          { date: "Aug 2", text: "Paid $250 for utilities for August.", lines: [["Utilities Expense", 250, null], ["Cash", null, 250]] },
          { date: "Aug 3", text: "Purchased equipment for $5,250 cash.", lines: [["Equipment", 5250, null], ["Cash", null, 5250]] },
          { date: "Aug 5", text: "Purchased $675 of supplies on account.", lines: [["Supplies", 675, null], ["Accounts Payable", null, 675]] },
          { date: "Aug 8", text: "Provided services to a client and billed them $1,270.", lines: [["Accounts Receivable", 1270, null], ["Service Revenue", null, 1270]] },
          { date: "Aug 12", text: "Paid $945 for advertising the opening of the company.", lines: [["Advertising Expense", 945, null], ["Cash", null, 945]] },
          { date: "Aug 20", text: "Provided services to a client and collected $1,320 cash.", lines: [["Cash", 1320, null], ["Service Revenue", null, 1320]] },
          { date: "Aug 24", text: "Received a $2,500 cash advance for a consulting engagement to be started in September.", lines: [["Cash", 2500, null], ["Unearned Revenue", null, 2500]], kind: "Not earned yet, so it’s a liability." },
          { date: "Aug 25", text: "Paid the balance due for the supplies purchased on August 5.", lines: [["Accounts Payable", 675, null], ["Cash", null, 675]] },
          { date: "Aug 28", text: "Received $970 cash from the client billed on August 8.", lines: [["Cash", 970, null], ["Accounts Receivable", null, 970]] },
          { date: "Aug 29", text: "Paid Thanh, the owner, $1,225 cash for his personal use.", lines: [["T. Nguyen, Drawings", 1225, null], ["Cash", null, 1225]] },
          { date: "Aug 31", text: "Received a $225 utility bill for August. It will be paid on September 1.", lines: [["Utilities Expense", 225, null], ["Accounts Payable", null, 225]], kind: "Incurred in August, so it’s an August expense even though it’s paid later." }
        ]
      }
    ],
    solutions: {}
  });

  window.MOCK_EXAMS.push({
    id: "closing-practice",
    practice: true,
    title: "Closing Entry Practice Sets",
    minutes: null,
    topics: TOPICS_CL,
    accounts: [],
    intro: `<p>Your instructor’s two closing entry questions. Each gives a <b>mixed-up list of balances</b>, just like the exam. Pick out the temporary accounts, then write the four closing entries. Watch Question 1: it has a <b>net loss</b>.</p>
<p class="muted">Permanent accounts (assets, liabilities, capital, accumulated depreciation) are never closed. Answers are saved in this browser.</p>`,
    parts: [
      {
        id: "Q1", title: "S. Strong: prepare the closing entries (Aug 31)", type: "je", marksEach: 2, topic: "closing",
        note: "Account balances (in the order given). Write the four closing entries.",
        given: { title: "S. Strong: account balances, August 31", list: [["Cash", 10900], ["Accumulated Depreciation", 5400], ["S. Strong, Capital", 31700], ["Rent Revenue", 6100], ["Depreciation Expense", 2700], ["Accounts Receivable", 6200], ["Accounts Payable", 2800], ["S. Strong, Drawings (listed as Withdrawals)", 12000], ["Salaries Expense", 37100], ["Equipment", 10600], ["Unearned Revenue", 1200], ["Service Revenue", 42400], ["Utilities Expense", 10100]] },
        accounts: ["Cash", "Accounts Receivable", "Equipment", "Accumulated Depreciation", "Accounts Payable", "Unearned Revenue", "S. Strong, Capital", "S. Strong, Drawings", "Income Summary", "Service Revenue", "Rent Revenue", "Depreciation Expense", "Salaries Expense", "Utilities Expense"],
        items: [
          { date: "1", text: "Close the revenue accounts.", lines: [["Service Revenue", 42400, null], ["Rent Revenue", 6100, null], ["Income Summary", null, 48500]] },
          { date: "2", text: "Close the expense accounts.", lines: [["Income Summary", 49900, null], ["Depreciation Expense", null, 2700], ["Salaries Expense", null, 37100], ["Utilities Expense", null, 10100]] },
          { date: "3", text: "Close Income Summary. (Compare revenues with expenses first.)", lines: [["S. Strong, Capital", 1400, null], ["Income Summary", null, 1400]], kind: "Net LOSS: 48,500 − 49,900 = −1,400. Income Summary has a debit balance, so debit Capital to close it." },
          { date: "4", text: "Close drawings.", lines: [["S. Strong, Capital", 12000, null], ["S. Strong, Drawings", null, 12000]] }
        ]
      },
      {
        id: "Q1b", title: "S. Strong: check your numbers", type: "numeric", marksEach: 1, topic: "capital",
        note: "Enter a loss as a negative number.",
        items: [
          { label: "Net income (loss) for the period", answer: -1400, topics: ["capital"] },
          { label: "S. Strong, Capital after closing", answer: 18300, topics: ["capital"], hint: "31,700 − 1,400 − 12,000" }
        ]
      },
      {
        id: "Q2", title: "J. Unser: prepare the closing entries (Dec 31)", type: "je", marksEach: 2, topic: "closing",
        note: "Account balances (in the order given). Write the four closing entries.",
        given: { title: "J. Unser: account balances, December 31", list: [["Cash", 5300], ["Accumulated Depreciation", 5600], ["J. Unser, Drawings (listed as Withdrawals)", 7000], ["Advertising Expense", 8400], ["Interest Expense", 600], ["Accounts Receivable", 10800], ["Note Payable", 15000], ["J. Unser, Capital", 13600], ["Supplies Expense", 4000], ["Supplies", 1500], ["Accounts Payable", 6100], ["Depreciation Expense", 5600], ["Prepaid Expenses", 2000], ["Service Revenue", 61000], ["Insurance Expense", 3500], ["Equipment", 27000], ["Salaries Payable", 2400], ["Salaries Expense", 28000]] },
        accounts: ["Cash", "Accounts Receivable", "Supplies", "Prepaid Expenses", "Equipment", "Accumulated Depreciation", "Accounts Payable", "Salaries Payable", "Note Payable", "J. Unser, Capital", "J. Unser, Drawings", "Income Summary", "Service Revenue", "Advertising Expense", "Depreciation Expense", "Insurance Expense", "Interest Expense", "Salaries Expense", "Supplies Expense"],
        items: [
          { date: "1", text: "Close the revenue account.", lines: [["Service Revenue", 61000, null], ["Income Summary", null, 61000]] },
          { date: "2", text: "Close the expense accounts.", lines: [["Income Summary", 50100, null], ["Advertising Expense", null, 8400], ["Depreciation Expense", null, 5600], ["Insurance Expense", null, 3500], ["Interest Expense", null, 600], ["Salaries Expense", null, 28000], ["Supplies Expense", null, 4000]] },
          { date: "3", text: "Close Income Summary.", lines: [["Income Summary", 10900, null], ["J. Unser, Capital", null, 10900]], kind: "Net income: 61,000 − 50,100 = 10,900." },
          { date: "4", text: "Close drawings.", lines: [["J. Unser, Capital", 7000, null], ["J. Unser, Drawings", null, 7000]] }
        ]
      },
      {
        id: "Q2b", title: "J. Unser: check your numbers", type: "numeric", marksEach: 1, topic: "capital",
        items: [
          { label: "Net income for the period", answer: 10900, topics: ["capital"] },
          { label: "J. Unser, Capital after closing", answer: 17500, topics: ["capital"], hint: "13,600 + 10,900 − 7,000" }
        ]
      }
    ],
    solutions: {}
  });
})();
