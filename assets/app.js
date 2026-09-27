/* ACCT 212 study guide — single-page app. No build step: edit data/*.js to change content. */
(function () {
  "use strict";

  const CH = (window.CHAPTERS || []).slice().sort((a, b) => a.order - b.order);
  const COURSE = window.COURSE || { events: [] };
  const app = document.getElementById("app");
  const byId = (id) => CH.find((c) => c.id === id);

  /* ---------- per-viewer storage (progress, theme) ---------- */
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem("acct212." + key); return v ? JSON.parse(v) : fallback; }
      catch (e) { return fallback; }
    },
    set(key, val) { try { localStorage.setItem("acct212." + key, JSON.stringify(val)); } catch (e) { /* ignore */ } }
  };
  const progress = () => store.get("progress", {});
  function setProgress(id, patch) {
    const p = progress(); p[id] = Object.assign({}, p[id], patch); store.set("progress", p); renderNav();
  }

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const money = (n) => (n == null || n === "" ? "" : Number(n).toLocaleString("en-CA"));
  const strip = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function parseDate(ev) {
    const [y, m, d] = ev.date.split("-").map(Number);
    const [hh, mm] = (ev.time || "00:00").split(":").map(Number);
    return new Date(y, m - 1, d, hh, mm);
  }
  const events = (COURSE.events || []).map((e) => Object.assign({}, e, { when: parseDate(e) })).sort((a, b) => a.when - b.when);
  const startOfToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const upcoming = () => events.filter((e) => e.when >= startOfToday());
  const chLabel = (c) => `Ch ${c.number}`;

  function renderJE(entries) {
    let rows = "";
    entries.forEach((e) => {
      if (e.none) {
        rows += `<tr class="first"><td class="date">${esc(e.date || "")}</td><td colspan="3"><i>${esc(e.none)}</i></td></tr>`;
        if (e.memo) rows += `<tr class="memo"><td></td><td colspan="3">${esc(e.memo)}</td></tr>`;
        return;
      }
      e.lines.forEach((l, i) => {
        const isCr = l[1] == null;
        rows += `<tr class="${i === 0 ? "first" : ""}"><td class="date">${i === 0 ? esc(e.date || "") : ""}</td>
          <td class="${isCr ? "credit-acct" : ""}">${esc(l[0])}</td>
          <td class="num d">${money(l[1])}</td><td class="num c">${money(l[2])}</td></tr>`;
      });
      if (e.memo) rows += `<tr class="memo"><td></td><td colspan="3">${esc(e.memo)}</td></tr>`;
    });
    return `<div class="table-wrap"><table class="je"><thead><tr><th>Date</th><th>Account</th><th class="num">Debit</th><th class="num">Credit</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function renderTB(tb) {
    let dr = 0, cr = 0;
    const rows = tb.rows.map((r) => { dr += r[1] || 0; cr += r[2] || 0;
      return `<tr><td>${esc(r[0])}</td><td class="num d">${r[1] != null ? money(r[1]) : ""}</td><td class="num c">${r[2] != null ? money(r[2]) : ""}</td></tr>`; }).join("");
    return `<div class="table-wrap"><table class="je"><thead><tr><th>${esc(tb.title)}</th><th class="num">Debit</th><th class="num">Credit</th></tr></thead>
      <tbody>${rows}<tr class="tot"><td>Totals ${dr === cr ? "✓ balanced" : "✗ not balanced"}</td><td class="num">$${money(dr)}</td><td class="num">$${money(cr)}</td></tr></tbody></table></div>`;
  }

  /* ---------- navigation chrome ---------- */
  function renderNav() {
    const p = progress();
    document.getElementById("navChapters").innerHTML = CH.map((c) =>
      `<a href="#/chapter/${c.id}" data-ch="${c.id}"><span class="dot ${p[c.id] && p[c.id].read ? "done" : ""}"></span><span>${chLabel(c)} · ${esc(c.title)}</span></a>`).join("");
    highlightNav();
  }
  function highlightNav() {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    const route = parts[0] || "home";
    document.querySelectorAll("#nav > a").forEach((a) => a.classList.toggle("active", a.dataset.route === route || (route === "chapter" && a.dataset.route === "notes")));
    document.querySelectorAll(".nav-chapters a").forEach((a) => a.classList.toggle("active", route === "chapter" && a.dataset.ch === parts[1]));
  }

  /* ---------- views ---------- */
  function viewHome() {
    const p = progress();
    const read = CH.filter((c) => p[c.id] && p[c.id].read).length;
    const pct = CH.length ? Math.round((read / CH.length) * 100) : 0;
    const scores = CH.map((c) => p[c.id] && p[c.id].best).filter((x) => x != null);
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
    const nextExam = upcoming().find((e) => e.type === "exam");
    const next3 = upcoming().slice(0, 3);
    const nextUp = CH.find((c) => !(p[c.id] && p[c.id].read)) || CH[0];

    let examCard;
    if (nextExam) {
      const days = Math.ceil((nextExam.when - startOfToday()) / 86400000);
      const covers = (nextExam.covers || []).map(byId).filter(Boolean);
      examCard = `<div class="eyebrow">Next exam</div><h2>${esc(nextExam.title)}</h2>
        <div class="countdown"><span class="big">${days}</span><span class="unit">day${days === 1 ? "" : "s"} away · ${nextExam.when.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" })}${nextExam.time ? " at " + esc(nextExam.time) : ""}</span></div>
        ${nextExam.location ? `<p class="muted">📍 ${esc(nextExam.location)}${nextExam.weight ? " · worth " + esc(nextExam.weight) : ""}</p>` : ""}
        ${covers.length ? `<div class="chips">${covers.map((c) => `<a class="chip" href="#/chapter/${c.id}">${chLabel(c)}</a>`).join("")}</div>` : ""}
        <div class="btn-row"><a class="btn primary" href="#/overview">Review overall notes</a><a class="btn" href="#/practice">Practice</a></div>`;
    } else {
      examCard = `<div class="eyebrow">Next exam</div><h2>Midterm 1</h2>
        <p class="muted">Exam dates haven’t been added yet — they’ll appear here with a countdown once the course outline is loaded into <code>data/calendar.js</code>.</p>
        <p>Current Midterm 1 material: ${CH.filter((c) => c.exam === "Midterm 1").map((c) => `<a href="#/chapter/${c.id}">${chLabel(c)}</a>`).join(", ")}.</p>
        <div class="btn-row"><a class="btn primary" href="#/overview">Review overall notes</a><a class="btn" href="#/calendar">Calendar</a></div>`;
    }

    return `
      <div class="page-head"><div class="eyebrow">${esc(COURSE.school || "")} · ${esc(COURSE.term || "")}</div>
        <h1>${esc(COURSE.code || "ACCT 212")} Study Guide</h1>
        <p>Lecture notes, one-page summaries, worked examples and practice for ${esc(COURSE.name || "Financial Accounting")}. Chapters are listed in the order they’re taught in class.</p></div>
      <div class="dash-top">
        <div class="card">${examCard}</div>
        <div class="card"><div class="eyebrow">Your progress</div>
          <div class="progress-wrap"><div class="ring" style="--p:${pct}"><b>${pct}%</b></div>
            <div class="stat-list"><span><b>${read}/${CH.length}</b> chapters reviewed</span>
              <span>Quiz average: <b>${avg == null ? "—" : avg + "%"}</b></span>
              <span class="muted">Saved in this browser only.</span></div></div>
          <div class="btn-row" style="margin-top:14px"><a class="btn primary" href="#/chapter/${nextUp.id}">Continue: ${chLabel(nextUp)}</a></div>
        </div>
      </div>
      <div class="section-title"><h2>Chapters</h2><span class="muted">In class order</span></div>
      <div class="chapter-grid">${CH.map((c) => chapterCard(c, p)).join("")}</div>
      <div class="section-title"><h2>Study tools</h2></div>
      <div class="quick">
        <a class="card" href="#/overview"><h3>Overall notes</h3><p>Every chapter’s key points, formulas and rules on one page.</p></a>
        <a class="card" href="#/practice?mode=drill"><h3>Debit / credit drill</h3><p>Rapid-fire: which side increases this account?</p></a>
        <a class="card" href="#/practice?mode=quiz"><h3>Practice quiz</h3><p>Multiple choice with explanations.</p></a>
        <a class="card" href="#/practice?mode=cards"><h3>Flashcards</h3><p>Terms and formulas, tap to flip.</p></a>
      </div>
      <div class="section-title"><h2>Coming up</h2><a href="#/calendar">Full calendar →</a></div>
      ${next3.length ? `<div class="event-list">${next3.map(eventRow).join("")}</div>` : `<div class="card empty"><p>No dates yet — add them from the course outline in <code>data/calendar.js</code>.</p></div>`}
    `;
  }

  function chapterCard(c, p) {
    const s = p[c.id] || {};
    return `<a class="card ch-card" href="#/chapter/${c.id}">
      <span class="num">CHAPTER ${c.number} · class ${c.order}</span><h3>${esc(c.title)}</h3><p>${esc(c.blurb || "")}</p>
      <div class="meta">${c.exam ? `<span class="tag exam">${esc(c.exam)}</span>` : ""}${s.read ? `<span class="tag done">Reviewed</span>` : ""}${s.best != null ? `<span class="tag">Quiz best ${s.best}%</span>` : ""}</div></a>`;
  }

  function viewNotesIndex() {
    const p = progress();
    return `<div class="page-head"><div class="eyebrow">Chapter notes</div><h1>All chapters</h1>
      <p>Each chapter has a <b>quick summary</b>, the <b>full lecture notes</b>, <b>worked examples</b> with solutions and <b>practice</b>. Want everything at once? Use <a href="#/overview">Overall notes</a>.</p></div>
      <div class="chapter-grid">${CH.map((c) => chapterCard(c, p)).join("")}</div>`;
  }

  function viewChapter(id, tab) {
    const c = byId(id);
    if (!c) return viewNotFound();
    tab = tab || "summary";
    const i = CH.indexOf(c), prev = CH[i - 1], next = CH[i + 1];
    const s = progress()[c.id] || {};
    const tabs = [["summary", "Quick summary"], ["notes", "Full notes"], ["examples", "Worked examples"], ["practice", "Practice"]];
    let body = "";
    if (tab === "summary") {
      body = `<ul class="summary-list">${(c.summary || []).map((x) => `<li>${x}</li>`).join("")}</ul>
        ${c.terms && c.terms.length ? `<h2 style="margin-top:28px">Key terms</h2><div class="terms">${c.terms.map((t) => `<div><b>${esc(t.term)}</b>${esc(t.def)}</div>`).join("")}</div>` : ""}`;
    } else if (tab === "notes") {
      body = `<div class="btn-row" style="margin-bottom:12px"><button class="btn" data-act="expand">Expand all</button><button class="btn" data-act="collapse">Collapse all</button></div>
        ${(c.sections || []).map((sec, k) => `<details class="note" ${k < 2 ? "open" : ""}><summary>${esc(sec.title)}</summary><div class="body">${sec.html}</div></details>`).join("")}`;
    } else if (tab === "examples") {
      body = (c.examples || []).map((ex, k) => renderExample(c, ex, k)).join("") || `<p class="muted">No worked examples yet.</p>`;
    } else if (tab === "practice") {
      body = `<div id="practiceMount"></div>`;
    }
    return `<div class="page-head"><div class="eyebrow">Chapter ${c.number} · taught ${ordinal(c.order)}${c.exam ? " · " + esc(c.exam) : ""}</div>
      <h1>${esc(c.title)}</h1><p>${esc(c.blurb || "")}</p>
      <div class="btn-row"><button class="btn ${s.read ? "" : "primary"}" data-act="toggle-read" data-id="${c.id}">${s.read ? "✓ Reviewed" : "Mark as reviewed"}</button>
      <span class="muted" style="align-self:center">Source: ${esc(c.deck || "")}</span></div></div>
      <div class="tabs">${tabs.map(([k, l]) => `<a href="#/chapter/${c.id}/${k}" class="${tab === k ? "active" : ""}">${l}</a>`).join("")}</div>
      ${body}
      <div class="ch-foot">${prev ? `<a class="btn" href="#/chapter/${prev.id}">← ${chLabel(prev)}: ${esc(prev.title)}</a>` : "<span></span>"}
        ${next ? `<a class="btn" href="#/chapter/${next.id}">${chLabel(next)}: ${esc(next.title)} →</a>` : ""}</div>`;
  }
  const ordinal = (n) => n + (["th", "st", "nd", "rd"][(n % 100 - 20) % 10] || ["th", "st", "nd", "rd"][n % 100] || "th");

  function renderExample(c, ex, k) {
    const uid = `${c.id}-ex${k}`;
    if (ex.interactive === "equation") {
      return `<div class="card example"><h3>${esc(ex.title)}</h3><div class="prompt">${ex.prompt}</div><div data-equation="${uid}"></div></div>`;
    }
    const steps = (ex.steps || []).map((st) => `<div class="step-label">${esc(st.label)}</div>
      ${st.html || ""}${st.entries ? renderJE(st.entries) : ""}${st.tb ? renderTB(st.tb) : ""}${st.after ? `<p class="muted">${st.after}</p>` : ""}`).join("");
    return `<div class="card example"><h3>${esc(ex.title)}</h3><div class="prompt">${ex.prompt}</div>
      <button class="btn primary reveal-btn" data-act="reveal" data-target="${uid}">Show solution</button>
      <div id="${uid}" hidden>${steps}</div></div>`;
  }

  function mountEquation(el, ex) {
    const cols = ex.columns;
    const valueCols = cols.filter((x) => x !== "|");
    let step = 0;
    const draw = () => {
      const totals = valueCols.map(() => 0);
      ex.rows.slice(0, step).forEach((r) => r.v.forEach((v, i) => (totals[i] += v)));
      // Softbyte layout: 4 asset columns, then liabilities, then equity
      const assets = totals.slice(0, 4).reduce((a, b) => a + b, 0);
      const liab = totals[4], eq = totals[5] + totals[6];
      let hs = 0;
      const head = `<tr><th>Transaction</th>${cols.map((cName) => cName === "|" ? `<th class="sep">${++hs === 1 ? "=" : "+"}</th>` : `<th>${esc(cName)}</th>`).join("")}</tr>`;
      const rowHtml = ex.rows.map((r, idx) => {
        let vi = 0, si = 0;
        const cells = cols.map((cName) => {
          if (cName === "|") { si++; return `<td class="sep">${si === 1 ? "=" : "+"}</td>`; }
          const v = r.v[vi++];
          return `<td class="${v > 0 ? "pos" : v < 0 ? "neg" : ""}">${v ? (v > 0 ? "+" : "−") + money(Math.abs(v)) : ""}</td>`;
        }).join("");
        return `<tr class="${idx >= step ? "hidden" : ""} ${idx === step - 1 ? "current" : ""}"><td>${esc(r.t)}${r.note ? `<span class="eq-note">${esc(r.note)}</span>` : ""}</td>${cells}</tr>`;
      }).join("");
      let vi = 0, si = 0;
      const totCells = cols.map((cName) => { if (cName === "|") { si++; return `<td class="sep">${si === 1 ? "=" : "+"}</td>`; } return `<td>$${money(totals[vi++])}</td>`; }).join("");
      el.innerHTML = `
        <div class="btn-row" style="margin-bottom:10px">
          <button class="btn" data-eq="prev" ${step === 0 ? "disabled" : ""}>← Back</button>
          <button class="btn primary" data-eq="next" ${step === ex.rows.length ? "disabled" : ""}>${step === 0 ? "Start" : "Next transaction"} →</button>
          <button class="btn" data-eq="all">Show all</button>
          <span class="muted" style="align-self:center">${step}/${ex.rows.length}</span></div>
        ${step > 0 ? `<div class="balance-bar"><span class="side">Assets $${money(assets)}</span>=<span class="side">Liabilities $${money(liab)}</span>+<span class="side">Equity $${money(eq)}</span><span class="${assets === liab + eq ? "ok" : ""}">${assets === liab + eq ? "✓ balanced" : "✗"}</span></div>` : `<p class="muted">Press <b>Start</b> and try to predict each effect before revealing it.</p>`}
        <div class="table-wrap"><table class="eq-table"><thead>${head}</thead><tbody>${rowHtml}
        ${step > 0 ? `<tr class="totals"><td>Balance</td>${totCells}</tr>` : ""}</tbody></table></div>
        ${step === ex.rows.length && ex.takeaway ? `<div class="callout tip">${esc(ex.takeaway)}</div>` : ""}`;
    };
    el.addEventListener("click", (e) => {
      const b = e.target.closest("[data-eq]"); if (!b) return;
      const a = b.dataset.eq;
      if (a === "next") step = Math.min(ex.rows.length, step + 1);
      if (a === "prev") step = Math.max(0, step - 1);
      if (a === "all") step = ex.rows.length;
      draw();
    });
    draw();
  }

  function viewOverview() {
    return `<div class="page-head"><div class="eyebrow">Overall notes</div><h1>Everything on one page</h1>
      <p>The big picture for the whole course so far — core rules first, then every chapter’s key points in class order. Great for the night before an exam. Use your browser’s print to save a PDF.</p>
      <div class="btn-row"><button class="btn" onclick="window.print()">Print / save as PDF</button></div></div>

      <div class="card"><h2>The accounting equation</h2>
        <div class="formula">Assets = Liabilities + Share Capital + Retained Earnings</div>
        <div class="formula small">Retained Earnings = Beginning RE + Revenues − Expenses − Dividends</div>
        <p class="muted">Proprietorship version: Assets = Liabilities + Owner’s Capital − Drawings + Revenues − Expenses</p></div>

      <div class="card"><h2>Debit & credit rules</h2>
        <div class="table-wrap"><table class="rules"><thead><tr><th>Account</th><th>Increase</th><th>Decrease</th><th>Normal balance</th></tr></thead><tbody>
        <tr><td>Assets</td><td class="dr">Debit</td><td class="cr">Credit</td><td class="dr">Debit</td></tr>
        <tr><td>Liabilities</td><td class="cr">Credit</td><td class="dr">Debit</td><td class="cr">Credit</td></tr>
        <tr><td>Share capital / Owner’s capital</td><td class="cr">Credit</td><td class="dr">Debit</td><td class="cr">Credit</td></tr>
        <tr><td>Retained earnings</td><td class="cr">Credit</td><td class="dr">Debit</td><td class="cr">Credit</td></tr>
        <tr><td>Dividends / Drawings</td><td class="dr">Debit</td><td class="cr">Credit</td><td class="dr">Debit</td></tr>
        <tr><td>Revenues</td><td class="cr">Credit</td><td class="dr">Debit</td><td class="cr">Credit</td></tr>
        <tr><td>Expenses (incl. COGS)</td><td class="dr">Debit</td><td class="cr">Credit</td><td class="dr">Debit</td></tr>
        <tr><td>Contra accounts (Accum. Depreciation, Sales Returns, Sales Discounts)</td><td colspan="3">Opposite of the account they reduce</td></tr>
        </tbody></table></div>
        <div class="callout tip"><b>DEALER:</b> Dividends, Expenses, Assets → debit. Liabilities, Equity, Revenues → credit.</div></div>

      <div class="card"><h2>The accounting cycle</h2>
        <ol class="cycle"><li>Analyze transactions</li><li>Journalize</li><li>Post</li><li>Unadjusted trial balance</li><li>Adjust</li><li>Adjusted trial balance</li><li>Prepare statements</li><li>Close</li><li>Post-closing trial balance</li></ol></div>

      <div class="card"><h2>Financial statements (in order)</h2>
        <ol class="flow"><li><b>Income Statement</b><span>Revenues − Expenses = Net Income</span></li>
        <li><b>Statement of Retained Earnings</b><span>Beginning RE + Net Income − Dividends = Ending RE</span></li>
        <li><b>Statement of Financial Position</b><span>Assets = Liabilities + Equity (at a point in time)</span></li>
        <li><b>Statement of Cash Flows</b><span>± Operating ± Investing ± Financing = Change in cash</span></li></ol>
        <p class="muted">Merchandiser (multi-step): Net sales − COGS = Gross profit − Operating expenses = Profit from operations ± Non-operating items = Profit</p></div>

      <div class="card"><h2>Adjusting entries cheat sheet</h2>
        <div class="table-wrap"><table><thead><tr><th>Type</th><th>Adjusting entry</th><th>If you forget it…</th></tr></thead><tbody>
        <tr><td>Prepaid expense used up</td><td>Dr Expense / Cr Prepaid</td><td>Expenses ↓, NI ↑, assets ↑</td></tr>
        <tr><td>Depreciation</td><td>Dr Depreciation Exp / Cr Accum. Depreciation</td><td>Expenses ↓, NI ↑, assets ↑</td></tr>
        <tr><td>Unearned revenue earned</td><td>Dr Unearned Revenue / Cr Revenue</td><td>Revenue ↓, NI ↓, liabilities ↑</td></tr>
        <tr><td>Accrued expense</td><td>Dr Expense / Cr Payable</td><td>Expenses ↓, NI ↑, liabilities ↓</td></tr>
        <tr><td>Accrued revenue</td><td>Dr Receivable / Cr Revenue</td><td>Revenue ↓, NI ↓, assets ↓</td></tr>
        <tr><td>Income tax</td><td>Dr Income Tax Exp / Cr Income Tax Payable</td><td>Calculate last: adjusted income × rate</td></tr>
        </tbody></table></div>
        <p><b>Never</b> Cash in an adjusting entry. <b>Closing:</b> revenues → Income Summary → expenses → Income Summary → Retained Earnings → close Dividends to RE.</p></div>

      <div class="card"><h2>Formula sheet</h2>
        <div class="table-wrap"><table><tbody>
        <tr><td>Straight-line depreciation</td><td>(Cost − Residual value) ÷ Useful life</td></tr>
        <tr><td>Carrying amount</td><td>Cost − Accumulated depreciation</td></tr>
        <tr><td>Working capital</td><td>Current assets − Current liabilities</td></tr>
        <tr><td>Current ratio</td><td>Current assets ÷ Current liabilities</td></tr>
        <tr><td>Debt to total assets</td><td>Total liabilities ÷ Total assets</td></tr>
        <tr><td>Net sales</td><td>Sales − Sales returns & allowances − Sales discounts</td></tr>
        <tr><td>Gross profit</td><td>Net sales − COGS</td></tr>
        <tr><td>Gross profit %</td><td>(Net sales − COGS) ÷ Net sales × 100</td></tr>
        <tr><td>Profit margin</td><td>Profit ÷ Net sales</td></tr>
        <tr><td>COGS (periodic)</td><td>Beginning inventory + Purchases − Ending inventory</td></tr>
        <tr><td>Purchase discount (2/10, n/30)</td><td>2% off if paid within 10 days, otherwise full amount in 30</td></tr>
        </tbody></table></div></div>

      <div class="section-title"><h2>Chapter by chapter</h2></div>
      ${CH.map((c) => `<div class="card"><div class="eyebrow">Chapter ${c.number} · taught ${ordinal(c.order)}</div>
        <h2><a href="#/chapter/${c.id}">${esc(c.title)}</a></h2>
        <ul>${(c.summary || []).map((x) => `<li>${x}</li>`).join("")}</ul>
        <div class="btn-row"><a class="btn" href="#/chapter/${c.id}/notes">Full notes</a><a class="btn" href="#/chapter/${c.id}/examples">Worked examples</a></div></div>`).join("")}`;
  }

  /* ---------- practice ---------- */
  const DRILL = [
    ["Cash", "A"], ["Accounts Receivable", "A"], ["Supplies", "A"], ["Prepaid Insurance", "A"], ["Equipment", "A"], ["Merchandise Inventory", "A"], ["Land", "A"], ["Notes Receivable", "A"],
    ["Accounts Payable", "L"], ["Notes Payable", "L"], ["Unearned Revenue", "L"], ["Salaries Payable", "L"], ["Income Tax Payable", "L"], ["Interest Payable", "L"], ["Dividends Payable", "L"],
    ["Common Shares", "E"], ["Retained Earnings", "E"], ["Owner’s Capital", "E"],
    ["Dividends Declared", "D"], ["Owner’s Drawings", "D"],
    ["Service Revenue", "R"], ["Sales", "R"], ["Interest Revenue", "R"],
    ["Rent Expense", "X"], ["Salaries Expense", "X"], ["Depreciation Expense", "X"], ["Cost of Goods Sold", "X"], ["Insurance Expense", "X"], ["Freight Out", "X"], ["Income Tax Expense", "X"],
    ["Accumulated Depreciation", "CA"], ["Sales Returns & Allowances", "CR"], ["Sales Discounts", "CR"]
  ];
  const TYPE_NAME = { A: "asset", L: "liability", E: "equity", D: "dividends/drawings (reduces equity)", R: "revenue", X: "expense", CA: "contra asset", CR: "contra revenue" };
  const NORMAL = { A: "Debit", L: "Credit", E: "Credit", D: "Debit", R: "Credit", X: "Debit", CA: "Credit", CR: "Debit" };

  function viewPractice(query) {
    const mode = query.get("mode") || "drill";
    const ch = query.get("ch") || "all";
    return `<div class="page-head"><div class="eyebrow">Practice</div><h1>Test yourself</h1>
      <p>Drill the debit/credit rules, flip through flashcards or take a quiz. Pick a chapter or mix them all.</p></div>
      <div class="practice-controls">
        <div class="seg" role="tablist">${[["drill", "Dr/Cr drill"], ["cards", "Flashcards"], ["quiz", "Quiz"]].map(([k, l]) => `<button data-mode="${k}" class="${mode === k ? "on" : ""}">${l}</button>`).join("")}</div>
        ${mode !== "drill" ? `<select id="chSel"><option value="all">All chapters</option>${CH.map((c) => `<option value="${c.id}" ${ch === c.id ? "selected" : ""}>${chLabel(c)} · ${esc(c.title)}</option>`).join("")}</select>` : ""}
      </div><div id="practiceMount"></div>`;
  }

  function mountPractice(el, mode, chId) {
    const pool = chId === "all" ? CH : [byId(chId)].filter(Boolean);
    if (mode === "cards") return mountCards(el, shuffle(pool.flatMap((c) => (c.flashcards || []).map((f) => Object.assign({ ch: c }, f)))));
    if (mode === "quiz") return mountQuiz(el, shuffle(pool.flatMap((c) => (c.quiz || []).map((q) => Object.assign({ ch: c }, q)))), chId);
    return mountDrill(el);
  }

  function mountCards(el, cards) {
    if (!cards.length) { el.innerHTML = `<p class="muted">No flashcards yet.</p>`; return; }
    let i = 0, back = false;
    const draw = () => {
      const c = cards[i];
      el.innerHTML = `<div class="card flashcard ${back ? "back" : ""}" data-fc="flip" role="button" tabindex="0">
          <div>${back ? esc(c.a) : esc(c.q)}<small>${back ? "Answer" : "Tap to flip"} · ${chLabel(c.ch)}</small></div></div>
        <div class="fc-nav"><button class="btn" data-fc="prev">← Prev</button><span class="muted">${i + 1} / ${cards.length}</span><button class="btn primary" data-fc="next">Next →</button></div>`;
    };
    el.onclick = (e) => {
      const b = e.target.closest("[data-fc]"); if (!b) return;
      const a = b.dataset.fc;
      if (a === "flip") back = !back;
      if (a === "next") { i = (i + 1) % cards.length; back = false; }
      if (a === "prev") { i = (i - 1 + cards.length) % cards.length; back = false; }
      draw();
    };
    el.onkeydown = (e) => { if ((e.key === " " || e.key === "Enter") && e.target.matches("[data-fc=flip]")) { e.preventDefault(); back = !back; draw(); el.querySelector("[data-fc=flip]").focus(); } };
    draw();
  }

  function mountQuiz(el, qs, chId) {
    if (!qs.length) { el.innerHTML = `<p class="muted">No quiz questions yet.</p>`; return; }
    let i = 0, right = 0, answered = false;
    const perCh = {};
    const draw = () => {
      if (i >= qs.length) {
        const pct = Math.round((right / qs.length) * 100);
        Object.keys(perCh).forEach((id) => {
          const r = perCh[id]; const score = Math.round((r.right / r.total) * 100);
          const prev = (progress()[id] || {}).best;
          if (chId === id || chId === "all") setProgress(id, { best: prev == null ? score : Math.max(prev, score) });
        });
        el.innerHTML = `<div class="card empty"><div class="score">${pct}%</div><p>${right} of ${qs.length} correct</p>
          <button class="btn primary" data-q="restart">Try again</button></div>`;
        return;
      }
      const q = qs[i];
      el.innerHTML = `<div class="progress-line"><span style="width:${(i / qs.length) * 100}%"></span></div>
        <div class="card"><div class="eyebrow">Question ${i + 1} of ${qs.length} · ${chLabel(q.ch)}</div>
        <div class="quiz-q">${esc(q.q)}</div>
        <div class="options">${q.options.map((o, k) => `<button data-opt="${k}">${esc(o)}</button>`).join("")}</div>
        <div id="why"></div></div>`;
      answered = false;
    };
    el.onclick = (e) => {
      if (e.target.closest("[data-q=restart]")) { qs = shuffle(qs); i = 0; right = 0; Object.keys(perCh).forEach((k) => delete perCh[k]); draw(); return; }
      if (e.target.closest("[data-q=next]")) { i++; draw(); return; }
      const b = e.target.closest("[data-opt]"); if (!b || answered) return;
      answered = true;
      const q = qs[i], pick = +b.dataset.opt, ok = pick === q.answer;
      const r = (perCh[q.ch.id] = perCh[q.ch.id] || { right: 0, total: 0 }); r.total++;
      if (ok) { right++; r.right++; }
      el.querySelectorAll("[data-opt]").forEach((x) => { x.disabled = true; if (+x.dataset.opt === q.answer) x.classList.add("right"); });
      if (!ok) b.classList.add("wrong");
      el.querySelector("#why").innerHTML = `<div class="why"><b>${ok ? "Correct!" : "Not quite."}</b> ${esc(q.why || "")}</div>
        <div class="btn-row" style="margin-top:12px"><button class="btn primary" data-q="next">${i + 1 < qs.length ? "Next question →" : "See score"}</button></div>`;
    };
    draw();
  }

  function mountDrill(el) {
    let streak = 0, best = store.get("drillBest", 0), cur, kind;
    const pick = () => { cur = DRILL[Math.floor(Math.random() * DRILL.length)]; kind = Math.random() < 0.5 ? "increase" : "normal"; };
    const correctFor = () => NORMAL[cur[1]]; // an account increases on its normal-balance side
    const draw = (feedback) => {
      el.innerHTML = `<div class="card"><div class="eyebrow">Streak ${streak} · Best ${best}</div>
        <div class="drill-acct">${esc(cur[0])}</div>
        <div class="drill-q">${kind === "normal" ? "What is its normal balance?" : "To <b>increase</b> this account, you…"}</div>
        <div class="drill-btns"><button class="d" data-dc="Debit">Debit</button><button class="c" data-dc="Credit">Credit</button></div>
        <div class="drill-feedback">${feedback || '<span class="muted">Keyboard: D = debit, C = credit</span>'}</div></div>`;
    };
    const answer = (side) => {
      const ok = side === correctFor();
      const msg = `${esc(cur[0])} is ${/^[aeiou]/i.test(TYPE_NAME[cur[1]]) ? "an" : "a"} <b>${TYPE_NAME[cur[1]]}</b> account → increases with a <b>${correctFor().toLowerCase()}</b>.`;
      if (ok) { streak++; if (streak > best) { best = streak; store.set("drillBest", best); } } else streak = 0;
      pick(); draw(`<span class="${ok ? "ok" : "no"}">${ok ? "✓ Correct." : "✗ Nope."}</span> ${msg}`);
    };
    el.onclick = (e) => { const b = e.target.closest("[data-dc]"); if (b) answer(b.dataset.dc); };
    const onKey = (e) => {
      if (!document.body.contains(el) || !el.querySelector(".drill-btns")) { document.removeEventListener("keydown", onKey); return; }
      if (e.target.matches("input, select, textarea")) return;
      if (e.key === "d" || e.key === "D") answer("Debit");
      if (e.key === "c" || e.key === "C") answer("Credit");
    };
    document.addEventListener("keydown", onKey);
    pick(); draw();
  }

  /* ---------- calendar ---------- */
  function eventRow(e) {
    const covers = (e.covers || []).map(byId).filter(Boolean);
    return `<div class="card event ${e.type === "exam" ? "exam" : ""}">
      <div class="date-box"><span>${MONTHS[e.when.getMonth()]}</span><b>${e.when.getDate()}</b></div>
      <div><h3 style="margin-bottom:2px">${esc(e.title)}</h3>
        <div class="muted">${e.when.toLocaleDateString("en-CA", { weekday: "long" })}${e.time ? " · " + esc(e.time) : ""}${e.location ? " · " + esc(e.location) : ""}${e.weight ? " · " + esc(e.weight) : ""}</div>
        ${e.notes ? `<p style="margin:4px 0 0">${esc(e.notes)}</p>` : ""}
        ${covers.length ? `<div class="chips" style="margin-bottom:0">${covers.map((c) => `<a class="chip" href="#/chapter/${c.id}">${chLabel(c)}</a>`).join("")}</div>` : ""}</div></div>`;
  }

  function viewCalendar(query) {
    const now = new Date();
    const first = upcoming()[0];
    let y = +(query.get("y") || (first ? first.when.getFullYear() : now.getFullYear()));
    let m = +(query.get("m") || (first ? first.when.getMonth() : now.getMonth()));
    if (!query.get("y") && first && (first.when.getMonth() !== now.getMonth() || first.when.getFullYear() !== now.getFullYear())) { y = now.getFullYear(); m = now.getMonth(); }
    const start = new Date(y, m, 1), gridStart = new Date(y, m, 1 - start.getDay());
    const today = startOfToday();
    const cells = [];
    for (let k = 0; k < 42; k++) {
      const d = new Date(gridStart); d.setDate(gridStart.getDate() + k);
      const evs = events.filter((e) => e.when.toDateString() === d.toDateString());
      cells.push(`<div class="day ${d.getMonth() !== m ? "out" : ""} ${d.getTime() === today.getTime() ? "today" : ""}"><span class="n">${d.getDate()}</span>
        ${evs.map((e) => `<span class="ev ${esc(e.type || "")}" title="${esc(e.title)}">${esc(e.title)}</span>`).join("")}</div>`);
      if (k >= 34 && d.getMonth() !== m && d.getDay() === 6) break;
    }
    const pm = m === 0 ? [y - 1, 11] : [y, m - 1], nm = m === 11 ? [y + 1, 0] : [y, m + 1];
    const up = upcoming(), past = events.filter((e) => e.when < today);
    return `<div class="page-head"><div class="eyebrow">${esc(COURSE.term || "")}</div><h1>Course calendar</h1>
      <p>Exams, quizzes and due dates from the course outline. Exams also show a countdown on the dashboard.</p></div>
      ${!COURSE.outlineLoaded ? `<div class="callout warn"><b>Course outline not added yet.</b> Exam and assignment dates will appear here once they’re entered in <code>data/calendar.js</code>.</div>` : ""}
      <div class="card"><div class="cal-head"><a class="btn" href="#/calendar?y=${pm[0]}&m=${pm[1]}">←</a><h2 style="margin:0">${MONTHS_LONG[m]} ${y}</h2><a class="btn" href="#/calendar?y=${nm[0]}&m=${nm[1]}">→</a></div>
        <div class="cal">${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => `<div class="dow">${d}</div>`).join("")}${cells.join("")}</div></div>
      <div class="section-title"><h2>Upcoming</h2></div>
      ${up.length ? `<div class="event-list">${up.map(eventRow).join("")}</div>` : `<div class="card empty"><h3>Nothing scheduled yet</h3><p>Dates will show here once the course outline is added.</p></div>`}
      ${past.length ? `<div class="section-title"><h2>Past</h2></div><div class="event-list" style="opacity:.6">${past.reverse().map(eventRow).join("")}</div>` : ""}`;
  }

  /* ---------- search ---------- */
  function buildIndex() {
    const idx = [];
    CH.forEach((c) => {
      (c.summary || []).forEach((s) => idx.push({ c, where: "Quick summary", title: chLabel(c) + " summary", text: strip(s), href: `#/chapter/${c.id}/summary` }));
      (c.terms || []).forEach((t) => idx.push({ c, where: "Key term", title: t.term, text: t.def, href: `#/chapter/${c.id}/summary` }));
      (c.sections || []).forEach((s) => idx.push({ c, where: "Notes", title: s.title, text: strip(s.html), href: `#/chapter/${c.id}/notes` }));
      (c.examples || []).forEach((e) => idx.push({ c, where: "Example", title: e.title, text: strip(e.prompt), href: `#/chapter/${c.id}/examples` }));
      (c.flashcards || []).forEach((f) => idx.push({ c, where: "Flashcard", title: f.q, text: f.a, href: `#/practice?mode=cards&ch=${c.id}` }));
    });
    return idx;
  }
  let INDEX;
  function viewSearch(q) {
    INDEX = INDEX || buildIndex();
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const hits = terms.length ? INDEX.filter((h) => terms.every((t) => (h.title + " " + h.text).toLowerCase().includes(t))) : [];
    const hl = (s) => { let out = esc(s); terms.forEach((t) => { out = out.replace(new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"), "<mark>$1</mark>"); }); return out; };
    const snippet = (text) => {
      const low = text.toLowerCase(), at = terms.length ? Math.max(0, low.indexOf(terms[0]) - 60) : 0;
      return (at > 0 ? "…" : "") + text.slice(at, at + 200) + (text.length > at + 200 ? "…" : "");
    };
    return `<div class="page-head"><div class="eyebrow">Search</div><h1>${hits.length} result${hits.length === 1 ? "" : "s"} for “${esc(q)}”</h1></div>
      <div class="grid">${hits.map((h) => `<a class="card search-hit" href="${h.href}"><span class="tag">${chLabel(h.c)} · ${h.where}</span>
        <h3 style="margin:6px 0 0">${hl(h.title)}</h3><p>${hl(snippet(h.text))}</p></a>`).join("") || `<p class="muted">Try a different word — e.g. “depreciation”, “FOB”, “trial balance”.</p>`}</div>`;
  }

  function viewNotFound() { return `<div class="empty"><h2>Page not found</h2><p><a href="#/">Back to the dashboard</a></p></div>`; }

  /* ---------- router ---------- */
  function route() {
    const raw = location.hash.replace(/^#\/?/, "");
    const [path, qs] = raw.split("?");
    const query = new URLSearchParams(qs || "");
    const parts = path.split("/").filter(Boolean);
    let html;
    switch (parts[0]) {
      case undefined: html = viewHome(); break;
      case "overview": html = viewOverview(); break;
      case "notes": html = viewNotesIndex(); break;
      case "chapter": html = viewChapter(parts[1], parts[2]); break;
      case "practice": html = viewPractice(query); break;
      case "calendar": html = viewCalendar(query); break;
      case "search": html = viewSearch(decodeURIComponent(parts.slice(1).join("/"))); break;
      default: html = viewNotFound();
    }
    app.innerHTML = html;
    document.body.classList.remove("menu-open");
    highlightNav();

    // post-render mounts
    app.querySelectorAll("[data-equation]").forEach((el) => {
      const [cid, exk] = el.dataset.equation.split("-ex");
      mountEquation(el, byId(cid).examples[+exk]);
    });
    const pm = document.getElementById("practiceMount");
    if (pm) {
      if (parts[0] === "chapter") {
        pm.outerHTML = `<div class="practice-controls"><div class="seg">${[["cards", "Flashcards"], ["quiz", "Quiz"]].map(([k, l], i) => `<button data-cmode="${k}" class="${i === 0 ? "on" : ""}">${l}</button>`).join("")}</div></div><div id="practiceMount"></div>`;
        mountPractice(document.getElementById("practiceMount"), "cards", parts[1]);
      } else {
        mountPractice(pm, query.get("mode") || "drill", query.get("ch") || "all");
      }
    }
    if (!/^search/.test(raw)) window.scrollTo(0, 0);
    const h1 = app.querySelector("h1");
    document.title = (h1 && parts.length ? h1.textContent + " · " : "") + "ACCT 212 Study Guide";
  }

  /* ---------- global events ---------- */
  app.addEventListener("click", (e) => {
    const t = e.target.closest("[data-act], [data-mode], [data-cmode]");
    if (!t) return;
    if (t.dataset.mode) {
      const sel = document.getElementById("chSel");
      location.hash = `#/practice?mode=${t.dataset.mode}${sel && sel.value !== "all" ? "&ch=" + sel.value : ""}`;
      return;
    }
    if (t.dataset.cmode) {
      app.querySelectorAll("[data-cmode]").forEach((b) => b.classList.toggle("on", b === t));
      mountPractice(document.getElementById("practiceMount"), t.dataset.cmode, location.hash.split("/")[2]);
      return;
    }
    const act = t.dataset.act;
    if (act === "toggle-read") { const id = t.dataset.id; setProgress(id, { read: !(progress()[id] || {}).read }); route(); }
    if (act === "reveal") { const box = document.getElementById(t.dataset.target); box.hidden = !box.hidden; t.textContent = box.hidden ? "Show solution" : "Hide solution"; }
    if (act === "expand" || act === "collapse") app.querySelectorAll("details.note").forEach((d) => (d.open = act === "expand"));
  });
  app.addEventListener("change", (e) => {
    if (e.target.id === "chSel") {
      const mode = (location.hash.match(/mode=(\w+)/) || [])[1] || "cards";
      location.hash = `#/practice?mode=${mode}${e.target.value !== "all" ? "&ch=" + e.target.value : ""}`;
    }
  });
  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("searchInput").value.trim();
    if (q) location.hash = "#/search/" + encodeURIComponent(q);
  });
  document.getElementById("menuBtn").addEventListener("click", () => document.body.classList.add("menu-open"));
  document.getElementById("scrim").addEventListener("click", () => document.body.classList.remove("menu-open"));

  function applyTheme(t) { if (t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme"); }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    applyTheme(next); store.set("theme", next);
  }
  applyTheme(store.get("theme", null));
  document.getElementById("themeBtn").addEventListener("click", toggleTheme);
  document.getElementById("themeBtnTop").addEventListener("click", toggleTheme);

  window.addEventListener("hashchange", route);
  renderNav();
  route();
})();
