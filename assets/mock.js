/*
 * Interactive mock exam engine. Renders a MOCK_EXAMS entry (data/mock-midterm1.js),
 * auto-grades every part, breaks results down by topic and keeps answers in this browser.
 */
(function () {
  "use strict";
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const n0 = (n) => Math.round(Math.abs(n)).toLocaleString("en-CA");
  const num = (s) => { let t = String(s == null ? "" : s).replace(/[$,\s]/g, ""); if (/^\(.*\)$/.test(t)) t = "-" + t.slice(1, -1); const v = parseFloat(t); return isNaN(v) ? null : v; };
  const half = (x) => Math.round(x * 2) / 2;
  const fmtM = (x) => (Math.round(x * 10) / 10).toString();
  let lineSeq = 0;

  function jeTable(items) {
    return `<div class="table-wrap"><table class="je"><thead><tr><th>Date</th><th>Account</th><th class="num">Debit</th><th class="num">Credit</th></tr></thead><tbody>${items.map((it) => (!it.lines.length ? `<tr class="first"><td class="date">${esc(it.date)}</td><td colspan="3"><i>${esc(it.none || "No entry required")}</i></td></tr>` : "") + it.lines.map((l, i) =>
      `<tr class="${i === 0 ? "first" : ""}"><td class="date">${i === 0 ? esc(it.date) : ""}</td><td class="${l[1] == null ? "credit-acct" : ""}">${esc(l[0])}</td><td class="num d">${l[1] != null ? n0(l[1]) : ""}</td><td class="num c">${l[2] != null ? n0(l[2]) : ""}</td></tr>`).join("") + (it.kind ? `<tr class="memo"><td></td><td colspan="3">${esc(it.kind)}</td></tr>` : "")).join("")}</tbody></table></div>`;
  }
  function tbTable(tb) {
    let d = 0, c = 0;
    const rows = tb.rows.map((r) => { d += r[1] || 0; c += r[2] || 0; return `<tr><td>${esc(r[0])}</td><td class="num d">${r[1] != null ? n0(r[1]) : ""}</td><td class="num c">${r[2] != null ? n0(r[2]) : ""}</td></tr>`; }).join("");
    return `<div class="table-wrap"><table class="je"><thead><tr><th>${esc(tb.title)}</th><th class="num">Debit</th><th class="num">Credit</th></tr></thead><tbody>${rows}<tr class="tot"><td>Totals</td><td class="num">$${n0(d)}</td><td class="num">$${n0(c)}</td></tr></tbody></table></div>`;
  }

  function partMarks(p) {
    if (p.type === "order") return p.marks;
    return p.items.length * p.marksEach;
  }

  function render(el, mock, opts) {
    opts = opts || {};
    const KEY = "acct212.mock." + mock.id;
    const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
    const saveState = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* ignore */ } };
    let state = load();
    state.a = state.a || {};
    const total = mock.parts.reduce((s, p) => s + partMarks(p), 0);
    const topicName = (id) => (mock.topics.find((t) => t.id === id) || {}).label || id;
    const accOpts = (list) => list.map((a) => `<option value="${esc(a)}">${esc(a)}</option>`).join("");
    const ACC = accOpts(mock.accounts || []);
    const accFor = (pid) => { const p = mock.parts.find((x) => x.id === pid); return p && p.accounts ? accOpts(p.accounts) : ACC; };

    /* ---------- part renderers ---------- */
    function givenHtml(gv) {
      if (gv.list) return `<div class="given-list"><div class="eyebrow">${esc(gv.title)}</div><div class="gl-grid">${gv.list.map((r) => `<div><span>${esc(r[0])}</span><b>$${n0(r[1])}</b></div>`).join("")}</div></div>`;
      return `<details class="note given"><summary>Given: ${esc(gv.title)}</summary><div class="body">${tbTable(gv)}</div></details>`;
    }
    function jeRow(pid, i, r, line) {
      const id = `m-${pid}-${i}-${r}`;
      return `<div class="jr" data-r="${r}"><select id="${id}-a" data-f="a" aria-label="Account"><option value="">Account…</option>${accFor(pid)}</select>
        <input id="${id}-d" data-f="d" inputmode="decimal" placeholder="Debit" aria-label="Debit" value="${esc(line && line[1] || "")}">
        <input id="${id}-c" data-f="c" inputmode="decimal" placeholder="Credit" aria-label="Credit" value="${esc(line && line[2] || "")}">
        <button class="jr-x" data-act="rmline" aria-label="Remove line" title="Remove line">×</button></div>`;
    }
    function renderPart(p) {
      const a = state.a[p.id] || {};
      let body = "";
      if (p.type === "mc") {
        body = p.items.map((q, i) => `<div class="mq" data-i="${i}"><p class="mq-q"><b>${i + 1}.</b> ${esc(q.q)}</p><div class="mq-opts">${q.options.map((o, k) =>
          `<label class="mq-opt"><input type="radio" id="m-${p.id}-${i}-${k}" name="m-${p.id}-${i}" value="${k}" ${a[i] === k ? "checked" : ""}><span>${esc(o)}</span></label>`).join("")}</div><div class="mq-fb"></div></div>`).join("");
      } else if (p.type === "classify") {
        body = `<div class="table-wrap"><table class="cls"><thead><tr><th>Account</th>${p.columns.map((c) => `<th>${esc(c.label)}</th>`).join("")}<th></th></tr></thead><tbody>${p.items.map((it, i) =>
          `<tr data-i="${i}"><td><b>${esc(it.acct)}</b></td>${p.columns.map((c) => `<td><select id="m-${p.id}-${i}-${c.key}" data-col="${c.key}" aria-label="${esc(c.label)} for ${esc(it.acct)}"><option value="">—</option>${c.options.map((o) => `<option ${a[i] && a[i][c.key] === o ? "selected" : ""}>${esc(o)}</option>`).join("")}</select></td>`).join("")}<td class="cls-fb"></td></tr>`).join("")}</tbody></table></div>`;
      } else if (p.type === "order") {
        const order = Array.isArray(a.order) && a.order.length === p.items.length ? a.order : p.start.slice();
        body = `<ol class="ord">${order.map((ix, pos) => `<li data-ix="${ix}"><span class="ord-n">${pos + 1}</span><span class="ord-t">${esc(p.items[ix])}</span>
          <button class="btn ord-b" data-act="up" aria-label="Move up" ${pos === 0 ? "disabled" : ""}>↑</button><button class="btn ord-b" data-act="down" aria-label="Move down" ${pos === order.length - 1 ? "disabled" : ""}>↓</button></li>`).join("")}</ol>`;
      } else if (p.type === "je") {
        body = (p.given ? givenHtml(p.given) : "") + p.items.map((it, i) => {
          const saved = (a[i] && a[i].length ? a[i] : [["", "", ""], ["", "", ""]]);
          return `<div class="jq" data-i="${i}"><div class="jq-h"><span class="jq-date">${esc(it.date)}</span><span>${esc(it.text)}</span><span class="jq-m">${p.marksEach} marks</span></div>
            <div class="jq-rows">${saved.map((l, r) => jeRow(p.id, i, r, l)).join("")}</div>
            <div class="jq-foot"><button class="btn small" data-act="addline">+ line</button><span class="jq-tot"></span></div><div class="jq-fb"></div></div>`;
        }).join("");
      } else if (p.type === "numeric") {
        body = (p.given ? givenHtml(p.given) : "") +
          `<div class="nq-list">${p.items.map((it, i) => `<div class="nq" data-i="${i}"><label for="m-${p.id}-${i}">${esc(it.label)}${it.hint ? `<small>${esc(it.hint)}</small>` : ""}</label>
            <div class="nq-in"><span>$</span><input id="m-${p.id}-${i}" inputmode="decimal" value="${esc(a[i] || "")}" placeholder="0"></div><span class="nq-fb"></span></div>`).join("")}</div>`;
      }
      return `<section class="card mock-part" id="part-${p.id}" data-p="${p.id}">
        <div class="mp-head"><h2>Part ${p.id} · ${esc(p.title)}</h2><span class="tag">${fmtM(partMarks(p))} marks</span></div>
        ${p.note ? `<p class="muted">${esc(p.note)}</p>` : ""}
        ${body}
        <div class="mp-foot"><button class="btn primary" data-act="check">Check Part ${p.id}</button><button class="btn" data-act="sol">Show solution</button><span class="mp-score" aria-live="polite"></span></div>
        <div class="mp-sol" hidden></div></section>`;
    }

    /* ---------- read answers from the DOM ---------- */
    function read(p) {
      const sec = el.querySelector(`#part-${p.id}`);
      if (p.type === "mc") { const o = {}; p.items.forEach((q, i) => { const r = sec.querySelector(`input[name="m-${p.id}-${i}"]:checked`); if (r) o[i] = +r.value; }); return o; }
      if (p.type === "classify") { const o = {}; sec.querySelectorAll("tr[data-i]").forEach((tr) => { o[tr.dataset.i] = {}; tr.querySelectorAll("select").forEach((s) => (o[tr.dataset.i][s.dataset.col] = s.value)); }); return o; }
      if (p.type === "order") return { order: [...sec.querySelectorAll(".ord li")].map((li) => +li.dataset.ix) };
      if (p.type === "je") { const o = {}; sec.querySelectorAll(".jq").forEach((q) => { o[q.dataset.i] = [...q.querySelectorAll(".jr")].map((r) => [r.querySelector('[data-f="a"]').value, r.querySelector('[data-f="d"]').value, r.querySelector('[data-f="c"]').value]); }); return o; }
      if (p.type === "numeric") { const o = {}; sec.querySelectorAll(".nq").forEach((q) => (o[q.dataset.i] = q.querySelector("input").value)); return o; }
    }
    let saveT;
    function persist() { clearTimeout(saveT); saveT = setTimeout(() => { mock.parts.forEach((p) => (state.a[p.id] = read(p))); saveState(state); }, 250); }

    /* ---------- graders: return { earned, possible, topics: {id: [earned, possible]} } ---------- */
    function addT(t, ids, e, pos) { (Array.isArray(ids) ? ids : [ids]).forEach((id) => { t[id] = t[id] || [0, 0]; t[id][0] += e; t[id][1] += pos; }); }
    function gradeJE(user, sol) {
      const u = user.map((l) => [l[0], num(l[1]) || 0, num(l[2]) || 0]).filter((l) => l[0] || l[1] || l[2]);
      if (!sol.length) return { frac: u.length ? 0 : 1, balanced: true, dr: 0, cr: 0, empty: false, noEntry: true };
      const left = sol.map((l) => [l[0], l[1] || 0, l[2] || 0]);
      let matched = 0;
      u.forEach((l) => { const k = left.findIndex((s) => s[0] === l[0] && Math.abs(s[1] - l[1]) < 0.5 && Math.abs(s[2] - l[2]) < 0.5); if (k >= 0) { matched++; left.splice(k, 1); } });
      const denom = Math.max(sol.length, u.length);
      const dr = u.reduce((s, l) => s + l[1], 0), cr = u.reduce((s, l) => s + l[2], 0);
      return { frac: denom ? matched / denom : 0, balanced: Math.abs(dr - cr) < 0.5 && dr > 0, dr, cr, empty: !u.length };
    }
    function grade(p, show) {
      const sec = el.querySelector(`#part-${p.id}`), a = read(p), t = {};
      let earned = 0;
      if (p.type === "mc") p.items.forEach((q, i) => {
        const ok = a[i] === q.answer, box = sec.querySelector(`.mq[data-i="${i}"]`);
        if (ok) earned += p.marksEach;
        addT(t, q.topic, ok ? p.marksEach : 0, p.marksEach);
        if (show) {
          box.querySelectorAll(".mq-opt").forEach((lab, k) => { lab.classList.toggle("right", k === q.answer); lab.classList.toggle("wrong", k === a[i] && !ok); });
          box.querySelector(".mq-fb").innerHTML = `<span class="${ok ? "ok" : "no"}">${ok ? "✓ Correct." : a[i] == null ? "Not answered." : "✗ Not quite."}</span> ${esc(q.why)}`;
        }
      });
      if (p.type === "classify") p.items.forEach((it, i) => {
        let e = 0; const row = sec.querySelector(`tr[data-i="${i}"]`), miss = [];
        p.columns.forEach((c) => { const ok = a[i] && a[i][c.key] === it[c.key]; if (ok) e += p.marksEach / p.columns.length; else miss.push(it[c.key]); if (show) row.querySelector(`[data-col="${c.key}"]`).classList.toggle("bad", !ok); });
        earned += e; addT(t, it.topics || p.topic, e, p.marksEach);
        if (show) row.querySelector(".cls-fb").innerHTML = miss.length ? `<span class="no">→ ${esc(miss.join(" · "))}</span>` : `<span class="ok">✓</span>`;
      });
      if (p.type === "order") {
        let right = 0;
        sec.querySelectorAll(".ord li").forEach((li, pos) => { const ok = +li.dataset.ix === pos; if (ok) right++; if (show) { li.classList.toggle("right", ok); li.classList.toggle("wrong", !ok); } });
        earned = half((right / p.items.length) * p.marks);
        addT(t, p.topic, earned, p.marks);
      }
      if (p.type === "je") p.items.forEach((it, i) => {
        const g = gradeJE(a[i] || [], it.lines), e = half(g.frac * p.marksEach), q = sec.querySelector(`.jq[data-i="${i}"]`);
        earned += e; addT(t, it.topics || p.topic, e, p.marksEach);
        if (show) {
          q.classList.toggle("right", e === p.marksEach); q.classList.toggle("wrong", e < p.marksEach);
          q.querySelector(".jq-fb").innerHTML = e === p.marksEach
            ? `<span class="ok">✓ ${e}/${p.marksEach}</span>${g.noEntry ? ` <span class="muted">${esc(it.none || "No entry required.")}</span>` : it.kind ? ` <span class="muted">${esc(it.kind)}</span>` : ""}`
            : g.noEntry ? `<span class="no">0/${p.marksEach}.</span> ${esc(it.none || "No entry was required.")}`
            : `<span class="no">${g.empty ? "Not answered." : `${fmtM(e)}/${p.marksEach}.`}</span>${!g.empty && !g.balanced ? ` <span class="muted">Your debits (${n0(g.dr)}) ≠ credits (${n0(g.cr)}).</span>` : ""} Correct entry:${jeTable([Object.assign({}, it, { date: "" })])}`;
        }
      });
      if (p.type === "numeric") p.items.forEach((it, i) => {
        const v = num(a[i]), ok = v != null && Math.abs(v - it.answer) <= 1, row = sec.querySelector(`.nq[data-i="${i}"]`);
        if (ok) earned += p.marksEach;
        addT(t, it.topics || p.topic, ok ? p.marksEach : 0, p.marksEach);
        if (show) { row.classList.toggle("right", ok); row.classList.toggle("wrong", !ok); row.querySelector(".nq-fb").innerHTML = ok ? `<span class="ok">✓</span>` : `<span class="no">$${n0(it.answer)}</span>`; }
      });
      if (show) sec.querySelector(".mp-score").innerHTML = `<b>${fmtM(earned)} / ${fmtM(partMarks(p))}</b>`;
      return { earned, possible: partMarks(p), topics: t };
    }

    function solution(p) {
      if (p.type === "mc") return `<ol class="sol-list">${p.items.map((q) => `<li><b>${esc(q.options[q.answer])}</b>: ${esc(q.why)}</li>`).join("")}</ol>`;
      if (p.type === "classify") return `<div class="table-wrap"><table><thead><tr><th>Account</th>${p.columns.map((c) => `<th>${esc(c.label)}</th>`).join("")}</tr></thead><tbody>${p.items.map((it) => `<tr><td>${esc(it.acct)}</td>${p.columns.map((c) => `<td>${esc(it[c.key])}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      if (p.type === "order") return `<ol class="sol-list">${p.items.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>`;
      if (p.type === "je") return jeTable(p.items);
      if (p.type === "numeric") return `<ul class="sol-list">${p.items.map((it) => `<li>${esc(it.label)}: <b>$${n0(it.answer)}</b></li>`).join("")}</ul>${p.solution && mock.solutions[p.solution] ? mock.solutions[p.solution] : ""}`;
    }

    /* ---------- whole-exam results ---------- */
    function gradeAll() {
      const T = {}; let e = 0, pos = 0; const per = [];
      mock.parts.forEach((p) => { const r = grade(p, true); e += r.earned; pos += r.possible; per.push([p, r]); Object.keys(r.topics).forEach((k) => addT(T, k, r.topics[k][0], r.topics[k][1])); });
      const pct = pos ? (e / pos) * 100 : 0;
      const letter = opts.letter ? opts.letter(pct) : "";
      const rows = mock.topics.filter((tp) => T[tp.id]).map((tp) => ({ tp, pct: (T[tp.id][0] / T[tp.id][1]) * 100, e: T[tp.id][0], p: T[tp.id][1] })).sort((x, y) => x.pct - y.pct);
      const res = el.querySelector(".mock-result");
      res.hidden = false;
      res.innerHTML = `<div class="mr-top"><div><div class="eyebrow">${mock.practice ? "Your result" : "Your mock result"}</div><div class="mr-score">${pct.toFixed(1)}%</div><div class="muted">${fmtM(e)} / ${fmtM(pos)} marks${letter ? " · " + letter : ""}</div></div>
        <div class="mr-parts">${per.map(([p, r]) => `<a href="#part-${p.id}" data-jump="part-${p.id}"><span>Part ${p.id}</span><b>${fmtM(r.earned)}/${fmtM(r.possible)}</b></a>`).join("")}</div></div>
        <h3>By topic <span class="muted">(weakest first)</span></h3>
        <div class="mr-topics">${rows.map((r) => `<div class="mr-t"><div class="mr-tl"><b>${esc(r.tp.label)}</b><span>${Math.round(r.pct)}%</span></div>
          <div class="mr-bar"><i class="${r.pct >= 80 ? "good" : r.pct >= 60 ? "mid" : "low"}" style="width:${r.pct}%"></i></div>
          ${r.pct < 80 ? `<div class="mr-learn">Review: ${r.tp.learn.map((l) => `<a href="${l[1]}">${esc(l[0])}</a>`).join(" · ")}</div>` : ""}</div>`).join("")}</div>`;
      state.last = { pct: Math.round(pct * 10) / 10, at: Date.now() };
      saveState(state);
      if (opts.onGraded) opts.onGraded(pct, rows);
      res.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    /* ---------- timer ---------- */
    let tick;
    function drawTimer() {
      if (!mock.minutes) return;
      const box = el.querySelector(".mock-timer"), btn = el.querySelector('[data-act="timer"]');
      if (!state.endAt) { box.textContent = `${mock.minutes}:00`; box.className = "mock-timer"; btn.textContent = `Start ${mock.minutes}-min timer`; return; }
      const left = Math.max(0, state.endAt - Date.now());
      const m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
      box.textContent = `${m}:${String(s).padStart(2, "0")}`;
      box.className = "mock-timer on" + (left < 10 * 60000 ? " low" : "") + (left === 0 ? " done" : "");
      btn.textContent = "Stop timer";
      if (left === 0) { el.querySelector(".mock-timeup").hidden = false; clearInterval(tick); }
    }
    function startTick() { clearInterval(tick); tick = setInterval(() => { if (!el.isConnected) { clearInterval(tick); return; } drawTimer(); }, 1000); }

    /* ---------- layout ---------- */
    const coverage = {};
    mock.parts.forEach((p) => { const r = { topics: {} }; (p.items || []).forEach((it) => addT(r.topics, it.topic || it.topics || p.topic, 0, p.marksEach || 0)); if (p.type === "order") addT(r.topics, p.topic, 0, p.marks); Object.keys(r.topics).forEach((k) => addT(coverage, k, 0, r.topics[k][1])); });
    el.innerHTML = `<div class="mock">
      <div class="mock-bar">${mock.minutes ? `<span class="mock-timer"></span><button class="btn" data-act="timer"></button>` : `<span class="mock-timer on">${esc(mock.title)}</span>`}<button class="btn primary" data-act="gradeall">${mock.practice ? "Grade all" : "Grade whole exam"}</button><button class="btn" data-act="reset">Clear answers</button></div>
      <div class="callout warn mock-timeup" hidden><b>Time’s up.</b> Press <i>Grade whole exam</i> to see how you did.</div>
      <div class="card mock-intro">${mock.intro}
        <h3>${mock.practice ? "What this practises" : "Your instructor’s topic list → where it’s tested"}</h3>
        <div class="cov">${mock.topics.map((tp) => `<div class="cov-row"><span>${esc(tp.label)}</span><b>${coverage[tp.id] ? fmtM(coverage[tp.id][1]) + " marks" : ""}</b></div>`).join("")}</div>
        <p class="muted">Total: ${fmtM(total)} marks${mock.minutes ? ` · suggested time ${mock.minutes} minutes` : ""}${state.last ? ` · last attempt ${state.last.pct}%` : ""}</p></div>
      ${mock.parts.map(renderPart).join("")}
      <div class="mock-end"><button class="btn primary" data-act="gradeall">${mock.practice ? "Grade all" : "Grade whole exam"}</button></div>
      <section class="card mock-result" hidden></section></div>`;
    // restore JE account selections (select values can't be set via markup easily)
    mock.parts.filter((p) => p.type === "je").forEach((p) => {
      const a = state.a[p.id] || {};
      el.querySelectorAll(`#part-${p.id} .jq`).forEach((q) => { const saved = a[q.dataset.i] || []; q.querySelectorAll(".jr").forEach((r, k) => { if (saved[k]) r.querySelector('[data-f="a"]').value = saved[k][0] || ""; }); });
    });
    drawTimer(); if (state.endAt) startTick();

    /* ---------- events ---------- */
    el.addEventListener("input", persist);
    el.addEventListener("change", persist);
    el.addEventListener("click", (e) => {
      const b = e.target.closest("[data-act], [data-jump]"); if (!b) return;
      if (b.dataset.jump) { e.preventDefault(); const t = el.querySelector("#" + b.dataset.jump); if (t) t.scrollIntoView({ behavior: "smooth" }); return; }
      const sec = b.closest(".mock-part"), p = sec && mock.parts.find((x) => x.id === sec.dataset.p);
      const act = b.dataset.act;
      if (act === "check") grade(p, true);
      if (act === "sol") { const s = sec.querySelector(".mp-sol"); s.hidden = !s.hidden; if (!s.hidden) s.innerHTML = `<div class="eyebrow">Solution</div>${solution(p)}`; b.textContent = s.hidden ? "Show solution" : "Hide solution"; }
      if (act === "addline") { const q = b.closest(".jq"), rows = q.querySelector(".jq-rows"); rows.insertAdjacentHTML("beforeend", jeRow(p.id, q.dataset.i, "n" + (++lineSeq), null)); persist(); }
      if (act === "rmline") { const rows = b.closest(".jq-rows"); if (rows.children.length > 1) b.closest(".jr").remove(); else b.closest(".jr").querySelectorAll("select, input").forEach((x) => (x.value = "")); persist(); }
      if (act === "up" || act === "down") {
        const li = b.closest("li"), ol = li.parentElement;
        if (act === "up" && li.previousElementSibling) ol.insertBefore(li, li.previousElementSibling);
        if (act === "down" && li.nextElementSibling) ol.insertBefore(li.nextElementSibling, li);
        [...ol.children].forEach((x, i) => { x.querySelector(".ord-n").textContent = i + 1; x.classList.remove("right", "wrong"); x.querySelector('[data-act="up"]').disabled = i === 0; x.querySelector('[data-act="down"]').disabled = i === ol.children.length - 1; });
        b.focus(); persist();
      }
      if (act === "gradeall") gradeAll();
      if (act === "timer") {
        if (state.endAt) { state.endAt = null; clearInterval(tick); } else { state.endAt = Date.now() + mock.minutes * 60000; startTick(); }
        el.querySelector(".mock-timeup").hidden = true; saveState(state); drawTimer();
      }
      if (act === "reset") {
        if (b.dataset.confirm !== "1") { b.dataset.confirm = "1"; b.textContent = "Click again to clear"; setTimeout(() => { b.dataset.confirm = ""; b.textContent = "Clear answers"; }, 3000); return; }
        state = { a: {} }; saveState(state); clearInterval(tick); const fresh = el.cloneNode(false); el.replaceWith(fresh); render(fresh, mock, opts);
      }
    });
  }

  window.MockExam = { render };
})();
