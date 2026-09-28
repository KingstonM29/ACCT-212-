# ACCT 212 Study Guide (MacEwan)

A free, student-made study dashboard for **ACCT 212 — Financial Accounting** at MacEwan University.
Textbook: Kimmel et al., *Financial Accounting: Tools for Business Decision-Making*, 9th Canadian Edition.

**What's inside**

- **Dashboard**: countdown to the next exam, a day-by-day study plan, readiness, the next 7 days and upcoming deadlines
- **Exam prep**: one page per exam with the format, a chapter "can you do this?" checklist, exam tips and a full **mock Midterm 1** (journalize → trial balance → adjusting entries → statements → closing) with solutions
- **Overall notes**: the whole course on one printable page (equation, debit/credit rules, accounting cycle, adjusting-entry cheat sheet, formulas, and every chapter's key points)
- **Chapter notes**: each chapter has a *Quick summary*, *Full notes*, *Worked examples* (with solutions you reveal when ready) and *Practice*
- **Practice**: a debit/credit drill, flashcards and multiple-choice quizzes with explanations
- **Calendar**: every exam, lab quiz, WileyPlus deadline and class topic from the Fall 2026 outline (section SB04)
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

- **`data/chapters.js`**: one object per chapter. To add a chapter, copy an existing one, give it a new `id`
  and set `order` to the class it's taught in. The comment at the top of the file explains every field
  (summary bullets, key terms, notes sections, worked examples with journal entries, flashcards and quiz questions).
  Journal entries are written as `[account, debit, credit]`, and the site formats them and checks totals for you.
- **`data/calendar.js`**: course info, grade weights, the chapter roadmap (teaching order, class dates, homework, which exam)
  and every dated event. Exams automatically get a countdown and study plan on the dashboard.
- **`data/exams.js`**: exam-prep pages: format, tips and mock-exam problems for each exam.

## Disclaimer

This is an unofficial study aid written from class lecture slides. It is not affiliated with MacEwan University.
Worked solutions were prepared for studying, so if anything differs from what your instructor teaches, go with your instructor.
The original publisher slide decks are **not** included in this repo.
