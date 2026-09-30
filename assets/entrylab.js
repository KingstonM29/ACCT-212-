/*
 * Entry Lab: endless journal entry and closing entry practice, modelled on the instructor's
 * Excel practice sheets (Practice Questions – Journal Entries / Closing Entries).
 * Each set is generated from a seed, always balances, and is graded by the mock exam engine (assets/mock.js).
 */
(function () {
  "use strict";
  function rng(seed) {
    let a = seed >>> 0;
    return function () { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  const n0 = (n) => Math.round(Math.abs(n)).toLocaleString("en-CA");
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const PROPS = [["Lakeside Kayak Tours", "R. Patel", "Tour Revenue"], ["Bright Smile Dental Cleaning", "J. Martin", "Service Revenue"], ["Northern Lights Cinema", "S. Kaur", "Admission Revenue"],
    ["Ridge Line Climbing Gym", "M. Dubois", "Membership Revenue"], ["Harbour Web Consulting", "A. Lee", "Consulting Revenue"], ["Prairie Paws Grooming", "K. Olsen", "Service Revenue"]];
  const CORPS = [["Cascade Adventure Tours Ltd.", "Tour Revenue"], ["Metro Print Services Inc.", "Service Revenue"], ["Starlight Theatre Ltd.", "Admission Revenue"],
    ["Evergreen Landscaping Inc.", "Service Revenue"], ["Pinnacle IT Consulting Ltd.", "Consulting Revenue"]];

  /* ---------------- journal entry sets ---------------- */
  function genJE(seed, type) {
    const r = rng(seed);
    const pick = (a) => a[Math.floor(r() * a.length)];
    const amt = (a, b, step) => { step = step || 50; return Math.max(step, Math.round((a + r() * (b - a)) / step) * step); };
    const corp = type === "corp";
    let company, owner = "", rev;
    if (corp) { const c = pick(CORPS); company = c[0]; rev = c[1]; } else { const p = pick(PROPS); company = p[0]; owner = p[1]; rev = p[2]; }
    const cap = corp ? "Common Shares" : `${owner}, Capital`;
    const draw = corp ? "Dividends Declared" : `${owner}, Drawings`;
    const who = corp ? "The company" : owner;
    const mi = Math.floor(r() * 12), month = MONTHS[mi], mon = SHORT[mi], next = MONTHS[(mi + 1) % 12];

    const opening = { fn: () => { const a = amt(20000, 90000, 1000); return { text: corp ? `Issued common shares to investors for $${n0(a)} cash.` : `${owner} invested $${n0(a)} cash to start the business.`, lines: [["Cash", a, null], [cap, null, a]] }; } };
    const T = [
      () => { const L = amt(60000, 250000, 5000), B = amt(40000, 200000, 5000), E = amt(10000, 60000, 1000), tot = L + B + E, c = amt(tot * 0.08, tot * 0.2, 1000);
        return { text: `Purchased a property for $${n0(tot)}, paying $${n0(c)} cash and signing a note payable for the rest. The price consisted of land $${n0(L)}, building $${n0(B)} and equipment $${n0(E)}.`, lines: [["Land", L, null], ["Building", B, null], ["Equipment", E, null], ["Cash", null, c], ["Notes Payable", null, tot - c]], kind: "Record each asset separately; the note is the price minus the cash paid.", compound: true }; },
      () => { const m = amt(300, 1200, 10), p = m * 12;
        return { text: `Obtained a one-year insurance policy effective ${month} 1 for $${n0(p)} and paid only the first month’s premium of $${n0(m)}.`, lines: [["Insurance Expense", m, null], ["Cash", null, m]], kind: "Only the month paid and used is recorded; the rest hasn’t been paid yet." }; },
      () => { const x = amt(500, 3000); return { text: `Prepaid $${n0(x)} for rent for ${next}.`, lines: [["Prepaid Rent", x, null], ["Cash", null, x]], kind: "It’s for next month, so it’s an asset (prepaid) for now." }; },
      () => { const e = pick([["Advertising Expense", "advertising"], ["Utilities Expense", "utilities for " + month], ["Repairs Expense", "repairs to equipment"], ["Rent Expense", "rent for " + month]]), x = amt(200, 2500);
        return { text: `Paid $${n0(x)} cash for ${e[1]}.`, lines: [[e[0], x, null], ["Cash", null, x]] }; },
      () => { const x = amt(1500, 9000); return { text: `Received $${n0(x)} cash from customers for services provided.`, lines: [["Cash", x, null], [rev, null, x]] }; },
      () => { const tot = amt(1500, 6000), c = amt(tot * 0.15, tot * 0.5); return { text: `Billed a customer $${n0(tot)} for services provided. The customer paid $${n0(c)} cash and will pay the rest within 30 days.`, lines: [["Cash", c, null], ["Accounts Receivable", tot - c, null], [rev, null, tot]], kind: "The full amount is earned now; the unpaid part is a receivable.", compound: true }; },
      () => { const x = amt(800, 5000); return { text: `Provided services to a client on account, $${n0(x)}.`, lines: [["Accounts Receivable", x, null], [rev, null, x]] }; },
      () => { const x = amt(500, 4000); return { text: `Collected $${n0(x)} from customers who were billed last month.`, lines: [["Cash", x, null], ["Accounts Receivable", null, x]], kind: "No revenue: it was recorded when the service was provided." }; },
      () => { const x = amt(2500, 6000, 100); return { text: `Hired a manager who will start on ${next} 1 at a salary of $${n0(x)} per month.`, lines: [], none: "No entry: hiring isn’t a transaction until the employee works and is owed pay.", topics: ["notrans"] }; },
      () => { const x = amt(400, 3000); return { text: `Ordered $${n0(x)} of supplies; they will be delivered next month.`, lines: [], none: "No entry: placing an order isn’t a transaction. Nothing has been received or owed yet.", topics: ["notrans"] }; },
      () => { const x = amt(1000, 8000); return { text: `Signed a contract to provide $${n0(x)} of services to a client starting next month.`, lines: [], none: "No entry: signing a contract isn’t a transaction. No service or cash has changed hands.", topics: ["notrans"] }; },
      () => { const i = amt(200, 1500, 10), p = amt(1500, 8000, 10); return { text: `Paid $${n0(i + p)} on the note payable, of which $${n0(i)} is interest.`, lines: [["Interest Expense", i, null], ["Notes Payable", p, null], ["Cash", null, i + p]], kind: "Split the payment: interest is an expense; the rest reduces the note.", compound: true }; },
      () => { const p = amt(1000, 4000, 100), i = amt(200, 900, 10); return { text: `Paid $${n0(p)} of the mortgage principal and $${n0(i)} of interest on the mortgage.`, lines: [["Mortgage Payable", p, null], ["Interest Expense", i, null], ["Cash", null, p + i]], kind: "Principal reduces the liability; interest is an expense.", compound: true }; },
      () => { const x = amt(500, 3000); return { text: corp ? `Declared and paid a cash dividend of $${n0(x)}.` : `${owner} withdrew $${n0(x)} cash for personal use.`, lines: [[draw, x, null], ["Cash", null, x]], kind: corp ? "Dividends reduce retained earnings; they are not an expense." : "Drawings reduce owner’s equity; they are not an expense." }; },
      () => { const x = amt(1200, 6000); return { text: `Paid salaries to employees, $${n0(x)}.`, lines: [["Salaries Expense", x, null], ["Cash", null, x]] }; },
      () => { const x = amt(300, 2000); return { text: `Purchased supplies on account, $${n0(x)}.`, lines: [["Supplies", x, null], ["Accounts Payable", null, x]] }; },
      () => { const x = amt(300, 2500); return { text: `Paid $${n0(x)} owed to a supplier on account.`, lines: [["Accounts Payable", x, null], ["Cash", null, x]] }; },
      () => { const x = amt(150, 900, 5); return { text: `Received a $${n0(x)} utility bill for ${month}. It will be paid next month.`, lines: [["Utilities Expense", x, null], ["Accounts Payable", null, x]], kind: "Incurred this month, so it’s this month’s expense even though it’s paid later." }; },
      () => { const x = amt(600, 4000); return { text: `Received $${n0(x)} cash in advance for services to be performed in ${next}.`, lines: [["Cash", x, null], ["Unearned Revenue", null, x]], kind: "Not earned yet, so it’s a liability." }; },
      () => { const g = amt(2000, 8000, 100), pct = pick([10, 20, 25]), d = Math.round(g * pct / 100 / 10) * 10, h = Math.round(d / 2 / 10) * 10;
        return { text: `A concession operator reports ${month} sales of $${n0(g)} and owes ${who === "The company" ? "the company" : "the business"} ${pct}% of sales ($${n0(d)}). It paid $${n0(h)} now and will pay the rest next month.`, lines: [["Cash", h, null], ["Accounts Receivable", d - h, null], ["Commission Revenue", null, d]], kind: "The full share is earned this month; the unpaid part is a receivable.", compound: true }; },
      () => { const x = amt(2000, 15000, 100); return { text: `Purchased equipment for $${n0(x)} cash.`, lines: [["Equipment", x, null], ["Cash", null, x]] }; },
      () => { const x = amt(200, 1500); return { text: `Had equipment repaired for $${n0(x)}; the repair shop will be paid next month.`, lines: [["Repairs Expense", x, null], ["Accounts Payable", null, x]] }; }
    ];
    // choose 10 distinct templates: at most 2 no-entry events, at least 2 compound entries
    const order = T.map((_, i) => i).sort(() => r() - 0.5);
    const chosen = []; let noneCount = 0;
    for (const i of order) {
      if (chosen.length >= 10) break;
      const item = T[i]();
      if (!item.lines.length) { if (noneCount >= 2) continue; noneCount++; }
      chosen.push(item);
    }
    if (chosen.filter((c) => c.compound).length < 2) { const extra = T[0](); chosen[chosen.length - 1] = extra; }
    const days = chosen.map(() => 2 + Math.floor(r() * 28)).sort((a, b) => a - b);
    const items = [Object.assign({ date: `${mon} 1` }, opening.fn())].concat(chosen.map((c, k) => Object.assign({ date: `${mon} ${days[k]}` }, c)));

    const base = ["Cash", "Accounts Receivable", "Supplies", "Prepaid Rent", "Land", "Building", "Equipment", "Accounts Payable", "Unearned Revenue", "Notes Payable", "Mortgage Payable",
      cap, draw, rev, "Commission Revenue", "Advertising Expense", "Insurance Expense", "Interest Expense", "Rent Expense", "Repairs Expense", "Salaries Expense", "Utilities Expense"];
    return { company, owner, corp, month, items, accounts: base };
  }

  /* ---------------- closing entry sets ---------------- */
  function genCL(seed, type) {
    const r = rng(seed);
    const pick = (a) => a[Math.floor(r() * a.length)];
    const amt = (a, b, step) => { step = step || 100; return Math.max(step, Math.round((a + r() * (b - a)) / step) * step); };
    const corp = type === "corp";
    let company, owner = "", revName;
    if (corp) { const c = pick(CORPS); company = c[0]; revName = c[1]; } else { const p = pick(PROPS); company = p[0]; owner = p[1]; revName = p[2]; }
    const equity = corp ? "Retained Earnings" : `${owner}, Capital`;
    const draw = corp ? "Dividends Declared" : `${owner}, Drawings`;
    const loss = r() < 0.35;
    const revs = [[revName, amt(30000, 90000)]];
    if (r() < 0.5) revs.push([pick(["Rent Revenue", "Interest Revenue", "Commission Revenue"]), amt(1000, 8000)]);
    const totRev = revs.reduce((s, x) => s + x[1], 0);
    const expNames = ["Salaries Expense", "Rent Expense", "Utilities Expense", "Advertising Expense", "Depreciation Expense", "Insurance Expense", "Supplies Expense", "Interest Expense"].sort(() => r() - 0.5).slice(0, 3 + Math.floor(r() * 4));
    const target = loss ? totRev + amt(500, totRev * 0.12) : totRev - amt(totRev * 0.08, totRev * 0.35);
    const weights = expNames.map((n) => (n === "Salaries Expense" ? 5 : 1) + r());
    const wsum = weights.reduce((a, b) => a + b, 0);
    let exps = expNames.map((n, i) => [n, Math.max(100, Math.round((target * weights[i]) / wsum / 100) * 100)]);
    const totExp = exps.reduce((s, x) => s + x[1], 0);
    const ni = totRev - totExp;
    const dist = amt(Math.max(500, Math.abs(ni) * 0.1), Math.max(1500, Math.abs(ni) * 0.5));
    let begEq = amt(10000, 60000);
    const perm = [["Accounts Receivable", amt(2000, 15000), "d"], ["Supplies", amt(300, 3000), "d"], ["Prepaid Expenses", amt(500, 4000), "d"], ["Equipment", amt(10000, 60000, 1000), "d"],
      ["Accounts Payable", amt(1000, 9000), "c"], ["Salaries Payable", amt(500, 3500), "c"], ["Unearned Revenue", amt(500, 4000), "c"]].filter(() => r() < 0.8);
    const eq = perm.find((p) => p[0] === "Equipment");
    if (eq) perm.push(["Accumulated Depreciation", Math.round(eq[1] * (0.1 + r() * 0.5) / 100) * 100, "c"]);
    if (r() < 0.6) perm.push(["Notes Payable", amt(5000, 30000, 1000), "c"]);
    const commonShares = corp ? amt(10000, 50000, 1000) : 0;
    const dr = perm.filter((p) => p[2] === "d").reduce((s, p) => s + p[1], 0) + totExp + dist;
    const cr = perm.filter((p) => p[2] === "c").reduce((s, p) => s + p[1], 0) + totRev + begEq + commonShares;
    let cash = cr - dr;
    if (cash < 2000) { const bump = 2000 - cash + amt(1000, 8000); begEq += bump; cash += bump; }
    const list = [["Cash", cash], ...perm.map((p) => [p[0], p[1]]), [equity, begEq], [draw, dist], ...revs, ...exps];
    if (corp) list.push(["Common Shares", commonShares]);
    list.sort(() => r() - 0.5);

    const items = [
      { date: "1", text: revs.length > 1 ? "Close the revenue accounts." : "Close the revenue account.", lines: [...revs.map((x) => [x[0], x[1], null]), ["Income Summary", null, totRev]] },
      { date: "2", text: "Close the expense accounts.", lines: [["Income Summary", totExp, null], ...exps.map((x) => [x[0], null, x[1]])] },
      ni >= 0
        ? { date: "3", text: "Close Income Summary. (Compare revenues with expenses first.)", lines: [["Income Summary", ni, null], [equity, null, ni]], kind: `Net income: ${n0(totRev)} − ${n0(totExp)} = ${n0(ni)}.` }
        : { date: "3", text: "Close Income Summary. (Compare revenues with expenses first.)", lines: [[equity, -ni, null], ["Income Summary", null, -ni]], kind: `Net LOSS: ${n0(totRev)} − ${n0(totExp)} = −${n0(-ni)}. Income Summary has a debit balance, so debit ${equity} to close it.` },
      { date: "4", text: corp ? "Close dividends." : "Close drawings.", lines: [[equity, dist, null], [draw, null, dist]] }
    ];
    const accounts = ["Cash", ...perm.map((p) => p[0]), ...(corp ? ["Common Shares"] : []), equity, draw, "Income Summary", ...revs.map((x) => x[0]), ...exps.map((x) => x[0])];
    return { company, corp, loss, list, items, ni, endEq: begEq + ni - dist, equity, accounts };
  }

  /* ---------------- UI ---------------- */
  function render(el) {
    const KEY = "acct212.entrylab";
    const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { return null; } };
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* ignore */ } };
    const clearAnswers = (id) => { try { localStorage.removeItem("acct212.mock." + id); } catch (e) { /* ignore */ } };
    let st = load() || { mode: "je", type: "prop", seedJE: 1001, seedCL: 2002, done: 0 };

    function mockFor() {
      if (st.mode === "je") {
        const g = genJE(st.seedJE, st.type);
        return {
          id: "entrylab-je", practice: true, title: "Entry Lab: journal entries", minutes: null, accounts: [],
          topics: [{ id: "je", label: "General journal entries", learn: [["Ch 3 notes", "#/chapter/ch3/notes"], ["Instructor sets", "#/mock/je-practice"]] }, { id: "notrans", label: "Spotting events that are NOT transactions", learn: [["Ch 1 notes", "#/chapter/ch1/notes"]] }],
          intro: `<p><b>${g.company}</b>${g.corp ? " (a corporation)" : `, a proprietorship owned by <b>${g.owner}</b>`}. Journalize the ${g.month} transactions. Some events are <b>not transactions</b>: leave every line blank for those.</p><p class="muted">Built from the same transaction types as your instructor’s journal entry sheets. Press <b>New set</b> for fresh companies and amounts.</p>`,
          parts: [{ id: "A", title: `${g.company}: ${g.month} transactions`, type: "je", marksEach: 2, topic: "je", accounts: g.accounts, items: g.items }],
          solutions: {}
        };
      }
      const g = genCL(st.seedCL, st.type);
      return {
        id: "entrylab-cl", practice: true, title: "Entry Lab: closing entries", minutes: null, accounts: [],
        topics: [{ id: "closing", label: "The 4 closing entries", learn: [["Closing animation", "#/visual#dg-closing"], ["Instructor sets", "#/mock/closing-practice"]] }, { id: "capital", label: "Net income / loss and ending equity", learn: [["Statement Lab", "#/statements"]] }],
        intro: `<p><b>${g.company}</b>${g.corp ? " (a corporation: close to Retained Earnings)" : " (a proprietorship: close to Capital)"}. The balances are in a mixed-up order like the exam. Pick out the temporary accounts and write the four closing entries.</p><p class="muted">About one set in three has a net loss. Press <b>New set</b> for a fresh list.</p>`,
        parts: [
          { id: "A", title: `${g.company}: closing entries`, type: "je", marksEach: 2, topic: "closing", accounts: g.accounts, given: { title: `${g.company}: account balances at year end`, list: g.list }, items: g.items },
          { id: "B", title: "Check your numbers", type: "numeric", marksEach: 1, topic: "capital", note: "Enter a loss as a negative number.", items: [
            { label: "Net income (loss)", answer: g.ni, topics: ["capital"] },
            { label: `${g.equity} after closing`, answer: g.endEq, topics: ["capital"] }] }
        ],
        solutions: {}
      };
    }

    function draw() {
      el.innerHTML = `<div class="sl-bar el-bar">
          <div class="seg"><button data-elmode="je" class="${st.mode === "je" ? "on" : ""}">Journal entries</button><button data-elmode="cl" class="${st.mode === "cl" ? "on" : ""}">Closing entries</button></div>
          <div class="seg"><button data-type="prop" class="${st.type === "prop" ? "on" : ""}">Proprietorship</button><button data-type="corp" class="${st.type === "corp" ? "on" : ""}">Corporation</button></div>
          <button class="btn primary" data-act="new">New set ↻</button>
          <span class="muted sl-meta">Set #${st.mode === "je" ? st.seedJE : st.seedCL}</span></div>
        <div class="el-mount"></div>`;
      if (window.MockExam) window.MockExam.render(el.querySelector(".el-mount"), mockFor(), { letter: null });
    }
    el.addEventListener("click", (e) => {
      const b = e.target.closest(".el-bar [data-elmode], .el-bar [data-type], .el-bar [data-act]"); if (!b) return;
      if (b.dataset.elmode) { st.mode = b.dataset.elmode; }
      if (b.dataset.type) { st.type = b.dataset.type; clearAnswers("entrylab-je"); clearAnswers("entrylab-cl"); }
      if (b.dataset.act === "new") {
        const s = Math.floor(Math.random() * 900000) + 100000;
        if (st.mode === "je") { st.seedJE = s; clearAnswers("entrylab-je"); } else { st.seedCL = s; clearAnswers("entrylab-cl"); }
      }
      save(); draw(); el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    draw();
  }

  window.EntryLab = { render, genJE, genCL };
})();
