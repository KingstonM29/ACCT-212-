/*
 * ACCT 212 — live, interactive teaching diagrams.
 * Each diagram registers { id, ch, title, blurb, mount(el) }. Put <div data-diagram="id"></div>
 * anywhere in chapter HTML (data/chapters.js) and the app mounts it; the Visual lab lists them all.
 */
(function () {
  "use strict";

  const D = {};
  const ORDER = [];
  const RM = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const n0 = (n) => Math.round(Math.abs(n)).toLocaleString("en-CA");
  const $$ = (n) => (n < 0 ? "−$" : "$") + n0(n);
  const kfmt = (v) => v >= 1000 ? "$" + (v / 1000).toFixed(v % 1000 ? 1 : 0) + "k" : "$" + Math.round(v);
  let uid = 0;

  function every(el, fn, ms) {
    const id = setInterval(() => { if (!el.isConnected) { clearInterval(id); return; } fn(); }, ms);
    return id;
  }
  const sleep = (ms) => new Promise((r) => setTimeout(r, RM ? 0 : ms));
  function flash(el) { if (!el) return; el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash"); }

  /* A number chip that flies from one element to another (journal → ledger, etc.). */
  function fly(host, from, to, text, cls) {
    if (RM || !from || !to || !host.animate) return Promise.resolve();
    const h = host.getBoundingClientRect(), a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
    const chip = document.createElement("div");
    chip.className = "fly-chip " + (cls || "");
    chip.textContent = text;
    host.appendChild(chip);
    const cw = chip.offsetWidth, chh = chip.offsetHeight;
    const x0 = a.left - h.left + a.width / 2 - cw / 2, y0 = a.top - h.top + a.height / 2 - chh / 2;
    const x1 = b.left - h.left + b.width / 2 - cw / 2, y1 = b.top - h.top + Math.min(b.height / 2, 24) - chh / 2;
    const anim = chip.animate([
      { transform: `translate(${x0}px,${y0}px) scale(.9)`, opacity: 0.3 },
      { transform: `translate(${(x0 + x1) / 2}px,${Math.min(y0, y1) - 34}px) scale(1.15)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${x1}px,${y1}px) scale(.95)`, opacity: 1 }
    ], { duration: 720, easing: "cubic-bezier(.45,0,.3,1)" });
    return anim.finished.then(() => chip.remove(), () => chip.remove());
  }

  function slider(key, label, min, max, step, val) {
    const id = `dg${++uid}-${key}`;
    return `<label class="dg-slider" for="${id}"><span>${label}<b data-out="${key}"></b></span>
      <input type="range" id="${id}" data-k="${key}" min="${min}" max="${max}" step="${step}" value="${val}"></label>`;
  }
  function bindSliders(el, state, onChange, fmt) {
    const outs = () => el.querySelectorAll("[data-out]").forEach((o) => { const k = o.dataset.out; o.textContent = (fmt && fmt[k] ? fmt[k](state[k]) : $$(state[k])); });
    el.querySelectorAll("input[type=range][data-k]").forEach((inp) => {
      inp.addEventListener("input", () => { state[inp.dataset.k] = +inp.value; outs(); onChange(inp.dataset.k); });
    });
    outs();
  }
  function jeMini(lines) {
    return `<table class="je-mini">${lines.map((l) => `<tr><td class="${l[1] == null ? "ind" : ""}">${esc(l[0])}</td><td class="d">${l[1] != null ? n0(l[1]) : ""}</td><td class="c">${l[2] != null ? n0(l[2]) : ""}</td></tr>`).join("")}</table>`;
  }
  function reg(id, ch, title, blurb, mount) { D[id] = { id, ch, title, blurb, mount }; ORDER.push(id); }

  /* ------------------------------------------------------------------ */
  /* 1. Accounting equation balance (Ch 1)                               */
  /* ------------------------------------------------------------------ */
  reg("equation", 1, "The accounting equation, live",
    "Step through Softbyte’s transactions. Every transaction changes at least two boxes, and both sides always match.",
    (el) => {
      const ch = (window.CHAPTERS || []).find((c) => c.id === "ch1");
      const ex = ch && (ch.examples || []).find((e) => e.interactive === "equation");
      const rows = ex ? ex.rows : [];
      const names = ["Cash", "Accounts Receivable", "Supplies", "Equipment", "Accounts Payable", "Common Shares", "Retained Earnings"];
      const MAX = 22000;
      let step = 0, timer = null;
      el.innerHTML = `
        <div class="dg-toolbar"><button class="btn" data-a="prev">← Back</button><button class="btn primary" data-a="next">Next transaction →</button>
          <button class="btn" data-a="play">▶ Play</button><button class="btn" data-a="reset">Reset</button><span class="dg-count"></span></div>
        <div class="dg-caption" aria-live="polite"></div>
        <div class="eqv">
          <div class="eqv-side"><div class="eqv-label">Assets</div><div class="eqv-stack" data-side="0"></div><div class="eqv-total" data-t="0"></div></div>
          <div class="eqv-sign" title="Balanced">=</div>
          <div class="eqv-side"><div class="eqv-label">Liabilities + Equity</div><div class="eqv-stack" data-side="1"></div><div class="eqv-total" data-t="1"></div></div>
        </div>
        <div class="dg-legend">${names.map((n, i) => `<span><i class="sw s${i}"></i>${n}</span>`).join("")}</div>`;
      const stacks = el.querySelectorAll(".eqv-stack");
      names.forEach((n, i) => {
        const seg = document.createElement("div");
        seg.className = `eqv-seg s${i}`; seg.dataset.i = i;
        seg.innerHTML = `<span>${n} <b></b></span>`;
        stacks[i < 4 ? 0 : 1].appendChild(seg);
      });
      const playBtn = el.querySelector('[data-a="play"]');
      const halt = () => { if (timer) { clearInterval(timer); timer = null; } playBtn.textContent = "▶ Play"; };
      function draw() {
        const tot = names.map(() => 0);
        rows.slice(0, step).forEach((r) => r.v.forEach((v, i) => (tot[i] += v)));
        el.querySelectorAll(".eqv-seg").forEach((seg) => {
          const v = tot[+seg.dataset.i];
          seg.style.height = (Math.max(0, v) / MAX) * 100 + "%";
          seg.querySelector("b").textContent = "$" + n0(v);
          seg.classList.toggle("tiny", v / MAX < 0.06);
        });
        const A = tot.slice(0, 4).reduce((a, b) => a + b, 0), R = tot.slice(4).reduce((a, b) => a + b, 0);
        el.querySelector('[data-t="0"]').textContent = "$" + n0(A);
        el.querySelector('[data-t="1"]').textContent = "$" + n0(R);
        el.querySelector(".eqv-sign").classList.toggle("ok", step > 0 && A === R);
        const cap = el.querySelector(".dg-caption");
        if (!step) cap.innerHTML = `<b>An empty business.</b> Press <i>Next</i> and predict which boxes change before you look.`;
        else {
          const r = rows[step - 1];
          cap.innerHTML = `<b>${esc(r.t)}</b><div class="fx">${r.v.map((v, i) => v ? `<span class="${v > 0 ? "up" : "down"}">${names[i]} ${v > 0 ? "↑ +" : "↓ −"}${n0(v)}</span>` : "").join("")}</div>${r.note ? `<small>Retained earnings changed because of: ${esc(r.note)}</small>` : ""}`;
          r.v.forEach((v, i) => { if (v) flash(el.querySelector(`.eqv-seg[data-i="${i}"]`)); });
        }
        el.querySelector(".dg-count").textContent = `${step} / ${rows.length}`;
        el.querySelector('[data-a="prev"]').disabled = step === 0;
        el.querySelector('[data-a="next"]').disabled = step === rows.length;
      }
      el.addEventListener("click", (e) => {
        const b = e.target.closest("[data-a]"); if (!b) return;
        const a = b.dataset.a;
        if (a === "play") {
          if (timer) { halt(); return; }
          if (step === rows.length) step = 0;
          playBtn.textContent = "❚❚ Pause";
          step++; draw();
          timer = every(el, () => { if (step >= rows.length) { halt(); return; } step++; draw(); }, 1800);
          return;
        }
        halt();
        if (a === "next") step = Math.min(rows.length, step + 1);
        if (a === "prev") step = Math.max(0, step - 1);
        if (a === "reset") step = 0;
        draw();
      });
      draw();
    });

  /* ------------------------------------------------------------------ */
  /* 2. How the statements connect (Ch 1)                                */
  /* ------------------------------------------------------------------ */
  reg("flow", 1, "How the financial statements connect",
    "Drag the sliders. Net income flows into retained earnings, and ending retained earnings flows onto the balance sheet.",
    (el) => {
      const L = 8166, SC = 20000;
      const st = { rev: 5400, exp: 3256, div: 400, beg: 0 };
      el.innerHTML = `
        <div class="dg-sliders">${slider("rev", "Revenues", 0, 15000, 100, st.rev)}${slider("exp", "Expenses", 0, 15000, 100, st.exp)}${slider("div", "Dividends", 0, 3000, 50, st.div)}${slider("beg", "Beginning retained earnings", 0, 10000, 100, st.beg)}</div>
        <div class="flow">
          <div class="flow-card"><div class="flow-num">1</div><h4>Income Statement</h4>
            <div class="fl-row"><span>Revenues</span><b data-v="rev"></b></div>
            <div class="fl-row"><span>− Expenses</span><b data-v="exp"></b></div>
            <div class="fl-row total"><span data-v="nilabel">Net income</span><b data-v="ni" class="lk a"></b></div></div>
          <div class="flow-arrow" data-arrow="1"><i></i><span>net income</span></div>
          <div class="flow-card"><div class="flow-num">2</div><h4>Statement of Retained Earnings</h4>
            <div class="fl-row"><span>Beginning RE</span><b data-v="beg"></b></div>
            <div class="fl-row"><span data-v="nilabel2">+ Net income</span><b data-v="ni2" class="lk a"></b></div>
            <div class="fl-row"><span>− Dividends</span><b data-v="div"></b></div>
            <div class="fl-row total"><span>Ending RE</span><b data-v="end" class="lk b"></b></div></div>
          <div class="flow-arrow" data-arrow="2"><i></i><span>ending RE</span></div>
          <div class="flow-card"><div class="flow-num">3</div><h4>Statement of Financial Position</h4>
            <div class="fl-row"><span>Liabilities</span><b>$${n0(L)}</b></div>
            <div class="fl-row"><span>Share capital</span><b>$${n0(SC)}</b></div>
            <div class="fl-row"><span>Retained earnings</span><b data-v="end2" class="lk b"></b></div>
            <div class="fl-row total"><span>Liabilities + equity</span><b data-v="tot"></b></div>
            <div class="fl-row assets"><span>So assets must equal</span><b data-v="assets"></b></div></div>
        </div>
        <p class="dg-note" data-v="note"></p>`;
      const v = (k) => el.querySelector(`[data-v="${k}"]`);
      let last = {};
      function draw() {
        const ni = st.rev - st.exp, end = st.beg + ni - st.div, tot = L + SC + end;
        v("rev").textContent = $$(st.rev); v("exp").textContent = "(" + $$(st.exp) + ")";
        v("nilabel").textContent = ni >= 0 ? "Net income" : "Net loss";
        v("nilabel2").textContent = ni >= 0 ? "+ Net income" : "− Net loss";
        v("ni").textContent = $$(ni); v("ni2").textContent = $$(ni);
        v("beg").textContent = $$(st.beg); v("div").textContent = "(" + $$(st.div) + ")";
        v("end").textContent = $$(end); v("end2").textContent = $$(end);
        v("tot").textContent = $$(tot); v("assets").textContent = $$(tot);
        [v("ni"), v("ni2")].forEach((x) => x.classList.toggle("neg", ni < 0));
        if (last.ni !== ni) { flash(v("ni")); flash(v("ni2")); el.querySelector('[data-arrow="1"]').classList.remove("go"); void el.offsetWidth; el.querySelector('[data-arrow="1"]').classList.add("go"); }
        if (last.end !== end) { flash(v("end")); flash(v("end2")); el.querySelector('[data-arrow="2"]').classList.remove("go"); void el.offsetWidth; el.querySelector('[data-arrow="2"]').classList.add("go"); }
        last = { ni, end };
        v("note").innerHTML = ni >= 0
          ? `Net income of <b>${$$(ni)}</b> raises retained earnings. The extra equity is matched by extra assets (cash or receivables earned), so the balance sheet still balances. Dividends reduce RE directly and never touch the income statement.`
          : `A net loss of <b>${$$(-ni)}</b> <i>reduces</i> retained earnings, so equity and total assets shrink together.`;
      }
      bindSliders(el, st, draw);
      draw();
    });

  /* ------------------------------------------------------------------ */
  /* 3. Accounting cycle wheel (Ch 3 & 4)                                */
  /* ------------------------------------------------------------------ */
  const CYCLE = [
    ["Analyze", "Analyze transactions", "Decide which accounts a transaction affects and whether each goes up or down. A = L + E must stay balanced.", "During the period", "Ch 1 & 3"],
    ["Journalize", "Journalize", "Record the transaction in the general journal (the book of original entry): date, debits first, credits indented, short explanation.", "During the period", "Ch 3"],
    ["Post", "Post to the ledger", "Copy each journal line to its ledger account (T-account) and update the running balance.", "During the period", "Ch 3"],
    ["Unadj. TB", "Prepare unadjusted trial balance", "List every account balance. Total debits must equal total credits before you adjust.", "End of period", "Ch 3"],
    ["Adjust", "Journalize & post adjusting entries", "Prepaids used up, depreciation, unearned revenue earned, accrued expenses and revenues, then income tax last. Never Cash.", "End of period", "Ch 4"],
    ["Adj. TB", "Prepare adjusted trial balance", "Prove debits = credits again after adjustments. This is the source for the financial statements.", "End of period", "Ch 4"],
    ["Statements", "Prepare financial statements", "Income statement → statement of retained earnings → statement of financial position → statement of cash flows.", "End of period", "Ch 1 & 4"],
    ["Close", "Journalize & post closing entries", "Zero out revenues, expenses and dividends: revenues and expenses go to Income Summary, which goes to Retained Earnings, then close Dividends to RE.", "End of year", "Ch 4"],
    ["Post-close TB", "Prepare post-closing trial balance", "Only permanent (balance sheet) accounts are left. The books are ready for the next period.", "End of year", "Ch 4"]
  ];
  reg("cycle", 3, "The accounting cycle wheel",
    "Tap any step or press Play. Steps 1–3 happen all period long; steps 4–9 happen at period end.",
    (el) => {
      const cx = 200, cy = 200, R = 150, LR = 190, C = 2 * Math.PI * R;
      let cur = 0, timer = null;
      const pos = (i, r) => { const a = (-90 + i * 40) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
      const nodes = CYCLE.map((s, i) => {
        const [x, y] = pos(i, R), [lx, ly] = pos(i, LR);
        const cos = Math.cos((-90 + i * 40) * Math.PI / 180);
        const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
        return `<g class="cy-node ${i < 3 ? "during" : "end"}" data-i="${i}" tabindex="0" role="button" aria-label="Step ${i + 1}: ${esc(s[1])}">
          <circle cx="${x}" cy="${y}" r="23"></circle><text x="${x}" y="${y + 5}" text-anchor="middle" class="cy-n">${i + 1}</text>
          <text x="${lx}" y="${ly + 4}" text-anchor="${anchor}" class="cy-l">${esc(s[0])}</text></g>`;
      }).join("");
      el.innerHTML = `<div class="cy-wrap">
        <svg viewBox="-80 -20 560 440" class="cy-svg" role="img" aria-label="The 9-step accounting cycle">
          <circle cx="${cx}" cy="${cy}" r="${R}" class="cy-track"></circle>
          <circle cx="${cx}" cy="${cy}" r="${R}" class="cy-prog" stroke-dasharray="${C}" stroke-dashoffset="${C}" transform="rotate(-90 ${cx} ${cy})"></circle>
          <text x="${cx}" y="${cy - 8}" text-anchor="middle" class="cy-big">1</text>
          <text x="${cx}" y="${cy + 22}" text-anchor="middle" class="cy-sub">of 9</text>
          ${nodes}
        </svg>
        <div class="cy-panel"><div class="eyebrow cy-when"></div><h3 class="cy-title"></h3><p class="cy-desc"></p><span class="tag cy-ch"></span>
          <div class="dg-toolbar"><button class="btn" data-a="prev">←</button><button class="btn primary" data-a="play">▶ Play</button><button class="btn" data-a="next">→</button></div>
          <div class="dg-legend"><span><i class="sw during"></i>During the period</span><span><i class="sw end"></i>Period end</span></div></div></div>`;
      const playBtn = el.querySelector('[data-a="play"]');
      const halt = () => { if (timer) { clearInterval(timer); timer = null; } playBtn.textContent = "▶ Play"; };
      function draw() {
        const s = CYCLE[cur];
        el.querySelectorAll(".cy-node").forEach((n) => { const i = +n.dataset.i; n.classList.toggle("active", i === cur); n.classList.toggle("past", i < cur); });
        el.querySelector(".cy-prog").setAttribute("stroke-dashoffset", C * (1 - (cur + 1) / 9));
        el.querySelector(".cy-big").textContent = cur + 1;
        el.querySelector(".cy-when").textContent = s[3];
        el.querySelector(".cy-title").textContent = s[1];
        el.querySelector(".cy-desc").textContent = s[2];
        el.querySelector(".cy-ch").textContent = s[4];
        flash(el.querySelector(".cy-panel"));
      }
      el.addEventListener("click", (e) => {
        const n = e.target.closest(".cy-node");
        if (n) { halt(); cur = +n.dataset.i; draw(); return; }
        const b = e.target.closest("[data-a]"); if (!b) return;
        if (b.dataset.a === "play") {
          if (timer) { halt(); return; }
          playBtn.textContent = "❚❚ Pause";
          timer = every(el, () => { cur = (cur + 1) % 9; draw(); }, 2600);
          return;
        }
        halt();
        cur = (cur + (b.dataset.a === "next" ? 1 : 8)) % 9; draw();
      });
      el.addEventListener("keydown", (e) => { const n = e.target.closest(".cy-node"); if (n && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); halt(); cur = +n.dataset.i; draw(); } });
      draw();
    });

  /* ------------------------------------------------------------------ */
  /* 4. Journal → ledger posting animation (Ch 3)                        */
  /* ------------------------------------------------------------------ */
  reg("posting", 3, "Posting: journal → ledger → trial balance",
    "Watch each journal entry for Shelby Kindall fly into the T-accounts. Balances and the trial balance update live.",
    (el) => {
      const ch = (window.CHAPTERS || []).find((c) => c.id === "ch3");
      const entries = ch ? ch.examples[0].steps[0].entries : [];
      const ORDERED = ["Cash", "Accounts Receivable", "Supplies", "Equipment", "Accounts Payable", "Notes Payable", "Common Shares", "Service Revenue", "Food Service Revenue", "Coaching Revenue", "Rent Expense", "Salaries Expense"];
      const used = new Set(); entries.forEach((e) => (e.lines || []).forEach((l) => used.add(l[0])));
      const accts = ORDERED.filter((a) => used.has(a)).concat([...used].filter((a) => !ORDERED.includes(a)));
      let i = 0, busy = false;
      const bal = {}; accts.forEach((a) => (bal[a] = 0));
      el.innerHTML = `
        <div class="dg-toolbar"><button class="btn primary" data-a="next">Post next entry →</button><button class="btn" data-a="all">Post all</button><button class="btn" data-a="reset">Reset</button><span class="dg-count"></span></div>
        <div class="dg-caption" aria-live="polite"></div>
        <div class="post-grid">
          <div class="post-journal"><div class="eyebrow">General journal</div>
            ${entries.map((e, k) => `<div class="pj" data-e="${k}"><div class="pj-h">Mar ${esc(e.date)}${e.memo ? ` · ${esc(e.memo)}` : ""}</div>
              ${e.none ? `<div class="pj-none">${esc(e.none)}</div>` : e.lines.map((l, j) => `<div class="pj-line ${l[1] == null ? "cr" : "dr"}" data-l="${j}"><span>${esc(l[0])}</span><b>${n0(l[1] != null ? l[1] : l[2])}</b></div>`).join("")}</div>`).join("")}
          </div>
          <div class="post-ledger"><div class="eyebrow">General ledger</div><div class="tgrid">
            ${accts.map((a) => `<div class="tacc" data-acct="${esc(a)}"><div class="tacc-h">${esc(a)}</div><div class="tacc-b"><div class="tacc-l"></div><div class="tacc-r"></div></div><div class="tacc-bal"></div></div>`).join("")}
          </div></div>
        </div>
        <div class="tb-live"><span>Trial balance</span><b class="tb-d"></b><b class="tb-c"></b><span class="tb-ok"></span></div>`;
      const journal = el.querySelector(".post-journal"), host = el;
      const tacc = (a) => [...el.querySelectorAll(".tacc")].find((t) => t.dataset.acct === a);
      function drawTotals() {
        let d = 0, c = 0;
        accts.forEach((a) => {
          const b = bal[a], t = tacc(a);
          if (b > 0) d += b; else c -= b;
          t.querySelector(".tacc-bal").innerHTML = b === 0 ? `<span class="muted">Bal 0</span>` : `Bal <b class="${b > 0 ? "d" : "c"}">${n0(b)} ${b > 0 ? "Dr" : "Cr"}</b>`;
        });
        el.querySelector(".tb-d").textContent = "Dr $" + n0(d);
        el.querySelector(".tb-c").textContent = "Cr $" + n0(c);
        const ok = el.querySelector(".tb-ok"); ok.textContent = d === c ? "✓ balanced" : "✗"; ok.className = "tb-ok " + (d === c ? "ok" : "");
        el.querySelector(".dg-count").textContent = `${i} / ${entries.length} posted`;
        el.querySelector('[data-a="next"]').disabled = el.querySelector('[data-a="all"]').disabled = i >= entries.length;
      }
      async function postNext(fast) {
        if (busy || i >= entries.length) return;
        busy = true;
        const e = entries[i], card = journal.querySelector(`[data-e="${i}"]`);
        journal.querySelectorAll(".pj").forEach((x) => x.classList.remove("active"));
        card.classList.add("active");
        journal.scrollTop = card.offsetTop - journal.offsetTop - 40;
        const cap = el.querySelector(".dg-caption");
        if (e.none) cap.innerHTML = `<b>Mar ${esc(e.date)}: nothing to post.</b> ${esc(e.none)}`;
        else {
          cap.innerHTML = `<b>Mar ${esc(e.date)}:</b> ${esc(e.memo || "")}. Debits go to the <span class="d">left</span> side, credits to the <span class="c">right</span>.`;
          for (let j = 0; j < e.lines.length; j++) {
            const l = e.lines[j], t = tacc(l[0]), isDr = l[1] != null, amt = isDr ? l[1] : l[2];
            const side = t.querySelector(isDr ? ".tacc-l" : ".tacc-r");
            if (!fast) await fly(host, card.querySelector(`[data-l="${j}"]`), side, n0(amt), isDr ? "d" : "c");
            const div = document.createElement("div"); div.textContent = n0(amt); div.className = "tacc-amt"; side.appendChild(div);
            bal[l[0]] += isDr ? amt : -amt;
            flash(t);
          }
        }
        card.classList.add("posted");
        i++; drawTotals();
        busy = false;
      }
      el.addEventListener("click", async (ev) => {
        const b = ev.target.closest("[data-a]"); if (!b) return;
        if (b.dataset.a === "next") postNext(false);
        if (b.dataset.a === "all") { while (i < entries.length) { await postNext(true); await sleep(60); } }
        if (b.dataset.a === "reset" && !busy) {
          i = 0; accts.forEach((a) => (bal[a] = 0));
          el.querySelectorAll(".tacc-l, .tacc-r").forEach((s) => (s.innerHTML = ""));
          journal.querySelectorAll(".pj").forEach((x) => x.classList.remove("active", "posted"));
          journal.scrollTop = 0;
          el.querySelector(".dg-caption").innerHTML = `<b>Ready.</b> Press <i>Post next entry</i> to move the first journal entry into the ledger.`;
          drawTotals();
        }
      });
      el.querySelector(".dg-caption").innerHTML = `<b>Ready.</b> Press <i>Post next entry</i> to move the first journal entry into the ledger.`;
      drawTotals();
    });

  /* ------------------------------------------------------------------ */
  /* 5. Classified SFP sorter game (Ch 2)                                */
  /* ------------------------------------------------------------------ */
  const CATS = [["CA", "Current assets"], ["LTI", "Long-term investments"], ["PPE", "Property, plant & equipment"], ["INT", "Intangibles & goodwill"],
    ["CL", "Current liabilities"], ["NCL", "Non-current liabilities"], ["SE", "Shareholders’ equity"], ["NO", "Not on the balance sheet"]];
  const SORT_ITEMS = [
    ["Cash", "CA", "The most liquid asset, so it’s listed first."],
    ["Accounts receivable", "CA", "Collected from customers within a year."],
    ["Merchandise inventory", "CA", "Sold within the operating cycle."],
    ["Prepaid insurance (12 months)", "CA", "Used up within a year."],
    ["Supplies", "CA", "Used up within a year."],
    ["Bond investment held to maturity in 5 years", "LTI", "Held for many years, not readily converted to cash."],
    ["Land held only as an investment, to resell later", "LTI", "Not used in operations, so it’s an investment, not PP&E."],
    ["Land bought to build a manufacturing centre", "PPE", "Tangible and used in operations for many years."],
    ["Equipment", "PPE", "Long-lived and tangible, used in the business, not for sale."],
    ["Accumulated depreciation — equipment", "PPE", "Contra asset, subtracted from equipment in the PP&E section."],
    ["Land used for the company’s store", "PPE", "Used in operations. Land is PP&E but is never depreciated."],
    ["Patent", "INT", "Long-lived rights with no physical substance."],
    ["Goodwill", "INT", "A type of intangible asset (shown with or next to intangibles)."],
    ["Accounts payable", "CL", "Paid within a year."],
    ["Unearned revenue", "CL", "An obligation to deliver goods or services, normally within a year."],
    ["Current portion of long-term debt", "CL", "The part of a long-term loan due in the next 12 months."],
    ["Salaries payable", "CL", "Owed to employees and paid soon."],
    ["Mortgage payable due in 2035", "NCL", "Settled after more than one year."],
    ["Common shares", "SE", "Share capital: what shareholders invested."],
    ["Retained earnings", "SE", "Cumulative profits kept in the company."],
    ["Service revenue", "NO", "An income statement account. It reaches the balance sheet only through retained earnings."],
    ["Rent expense", "NO", "An income statement account."],
    ["Dividends declared", "NO", "Appears on the statement of retained earnings, not the balance sheet."]
  ];
  reg("sorter", 2, "Build a classified balance sheet",
    "Sort each account into the right section. Your statement builds itself as you go.",
    (el) => {
      let deck, idx, score, tries, placed;
      function reset() { deck = SORT_ITEMS.slice().sort(() => Math.random() - 0.5); idx = 0; score = 0; tries = 0; placed = {}; CATS.forEach((c) => (placed[c[0]] = [])); draw(); }
      function sheet() {
        const col = (keys) => keys.map((k) => { const name = CATS.find((c) => c[0] === k)[1]; return `<div class="ss-group ${placed[k].length ? "" : "is-empty"}"><div class="ss-h">${name}</div>${placed[k].map((n) => `<div class="ss-item">${esc(n)}</div>`).join("") || `<div class="ss-item muted">—</div>`}</div>`; }).join("");
        return `<div class="ss"><div class="ss-col"><div class="ss-title">Assets</div>${col(["CA", "LTI", "PPE", "INT"])}</div>
          <div class="ss-col"><div class="ss-title">Liabilities & Shareholders’ Equity</div>${col(["CL", "NCL", "SE"])}</div></div>
          ${placed.NO.length ? `<div class="ss-off"><b>Not on the balance sheet:</b> ${placed.NO.map(esc).join(", ")}</div>` : ""}`;
      }
      function draw(feedback) {
        const done = idx >= deck.length;
        el.innerHTML = `<div class="sort-top">
            <div class="sort-card ${done ? "done" : ""}">${done ? `<div class="eyebrow">Finished</div><div class="sort-name">${score} / ${deck.length} right first try</div><button class="btn primary" data-a="again">Play again</button>`
              : `<div class="eyebrow">Account ${idx + 1} of ${deck.length} · ${score} right first try</div><div class="sort-name">${esc(deck[idx][0])}</div>`}</div>
            ${done ? "" : `<div class="sort-btns">${CATS.map((c) => `<button class="btn" data-cat="${c[0]}">${c[1]}</button>`).join("")}</div>`}
            <div class="sort-fb" aria-live="polite">${feedback || ""}</div></div>
          ${sheet()}`;
      }
      el.addEventListener("click", (e) => {
        if (e.target.closest('[data-a="again"]')) { reset(); return; }
        const b = e.target.closest("[data-cat]"); if (!b || idx >= deck.length) return;
        const item = deck[idx];
        if (b.dataset.cat === item[1]) {
          if (tries === 0) score++;
          placed[item[1]].push(item[0]); idx++; tries = 0;
          draw(`<span class="ok">✓ ${esc(item[0])}</span> ${esc(item[2])}`);
          const g = [...el.querySelectorAll(".ss-item")].find((x) => x.textContent === item[0]); flash(g);
        } else {
          tries++;
          b.classList.add("wrong"); b.disabled = true;
          el.querySelector(".sort-fb").innerHTML = `<span class="no">✗ Not ${esc(CATS.find((c) => c[0] === b.dataset.cat)[1].toLowerCase())}.</span> ${tries > 1 ? "Hint: " + esc(item[2]) : "Try again."}`;
        }
      });
      reset();
    });

  /* ------------------------------------------------------------------ */
  /* 6. Ratio gauges (Ch 2)                                              */
  /* ------------------------------------------------------------------ */
  function arcPath(cx, cy, r, f0, f1) {
    const a0 = Math.PI * (1 - f0), a1 = Math.PI * (1 - f1);
    return `M${(cx + r * Math.cos(a0)).toFixed(2)} ${(cy - r * Math.sin(a0)).toFixed(2)} A${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(2)} ${(cy - r * Math.sin(a1)).toFixed(2)}`;
  }
  function gauge(key, zones, minLabel, maxLabel) {
    return `<svg viewBox="0 0 300 200" class="gauge" data-g="${key}" role="img">
      ${zones.map((z) => `<path d="${arcPath(150, 150, 110, z[0], z[1])}" class="gz ${z[2]}"></path>`).join("")}
      <g class="needle" style="transform-origin:150px 150px;transform-box:view-box"><line x1="150" y1="150" x2="68" y2="150"></line><circle cx="150" cy="150" r="8"></circle></g>
      <text x="40" y="172" text-anchor="middle" class="g-lab">${minLabel}</text><text x="260" y="172" text-anchor="middle" class="g-lab">${maxLabel}</text>
      <text x="150" y="192" text-anchor="middle" class="g-val"></text></svg>`;
  }
  reg("ratios", 2, "Ratio lab: liquidity & solvency",
    "Change the balance sheet and watch the ratios react. Green is healthy, gold is borderline, red is a warning.",
    (el) => {
      const st = { ca: 60000, cl: 25000, nca: 140000, ncl: 55000 };
      el.innerHTML = `<div class="dg-sliders">${slider("ca", "Current assets", 0, 150000, 1000, st.ca)}${slider("cl", "Current liabilities", 1000, 150000, 1000, st.cl)}${slider("nca", "Non-current assets", 0, 300000, 5000, st.nca)}${slider("ncl", "Non-current liabilities", 0, 300000, 5000, st.ncl)}</div>
        <div class="ratio-grid">
          <div class="ratio-card"><h4>Working capital</h4><div class="wc-val"></div><div class="wc-bars"><div><span>Current assets</span><i class="wc-ca"></i></div><div><span>Current liabilities</span><i class="wc-cl"></i></div></div><p class="muted">Current assets − Current liabilities</p></div>
          <div class="ratio-card"><h4>Current ratio <span class="tag">Liquidity</span></h4>${gauge("cr", [[0, 0.25, "bad"], [0.25, 0.5, "warn"], [0.5, 1, "good"]], "0", "4+")}<p class="r-say" data-say="cr"></p><p class="muted">Current assets ÷ Current liabilities</p></div>
          <div class="ratio-card"><h4>Debt to total assets <span class="tag">Solvency</span></h4>${gauge("dta", [[0, 0.4, "good"], [0.4, 0.6, "warn"], [0.6, 1, "bad"]], "0%", "100%")}<p class="r-say" data-say="dta"></p><p class="muted">Total liabilities ÷ Total assets</p></div>
        </div>`;
      const setNeedle = (k, f, txt) => { const g = el.querySelector(`[data-g="${k}"]`); g.querySelector(".needle").style.transform = `rotate(${Math.max(0, Math.min(1, f)) * 180}deg)`; g.querySelector(".g-val").textContent = txt; };
      function draw() {
        const wc = st.ca - st.cl, cr = st.ca / st.cl, ta = st.ca + st.nca, tl = st.cl + st.ncl, dta = ta ? tl / ta : 1;
        const wcv = el.querySelector(".wc-val"); wcv.textContent = $$(wc); wcv.className = "wc-val " + (wc >= 0 ? "pos" : "neg");
        const m = Math.max(st.ca, st.cl, 1);
        el.querySelector(".wc-ca").style.width = (st.ca / m) * 100 + "%"; el.querySelector(".wc-cl").style.width = (st.cl / m) * 100 + "%";
        setNeedle("cr", cr / 4, cr.toFixed(2) + " : 1");
        setNeedle("dta", dta, (dta * 100).toFixed(1) + "%");
        el.querySelector('[data-say="cr"]').innerHTML = cr < 1 ? `<b class="neg">Below 1.</b> Not enough current assets to cover debts due this year.` : cr < 2 ? `<b class="warnc">Adequate.</b> $${cr.toFixed(2)} of current assets per $1 due.` : `<b class="pos">Strong.</b> $${cr.toFixed(2)} of current assets per $1 due. Very high can mean idle cash or inventory.`;
        el.querySelector('[data-say="dta"]').innerHTML = dta > 0.6 ? `<b class="neg">Highly leveraged.</b> Creditors finance ${(dta * 100).toFixed(0)}% of assets, which is riskier.` : dta > 0.4 ? `<b class="warnc">Moderate debt.</b> ${(dta * 100).toFixed(0)}% of assets are financed by creditors.` : `<b class="pos">Low debt.</b> Only ${(dta * 100).toFixed(0)}% of assets are financed by creditors. Lower = more solvent.`;
      }
      bindSliders(el, st, draw);
      draw();
    });

  /* ------------------------------------------------------------------ */
  /* 7. Cash timing vs recognition (Ch 4)                                */
  /* ------------------------------------------------------------------ */
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const TIMING = {
    prepaid: { tab: "Prepaid expense", months: 12, per: 1000, cashAt: 0, cashIn: false, cash: 12000, bs: "Prepaid Insurance", bsType: "Asset", is: "Insurance Expense", isType: "Expense", dr: "Insurance Expense", cr: "Prepaid Insurance",
      story: "Jan 1: paid $12,000 cash for a 12-month insurance policy.", insight: "<b>Deferral: cash moves first.</b> Each month-end adjustment moves $1,000 out of the asset and into expense. The two bars always add to $12,000." },
    unearned: { tab: "Unearned revenue", months: 3, per: 1000, cashAt: 0, cashIn: true, cash: 3000, bs: "Unearned Revenue", bsType: "Liability", is: "Service Revenue", isType: "Revenue", dr: "Unearned Revenue", cr: "Service Revenue",
      story: "Jan 1: received a $3,000 deposit for 3 months of snow removal.", insight: "<b>Deferral: cash moves first.</b> Each month you earn $1,000, so the liability shrinks and revenue grows by the same amount." },
    accruedExp: { tab: "Accrued expense", months: 12, per: 60, cashAt: 12, cashIn: false, cash: 720, bs: "Interest Payable", bsType: "Liability", is: "Interest Expense", isType: "Expense", dr: "Interest Expense", cr: "Interest Payable",
      story: "Jan 1: signed a $12,000, 6% note. All interest ($720) is paid on Dec 31.", insight: "<b>Accrual: cash moves last.</b> Interest builds up every month ($12,000 × 6% × 1/12 = $60) even though nothing is paid until the end. Skip the adjustment and expenses and liabilities are understated." },
    accruedRev: { tab: "Accrued revenue", months: 3, per: 800, cashAt: 3, cashIn: true, cash: 2400, bs: "Accounts Receivable", bsType: "Asset", is: "Service Revenue", isType: "Revenue", dr: "Accounts Receivable", cr: "Service Revenue",
      story: "IT support at $800/month. The client pays the full $2,400 at the end of March.", insight: "<b>Accrual: cash moves last.</b> Revenue is earned each month, so you record a receivable before any cash arrives." }
  };
  reg("timing", 4, "Cash timing vs. when it’s recorded",
    "Pick a type of adjustment and drag through the months. Watch what sits on the balance sheet versus what has hit the income statement.",
    (el) => {
      let key = "prepaid", m = 0, timer = null;
      const sid = `dg${++uid}-month`;
      el.innerHTML = `<div class="seg dg-tabs">${Object.keys(TIMING).map((k) => `<button data-t="${k}">${TIMING[k].tab}</button>`).join("")}</div>
        <p class="dg-story"></p>
        <div class="tl-wrap"><div class="tl-cash"></div><div class="tl"></div></div>
        <div class="dg-toolbar"><label class="dg-slider grow" for="${sid}"><span>Month-end <b class="m-lab"></b></span><input type="range" id="${sid}" min="0" value="0" step="1"></label><button class="btn" data-a="play">▶ Play</button></div>
        <div class="tm-bars"><div class="tm-row"><span class="tm-name bs"></span><div class="tm-track"><i class="tm-fill bs"></i></div><b class="tm-v bs"></b></div>
          <div class="tm-row"><span class="tm-name is"></span><div class="tm-track"><i class="tm-fill is"></i></div><b class="tm-v is"></b></div></div>
        <div class="tm-entry"></div><p class="dg-note tm-insight"></p>`;
      const range = el.querySelector("input[type=range]"), playBtn = el.querySelector('[data-a="play"]');
      const halt = () => { if (timer) { clearInterval(timer); timer = null; } playBtn.textContent = "▶ Play"; };
      function setup() {
        const t = TIMING[key];
        m = 0; range.max = t.months; range.value = 0;
        el.querySelectorAll("[data-t]").forEach((b) => b.classList.toggle("on", b.dataset.t === key));
        el.querySelector(".dg-story").textContent = t.story;
        el.querySelector(".tl").style.gridTemplateColumns = `repeat(${t.months}, 1fr)`;
        el.querySelector(".tl").innerHTML = Array.from({ length: t.months }, (_, i) => `<div class="tl-m" data-m="${i + 1}"><span>${MON[i]}</span><b>${$$(t.per)}</b></div>`).join("");
        const left = (t.cashAt / t.months) * 100;
        el.querySelector(".tl-cash").innerHTML = `<span class="tl-cash-mark ${t.cashIn ? "in" : "out"}" style="left:${left}%">${t.cashIn ? "Cash received" : "Cash paid"} ${$$(t.cash)}</span>`;
        el.querySelector(".tm-name.bs").innerHTML = `${t.bs} <small>${t.bsType} · balance sheet</small>`;
        el.querySelector(".tm-name.is").innerHTML = `${t.is} <small>${t.isType} · income statement (to date)</small>`;
        el.querySelector(".tm-insight").innerHTML = t.insight;
        draw();
      }
      function draw() {
        const t = TIMING[key], total = t.per * t.months;
        const deferral = t.cashAt === 0;
        const bsV = deferral ? total - t.per * m : (m >= t.months ? 0 : t.per * m);
        const isV = t.per * m;
        el.querySelector(".m-lab").textContent = m === 0 ? "start (no month-ends yet)" : `end of ${MON[m - 1]}`;
        el.querySelectorAll(".tl-m").forEach((c) => { const k = +c.dataset.m; c.classList.toggle("rec", k <= m); c.classList.toggle("now", k === m); c.classList.toggle("exp", t.isType === "Expense"); c.classList.toggle("rev", t.isType !== "Expense"); });
        el.querySelector(".tm-fill.bs").style.width = (bsV / total) * 100 + "%";
        el.querySelector(".tm-fill.is").style.width = (isV / total) * 100 + "%";
        el.querySelector(".tm-v.bs").textContent = $$(bsV);
        el.querySelector(".tm-v.is").textContent = $$(isV);
        const mark = el.querySelector(".tl-cash-mark");
        mark.classList.toggle("hit", deferral ? true : m >= t.months);
        let entry = "";
        if (m === 0) entry = deferral ? `<div class="eyebrow">Original entry (Jan 1)</div>${jeMini(t.cashIn ? [["Cash", t.cash, null], [t.bs, null, t.cash]] : [[t.bs, t.cash, null], ["Cash", null, t.cash]])}` : `<div class="eyebrow">Jan 1</div><p class="muted" style="margin:0">No entry yet: no cash has moved and nothing has been earned or used.</p>`;
        else {
          entry = `<div class="eyebrow">Adjusting entry, ${MON[m - 1]} ${[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]}</div>${jeMini([[t.dr, t.per, null], [t.cr, null, t.per]])}`;
          if (!deferral && m >= t.months) entry += `<div class="eyebrow" style="margin-top:8px">Then the cash ${t.cashIn ? "collection" : "payment"}</div>${jeMini(t.cashIn ? [["Cash", t.cash, null], [t.bs, null, t.cash]] : [[t.bs, t.cash, null], ["Cash", null, t.cash]])}`;
        }
        el.querySelector(".tm-entry").innerHTML = entry;
      }
      el.addEventListener("click", (e) => {
        const tb = e.target.closest("[data-t]"); if (tb) { halt(); key = tb.dataset.t; setup(); return; }
        const b = e.target.closest('[data-a="play"]'); if (!b) return;
        if (timer) { halt(); return; }
        const t = TIMING[key]; if (m >= t.months) m = 0;
        playBtn.textContent = "❚❚ Pause";
        const tick = () => { if (m >= TIMING[key].months) { halt(); return; } m++; range.value = m; draw(); };
        tick(); timer = every(el, tick, t.months > 6 ? 900 : 1500);
      });
      range.addEventListener("input", () => { halt(); m = +range.value; draw(); });
      setup();
    });

  /* ------------------------------------------------------------------ */
  /* 8. Depreciation visualizer (Ch 4)                                   */
  /* ------------------------------------------------------------------ */
  reg("depreciation", 4, "Straight-line depreciation, visualized",
    "Set the cost, residual value and useful life. The shaded area is accumulated depreciation; the line is the carrying amount.",
    (el) => {
      const st = { cost: 40000, res: 1000, life: 10, yr: 1 };
      el.innerHTML = `<div class="dg-sliders">${slider("cost", "Cost", 2000, 100000, 1000, st.cost)}${slider("res", "Residual value", 0, 20000, 500, st.res)}${slider("life", "Useful life", 1, 20, 1, st.life)}${slider("yr", "Show year", 0, 20, 1, st.yr)}</div>
        <div class="dep-wrap"><div class="dep-chart"></div>
          <div class="dep-side"><div class="dep-stat"><span>Annual depreciation</span><b data-v="ann"></b><small>(Cost − Residual) ÷ Life</small></div>
            <div class="dep-stat"><span data-v="aclab">Accumulated depreciation</span><b data-v="acc" class="c"></b></div>
            <div class="dep-stat"><span>Carrying amount</span><b data-v="ca" class="d"></b><small>Cost − Accumulated depreciation</small></div>
            <div class="dep-entry"></div></div></div>`;
      const fmt = { life: (v) => v + " yr" + (v === 1 ? "" : "s"), yr: (v) => v === 0 ? "purchase date" : "end of year " + v };
      const yrInput = el.querySelector('input[data-k="yr"]'), resInput = el.querySelector('input[data-k="res"]');
      function draw() {
        if (st.res > st.cost) { st.res = st.cost; resInput.value = st.cost; }
        resInput.max = Math.min(20000, st.cost);
        yrInput.max = st.life; if (st.yr > st.life) { st.yr = st.life; yrInput.value = st.life; }
        el.querySelectorAll("[data-out]").forEach((o) => { const k = o.dataset.out; o.textContent = fmt[k] ? fmt[k](st[k]) : $$(st[k]); });
        const { cost, res, life, yr } = st, ann = (cost - res) / life, acc = ann * yr, ca = cost - acc;
        const X0 = 62, X1 = 580, Y0 = 18, Y1 = 250;
        const x = (t) => X0 + (t / life) * (X1 - X0), y = (v) => Y1 - (v / cost) * (Y1 - Y0);
        const grid = [0, 0.25, 0.5, 0.75, 1].map((f) => `<line x1="${X0}" x2="${X1}" y1="${y(cost * f)}" y2="${y(cost * f)}" class="grid"></line><text x="${X0 - 8}" y="${y(cost * f) + 4}" text-anchor="end" class="ax">${kfmt(cost * f)}</text>`).join("");
        const stepT = life > 12 ? 2 : 1;
        const ticks = Array.from({ length: Math.floor(life / stepT) + 1 }, (_, k) => k * stepT).map((t) => `<text x="${x(t)}" y="${Y1 + 18}" text-anchor="middle" class="ax">${t === 0 ? "0" : "Y" + t}</text>`).join("");
        el.querySelector(".dep-chart").innerHTML = `<svg viewBox="0 0 600 280" role="img" aria-label="Carrying amount falls from cost to residual value over the useful life">
          ${grid}
          <polygon points="${x(0)},${y(cost)} ${x(life)},${y(res)} ${x(life)},${Y1} ${x(0)},${Y1}" class="area-ca"></polygon>
          <polygon points="${x(0)},${y(cost)} ${x(life)},${y(cost)} ${x(life)},${y(res)}" class="area-acc"></polygon>
          <line x1="${x(0)}" y1="${y(res)}" x2="${x(life)}" y2="${y(res)}" class="res-line"></line>
          <text x="${x(0) + 6}" y="${y(res) - 6}" class="ax">Residual ${kfmt(res)}</text>
          <line x1="${x(0)}" y1="${y(cost)}" x2="${x(life)}" y2="${y(res)}" class="ca-line"></line>
          ${(cost - res) / cost > 0.18 ? `<text x="${x(life * 0.8)}" y="${y(cost - (cost - res) * 0.35) + 4}" text-anchor="middle" class="lab-acc">Accumulated depreciation</text>` : ""}
          <text x="${x(life * 0.22)}" y="${y((cost - (cost - res) * 0.22) * 0.45) + 4}" text-anchor="middle" class="lab-ca">Carrying amount</text>
          <line x1="${x(yr)}" x2="${x(yr)}" y1="${Y0}" y2="${Y1}" class="yr-line"></line>
          <circle cx="${x(yr)}" cy="${y(ca)}" r="6" class="yr-dot"></circle>
          <line x1="${X0}" x2="${X1}" y1="${Y1}" y2="${Y1}" class="axis"></line>
          ${ticks}</svg>`;
        el.querySelector('[data-v="ann"]').textContent = $$(ann);
        el.querySelector('[data-v="aclab"]').textContent = yr === 0 ? "Accumulated depreciation" : `Accumulated depreciation (after ${yr} yr${yr === 1 ? "" : "s"})`;
        el.querySelector('[data-v="acc"]').textContent = $$(acc);
        el.querySelector('[data-v="ca"]').textContent = $$(ca);
        el.querySelector(".dep-entry").innerHTML = yr === 0 ? `<div class="eyebrow">Purchase</div>${jeMini([["Equipment", cost, null], ["Cash", null, cost]])}` : `<div class="eyebrow">Year-end adjusting entry, year ${yr}</div>${jeMini([["Depreciation Expense", ann, null], ["Accumulated Depreciation", null, ann]])}`;
      }
      bindSliders(el, st, draw, fmt);
      draw();
    });

  /* ------------------------------------------------------------------ */
  /* 9. Closing process animation (Ch 4)                                 */
  /* ------------------------------------------------------------------ */
  reg("closing", 4, "The closing process, animated",
    "Lynk Software Services at Oct 31. Watch the temporary accounts empty into Income Summary and then into Capital.",
    (el) => {
      const TEMP = [["Service Revenue", 11400, "rev"], ["Depreciation Expense", 83, "exp"], ["Insurance Expense", 50, "exp"], ["Rent Expense", 900, "exp"], ["Salaries Expense", 4800, "exp"], ["Supplies Expense", 1500, "exp"], ["Interest Expense", 25, "exp"], ["T. Jacobs, Drawings", 500, "draw"]];
      const STEPS = [
        { t: "Close revenues", say: "Debit each revenue for its balance; credit Income Summary.", lines: [["Service Revenue", 11400, null], ["Income Summary", null, 11400]] },
        { t: "Close expenses", say: "Debit Income Summary for total expenses; credit each expense.", lines: [["Income Summary", 7358, null], ["Depreciation Expense", null, 83], ["Insurance Expense", null, 50], ["Rent Expense", null, 900], ["Salaries Expense", null, 4800], ["Supplies Expense", null, 1500], ["Interest Expense", null, 25]] },
        { t: "Close Income Summary", say: "Its $4,042 credit balance is the profit. Move it to Capital (a loss would be debited).", lines: [["Income Summary", 4042, null], ["T. Jacobs, Capital", null, 4042]] },
        { t: "Close drawings", say: "Drawings (dividends for a corporation) go straight to Capital. They never touch Income Summary.", lines: [["T. Jacobs, Capital", 500, null], ["T. Jacobs, Drawings", null, 500]] }
      ];
      let s = 0, busy = false;
      el.innerHTML = `<div class="dg-toolbar"><button class="btn primary" data-a="next">Run step 1 →</button><button class="btn" data-a="reset">Reset</button><span class="dg-count"></span></div>
        <div class="dg-caption" aria-live="polite"></div>
        <div class="close-grid">
          <div class="close-temp"><div class="eyebrow">Temporary accounts</div>${TEMP.map((r) => `<div class="ct-row ${r[2]}" data-n="${esc(r[0])}"><span>${esc(r[0])}</span><div class="ct-bar"><i style="width:${(r[1] / 11400) * 100}%"></i></div><b>${n0(r[1])} ${r[2] === "rev" ? "Cr" : "Dr"}</b></div>`).join("")}</div>
          <div class="close-perm">
            <div class="tacc big" data-acct="is"><div class="tacc-h">Income Summary</div><div class="tacc-b"><div class="tacc-l"></div><div class="tacc-r"></div></div><div class="tacc-bal"></div></div>
            <div class="tacc big" data-acct="cap"><div class="tacc-h">T. Jacobs, Capital</div><div class="tacc-b"><div class="tacc-l"></div><div class="tacc-r"><div class="tacc-amt muted">10,000</div></div></div><div class="tacc-bal"></div></div>
          </div>
        </div>
        <div class="close-je"></div>`;
      const row = (n) => [...el.querySelectorAll(".ct-row")].find((r) => r.dataset.n === n);
      const T = (k) => el.querySelector(`[data-acct="${k}"]`);
      let isBal = 0, capBal = 10000;
      function zero(n) { const r = row(n); r.classList.add("closed"); r.querySelector("i").style.width = "0%"; r.querySelector("b").textContent = "0 ✓"; }
      function add(k, side, amt) { const d = document.createElement("div"); d.className = "tacc-amt"; d.textContent = n0(amt); T(k).querySelector(side === "l" ? ".tacc-l" : ".tacc-r").appendChild(d); flash(T(k)); }
      function bals() {
        T("is").querySelector(".tacc-bal").innerHTML = isBal === 0 ? `<span class="muted">Bal 0</span>` : `Bal <b class="${isBal > 0 ? "c" : "d"}">${n0(isBal)} ${isBal > 0 ? "Cr" : "Dr"}</b>`;
        T("cap").querySelector(".tacc-bal").innerHTML = `Bal <b class="c">${n0(capBal)} Cr</b>`;
        el.querySelector(".dg-count").textContent = `${s} / 4 steps`;
        const nb = el.querySelector('[data-a="next"]');
        nb.disabled = s >= 4; nb.textContent = s >= 4 ? "Done" : `Run step ${s + 1} →`;
      }
      async function run() {
        if (busy || s >= 4) return; busy = true;
        const st = STEPS[s];
        el.querySelector(".dg-caption").innerHTML = `<b>Step ${s + 1}: ${st.t}.</b> ${st.say}`;
        el.querySelector(".close-je").innerHTML = `<div class="eyebrow">Closing entry ${s + 1}</div>${jeMini(st.lines)}`;
        if (s === 0) { await fly(el, row("Service Revenue"), T("is").querySelector(".tacc-r"), "11,400", "c"); add("is", "r", 11400); isBal += 11400; zero("Service Revenue"); }
        if (s === 1) {
          for (const r of TEMP.filter((x) => x[2] === "exp")) { await fly(el, row(r[0]), T("is").querySelector(".tacc-l"), n0(r[1]), "d"); zero(r[0]); await sleep(40); }
          add("is", "l", 7358); isBal -= 7358;
        }
        if (s === 2) { await fly(el, T("is").querySelector(".tacc-bal"), T("cap").querySelector(".tacc-r"), "4,042", "c"); add("is", "l", 4042); isBal -= 4042; add("cap", "r", 4042); capBal += 4042; }
        if (s === 3) { await fly(el, row("T. Jacobs, Drawings"), T("cap").querySelector(".tacc-l"), "500", "d"); zero("T. Jacobs, Drawings"); add("cap", "l", 500); capBal -= 500; }
        s++; bals();
        if (s === 4) el.querySelector(".dg-caption").innerHTML += ` <span class="ok">All temporary accounts are zero. Capital = 10,000 + 4,042 − 500 = <b>$13,542</b>.</span>`;
        busy = false;
      }
      el.addEventListener("click", (e) => {
        const b = e.target.closest("[data-a]"); if (!b) return;
        if (b.dataset.a === "next") run();
        if (b.dataset.a === "reset" && !busy) { const fresh = el.cloneNode(false); el.replaceWith(fresh); D.closing.mount(fresh); }
      });
      el.querySelector(".dg-caption").innerHTML = `<b>Before closing:</b> revenue, expenses and drawings still hold this period’s balances. Press <i>Run step 1</i>.`;
      bals();
    });

  /* ------------------------------------------------------------------ */
  /* 10. Inventory cost flow (Ch 5)                                      */
  /* ------------------------------------------------------------------ */
  reg("inventory", 5, "Where inventory costs go",
    "Goods available for sale is one pool of cost. It ends up either as cost of goods sold (expense) or ending inventory (asset).",
    (el) => {
      const st = { beg: 8000, pur: 40000, end: 10000 };
      el.innerHTML = `<div class="dg-sliders">${slider("beg", "Beginning inventory", 0, 50000, 500, st.beg)}${slider("pur", "Purchases (net)", 0, 100000, 1000, st.pur)}${slider("end", "Ending inventory (count)", 0, 150000, 500, st.end)}</div>
        <div class="inv">
          <div class="inv-row"><span class="inv-lab">In</span><div class="inv-bar"><i class="beg"><em>Beginning</em></i><i class="pur"><em>Purchases</em></i></div></div>
          <div class="inv-mid"><span>= Goods available for sale <b data-v="gafs"></b></span></div>
          <div class="inv-row"><span class="inv-lab">Out</span><div class="inv-bar"><i class="cogs"><em>COGS → income statement</em></i><i class="end"><em>Ending inventory → balance sheet</em></i></div></div>
          <div class="formula small inv-f"></div>
        </div>`;
      const endIn = el.querySelector('input[data-k="end"]');
      function draw() {
        const gafs = st.beg + st.pur;
        endIn.max = gafs; if (st.end > gafs) { st.end = gafs; endIn.value = gafs; }
        el.querySelectorAll("[data-out]").forEach((o) => (o.textContent = $$(st[o.dataset.out])));
        const cogs = gafs - st.end, pct = (v) => (gafs ? (v / gafs) * 100 : 0) + "%";
        el.querySelector("i.beg").style.width = pct(st.beg); el.querySelector("i.pur").style.width = pct(st.pur);
        el.querySelector("i.cogs").style.width = pct(cogs); el.querySelector("i.end").style.width = pct(st.end);
        el.querySelector("i.beg em").textContent = `Beginning ${$$(st.beg)}`; el.querySelector("i.pur em").textContent = `Purchases ${$$(st.pur)}`;
        el.querySelector("i.cogs em").textContent = `COGS ${$$(cogs)}`; el.querySelector("i.end em").textContent = `Ending inv. ${$$(st.end)}`;
        el.querySelector('[data-v="gafs"]').textContent = $$(gafs);
        el.querySelector(".inv-f").textContent = `${$$(st.beg)} + ${$$(st.pur)} − ${$$(st.end)} = ${$$(cogs)} COGS`;
      }
      bindSliders(el, st, draw);
      draw();
    });

  /* ------------------------------------------------------------------ */
  /* 11. 2/10, n/30 discount window (Ch 5)                               */
  /* ------------------------------------------------------------------ */
  reg("discount", 5, "The 2/10, n/30 discount window",
    "Mandy Moto’s $12,000 invoice dated Nov 15. Slide the payment date and flip between the buyer’s and seller’s books.",
    (el) => {
      let d = 5, view = "buyer";
      const sid = `dg${++uid}-day`;
      const INV = 12000, base = new Date(2026, 10, 15);
      el.innerHTML = `<div class="seg dg-tabs"><button data-v="buyer">Buyer (Mandy Moto)</button><button data-v="seller">Seller (Coach Mfg.)</button></div>
        <div class="disc-tl"><div class="disc-band good" style="width:${(10 / 30) * 100}%"><span>Discount period · 2% off</span></div><div class="disc-band full" style="width:${(20 / 30) * 100}%"><span>Credit period · full amount</span></div><i class="disc-mark"></i></div>
        <div class="disc-scale"><span>Nov 15</span><span>Nov 25</span><span>Dec 15</span></div>
        <label class="dg-slider" for="${sid}"><span>Payment date <b class="disc-date"></b></span><input type="range" id="${sid}" min="0" max="30" step="1" value="${d}"></label>
        <div class="disc-out"><div class="disc-big"></div><div class="disc-je"></div></div>`;
      function draw() {
        const date = new Date(base); date.setDate(base.getDate() + d);
        const inDisc = d <= 10, disc = inDisc ? INV * 0.02 : 0, cash = INV - disc;
        el.querySelectorAll("[data-v]").forEach((b) => b.classList.toggle("on", b.dataset.v === view));
        el.querySelector(".disc-date").textContent = `${date.toLocaleDateString("en-CA", { month: "short", day: "numeric" })} (day ${d})`;
        const mk = el.querySelector(".disc-mark"); mk.style.left = (d / 30) * 100 + "%"; mk.className = "disc-mark " + (inDisc ? "good" : "full");
        el.querySelector(".disc-big").innerHTML = inDisc
          ? `<b class="pos">${view === "buyer" ? "Pay" : "Collect"} ${$$(cash)}</b><span>${view === "buyer" ? "Saves" : "Gives up"} ${$$(disc)} (2% × $12,000). Last day for the discount: Nov 25.</span>`
          : `<b>${view === "buyer" ? "Pay" : "Collect"} ${$$(cash)}</b><span>Discount period is over, so the full amount is due by Dec 15.</span>`;
        const lines = view === "buyer"
          ? (inDisc ? [["Accounts Payable", INV, null], ["Merchandise Inventory", null, disc], ["Cash", null, cash]] : [["Accounts Payable", INV, null], ["Cash", null, cash]])
          : (inDisc ? [["Cash", cash, null], ["Sales Discounts", disc, null], ["Accounts Receivable", null, INV]] : [["Cash", cash, null], ["Accounts Receivable", null, INV]]);
        el.querySelector(".disc-je").innerHTML = `<div class="eyebrow">${view === "buyer" ? "Buyer" : "Seller"}’s entry (perpetual)</div>${jeMini(lines)}${inDisc ? `<p class="muted" style="margin:6px 0 0">${view === "buyer" ? "Perpetual system: the discount reduces the cost of the inventory." : "Sales Discounts is a contra-revenue account."}</p>` : ""}`;
      }
      el.addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (b) { view = b.dataset.v; draw(); } });
      el.querySelector("input[type=range]").addEventListener("input", (e) => { d = +e.target.value; draw(); });
      draw();
    });

  window.DIAGRAMS = D;
  window.DIAGRAM_ORDER = ORDER;
})();
