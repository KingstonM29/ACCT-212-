/* ACCT 212 study guide — single-page app. No build step: edit data/*.js to change content. */
(function () {
  "use strict";

  const COURSE = window.COURSE || { events: [], chapters: [] };
  const EXAMS = window.EXAMS || [];
  const MOCKS = window.MOCK_EXAMS || [];
  const mockFor = (examId) => MOCKS.find((m) => m.exam === examId);
  const CONTENT = window.CHAPTERS || [];
  const app = document.getElementById("app");
  const DIAGRAMS = window.DIAGRAMS || {};
  const DIAGRAM_ORDER = window.DIAGRAM_ORDER || [];
  const diagramsFor = (num) => DIAGRAM_ORDER.filter((id) => DIAGRAMS[id].ch === num);
  function mountDiagrams(root) {
    root.querySelectorAll("[data-diagram]").forEach((el) => {
      const d = DIAGRAMS[el.dataset.diagram];
      if (!d || el.dataset.mounted) return;
      el.dataset.mounted = "1";
      el.classList.add("dg");
      el.innerHTML = `<div class="dg-head"><span class="dg-live"><i></i>Live diagram</span><h3>${d.title}</h3><p>${d.blurb}</p></div><div class="dg-body"></div>`;
      try { d.mount(el.querySelector(".dg-body")); } catch (err) { el.querySelector(".dg-body").innerHTML = `<p class="muted">This diagram couldn’t load.</p>`; }
    });
  }

  /* ---------- chapters: roadmap (from the outline) + content (from the slides) ---------- */
  const ROADMAP = (COURSE.chapters || []).map((r, i) => Object.assign({ order: i + 1 }, r, {
    content: CONTENT.find((c) => c.number === r.number) || null
  }));
  // content chapters not in the roadmap still show up, at the end
  CONTENT.forEach((c) => { if (!ROADMAP.some((r) => r.number === c.number)) ROADMAP.push({ number: c.number, title: c.title, order: ROADMAP.length + 1, content: c }); });
  const CH = ROADMAP.filter((r) => r.content).map((r) => Object.assign(r.content, { order: r.order, meta: r }));
  const byId = (id) => CH.find((c) => c.id === id);
  const byNum = (n) => CH.find((c) => c.number === n);
  const roadByNum = (n) => ROADMAP.find((r) => r.number === n);

  /* ---------- per-viewer storage ---------- */
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
  const checks = () => store.get("checks", {});

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const money = (n) => (n == null || n === "" ? "" : Number(n).toLocaleString("en-CA"));
  const strip = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const chLabel = (c) => `Ch ${c.number}`;
  const ordinal = (n) => n + (["th", "st", "nd", "rd"][(n % 100 - 20) % 10] || ["th", "st", "nd", "rd"][n % 100] || "th");
  const ymd = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const startOfToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const dayDiff = (a, b) => Math.round((ymd2(a) - ymd2(b)) / 86400000);
  const ymd2 = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const fmtDay = (d, opts) => d.toLocaleDateString("en-CA", opts || { weekday: "short", month: "short", day: "numeric" });
  const fmtTime = (t) => { if (!t) return ""; const [h, m] = t.split(":").map(Number); return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`; };

  const events = (COURSE.events || []).map((e) => {
    const when = ymd(e.date);
    if (e.time) { const [h, m] = e.time.split(":").map(Number); when.setHours(h, m); }
    return Object.assign({}, e, { when, until: ymd(e.end || e.date) });
  }).sort((a, b) => a.when - b.when || (a.type === "exam" ? -1 : 1));
  const upcoming = (filter) => events.filter((e) => e.until >= startOfToday() && (!filter || filter(e)));
  const nextExam = () => upcoming((e) => e.type === "exam")[0];
  const examInfo = (id) => EXAMS.find((x) => x.id === id);
  const examEvent = (id) => events.find((e) => e.type === "exam" && e.exam === id);
  const dateRange = (e) => e.end ? `${fmtDay(e.when, { month: "short", day: "numeric" })} – ${fmtDay(e.until, { month: "short", day: "numeric" })}` : fmtDay(e.when, { weekday: "long", month: "long", day: "numeric" });

  function countdownText(e) {
    const days = dayDiff(e.when, startOfToday());
    if (e.end && days <= 0) return { big: "Now", unit: "exam period is on" };
    if (days === 0) return { big: "Today", unit: e.time ? "at " + fmtTime(e.time) : "" };
    if (days === 1) return { big: "1", unit: "day to go · tomorrow" + (e.time ? " at " + fmtTime(e.time) : "") };
    return { big: String(days), unit: `days to go · ${fmtDay(e.when, { weekday: "long", month: "long", day: "numeric" })}${e.time ? " at " + fmtTime(e.time) : ""}` };
  }

  function readiness(chapterNums, examId) {
    const c = checks(); let total = 0, done = 0;
    chapterNums.map(byNum).filter(Boolean).forEach((ch) => {
      (ch.checklist || []).forEach((_, i) => { total++; if ((c[ch.id] || [])[i]) done++; });
    });
    const m = examId && mockFor(examId);
    if (m) m.topics.forEach((t) => { total++; if ((c["topics-" + examId] || {})[t.id]) done++; });
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  /* ---------- rendering helpers ---------- */
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

  function renderExample(uidBase, ex, k) {
    const uid = `${uidBase}-ex${k}`;
    if (ex.interactive === "equation") {
      return `<div class="card example"><h3>${esc(ex.title)}</h3><div class="prompt">${ex.prompt}</div><div data-equation="${uid}"></div></div>`;
    }
    const steps = (ex.steps || []).map((st) => `<div class="step-label">${esc(st.label)}</div>
      ${st.html || ""}${st.entries ? renderJE(st.entries) : ""}${st.tb ? renderTB(st.tb) : ""}${st.after ? `<p class="muted">${st.after}</p>` : ""}`).join("");
    return `<div class="card example"><h3>${esc(ex.title)}</h3><div class="prompt">${ex.prompt}</div>
      <button class="btn primary reveal-btn" data-act="reveal" data-target="${uid}">Show solution</button>
      <div id="${uid}" hidden>${steps}</div></div>`;
  }

  function ring(pct, label) {
    return `<div class="ring" style="--p:${pct}"><b>${label != null ? label : pct + "%"}</b></div>`;
  }

  function checklistHtml(ch) {
    const c = checks()[ch.id] || [];
    return `<ul class="checklist">${(ch.checklist || []).map((item, i) => `<li><label><input type="checkbox" data-check="${ch.id}:${i}" ${c[i] ? "checked" : ""}><span>${esc(item)}</span></label></li>`).join("")}</ul>`;
  }

  /* ---------- study plan ---------- */
  function studyPlan(ev, info) {
    const today = startOfToday();
    const days = dayDiff(ev.when, today);
    const chs = info.chapters.map(byNum).filter(Boolean);
    const missing = info.chapters.filter((n) => !byNum(n));
    if (days < 0 || days > 14) return "";
    const plan = [];
    if (days === 0) {
      plan.push({ d: today, title: "Exam day", tasks: ["Skim the <a href='#/overview?exam=" + info.id + "'>overall notes</a>: equation, debit/credit rules, adjusting-entry table", "Pack a calculator (no phones)", "Arrive early and breathe. You’ve got this."] });
    } else {
      const studyDays = Math.max(1, days - 1);
      const perDay = Math.ceil(chs.length / studyDays);
      for (let i = 0; i < days; i++) {
        const d = new Date(today); d.setDate(today.getDate() + i);
        const isLast = i === days - 1 && days > 1;
        if (isLast || days === 1) {
          plan.push({ d, title: days === 1 ? "Cram day: everything" : "Final review", tasks: [
            mockFor(info.id) ? `Take the <a href="#/mock/${mockFor(info.id).id}">interactive mock midterm</a> with the 80-minute timer, then review your weakest topics` : `Work the <a href="#/exam/${info.id}#practice">practice problems</a> without looking at solutions`,
            `Take the <a href="#/practice?mode=quiz&exam=${info.id}">mixed quiz</a> and aim for 80%+`,
            `Re-read the <a href="#/overview?exam=${info.id}">overall notes</a> and tick off your checklist`] });
        } else {
          const slice = chs.slice(i * perDay, (i + 1) * perDay);
          if (!slice.length) { plan.push({ d, title: "Catch-up / practice", tasks: [`<a href="#/practice?mode=drill">Debit/credit drill</a> until you hit a 20 streak`, "Redo any worked example you got wrong"] }); continue; }
          plan.push({ d, title: slice.map((c) => `${chLabel(c)}: ${esc(c.title)}`).join(" + "), tasks: slice.flatMap((c) => [
            `<a href="#/chapter/${c.id}/summary">${chLabel(c)} summary</a> → <a href="#/chapter/${c.id}/notes">full notes</a>`,
            ...(diagramsFor(c.number).length ? [`Play with the <a href="#/chapter/${c.id}/visuals">${chLabel(c)} live diagrams</a> until each one makes sense`] : []),
            `Try the <a href="#/chapter/${c.id}/examples">${chLabel(c)} worked examples</a> before revealing the answers`,
            `<a href="#/chapter/${c.id}/practice">${chLabel(c)} quiz</a> + tick off the checklist`]) });
        }
      }
    }
    return `<div class="card"><div class="eyebrow">Study plan · ${days === 0 ? "exam today" : days + " day" + (days === 1 ? "" : "s") + " left"}</div>
      <ol class="plan">${plan.map((p, i) => `<li class="${i === 0 ? "now" : ""}"><div class="plan-day"><b>${i === 0 ? "Today" : fmtDay(p.d, { weekday: "short" })}</b><span>${fmtDay(p.d, { month: "short", day: "numeric" })}</span></div>
        <div><h4>${p.title}</h4><ul>${p.tasks.map((t) => `<li>${t}</li>`).join("")}</ul></div></li>`).join("")}</ol>
      ${missing.length ? `<p class="muted">Notes for Ch ${missing.join(", ")} haven’t been added yet. Use your textbook and slides for those.</p>` : ""}</div>`;
  }

  /* ---------- navigation chrome ---------- */
  function renderNav() {
    const p = progress();
    document.getElementById("navChapters").innerHTML = CH.map((c) =>
      `<a href="#/chapter/${c.id}" data-ch="${c.id}"><span class="dot ${p[c.id] && p[c.id].read ? "done" : ""}"></span><span>${chLabel(c)} · ${esc(c.title)}</span></a>`).join("");
    const ne = nextExam();
    const examLink = document.getElementById("navExam");
    if (examLink) { examLink.href = ne ? `#/exam/${ne.exam}` : "#/calendar"; examLink.textContent = ne ? `Exam prep · ${ne.title.replace(" Exam", "")}` : "Exam prep"; }
    const mockLink = document.getElementById("navMock"), nm = ne && mockFor(ne.exam);
    if (mockLink) { mockLink.hidden = !nm; if (nm) { mockLink.href = `#/mock/${nm.id}`; mockLink.textContent = nm.title; } }
    highlightNav();
  }
  function highlightNav() {
    const parts = location.hash.replace(/^#\/?/, "").split(/[/?#]/);
    const route = parts[0] || "home";
    document.querySelectorAll("#nav > a").forEach((a) => a.classList.toggle("active", a.dataset.route === route || (route === "chapter" && a.dataset.route === "notes")));
    document.querySelectorAll(".nav-chapters a").forEach((a) => a.classList.toggle("active", route === "chapter" && a.dataset.ch === parts[1]));
  }

  /* ---------- views ---------- */
  function viewHome() {
    const p = progress();
    const ne = nextExam();
    const info = ne && examInfo(ne.exam);
    const examChs = info ? info.chapters.map(byNum).filter(Boolean) : CH;
    const reviewed = examChs.filter((c) => p[c.id] && p[c.id].read).length;
    const scores = examChs.map((c) => p[c.id] && p[c.id].best).filter((x) => x != null);
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
    const ready = info ? readiness(info.chapters, info.id) : { pct: 0, done: 0, total: 0 };
    const today = startOfToday();
    const weekEnd = new Date(today); weekEnd.setDate(today.getDate() + 8);
    const week = upcoming((e) => e.when < weekEnd);
    const deadlines = upcoming((e) => e.type !== "class" && e.type !== "break").slice(0, 5);
    const nextUp = examChs.find((c) => !(p[c.id] && p[c.id].read)) || examChs[0] || CH[0];

    let examCard = `<div class="eyebrow">Next exam</div><h2>No upcoming exams</h2>`;
    if (ne) {
      const cd = countdownText(ne);
      examCard = `<div class="eyebrow">Next exam · ${esc(ne.weight || "")}</div><h2>${esc(ne.title)}</h2>
        <div class="countdown"><span class="big">${cd.big}</span><span class="unit">${cd.unit}</span></div>
        <p class="muted">${esc(ne.location || "")}</p>
        <div class="chips">${(ne.covers || []).map((n) => { const c = byNum(n); return c ? `<a class="chip" href="#/chapter/${c.id}">Ch ${n}</a>` : `<span class="chip off">Ch ${n}</span>`; }).join("")}</div>
        <div class="btn-row">${info ? `<a class="btn primary" href="#/exam/${ne.exam}">Open ${esc(ne.title.replace(" Exam", ""))} prep</a>${mockFor(ne.exam) ? `<a class="btn" href="#/mock/${mockFor(ne.exam).id}">Mock exam</a>` : ""}` : ""}<a class="btn" href="#/overview${info ? "?exam=" + info.id : ""}">Overall notes</a></div>`;
    }

    return `
      <div class="page-head"><div class="eyebrow">${esc(COURSE.school || "")} · ${esc(COURSE.term || "")}${COURSE.section ? " · Section " + esc(COURSE.section) : ""}</div>
        <h1>${esc(COURSE.code || "ACCT 212")} Study Guide</h1>
        <p>Lecture notes, one-page summaries, worked examples, practice and a mock exam for ${esc(COURSE.name || "")}, organized around the course outline.</p></div>
      <div class="dash-top">
        <div class="card hero">${examCard}</div>
        <div class="card"><div class="eyebrow">${info ? esc(info.title) + " readiness" : "Your progress"}</div>
          <div class="progress-wrap">${ring(ready.pct)}
            <div class="stat-list"><span><b>${ready.done}/${ready.total}</b> skills checked off</span>
              <span><b>${reviewed}/${examChs.length}</b> chapters reviewed</span>
              <span>Quiz average: <b>${avg == null ? "—" : avg + "%"}</b></span>
              <span class="muted">Saved in this browser only.</span></div></div>
          <div class="btn-row" style="margin-top:14px">${nextUp ? `<a class="btn primary" href="#/chapter/${nextUp.id}">Continue: ${chLabel(nextUp)}</a>` : ""}${info ? `<a class="btn" href="#/exam/${info.id}#checklist">Checklist</a>` : ""}</div>
        </div>
      </div>
      ${ne && info ? studyPlan(ne, info) : ""}
      <div class="dash-two">
        <div><div class="section-title"><h2>Next 7 days</h2><a href="#/calendar">Calendar →</a></div>
          ${week.length ? `<div class="agenda">${week.map(agendaRow).join("")}</div>` : `<div class="card empty"><p>Nothing in the next week.</p></div>`}</div>
        <div><div class="section-title"><h2>Deadlines</h2><a href="#/calendar">All →</a></div>
          <div class="agenda">${deadlines.map(agendaRow).join("")}</div></div>
      </div>
      <div class="section-title"><h2>Chapters with notes</h2><a href="#/course">Course roadmap →</a></div>
      <div class="chapter-grid">${CH.map((c) => chapterCard(c, p)).join("")}</div>
      <div class="section-title"><h2>Study tools</h2></div>
      <div class="quick">
        <a class="card tool-feature" href="#/visual"><h3>Visual lab</h3><p>${DIAGRAM_ORDER.length} live diagrams: watch entries post, statements connect and accounts close.</p></a>
        <a class="card" href="#/overview"><h3>Overall notes</h3><p>Every rule, formula and key point on one page.</p></a>
        <a class="card" href="#/practice?mode=drill"><h3>Debit / credit drill</h3><p>Rapid-fire: which side increases this account?</p></a>
        <a class="card" href="#/practice?mode=quiz"><h3>Practice quiz</h3><p>Multiple choice with explanations.</p></a>
        <a class="card" href="#/grades"><h3>Grade calculator</h3><p>What do you need on the final?</p></a>
      </div>`;
  }

  function agendaRow(e) {
    const d = dayDiff(e.when, startOfToday());
    const rel = e.end && d < 0 ? "on now" : d === 0 ? "today" : d === 1 ? "tomorrow" : `in ${d} days`;
    return `<div class="agenda-row ${esc(e.type)}"><div class="agenda-date"><b>${e.when.getDate()}</b><span>${MONTHS[e.when.getMonth()]}</span></div>
      <div><div class="agenda-title">${e.exam ? `<a href="#/exam/${e.exam}">${esc(e.title)}</a>` : (e.type === "class" ? "Class: " : "") + esc(e.title)}</div>
      <div class="muted">${e.end ? dateRange(e) + " · " : ""}${e.time ? fmtTime(e.time) + " · " : ""}${rel}${e.weight ? " · " + esc(e.weight) : ""}</div></div>
      <span class="tag ${esc(e.type)}">${{ exam: "Exam", quiz: "Lab quiz", assignment: "Due", class: "Class", break: "No class" }[e.type] || ""}</span></div>`;
  }

  function chapterCard(c, p) {
    const s = p[c.id] || {};
    const m = c.meta || {};
    return `<a class="card ch-card" href="#/chapter/${c.id}">
      <span class="num">CHAPTER ${c.number} · taught ${ordinal(c.order)}</span><h3>${esc(c.title)}</h3><p>${esc(c.blurb || "")}</p>
      <div class="meta">${m.exam ? `<span class="tag exam">${esc(m.exam)}</span>` : ""}${s.read ? `<span class="tag done">Reviewed</span>` : ""}${s.best != null ? `<span class="tag">Quiz best ${s.best}%</span>` : ""}</div></a>`;
  }

  function roadmapCard(r) {
    const p = progress();
    if (r.content) return chapterCard(r.content, p);
    const first = r.taught && r.taught[0] ? ymd(r.taught[0]) : null;
    return `<div class="card ch-card soon"><span class="num">CHAPTER ${r.number} · taught ${ordinal(r.order)}</span><h3>${esc(r.title)}</h3>
      <p>Notes coming once the slides are added.${first ? ` Taught from ${fmtDay(first)}.` : ""}${r.note ? " " + esc(r.note) + "." : ""}</p>
      <div class="meta">${r.exam ? `<span class="tag exam">${esc(r.exam)}</span>` : ""}<span class="tag">Coming soon</span></div></div>`;
  }

  function viewNotesIndex() {
    const groups = {};
    ROADMAP.forEach((r) => { const g = r.exam || "Other"; (groups[g] = groups[g] || []).push(r); });
    return `<div class="page-head"><div class="eyebrow">Chapter notes</div><h1>All chapters</h1>
      <p>Each chapter has a <b>quick summary</b>, the <b>full lecture notes</b>, <b>worked examples</b> with solutions and <b>practice</b>. Chapters are grouped by the exam they’re on, in the order they’re taught. Want everything at once? Use <a href="#/overview">Overall notes</a>.</p></div>
      ${Object.keys(groups).map((g) => `<div class="section-title"><h2>${esc(g)}</h2>${EXAMS.find((x) => x.title.replace(" Exam", "") === g || x.title === g) ? `<a href="#/exam/${EXAMS.find((x) => x.title.replace(" Exam", "") === g || x.title === g).id}">Exam prep →</a>` : ""}</div>
        <div class="chapter-grid">${groups[g].map(roadmapCard).join("")}</div>`).join("")}`;
  }

  function viewChapter(id, tab) {
    const c = byId(id);
    if (!c) return viewNotFound();
    tab = tab || "summary";
    const i = CH.indexOf(c), prev = CH[i - 1], next = CH[i + 1];
    const s = progress()[c.id] || {};
    const m = c.meta || {};
    const dgs = diagramsFor(c.number);
    const tabs = [["summary", "Quick summary"], ["notes", "Full notes"]].concat(dgs.length ? [["visuals", `Live diagrams (${dgs.length})`]] : [], [["examples", "Worked examples"], ["practice", "Practice"]]);
    let body = "";
    if (tab === "summary") {
      body = `<ul class="summary-list">${(c.summary || []).map((x) => `<li>${x}</li>`).join("")}</ul>
        ${c.checklist && c.checklist.length ? `<h2 style="margin-top:28px">Can you do this?</h2><p class="muted">Tick each one when you could do it on the exam without notes.</p><div class="card">${checklistHtml(c)}</div>` : ""}
        ${c.terms && c.terms.length ? `<h2 style="margin-top:28px">Key terms</h2><div class="terms">${c.terms.map((t) => `<div><b>${esc(t.term)}</b>${esc(t.def)}</div>`).join("")}</div>` : ""}`;
    } else if (tab === "notes") {
      body = `<div class="btn-row" style="margin-bottom:12px"><button class="btn" data-act="expand">Expand all</button><button class="btn" data-act="collapse">Collapse all</button></div>
        ${(c.sections || []).map((sec, k) => `<details class="note" ${k < 2 ? "open" : ""}><summary>${esc(sec.title)}</summary><div class="body">${sec.html}</div></details>`).join("")}`;
    } else if (tab === "visuals") {
      body = dgs.map((id) => `<div data-diagram="${id}"></div>`).join("") || `<p class="muted">No live diagrams yet.</p>`;
    } else if (tab === "examples") {
      body = (c.examples || []).map((ex, k) => renderExample(c.id, ex, k)).join("") || `<p class="muted">No worked examples yet.</p>`;
    } else if (tab === "practice") {
      body = `<div id="practiceMount"></div>`;
    }
    const exam = EXAMS.find((x) => x.chapters.includes(c.number) && x.id !== "final");
    return `<div class="page-head"><div class="eyebrow">Chapter ${c.number} · taught ${ordinal(c.order)}${m.exam ? " · " + esc(m.exam) : ""}</div>
      <h1>${esc(c.title)}</h1><p>${esc(c.blurb || "")}</p>
      <div class="meta-row">${m.taught ? `<span>📅 Class: ${m.taught.map((d) => fmtDay(ymd(d), { month: "short", day: "numeric" })).join(", ")}</span>` : ""}
        ${m.homework ? `<span>📝 WileyPlus due ${fmtDay(ymd(m.homework), { month: "short", day: "numeric" })}</span>` : ""}
        ${m.lab ? `<span>🧪 ${esc(m.lab)}</span>` : ""}${m.note ? `<span>ℹ️ ${esc(m.note)}</span>` : ""}</div>
      <div class="btn-row"><button class="btn ${s.read ? "" : "primary"}" data-act="toggle-read" data-id="${c.id}">${s.read ? "✓ Reviewed" : "Mark as reviewed"}</button>
      ${exam ? `<a class="btn" href="#/exam/${exam.id}">${esc(exam.title)} prep</a>` : ""}
      <span class="muted" style="align-self:center">Source: ${esc(c.deck || "")}</span></div></div>
      <div class="tabs">${tabs.map(([k, l]) => `<a href="#/chapter/${c.id}/${k}" class="${tab === k ? "active" : ""}">${l}</a>`).join("")}</div>
      ${body}
      <div class="ch-foot">${prev ? `<a class="btn" href="#/chapter/${prev.id}">← ${chLabel(prev)}: ${esc(prev.title)}</a>` : "<span></span>"}
        ${next ? `<a class="btn" href="#/chapter/${next.id}">${chLabel(next)}: ${esc(next.title)} →</a>` : ""}</div>`;
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

  /* ---------- exam prep ---------- */
  function viewExam(id) {
    const info = examInfo(id), ev = examEvent(id);
    if (!info) return viewNotFound();
    const ready = readiness(info.chapters, id);
    const mock = mockFor(id);
    const mockLast = mock ? store.get("mockScore." + mock.id, null) : null;
    const cd = ev ? countdownText(ev) : null;
    const past = ev && ev.until < startOfToday();
    const chs = info.chapters.map((n) => roadByNum(n)).filter(Boolean);
    return `<div class="page-head"><div class="eyebrow">Exam prep${ev && ev.weight ? " · worth " + esc(ev.weight) : ""}</div>
      <h1>${esc(info.title)}</h1>
      <p>${ev ? `${dateRange(ev)}${ev.time ? " · " + fmtTime(ev.time) : ""} · ${esc(ev.location || "")}` : ""}</p></div>
      <div class="dash-top">
        <div class="card hero"><div class="eyebrow">${past ? "Done" : "Countdown"}</div>
          ${cd && !past ? `<div class="countdown"><span class="big">${cd.big}</span><span class="unit">${cd.unit}</span></div>` : past ? "<h2>This exam is finished 🎉</h2>" : ""}
          <h4>What to expect</h4><ul>${info.format.map((f) => `<li>${f}</li>`).join("")}</ul>
          <div class="btn-row">${mock ? `<a class="btn primary" href="#/mock/${mock.id}">Take the mock exam</a>` : ""}<a class="btn" href="#/practice?mode=quiz&exam=${id}">Mixed quiz</a><a class="btn" href="#/practice?mode=cards&exam=${id}">Flashcards</a><a class="btn" href="#/visual?exam=${id}">Live diagrams</a><a class="btn" href="#/overview?exam=${id}">Overall notes</a></div></div>
        <div class="card" id="checklist-top"><div class="eyebrow">Readiness</div>
          <div class="progress-wrap">${ring(ready.pct)}<div class="stat-list"><span><b>${ready.done}/${ready.total}</b> skills checked off</span><span class="muted">Tick the checklist below as you master each skill.</span></div></div></div>
      </div>
      ${mock ? `<a class="card mock-cta" href="#/mock/${mock.id}"><div><div class="eyebrow">Interactive · auto-graded · ${mock.minutes} min</div><h2>${esc(mock.title)}</h2>
        <p>Built from your instructor’s topic list: concepts, normal balances, the accounting cycle, journal entries, T-accounts, adjusting entries, statements and closing entries. You get a score for every topic.</p></div>
        <div class="mock-cta-go">${mockLast != null ? `<span>Best so far</span><b>${mockLast}%</b>` : `<b>Start →</b>`}</div></a>` : ""}
      ${ev && !past ? studyPlan(ev, info) : ""}
      ${mock ? `<div class="section-title" id="topics"><h2>Your instructor’s topic list</h2><span class="muted">“These will be on the midterm for sure”</span></div>
        <div class="card"><ul class="checklist topics">${mock.topics.map((t) => `<li><label><input type="checkbox" data-topic="${id}:${t.id}" ${(checks()["topics-" + id] || {})[t.id] ? "checked" : ""}><span>${esc(t.label)}</span></label>
          <span class="topic-links">${t.learn.map((l) => `<a href="${l[1]}">${esc(l[0])}</a>`).join("")}</span></li>`).join("")}</ul></div>` : ""}
      <div class="section-title" id="checklist"><h2>Chapter checklist</h2><span class="muted">Can you do it without notes?</span></div>
      <div class="grid">${chs.map((r) => r.content ? `<div class="card"><div class="section-title" style="margin:0 0 6px"><h3 style="margin:0"><a href="#/chapter/${r.content.id}">Ch ${r.number} · ${esc(r.title)}</a></h3><a class="btn" href="#/chapter/${r.content.id}/summary">Review</a></div>${checklistHtml(r.content)}</div>`
        : `<div class="card soon"><h3 style="margin:0">Ch ${r.number} · ${esc(r.title)}</h3><p class="muted" style="margin:6px 0 0">Notes not added yet. Use the textbook and slides for now.</p></div>`).join("")}</div>
      ${info.tips.length ? `<div class="section-title"><h2>Exam tips</h2></div><div class="card"><ul class="tips">${info.tips.map((t) => `<li>${t}</li>`).join("")}</ul></div>` : ""}
      ${info.problems.length ? `<div class="section-title" id="practice"><h2>Worked practice problems</h2><span class="muted">Northside Tutoring (a corporation): one company start to finish with full solutions.</span></div>
        ${info.problems.map((pr, k) => renderExample("exam-" + id, pr, k)).join("")}` : ""}`;
  }

  /* ---------- mock exam ---------- */
  function viewMock(id) {
    const m = MOCKS.find((x) => x.id === id);
    if (!m) return viewNotFound();
    const ev = examEvent(m.exam);
    return `<div class="page-head"><div class="eyebrow">${ev ? esc(ev.title) + " · " + dateRange(ev) : "Mock exam"}</div><h1>${esc(m.title)}</h1>
      <p>Answer like it’s the real thing, then grade it. Every question is tagged to a topic on your instructor’s list, so your results show exactly what to review.</p>
      <div class="btn-row"><a class="btn" href="#/exam/${m.exam}">← Exam prep</a></div></div><div id="mockMount"></div>`;
  }

  /* ---------- visual lab ---------- */
  function viewVisual(query) {
    const info = examInfo(query.get("exam") || "");
    const chs = (info ? info.chapters.map(byNum).filter(Boolean) : CH).filter((c) => diagramsFor(c.number).length);
    return `<div class="page-head"><div class="eyebrow">Visual lab</div><h1>See accounting move</h1>
      <p>Interactive diagrams for every Midterm 1 topic and more. Press play, drag the sliders and predict what happens before it does. Each one is also built into the chapter notes.</p>
      <div class="btn-row"><div class="seg">${[["", "All chapters"]].concat(EXAMS.filter((x) => x.chapters.some((n) => byNum(n) && diagramsFor(n).length)).map((x) => [x.id, x.title.replace(" Exam", "")])).map(([k, l]) => `<a href="#/visual${k ? "?exam=" + k : ""}" class="${(info ? info.id : "") === k ? "on" : ""}">${esc(l)}</a>`).join("")}</div></div>
      <div class="chips" style="margin-top:14px">${chs.flatMap((c) => diagramsFor(c.number).map((id) => `<a class="chip" href="#/visual${info ? "?exam=" + info.id : ""}#dg-${id}">${chLabel(c)} · ${esc(DIAGRAMS[id].title)}</a>`)).join("")}</div></div>
      ${chs.map((c) => `<div class="section-title"><h2>${chLabel(c)} · ${esc(c.title)}</h2><a href="#/chapter/${c.id}/notes">Notes →</a></div>
        ${diagramsFor(c.number).map((id) => `<div data-diagram="${id}" id="dg-${id}"></div>`).join("")}`).join("")}`;
  }

  /* ---------- overall notes ---------- */
  function viewOverview(query) {
    const info = examInfo(query.get("exam") || "");
    const chs = info ? info.chapters.map(byNum).filter(Boolean) : CH;
    return `<div class="page-head"><div class="eyebrow">Overall notes${info ? " · " + esc(info.title) : ""}</div><h1>Everything on one page</h1>
      <p>The big picture: core rules first, then every chapter’s key points in class order. Great for the night before an exam. Use your browser’s print to save a PDF.</p>
      <div class="btn-row"><div class="seg">${[["", "All chapters"]].concat(EXAMS.filter((x) => x.chapters.some(byNum)).map((x) => [x.id, x.title.replace(" Exam", "")])).map(([k, l]) => `<a href="#/overview${k ? "?exam=" + k : ""}" class="${(info ? info.id : "") === k ? "on" : ""}">${esc(l)}</a>`).join("")}</div>
      <button class="btn print-btn" onclick="window.print()">Print / save as PDF</button></div></div>

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
        <tr><td>Accrued interest</td><td>Dr Interest Exp / Cr Interest Payable</td><td>Principal × rate × months/12</td></tr>
        <tr><td>Income tax</td><td>Dr Income Tax Exp / Cr Income Tax Payable</td><td>Calculate last: adjusted income × rate</td></tr>
        </tbody></table></div>
        <p><b>Never</b> Cash in an adjusting entry. <b>Closing:</b> revenues → Income Summary; expenses → Income Summary; Income Summary → Retained Earnings; Dividends → RE.</p></div>

      <div class="card"><h2>Formula sheet</h2>
        <div class="table-wrap"><table><tbody>
        <tr><td>Straight-line depreciation</td><td>(Cost − Residual value) ÷ Useful life</td></tr>
        <tr><td>Carrying amount</td><td>Cost − Accumulated depreciation</td></tr>
        <tr><td>Partial-year depreciation</td><td>Annual depreciation × Months used ÷ 12</td></tr>
        <tr><td>Interest</td><td>Principal × Annual rate × Time (months ÷ 12)</td></tr>
        <tr><td>Working backward (T-account)</td><td>Beginning + Additions − Used/Reductions = Ending</td></tr>
        <tr><td>Working capital</td><td>Current assets − Current liabilities</td></tr>
        <tr><td>Current ratio</td><td>Current assets ÷ Current liabilities</td></tr>
        <tr><td>Debt to total assets</td><td>Total liabilities ÷ Total assets</td></tr>
        <tr><td>Basic EPS</td><td>(Net income − Preferred dividends) ÷ Weighted avg. common shares</td></tr>
        ${!info || info.chapters.includes(5) ? `<tr><td>Net sales</td><td>Sales − Sales returns & allowances − Sales discounts</td></tr>
        <tr><td>Gross profit</td><td>Net sales − COGS</td></tr>
        <tr><td>Gross profit %</td><td>(Net sales − COGS) ÷ Net sales × 100</td></tr>
        <tr><td>Profit margin</td><td>Profit ÷ Net sales</td></tr>
        <tr><td>COGS (periodic)</td><td>Beginning inventory + Purchases − Ending inventory</td></tr>
        <tr><td>Purchase discount (2/10, n/30)</td><td>2% off if paid within 10 days, otherwise full amount in 30</td></tr>` : ""}
        </tbody></table></div></div>

      <div class="section-title"><h2>Chapter by chapter</h2></div>
      ${chs.map((c) => `<div class="card"><div class="eyebrow">Chapter ${c.number} · taught ${ordinal(c.order)}</div>
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
    const ch = query.get("ch") || "";
    const exam = query.get("exam") || "";
    const val = exam ? "exam:" + exam : ch || "all";
    return `<div class="page-head"><div class="eyebrow">Practice</div><h1>Test yourself</h1>
      <p>Drill the debit/credit rules, flip through flashcards or take a quiz. Pick an exam, a chapter, or mix them all.</p></div>
      <div class="practice-controls">
        <div class="seg" role="tablist">${[["drill", "Dr/Cr drill"], ["cards", "Flashcards"], ["quiz", "Quiz"]].map(([k, l]) => `<button data-mode="${k}" class="${mode === k ? "on" : ""}">${l}</button>`).join("")}</div>
        ${mode !== "drill" ? `<select id="chSel"><option value="all">All chapters</option>
          ${EXAMS.filter((x) => x.chapters.some(byNum)).map((x) => `<option value="exam:${x.id}" ${val === "exam:" + x.id ? "selected" : ""}>${esc(x.title)} chapters</option>`).join("")}
          ${CH.map((c) => `<option value="${c.id}" ${val === c.id ? "selected" : ""}>${chLabel(c)} · ${esc(c.title)}</option>`).join("")}</select>` : ""}
      </div><div id="practiceMount"></div>`;
  }

  function poolFor(sel) {
    if (!sel || sel === "all") return CH;
    if (sel.startsWith("exam:")) { const x = examInfo(sel.slice(5)); return x ? x.chapters.map(byNum).filter(Boolean) : CH; }
    return [byId(sel)].filter(Boolean);
  }
  function mountPractice(el, mode, sel) {
    const pool = poolFor(sel);
    if (mode === "cards") return mountCards(el, shuffle(pool.flatMap((c) => (c.flashcards || []).map((f) => Object.assign({ ch: c }, f)))));
    if (mode === "quiz") return mountQuiz(el, shuffle(pool.flatMap((c) => (c.quiz || []).map((q) => Object.assign({ ch: c }, q)))));
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

  function mountQuiz(el, qs) {
    if (!qs.length) { el.innerHTML = `<p class="muted">No quiz questions yet.</p>`; return; }
    let i = 0, right = 0, answered = false;
    const perCh = {};
    const draw = () => {
      if (i >= qs.length) {
        const pct = Math.round((right / qs.length) * 100);
        Object.keys(perCh).forEach((id) => {
          const r = perCh[id]; const score = Math.round((r.right / r.total) * 100);
          const prev = (progress()[id] || {}).best;
          setProgress(id, { best: prev == null ? score : Math.max(prev, score) });
        });
        const weak = Object.keys(perCh).map((id) => ({ c: byId(id), s: perCh[id].right / perCh[id].total })).filter((x) => x.s < 0.8);
        el.innerHTML = `<div class="card empty"><div class="score">${pct}%</div><p>${right} of ${qs.length} correct</p>
          ${weak.length ? `<p>Review: ${weak.map((w) => `<a href="#/chapter/${w.c.id}/notes">${chLabel(w.c)}</a> (${Math.round(w.s * 100)}%)`).join(", ")}</p>` : "<p>80%+ on every chapter. Nice work.</p>"}
          <button class="btn primary" data-q="restart">Try again</button></div>`;
        return;
      }
      const q = qs[i];
      el.innerHTML = `<div class="progress-line"><span style="width:${(i / qs.length) * 100}%"></span></div>
        <div class="card"><div class="eyebrow">Question ${i + 1} of ${qs.length} · ${chLabel(q.ch)} · ${right} correct</div>
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
  const FILTERS = [["deadlines", "Deadlines"], ["all", "Everything"], ["exam", "Exams"], ["quiz", "Lab quizzes"], ["assignment", "Homework"], ["class", "Classes"]];
  const filterFn = (f) => f === "all" ? null : f === "deadlines" ? (e) => ["exam", "quiz", "assignment"].includes(e.type) : (e) => e.type === f || (f === "class" && e.type === "break");

  function eventRow(e) {
    const covers = (e.covers || []).map((n) => ({ n, c: byNum(n) }));
    const d = dayDiff(e.when, startOfToday());
    return `<div class="card event ${esc(e.type)}">
      <div class="date-box"><span>${MONTHS[e.when.getMonth()]}</span><b>${e.when.getDate()}</b></div>
      <div><h3 style="margin-bottom:2px">${e.exam ? `<a href="#/exam/${e.exam}">${esc(e.title)}</a>` : (e.type === "class" ? "Class: " : "") + esc(e.title)}</h3>
        <div class="muted">${e.end ? dateRange(e) : fmtDay(e.when, { weekday: "long" })}${e.time ? " · " + fmtTime(e.time) : ""}${e.location ? " · " + esc(e.location) : ""}${e.weight ? " · " + esc(e.weight) : ""}${d > 0 ? ` · in ${d} day${d === 1 ? "" : "s"}` : d === 0 ? " · today" : ""}</div>
        ${e.notes ? `<p style="margin:4px 0 0">${esc(e.notes)}</p>` : ""}
        ${covers.length && e.type !== "assignment" ? `<div class="chips" style="margin-bottom:0">${covers.map((x) => x.c ? `<a class="chip" href="#/chapter/${x.c.id}">Ch ${x.n}</a>` : `<span class="chip off">Ch ${x.n}</span>`).join("")}</div>` : ""}</div></div>`;
  }

  function viewCalendar(query) {
    const now = new Date();
    const y = +(query.get("y") || now.getFullYear());
    const m = +(query.get("m") != null ? query.get("m") : now.getMonth());
    const f = query.get("f") || "deadlines";
    const fn = filterFn(f);
    const shown = fn ? events.filter(fn) : events;
    const start = new Date(y, m, 1), gridStart = new Date(y, m, 1 - start.getDay());
    const today = startOfToday();
    const cells = [];
    for (let k = 0; k < 42; k++) {
      const d = new Date(gridStart); d.setDate(gridStart.getDate() + k);
      if (k === 35 && d.getMonth() !== m) break;
      const evs = shown.filter((e) => ymd2(e.when) <= d && e.until >= d);
      cells.push(`<div class="day ${d.getMonth() !== m ? "out" : ""} ${d.getTime() === today.getTime() ? "today" : ""}"><span class="n">${d.getDate()}</span>
        ${evs.map((e) => `<span class="ev ${esc(e.type)}" title="${esc(e.title)}">${esc(e.title)}</span>`).join("")}</div>`);
    }
    const pm = m === 0 ? [y - 1, 11] : [y, m - 1], nm = m === 11 ? [y + 1, 0] : [y, m + 1];
    const up = upcoming(fn), past = shown.filter((e) => e.until < today);
    const q = (extra) => `#/calendar?y=${extra.y != null ? extra.y : y}&m=${extra.m != null ? extra.m : m}&f=${extra.f || f}`;
    return `<div class="page-head"><div class="eyebrow">${esc(COURSE.term || "")}${COURSE.section ? " · Section " + esc(COURSE.section) : ""}</div><h1>Course calendar</h1>
      <p>Exams, lab quizzes, WileyPlus deadlines and class topics from the course outline.</p></div>
      ${COURSE.note ? `<div class="callout warn">${esc(COURSE.note)}</div>` : ""}
      <div class="practice-controls"><div class="seg">${FILTERS.map(([k, l]) => `<a href="${q({ f: k })}" class="${f === k ? "on" : ""}">${l}</a>`).join("")}</div></div>
      <div class="card"><div class="cal-head"><a class="btn" href="${q({ y: pm[0], m: pm[1] })}" aria-label="Previous month">←</a><h2 style="margin:0">${MONTHS_LONG[m]} ${y}</h2><a class="btn" href="${q({ y: nm[0], m: nm[1] })}" aria-label="Next month">→</a></div>
        <div class="cal">${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => `<div class="dow">${d}</div>`).join("")}${cells.join("")}</div>
        <div class="legend"><span class="ev exam">Exam</span><span class="ev quiz">Lab quiz</span><span class="ev assignment">Homework due</span><span class="ev class">Class</span><span class="ev break">No class</span></div></div>
      <div class="section-title"><h2>Upcoming</h2></div>
      ${up.length ? `<div class="event-list">${up.map(eventRow).join("")}</div>` : `<div class="card empty"><h3>Nothing upcoming</h3></div>`}
      ${past.length ? `<details class="note" style="margin-top:20px"><summary>Past (${past.length})</summary><div class="body"><div class="event-list" style="opacity:.7">${past.slice().reverse().map(eventRow).join("")}</div></div></details>` : ""}`;
  }

  /* ---------- grades ---------- */
  function viewGrades() {
    const g = COURSE.grading || [];
    const saved = store.get("grades", {});
    return `<div class="page-head"><div class="eyebrow">Grades</div><h1>Grade calculator</h1>
      <p>Enter the marks you have so far (as %) to see your running grade and what you need on the rest. Saved in this browser only.</p></div>
      <div class="dash-top">
        <div class="card"><div class="table-wrap"><table class="grades"><thead><tr><th>Assessment</th><th>Weight</th><th>Your %</th></tr></thead><tbody>
          ${g.map((x) => `<tr><td><b>${esc(x.item)}</b><br><span class="muted">${esc(x.where)} · ${esc(x.note || "")}</span></td><td>${x.weight}%</td>
            <td><input type="number" min="0" max="100" step="0.1" inputmode="decimal" data-grade="${x.id}" value="${saved[x.id] != null ? saved[x.id] : ""}" placeholder="—" aria-label="${esc(x.item)} percent"></td></tr>`).join("")}
          </tbody></table></div></div>
        <div class="card"><div class="eyebrow">Result</div><div id="gradeOut"></div>
          <label class="muted" for="target">Target grade</label>
          <select id="target">${(COURSE.letterGrades || []).filter((l) => l[1] > 0).map((l) => `<option value="${l[1]}" ${String(store.get("gradeTarget", 75)) === String(l[1]) ? "selected" : ""}>${l[0]} (${l[1]}%+)</option>`).join("")}</select>
          <div id="needOut" style="margin-top:12px"></div></div>
      </div>
      <div class="section-title"><h2>Letter grade scale</h2></div>
      <div class="card"><div class="scale">${(COURSE.letterGrades || []).map((l, i, a) => `<div><b>${l[0]}</b><span>${l[1]}${i ? "–" + (a[i - 1][1] - 0.01).toFixed(2) : "–100"}%</span></div>`).join("")}</div></div>`;
  }
  function updateGrades() {
    const g = COURSE.grading || [];
    const saved = {};
    let earned = 0, done = 0;
    g.forEach((x) => {
      const inp = app.querySelector(`[data-grade="${x.id}"]`); if (!inp) return;
      const v = inp.value === "" ? null : Math.max(0, Math.min(100, +inp.value));
      if (v != null && !isNaN(v)) { saved[x.id] = v; earned += (x.weight * v) / 100; done += x.weight; }
    });
    store.set("grades", saved);
    const target = +(app.querySelector("#target") || {}).value || 75;
    store.set("gradeTarget", target);
    const letter = (pct) => ((COURSE.letterGrades || []).find((l) => pct >= l[1]) || ["—"])[0];
    const out = app.querySelector("#gradeOut"), need = app.querySelector("#needOut");
    if (!out) return;
    if (!done) { out.innerHTML = `<p class="muted">Enter at least one mark.</p>`; need.innerHTML = ""; return; }
    const cur = (earned / done) * 100;
    out.innerHTML = `<div class="countdown"><span class="big">${cur.toFixed(1)}%</span><span class="unit">${letter(cur)} so far on ${done}% of the course</span></div>
      <p class="muted">${earned.toFixed(1)} of 100 points banked.</p>`;
    const remaining = 100 - done;
    if (!remaining) { need.innerHTML = `<p>Final grade: <b>${earned.toFixed(1)}% (${letter(earned)})</b></p>`; return; }
    const req = ((target - earned) / remaining) * 100;
    need.innerHTML = req <= 0 ? `<div class="callout tip">You’ve already locked in ${target}%+. 🎉</div>`
      : req > 100 ? `<div class="callout warn">You’d need ${req.toFixed(1)}% on the remaining ${remaining}%, which isn’t possible. Try a lower target.</div>`
      : `<div class="callout">You need an average of <b>${req.toFixed(1)}%</b> on the remaining <b>${remaining}%</b> of the course.</div>`;
  }

  /* ---------- course info ---------- */
  function viewCourse() {
    const today = startOfToday();
    return `<div class="page-head"><div class="eyebrow">${esc(COURSE.term || "")}${COURSE.section ? " · Section " + esc(COURSE.section) : ""}</div><h1>Course info & roadmap</h1>
      <p>Everything from the course outline in one place.</p></div>
      <div class="two-col">
        <div class="card"><h3>Class</h3><dl class="facts">
          <dt>Instructor</dt><dd>${esc(COURSE.instructor || "")}</dd>
          <dt>Office</dt><dd>${esc(COURSE.office || "")}</dd>
          <dt>Office hours</dt><dd>${esc(COURSE.officeHours || "")}</dd>
          <dt>Classes</dt><dd>${esc(COURSE.classTimes || "")} · ${esc(COURSE.location || "")}</dd>
          <dt>Textbook</dt><dd>${esc(COURSE.textbook || "")}</dd></dl>
          <p class="muted">Contact details and full policies are in the course outline on Meskanas.</p></div>
        <div class="card"><h3>Grade breakdown</h3>
          <div class="weights">${(COURSE.grading || []).map((x) => `<div class="w-row"><span>${esc(x.item)}</span><b>${x.weight}%</b><div class="w-bar"><span style="width:${x.weight / 30 * 100}%"></span></div></div>`).join("")}</div>
          <div class="btn-row" style="margin-top:12px"><a class="btn" href="#/grades">Grade calculator</a></div></div>
      </div>
      ${(COURSE.rules || []).length ? `<div class="card"><h3>Good to know</h3><ul>${COURSE.rules.map((r) => `<li>${esc(r)}</li>`).join("")}</ul></div>` : ""}
      <div class="section-title"><h2>Chapter roadmap</h2><span class="muted">In teaching order</span></div>
      <div class="table-wrap"><table class="roadmap"><thead><tr><th>Chapter</th><th>Class dates</th><th>WileyPlus due</th><th>Tested on</th><th>Notes</th></tr></thead><tbody>
        ${ROADMAP.map((r) => {
          const doneTaught = r.taught && r.taught.length && ymd(r.taught[r.taught.length - 1]) < today;
          return `<tr class="${doneTaught ? "done" : ""}"><td><b>Ch ${r.number}</b> ${esc(r.title)}${r.note ? `<br><span class="muted">${esc(r.note)}</span>` : ""}</td>
          <td>${(r.taught || []).map((d) => fmtDay(ymd(d), { month: "short", day: "numeric" })).join(", ")}</td>
          <td>${r.homework ? fmtDay(ymd(r.homework), { month: "short", day: "numeric" }) : ""}</td>
          <td>${esc(r.exam || "")}${r.lab ? `<br><span class="muted">${esc(r.lab)}</span>` : ""}</td>
          <td>${r.content ? `<a href="#/chapter/${r.content.id}">Open →</a>` : `<span class="muted">Coming soon</span>`}</td></tr>`; }).join("")}
      </tbody></table></div>
      ${(COURSE.labs || []).length ? `<div class="section-title"><h2>Lab schedule</h2></div><div class="table-wrap"><table><tbody>${COURSE.labs.map((l) => `<tr><td style="white-space:nowrap"><b>${esc(l[0])}</b></td><td>${esc(l[1])}</td></tr>`).join("")}</tbody></table></div>` : ""}`;
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
    DIAGRAM_ORDER.forEach((id) => { const d = DIAGRAMS[id], c = byNum(d.ch); if (c) idx.push({ c, where: "Live diagram", title: d.title, text: d.blurb, href: `#/visual#dg-${id}` }); });
    EXAMS.forEach((x) => x.problems.forEach((p) => idx.push({ c: { number: x.title.replace(" Exam", "") }, where: "Mock exam", title: p.title, text: strip(p.prompt), href: `#/exam/${x.id}#practice` })));
    return idx;
  }
  let INDEX;
  function viewSearch(q) {
    INDEX = INDEX || buildIndex();
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const hits = terms.length ? INDEX.filter((h) => terms.every((t) => (h.title + " " + h.text).toLowerCase().includes(t))) : [];
    const hl = (s) => { let out = esc(s); terms.forEach((t) => { out = out.replace(new RegExp("(" + esc(t).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"), "<mark>$1</mark>"); }); return out; };
    const snippet = (text) => {
      const low = text.toLowerCase(), at = terms.length ? Math.max(0, low.indexOf(terms[0]) - 60) : 0;
      return (at > 0 ? "…" : "") + text.slice(at, at + 200) + (text.length > at + 200 ? "…" : "");
    };
    const label = (h) => typeof h.c.number === "number" ? chLabel(h.c) : h.c.number;
    return `<div class="page-head"><div class="eyebrow">Search</div><h1>${hits.length} result${hits.length === 1 ? "" : "s"} for “${esc(q)}”</h1></div>
      <div class="grid">${hits.map((h) => `<a class="card search-hit" href="${h.href}"><span class="tag">${esc(label(h))} · ${h.where}</span>
        <h3 style="margin:6px 0 0">${hl(h.title)}</h3><p>${hl(snippet(h.text))}</p></a>`).join("") || `<p class="muted">Try a different word, like “depreciation”, “FOB” or “trial balance”.</p>`}</div>`;
  }

  function viewNotFound() { return `<div class="empty"><h2>Page not found</h2><p><a href="#/">Back to the dashboard</a></p></div>`; }

  /* ---------- router ---------- */
  function route() {
    const raw = location.hash.replace(/^#\/?/, "");
    const hashAt = raw.indexOf("#");
    const anchor = hashAt >= 0 ? raw.slice(hashAt + 1) : "";
    const [path, qs] = (hashAt >= 0 ? raw.slice(0, hashAt) : raw).split("?");
    const query = new URLSearchParams(qs || "");
    const parts = path.split("/").filter(Boolean);
    let html;
    switch (parts[0]) {
      case undefined: html = viewHome(); break;
      case "overview": html = viewOverview(query); break;
      case "visual": html = viewVisual(query); break;
      case "mock": html = viewMock(parts[1]); break;
      case "notes": html = viewNotesIndex(); break;
      case "chapter": html = viewChapter(parts[1], parts[2]); break;
      case "exam": html = viewExam(parts[1]); break;
      case "practice": html = viewPractice(query); break;
      case "calendar": html = viewCalendar(query); break;
      case "grades": html = viewGrades(); break;
      case "course": html = viewCourse(); break;
      case "search": html = viewSearch(decodeURIComponent(parts.slice(1).join("/"))); break;
      default: html = viewNotFound();
    }
    app.innerHTML = html;
    document.body.classList.remove("menu-open");
    highlightNav();

    // post-render mounts
    mountDiagrams(app);
    const mm = document.getElementById("mockMount");
    if (mm && window.MockExam) {
      const m = MOCKS.find((x) => x.id === parts[1]);
      const letter = (pct) => ((COURSE.letterGrades || []).find((l) => pct >= l[1]) || [""])[0];
      window.MockExam.render(mm, m, { letter, onGraded: (pct) => { const best = store.get("mockScore." + m.id, null); if (best == null || pct > best) store.set("mockScore." + m.id, Math.round(pct * 10) / 10); } });
    }
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
        mountPractice(pm, query.get("mode") || "drill", query.get("exam") ? "exam:" + query.get("exam") : query.get("ch") || "all");
      }
    }
    if (parts[0] === "grades") updateGrades();
    const target = anchor && document.getElementById(anchor);
    if (target) target.scrollIntoView(); else if (!/^search/.test(raw)) window.scrollTo(0, 0);
    const h1 = app.querySelector("h1");
    document.title = (h1 && parts.length ? h1.textContent + " · " : "") + "ACCT 212 Study Guide";
  }

  /* ---------- global events ---------- */
  app.addEventListener("click", (e) => {
    const t = e.target.closest("[data-act], [data-mode], [data-cmode]");
    if (!t) return;
    if (t.dataset.mode) {
      const sel = document.getElementById("chSel");
      const v = sel ? sel.value : "all";
      location.hash = `#/practice?mode=${t.dataset.mode}${v.startsWith("exam:") ? "&exam=" + v.slice(5) : v !== "all" ? "&ch=" + v : ""}`;
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
      const v = e.target.value;
      location.hash = `#/practice?mode=${mode}${v.startsWith("exam:") ? "&exam=" + v.slice(5) : v !== "all" ? "&ch=" + v : ""}`;
    }
    if (e.target.dataset.topic) {
      const [ex, tid] = e.target.dataset.topic.split(":");
      const c = checks(); c["topics-" + ex] = c["topics-" + ex] || {}; c["topics-" + ex][tid] = e.target.checked; store.set("checks", c);
      const y = window.scrollY; route(); window.scrollTo(0, y);
    }
    if (e.target.dataset.check) {
      const [id, i] = e.target.dataset.check.split(":");
      const c = checks(); c[id] = c[id] || []; c[id][+i] = e.target.checked; store.set("checks", c);
      // refresh readiness rings in place
      const y = window.scrollY; route(); window.scrollTo(0, y);
    }
    if (e.target.id === "target") updateGrades();
  });
  app.addEventListener("input", (e) => { if (e.target.dataset.grade != null) updateGrades(); });
  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("searchInput").value.trim();
    if (q) location.hash = "#/search/" + encodeURIComponent(q);
  });
  document.getElementById("menuBtn").addEventListener("click", () => document.body.classList.add("menu-open"));
  document.getElementById("scrim").addEventListener("click", () => document.body.classList.remove("menu-open"));

  // Black is the default look; light mode is an opt-in per viewer.
  function applyTheme(t) {
    if (t === "light") document.documentElement.setAttribute("data-mode", "light"); else document.documentElement.removeAttribute("data-mode");
    const b = document.getElementById("themeBtn"); if (b) b.textContent = t === "light" ? "Switch to black mode" : "Switch to light mode";
  }
  function toggleTheme() {
    const next = document.documentElement.getAttribute("data-mode") === "light" ? "dark" : "light";
    applyTheme(next); store.set("mode", next);
  }
  applyTheme(store.get("mode", "dark"));
  document.getElementById("themeBtn").addEventListener("click", toggleTheme);
  document.getElementById("themeBtnTop").addEventListener("click", toggleTheme);

  window.addEventListener("hashchange", route);
  renderNav();
  route();
})();
