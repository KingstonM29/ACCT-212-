/*
 * Statement Lab: endless practice turning an adjusted trial balance into an income statement,
 * a statement of retained earnings (or owner's equity) and a classified balance sheet.
 * Every set is generated from a seed, always balances, and is graded automatically.
 */
(function () {
  "use strict";
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const n0 = (n) => Math.round(Math.abs(n)).toLocaleString("en-CA");
  const num = (s) => { const v = parseFloat(String(s == null ? "" : s).replace(/[$,\s]/g, "").replace(/^\((.*)\)$/, "-$1")); return isNaN(v) ? null : v; };

  function rng(seed) {
    let a = seed >>> 0;
    return function () { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }

  const CORPS = ["Northwind Consulting Ltd.", "Aurora Tutoring Inc.", "Summit Snow Removal Ltd.", "Riverbend Web Design Inc.", "Prairie Lens Photography Ltd.", "Maple Ridge Landscaping Inc.", "Glacier Bay Tours Ltd.", "Birchwood Event Planning Inc."];
  const PROPS = [["Shah Pet Grooming", "P. Shah"], ["Okafor Fitness Coaching", "D. Okafor"], ["Nguyen Bookkeeping", "T. Nguyen"], ["Tremblay Painting", "L. Tremblay"], ["Singh Mobile Detailing", "A. Singh"], ["Morin Music Lessons", "C. Morin"]];
  const YEAR = 2025;

  const CATS = {
    corp: [["REV", "Income statement: revenue"], ["EXP", "Income statement: expense"], ["RE", "Statement of retained earnings"], ["CA", "Balance sheet: current asset"],
      ["NCA", "Balance sheet: non-current asset"], ["CL", "Balance sheet: current liability"], ["NCL", "Balance sheet: non-current liability"], ["SE", "Balance sheet: shareholders’ equity"]],
    prop: [["REV", "Income statement: revenue"], ["EXP", "Income statement: expense"], ["RE", "Statement of owner’s equity"], ["CA", "Balance sheet: current asset"],
      ["NCA", "Balance sheet: non-current asset"], ["CL", "Balance sheet: current liability"], ["NCL", "Balance sheet: non-current liability"], ["SE", "Balance sheet: owner’s equity"]]
  };

  /* ---------- generator ---------- */
  function generate(seed, type, level) {
    const r = rng(seed);
    const pick = (arr) => arr[Math.floor(r() * arr.length)];
    const between = (a, b, step) => { step = step || 100; return Math.round((a + r() * (b - a)) / step) * step; };
    const chance = (p) => r() < p;
    const corp = type === "corp", hard = level === "hard";
    let company, owner = "";
    if (corp) company = pick(CORPS); else { const p = pick(PROPS); company = p[0]; owner = p[1]; }

    const rev = between(60000, 180000);
    const intRev = chance(hard ? 0.7 : 0.3) ? between(300, 1800) : 0;
    const A = {};
    A.ar = between(rev * 0.05, rev * 0.15); A.supplies = between(600, 3500); A.prepaid = between(1200, 6000);
    A.equip = between(30000, 120000, 1000);
    const life = between(5, 10, 1), depEq = Math.round(A.equip / life / 100) * 100, yrsEq = between(1, Math.max(1, life - 2), 1);
    A.accumEq = depEq * yrsEq;
    A.land = (hard || chance(0.35)) ? between(40000, 150000, 1000) : 0;
    A.building = hard && chance(0.8) ? between(120000, 300000, 5000) : 0;
    const depB = A.building ? Math.round(A.building / 25 / 100) * 100 : 0;
    A.accumB = A.building ? depB * between(1, 8, 1) : 0;
    A.lti = hard && chance(0.7) ? between(10000, 50000, 1000) : 0;
    A.patent = hard && chance(0.6) ? between(5000, 30000, 500) : 0;

    const L = {};
    L.ap = between(2000, 12000); L.salPay = between(500, 4000); L.unearned = between(1000, 6000);
    L.notes = chance(0.8) ? between(20000, 80000, 1000) : 0;
    const intExp = L.notes ? Math.round((L.notes * 0.06) / 10) * 10 : 0;
    L.intPay = L.notes ? Math.round((L.notes * 0.06 * between(1, 3, 1) / 12) / 10) * 10 : 0;

    const E = [];
    E.push(["Salaries Expense", between(rev * 0.28, rev * 0.4)]);
    E.push(["Rent Expense", between(rev * 0.05, rev * 0.1)]);
    E.push(["Supplies Expense", between(1000, 5000)]);
    E.push(["Insurance Expense", between(800, 3000)]);
    E.push(["Utilities Expense", between(1500, 5000)]);
    if (chance(0.6)) E.push(["Advertising Expense", between(800, 4000)]);
    E.push(["Depreciation Expense", depEq + depB]);
    if (intExp) E.push(["Interest Expense", intExp]);
    const totRev = rev + intRev;
    let expBT = E.reduce((s, e) => s + e[1], 0);
    let ibt = totRev - expBT;
    const target = Math.round(totRev * (0.08 + r() * 0.12) / 100) * 100;
    if (ibt < target) { E[0][1] -= (target - ibt); expBT -= (target - ibt); ibt = target; }
    const tax = corp ? Math.round((ibt * 0.2) / 10) * 10 : 0;
    L.taxPay = corp ? Math.round((tax * between(20, 60, 10) / 100) / 10) * 10 : 0;
    const ni = ibt - tax;
    const dist = corp ? between(ni * 0.1, ni * 0.4) : between(ni * 0.2, ni * 0.6);
    let equityBase = corp ? between(20000, 80000, 1000) : between(20000, 90000, 1000);
    const begRE = corp ? between(10000, 60000) : 0;

    const debitsNoCash = A.ar + A.supplies + A.prepaid + A.equip + A.land + A.building + A.lti + A.patent + dist + expBT + tax;
    const creditsBase = A.accumEq + A.accumB + L.ap + L.salPay + L.unearned + L.intPay + L.taxPay + L.notes + begRE + totRev;
    let cash = creditsBase + equityBase - debitsNoCash;
    if (cash < 3000) { const bump = 3000 - cash + between(2000, 15000); equityBase += bump; cash += bump; }

    const capName = corp ? "Common Shares" : `${owner}, Capital`;
    const distName = corp ? "Dividends Declared" : `${owner}, Drawings`;
    const rows = [];
    const add = (n, amt, side, cat, extra) => { if (amt) rows.push(Object.assign({ n, amt, side, cat }, extra || {})); };
    add("Cash", cash, "d", "CA");
    add("Accounts Receivable", A.ar, "d", "CA");
    add("Supplies", A.supplies, "d", "CA");
    add("Prepaid Insurance", A.prepaid, "d", "CA");
    add("Long-Term Investments", A.lti, "d", "NCA", { sec: "LTI" });
    add("Land", A.land, "d", "NCA", { sec: "PPE" });
    add("Building", A.building, "d", "NCA", { sec: "PPE", pair: "Accumulated Depreciation — Building" });
    add("Accumulated Depreciation — Building", A.accumB, "c", "NCA", { sec: "PPE", contra: true });
    add("Equipment", A.equip, "d", "NCA", { sec: "PPE", pair: "Accumulated Depreciation — Equipment" });
    add("Accumulated Depreciation — Equipment", A.accumEq, "c", "NCA", { sec: "PPE", contra: true });
    add("Patent", A.patent, "d", "NCA", { sec: "INT" });
    add("Accounts Payable", L.ap, "c", "CL");
    add("Salaries Payable", L.salPay, "c", "CL");
    add("Interest Payable", L.intPay, "c", "CL");
    add("Income Tax Payable", L.taxPay, "c", "CL");
    add("Unearned Revenue", L.unearned, "c", "CL");
    add(`Notes Payable (due ${YEAR + 3})`, L.notes, "c", "NCL");
    add(capName, equityBase, "c", corp ? "SE" : "RE");
    if (corp) add("Retained Earnings", begRE, "c", "RE");
    add(distName, dist, "d", "RE");
    add("Service Revenue", rev, "c", "REV");
    add("Interest Revenue", intRev, "c", "REV");
    E.forEach((e) => add(e[0], e[1], "d", "EXP"));
    if (corp) add("Income Tax Expense", tax, "d", "EXP", { tax: true });

    const sum = (f) => rows.filter(f).reduce((s, x) => s + (x.side === "d" ? x.amt : -x.amt), 0);
    const T = {};
    T.totalRev = totRev; T.totalExpBT = expBT; T.ibt = ibt; T.tax = tax; T.ni = ni; T.dist = dist;
    T.begEq = corp ? begRE : equityBase; T.endEq = T.begEq + ni - dist;
    T.ca = sum((x) => x.cat === "CA"); T.nca = sum((x) => x.cat === "NCA"); T.assets = T.ca + T.nca;
    T.cl = -sum((x) => x.cat === "CL"); T.ncl = -sum((x) => x.cat === "NCL"); T.liab = T.cl + T.ncl;
    T.se = corp ? equityBase + T.endEq : T.endEq; T.lse = T.liab + T.se;
    T.tbD = rows.filter((x) => x.side === "d").reduce((s, x) => s + x.amt, 0);
    T.tbC = rows.filter((x) => x.side === "c").reduce((s, x) => s + x.amt, 0);
    return { seed, type, level, corp, company, owner, capName, distName, rows, T, equityBase };
  }

  const WHY = {
    REV: "Revenues go on the income statement.",
    EXP: "Expenses (including income tax expense) go on the income statement.",
    CA: "Expected to be used up or turned into cash within a year.",
    NCA: "Long-term asset. Contra accounts like accumulated depreciation are subtracted from their asset here.",
    CL: "Due within a year.",
    NCL: "Due in more than a year.",
    SE: "Share capital stays on the balance sheet.",
    RE_corp: "The trial balance shows BEGINNING retained earnings and this year’s dividends. Both go on the statement of retained earnings; the ENDING figure moves to the balance sheet.",
    RE_prop: "The trial balance shows BEGINNING capital and this year’s drawings. Both go on the statement of owner’s equity; ending capital moves to the balance sheet."
  };

  /* ---------- model statements ---------- */
  function statements(g) {
    const { T, rows, corp } = g;
    const period = `For the Year Ended December 31, ${YEAR}`, point = `December 31, ${YEAR}`;
    const head = (title, when) => `<thead><tr><th colspan="3" class="fs-head">${esc(g.company)}<br>${title}<br><span>${when}</span></th></tr></thead>`;
    const lines = (list, indent) => list.map((x, i) => `<tr><td class="i${indent || 1}">${esc(x.n)}</td><td class="${i === list.length - 1 ? "u" : ""}">${i === 0 ? "$" : ""}${n0(x.amt)}</td><td></td></tr>`).join("");
    const revs = rows.filter((x) => x.cat === "REV"), exps = rows.filter((x) => x.cat === "EXP" && !x.tax);
    let is = `<div class="table-wrap"><table class="fs">${head("Income Statement", period)}<tbody>`;
    is += `<tr class="h"><td colspan="3">Revenues</td></tr>`;
    if (revs.length === 1) is += `<tr><td class="i1">${esc(revs[0].n)}</td><td></td><td>$${n0(revs[0].amt)}</td></tr>`;
    else is += lines(revs) + `<tr><td class="i2">Total revenues</td><td></td><td>$${n0(T.totalRev)}</td></tr>`;
    is += `<tr class="h"><td colspan="3">Expenses</td></tr>` + lines(exps) + `<tr><td class="i2">Total expenses</td><td></td><td class="u">${n0(T.totalExpBT)}</td></tr>`;
    if (corp) is += `<tr class="h"><td>Income before income tax</td><td></td><td>${n0(T.ibt)}</td></tr><tr><td>Income tax expense</td><td></td><td class="u">${n0(T.tax)}</td></tr>`;
    is += `<tr class="h"><td>Net income</td><td></td><td class="uu">$${n0(T.ni)}</td></tr></tbody></table></div>`;

    const eqTitle = corp ? "Statement of Retained Earnings" : "Statement of Owner’s Equity";
    const eqName = corp ? "Retained earnings" : g.capName.replace(", Capital", ", capital");
    const eq = `<div class="table-wrap"><table class="fs">${head(eqTitle, period)}<tbody>
      <tr><td>${esc(eqName)}, January 1</td><td></td><td>$${n0(T.begEq)}</td></tr>
      <tr><td>Add: Net income</td><td></td><td class="u">${n0(T.ni)}</td></tr>
      <tr><td></td><td></td><td>${n0(T.begEq + T.ni)}</td></tr>
      <tr><td>Less: ${corp ? "Dividends declared" : "Drawings"}</td><td></td><td class="u">${n0(T.dist)}</td></tr>
      <tr class="h"><td>${esc(eqName)}, December 31</td><td></td><td class="uu">$${n0(T.endEq)}</td></tr></tbody></table></div>
      ${corp ? "" : `<p class="muted">Assumes no additional owner investments during the year. If there were, add them after the beginning balance.</p>`}`;

    const ca = rows.filter((x) => x.cat === "CA");
    const nca = rows.filter((x) => x.cat === "NCA" && !x.contra);
    let bs = `<div class="table-wrap"><table class="fs">${head(corp ? "Statement of Financial Position" : "Balance Sheet", point)}<tbody>
      <tr class="h"><td colspan="3">Assets</td></tr><tr class="h"><td class="i1" colspan="3">Current assets</td></tr>${lines(ca, 2)}
      <tr><td class="i2">Total current assets</td><td></td><td>$${n0(T.ca)}</td></tr>`;
    const lti = nca.filter((x) => x.sec === "LTI"), ppe = nca.filter((x) => x.sec === "PPE"), intg = nca.filter((x) => x.sec === "INT");
    if (lti.length) bs += `<tr class="h"><td class="i1">Long-term investments</td><td></td><td>${n0(lti[0].amt)}</td></tr>`;
    if (ppe.length) {
      bs += `<tr class="h"><td class="i1" colspan="3">Property, plant & equipment</td></tr>`;
      let ppeTot = 0;
      ppe.forEach((x) => {
        const contra = x.pair ? rows.find((y) => y.n === x.pair) : null;
        if (contra) { bs += `<tr><td class="i2">${esc(x.n)}</td><td>${n0(x.amt)}</td><td></td></tr><tr><td class="i2">Less: ${esc(contra.n.replace(" — ", ", ").toLowerCase().replace(/^./, (c) => c.toUpperCase()))}</td><td class="u">${n0(contra.amt)}</td><td>${n0(x.amt - contra.amt)}</td></tr>`; ppeTot += x.amt - contra.amt; }
        else { bs += `<tr><td class="i2">${esc(x.n)}</td><td></td><td>${n0(x.amt)}</td></tr>`; ppeTot += x.amt; }
      });
      bs += `<tr><td class="i2">Total property, plant & equipment</td><td></td><td class="u">${n0(ppeTot)}</td></tr>`;
    }
    if (intg.length) bs += `<tr class="h"><td class="i1">Intangible assets: ${esc(intg[0].n)}</td><td></td><td class="u">${n0(intg[0].amt)}</td></tr>`;
    bs += `<tr class="h"><td>Total assets</td><td></td><td class="uu">$${n0(T.assets)}</td></tr>
      <tr class="h"><td colspan="3">Liabilities and ${corp ? "Shareholders’" : "Owner’s"} Equity</td></tr><tr class="h"><td class="i1" colspan="3">Current liabilities</td></tr>${lines(rows.filter((x) => x.cat === "CL"), 2)}
      <tr><td class="i2">Total current liabilities</td><td></td><td>$${n0(T.cl)}</td></tr>`;
    const ncl = rows.filter((x) => x.cat === "NCL");
    if (ncl.length) bs += `<tr class="h"><td class="i1" colspan="3">Non-current liabilities</td></tr><tr><td class="i2">${esc(ncl[0].n)}</td><td></td><td class="u">${n0(ncl[0].amt)}</td></tr>`;
    bs += `<tr><td class="i1">Total liabilities</td><td></td><td>${n0(T.liab)}</td></tr>`;
    if (corp) bs += `<tr class="h"><td class="i1" colspan="3">Shareholders’ equity</td></tr><tr><td class="i2">Common shares</td><td>$${n0(g.equityBase)}</td><td></td></tr>
      <tr><td class="i2">Retained earnings <span class="flag">ending, from statement 2</span></td><td class="u">${n0(T.endEq)}</td><td class="u">${n0(T.se)}</td></tr>`;
    else bs += `<tr class="h"><td class="i1" colspan="3">Owner’s equity</td></tr><tr><td class="i2">${esc(g.capName)} <span class="flag">ending, from statement 2</span></td><td></td><td class="u">${n0(T.se)}</td></tr>`;
    bs += `<tr class="h"><td>Total liabilities and ${corp ? "shareholders’" : "owner’s"} equity</td><td></td><td class="uu">$${n0(T.lse)}</td></tr></tbody></table></div>
      <p class="muted">Check: assets $${n0(T.assets)} = liabilities $${n0(T.liab)} + equity $${n0(T.se)}.</p>`;
    return { is, eq, bs };
  }

  function fields(g) {
    const T = g.T, c = g.corp;
    const f = [
      ["Income statement", [["Total revenues", T.totalRev], ["Total expenses" + (c ? " (before income tax)" : ""), T.totalExpBT]].concat(c ? [["Income before income tax", T.ibt]] : [], [["Net income", T.ni]])],
      [c ? "Statement of retained earnings" : "Statement of owner’s equity", [[c ? "Ending retained earnings" : "Ending capital", T.endEq]]],
      ["Balance sheet", [["Total current assets", T.ca], ["Total non-current assets (net of accumulated depreciation)", T.nca], ["Total assets", T.assets], ["Total current liabilities", T.cl], ["Total liabilities", T.liab], [c ? "Total shareholders’ equity" : "Total owner’s equity", T.se], ["Total liabilities + equity", T.lse]]]
    ];
    return f;
  }

  /* ---------- UI ---------- */
  function render(el, opts) {
    opts = opts || {};
    const KEY = "acct212.stmtlab";
    let st;
    try { st = JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { st = null; }
    st = st || { seed: 20251, type: "corp", level: "std", done: 0 };
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* ignore */ } };
    let g, counted = false;

    function draw() {
      g = generate(st.seed, st.type, st.level);
      counted = false;
      const cats = CATS[st.type];
      const F = fields(g);
      el.innerHTML = `<div class="sl">
        <div class="sl-bar">
          <div class="seg"><button data-type="corp" class="${st.type === "corp" ? "on" : ""}">Corporation</button><button data-type="prop" class="${st.type === "prop" ? "on" : ""}">Proprietorship</button></div>
          <div class="seg"><button data-level="std" class="${st.level === "std" ? "on" : ""}">Standard</button><button data-level="hard" class="${st.level === "hard" ? "on" : ""}">Harder</button></div>
          <button class="btn primary" data-act="new">New practice set ↻</button>
          <span class="muted sl-meta">Set #${st.seed} · ${st.done} completed</span></div>
        <section class="card">
          <div class="mp-head"><h2>${esc(g.company)}</h2><span class="tag">Adjusted trial balance · Dec 31, ${YEAR}</span></div>
          <p class="muted">${g.corp ? "A corporation: use a statement of retained earnings." : `A proprietorship owned by ${esc(g.owner)}: use a statement of owner’s equity. No income tax.`} Step 1: choose where each account goes.</p>
          <div class="table-wrap"><table class="je sl-tb"><thead><tr><th>Account</th><th class="num">Debit</th><th class="num">Credit</th><th>Goes on…</th></tr></thead><tbody>
            ${g.rows.map((x, i) => `<tr data-i="${i}"><td>${esc(x.n)}</td><td class="num d">${x.side === "d" ? n0(x.amt) : ""}</td><td class="num c">${x.side === "c" ? n0(x.amt) : ""}</td>
              <td><select id="sl-${i}" aria-label="Where does ${esc(x.n)} go?"><option value="">Choose…</option>${cats.map((c) => `<option value="${c[0]}">${esc(c[1])}</option>`).join("")}</select><div class="sl-fb"></div></td></tr>`).join("")}
            <tr class="tot"><td>Totals</td><td class="num">$${n0(g.T.tbD)}</td><td class="num">$${n0(g.T.tbC)}</td><td></td></tr></tbody></table></div>
          <div class="mp-foot"><button class="btn primary" data-act="check1">Check step 1</button><button class="btn" data-act="fill1">Show answers</button><span class="mp-score s1"></span></div>
        </section>
        <section class="card">
          <div class="mp-head"><h2>Step 2 · Prepare the statements</h2><span class="tag">3 statements</span></div>
          <p class="muted">On paper, prepare the income statement → ${g.corp ? "statement of retained earnings" : "statement of owner’s equity"} → classified ${g.corp ? "statement of financial position" : "balance sheet"}, in that order. Then enter your totals.</p>
          ${F.map((grp, gi) => `<h4>${gi + 1}. ${esc(grp[0])}</h4><div class="nq-list">${grp[1].map((f, fi) => `<div class="nq" data-k="${gi}-${fi}"><label for="sl2-${gi}-${fi}">${esc(f[0])}</label><div class="nq-in"><span>$</span><input id="sl2-${gi}-${fi}" inputmode="decimal" placeholder="0"></div><span class="nq-fb"></span></div>`).join("")}</div>`).join("")}
          <div class="mp-foot"><button class="btn primary" data-act="check2">Check step 2</button><button class="btn" data-act="sol">Show model statements</button><span class="mp-score s2"></span></div>
          <div class="sl-sol" hidden></div>
        </section></div>`;
    }

    function check1(fill) {
      let right = 0;
      g.rows.forEach((x, i) => {
        const sel = el.querySelector(`#sl-${i}`), fb = sel.parentElement.querySelector(".sl-fb");
        if (fill) sel.value = x.cat;
        const ok = sel.value === x.cat;
        if (ok) right++;
        sel.classList.toggle("bad", !ok); sel.classList.toggle("good", ok);
        const why = x.cat === "RE" ? WHY[g.corp ? "RE_corp" : "RE_prop"] : x.contra ? "Contra asset: subtract it from its asset in the PP&E section. It is not a liability." : x.tax ? "Income tax expense goes on the income statement, after “income before income tax”." : WHY[x.cat];
        fb.innerHTML = ok ? (x.cat === "RE" || x.contra || x.tax || fill ? `<span class="muted">${esc(why)}</span>` : "") : `<span class="no">✗</span> <span class="muted">${esc(CATS[st.type].find((c) => c[0] === x.cat)[1])}. ${esc(why)}</span>`;
      });
      el.querySelector(".s1").innerHTML = `<b>${right} / ${g.rows.length}</b>`;
    }
    function check2() {
      const F = fields(g); let right = 0, total = 0;
      F.forEach((grp, gi) => grp[1].forEach((f, fi) => {
        total++;
        const row = el.querySelector(`.nq[data-k="${gi}-${fi}"]`), v = num(row.querySelector("input").value), ok = v != null && Math.abs(v - f[1]) <= 1;
        if (ok) right++;
        row.classList.toggle("right", ok); row.classList.toggle("wrong", !ok);
        row.querySelector(".nq-fb").innerHTML = ok ? `<span class="ok">✓</span>` : `<span class="no">$${n0(f[1])}</span>`;
      }));
      el.querySelector(".s2").innerHTML = `<b>${right} / ${total}</b>${right === total ? ` <span class="ok">All correct!</span>` : ""}`;
      if (!counted && right === total) { counted = true; st.done++; save(); el.querySelector(".sl-meta").textContent = `Set #${st.seed} · ${st.done} completed`; }
      if (right < total) {
        const hints = [];
        const T = g.T;
        const val = (gi, fi) => num(el.querySelector(`#sl2-${gi}-${fi}`).value);
        const endIdx = [1, 0];
        const endV = val(endIdx[0], endIdx[1]);
        if (endV != null && Math.abs(endV - T.begEq) <= 1) hints.push(`Your ending ${g.corp ? "retained earnings" : "capital"} equals the trial balance figure. That’s the <b>beginning</b> balance. Add net income and subtract ${g.corp ? "dividends" : "drawings"}.`);
        const niV = val(0, g.corp ? 3 : 2);
        if (niV != null && Math.abs(niV - (T.ni - T.dist)) <= 1) hints.push(`Net income looks like it has ${g.corp ? "dividends" : "drawings"} subtracted. They never go on the income statement.`);
        const ncaV = val(2, 1), grossNCA = g.rows.filter((x) => x.cat === "NCA" && !x.contra).reduce((s, x) => s + x.amt, 0);
        if (ncaV != null && Math.abs(ncaV - grossNCA) <= 1 && grossNCA !== T.nca) hints.push("Non-current assets must be shown <b>net</b>: subtract accumulated depreciation.");
        const assetsV = val(2, 2), lseV = val(2, 6);
        if (assetsV != null && lseV != null && Math.abs(assetsV - lseV) > 1) hints.push("Your total assets don’t equal total liabilities + equity. The usual culprit is using beginning instead of ending retained earnings/capital.");
        const hbox = el.querySelector(".sl-hints") || (() => { const d = document.createElement("div"); d.className = "callout warn sl-hints"; el.querySelectorAll("section")[1].querySelector(".mp-foot").after(d); return d; })();
        hbox.innerHTML = hints.length ? `<b>Hints</b><ul>${hints.map((h) => `<li>${h}</li>`).join("")}</ul>` : `<b>Tip:</b> compare your totals with the model statements to find where the difference starts.`;
      } else { const hb = el.querySelector(".sl-hints"); if (hb) hb.remove(); }
    }
    function showSol(btn) {
      const box = el.querySelector(".sl-sol");
      box.hidden = !box.hidden;
      btn.textContent = box.hidden ? "Show model statements" : "Hide model statements";
      if (!box.hidden) { const s = statements(g); box.innerHTML = `<div class="sl-sols"><div>${s.is}</div><div>${s.eq}</div></div>${s.bs}`; }
    }

    el.addEventListener("click", (e) => {
      const b = e.target.closest("[data-act], [data-type], [data-level]"); if (!b) return;
      if (b.dataset.type) { st.type = b.dataset.type; save(); draw(); return; }
      if (b.dataset.level) { st.level = b.dataset.level; save(); draw(); return; }
      const a = b.dataset.act;
      if (a === "new") { st.seed = Math.floor(Math.random() * 90000) + 10000; save(); draw(); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
      if (a === "check1") check1(false);
      if (a === "fill1") check1(true);
      if (a === "check2") check2();
      if (a === "sol") showSol(b);
    });
    draw();
  }

  window.StatementLab = { render, generate, statements };
})();
