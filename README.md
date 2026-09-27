# ACCT 212 Study Guide (MacEwan)

A free, student-made study dashboard for **ACCT 212 — Financial Accounting** at MacEwan University.
Textbook: Kimmel et al., *Financial Accounting: Tools for Business Decision-Making*, 9th Canadian Edition.

**What's inside**

- **Dashboard**: countdown to the next exam, your progress, and upcoming dates
- **Overall notes**: the whole course on one printable page (equation, debit/credit rules, accounting cycle, adjusting-entry cheat sheet, formulas, and every chapter's key points)
- **Chapter notes**: each chapter has a *Quick summary*, *Full notes*, *Worked examples* (with solutions you reveal when ready) and *Practice*
- **Practice**: a debit/credit drill, flashcards and multiple-choice quizzes with explanations
- **Calendar**: exams and due dates from the course outline
- **Search** across all notes

Progress and quiz scores are saved in your own browser only. Nothing is uploaded.

## Chapters so far (Midterm 1, in class order)

| Class | Chapter | Topic |
|---|---|---|
| 1 | Ch 1 | The Purpose and Use of Financial Statements |
| 2 | Ch 3 | The Accounting Information System *(taught before Ch 2)* |
| 3 | Ch 2 | A Further Look at Financial Statements |
| 4 | Ch 4 | Accrual Accounting Concepts |
| 5 | Ch 5 | Merchandising Operations |

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

All content lives in two files. You don't need to touch the app code.

- **`data/chapters.js`**: one object per chapter. To add a chapter, copy an existing one, give it a new `id`
  and set `order` to the class it's taught in. The comment at the top of the file explains every field
  (summary bullets, key terms, notes sections, worked examples with journal entries, flashcards and quiz questions).
  Journal entries are written as `[account, debit, credit]`, and the site formats them and checks totals for you.
- **`data/calendar.js`**: add exams, quizzes and due dates from the course outline. Exams automatically get a countdown
  on the dashboard. Set `outlineLoaded: true` once the dates are in.

## Disclaimer

This is an unofficial study aid written from class lecture slides. It is not affiliated with MacEwan University.
Worked solutions were prepared for studying, so if anything differs from what your instructor teaches, go with your instructor.
The original publisher slide decks are **not** included in this repo.
