# ACCT 212 Study Guide (MacEwan)

A free, student-made study dashboard for **ACCT 212 — Introductory Accounting** at MacEwan University.
Textbook: Kimmel et al., *Financial Accounting: Tools for Business Decision-Making*, 9th Canadian Edition.

**What's inside**

- **Dashboard**: countdown to the next exam, a day-by-day study plan, readiness, the next 7 days and upcoming deadlines
- **Exam prep**: one page per exam with the format, a chapter "can you do this?" checklist, exam tips and a full **mock Midterm 1** (journalize → trial balance → adjusting entries → statements → closing) with solutions
- **Interactive Mock Midterm 1**: built from the instructor's *Summary for Midterm #1* topic list. It has 8 parts and 90 marks: concepts, normal balances, the accounting cycle, journal entries, T-accounts, the adjusting entries, the statements (including the statement of owner's equity) and the 4 closing entries. It auto-grades, has an 80-minute timer, saves your answers and breaks your score down by topic.
- **Statement Lab**: unlimited, auto-graded practice turning an adjusted trial balance into an income statement, a statement of retained earnings (or owner's equity) and a classified balance sheet. Corporation or proprietorship, standard or harder, with hints for the classic mistakes.
- **Instructor practice**: all 61 true/false and multiple-choice questions from Practice Questions 1–3 (tagged like "PQ3 #22", each with an explanation), plus the journal entry and closing entry practice sheets rebuilt as auto-graded sets, including "no entry required" events and a net-loss closing.
- **Entry Lab**: endless, auto-graded journal entry and closing entry sets modelled on the instructor's Excel practice sheets. New companies and amounts every time, "no entry" events, and net-loss closings.
- **Visual lab**: 11 live, interactive diagrams, also built into the chapter notes:
  - the accounting equation balance and how the statements connect (Ch 1)
  - the accounting cycle wheel and journal → ledger → trial balance posting (Ch 3)
  - a classified balance sheet sorting game and a ratio lab with gauges (Ch 2)
  - cash timing vs. recognition for adjusting entries, a depreciation chart and the closing process (Ch 4)
  - inventory cost flow and the 2/10, n/30 discount window (Ch 5)
- **Overall notes**: the whole course on one printable page (equation, debit/credit rules, accounting cycle, adjusting-entry cheat sheet, formulas, and every chapter's key points)
- **Chapter notes**: each chapter has a *Quick summary*, *Full notes*, *Worked examples* (with solutions you reveal when ready) and *Practice*
- **Practice**: a debit/credit drill, flashcards and multiple-choice quizzes with explanations
- **Calendar**: every exam, WileyPlus deadline and class topic from the Fall 2026 outline (section SB04)
- **Grade calculator**: enter your marks and see what you need on the rest of the course
- **Course info**: instructor, office hours, grade weights, chapter roadmap and lab schedule
- **Search** across all notes

Progress and quiz scores are saved in your own browser only. Nothing is uploaded.

## Exams (Fall 2026, section SB04)

| Exam | Date | Covers | Weight |
|---|---|---|---|
| Midterm 1 | Thu Oct 1, in class | Ch 1–4 | 25% |
| Midterm 2 | Tue Oct 27, in class | Ch 5–8 | 25% |
| Final | Dec 9–18 (Registrar sets date) | Cumulative, emphasis Ch 9–11, 13–14 | 30% |

## Chapters with notes so far (in class order)

| Class | Chapter | Topic | Exam |
|---|---|---|---|
| 1 | Ch 1 | The Purpose and Use of Financial Statements | Midterm 1 |
| 2 | Ch 3 | The Accounting Information System *(taught before Ch 2)* | Midterm 1 |
| 3 | Ch 2 | A Further Look at Financial Statements | Midterm 1 |
| 4 | Ch 4 | Accrual Accounting Concepts | Midterm 1 |
| 5 | Ch 5 | Merchandising Operations | Midterm 2 |

Chapters 6–11, 13 and 14 already appear on the roadmap and turn into full chapter pages as soon as their notes are added.

## Use it online (GitHub Pages)

1. On GitHub, open **Settings → Pages**.
2. Under *Build and deployment*, choose **Deploy from a branch**, then pick the branch and `/ (root)`.
3. The site appears at `https://<your-username>.github.io/<repo-name>/` after a minute.

## Run it locally

It's plain HTML/CSS/JS with no build step. Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Adding content

All content lives in the `data/` folder. You don't need to touch the app code.

- **`data/chapters.js`**: one object per chapter. To add a chapter, copy an existing one and give it a new `id` and
  chapter `number`. Its class order, dates and exam come from the roadmap in `data/calendar.js`. The comment at the top of the file explains every field
  (summary bullets, key terms, notes sections, worked examples with journal entries, flashcards and quiz questions).
  Journal entries are written as `[account, debit, credit]`, and the site formats them and checks totals for you.
- **`data/calendar.js`**: course info, grade weights, the chapter roadmap (teaching order, class dates, homework, which exam)
  and every dated event. Exams automatically get a countdown and study plan on the dashboard.
- **`assets/diagrams.js`**: the live diagrams. Drop `<div data-diagram="id"></div>` into any chapter section to embed one.
- **`data/mock-midterm1.js`**: the interactive mock exam (questions tagged by topic). `assets/mock.js` grades it.
- **`assets/statements.js`**: the Statement Lab generator. Every practice set is built from a seed and always balances.
- **`data/practice-sets.js`**: the instructor's journal and closing entry practice sets (graded by `assets/mock.js`). Instructor quiz questions live in each chapter's `quiz` with a `src` tag.
- **`assets/entrylab.js`**: the Entry Lab generators (journal entries and closing entries), graded by `assets/mock.js`.
- **`data/exams.js`**: exam-prep pages: format, tips and mock-exam problems for each exam.

## Disclaimer

This is an unofficial study aid written from class lecture slides. It is not affiliated with MacEwan University.
Worked solutions were prepared for studying, so if anything differs from what your instructor teaches, go with your instructor.
The original publisher slide decks are **not** included in this repo.
