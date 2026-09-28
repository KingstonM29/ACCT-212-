/*
 * ACCT 212 — course info, schedule and roadmap (from the Fall 2026 course outline, section SB04).
 *
 * events: dates are YYYY-MM-DD (optional time HH:MM, optional end YYYY-MM-DD for a date range).
 *   type: "exam" | "quiz" | "assignment" | "class" | "break"
 *   Exams get a countdown on the dashboard and an exam-prep page (see data/exams.js).
 * chapters: every chapter in the course, in the order it's taught. When a chapter's notes are
 *   added to data/chapters.js (matched by `number`), it becomes clickable automatically.
 */
window.COURSE = {
  code: "ACCT 212",
  name: "Introductory Accounting",
  section: "SB04",
  school: "MacEwan University",
  term: "Fall 2026",
  instructor: "Sandi Mullane, MBA, CPA, CGA",
  office: "Room 6-315",
  officeHours: "Wednesdays 1:00–2:00 pm by appointment, or email to book a virtual meeting",
  classTimes: "Tuesday / Thursday, 9:30–10:50 am",
  location: "Room 9-215",
  textbook: "Kimmel, Weygandt, Kieso, Trenholm, Irvine & Burnley (2023). Financial Accounting: Tools for Business Decision Making, 9th Canadian Edition. Wiley.",
  outlineLoaded: true,
  note: "Dates are for section SB04 and are a guide only. The instructor may change them, so always check the course outline and Meskanas.",

  grading: [
    { id: "prelecture", item: "Pre-lecture adaptive assignments", where: "WileyPlus", weight: 5, note: "Full marks for 80% or better" },
    { id: "chapter", item: "Chapter assignments", where: "WileyPlus", weight: 10, note: "3 attempts per question; highest counts. No extensions." },
    { id: "labs", item: "3 lab quizzes", where: "WileyPlus", weight: 5, note: "Timed, 50 minutes each. Bring a calculator." },
    { id: "mt1", item: "Midterm Exam 1 (Ch 1–4)", where: "In person, paper", weight: 25, note: "Oct 1" },
    { id: "mt2", item: "Midterm Exam 2 (Ch 5–8)", where: "In person, paper", weight: 25, note: "Oct 27" },
    { id: "final", item: "Final exam (cumulative, emphasis on Ch 9–11, 13–14)", where: "In person", weight: 30, note: "Dec 9–18, set by the Registrar" }
  ],
  letterGrades: [
    ["A+", 95], ["A", 90], ["A-", 85], ["B+", 80], ["B", 75], ["B-", 70],
    ["C+", 65], ["C", 61], ["C-", 57], ["D+", 53], ["D", 50], ["F", 0]
  ],
  rules: [
    "Exams are closed book.",
    "Phones are not allowed as calculators on quizzes and exams, so bring a real calculator.",
    "Missed WileyPlus assignments get zero. No extensions, because solutions are released at the deadline.",
    "C- or better is needed if you plan to pursue an accounting designation."
  ],

  chapters: [
    { number: 1, title: "The Purpose and Use of Financial Statements", taught: ["2026-09-03", "2026-09-08"], homework: "2026-09-13", exam: "Midterm 1", lab: "Lab Quiz 1" },
    { number: 3, title: "The Accounting Information System", taught: ["2026-09-08", "2026-09-10", "2026-09-15"], homework: "2026-09-20", exam: "Midterm 1", lab: "Lab Quiz 1" },
    { number: 2, title: "A Further Look at Financial Statements", taught: ["2026-09-15", "2026-09-17"], homework: "2026-09-20", exam: "Midterm 1", lab: "Lab Quiz 1" },
    { number: 4, title: "Accrual Accounting Concepts", taught: ["2026-09-22", "2026-09-24"], homework: "2026-09-27", exam: "Midterm 1", lab: "Lab Quiz 2" },
    { number: 5, title: "Merchandising Operations", taught: ["2026-09-24", "2026-10-06"], homework: "2026-10-11", exam: "Midterm 2", lab: "Lab Quiz 2", note: "Watch the Ch 5 video (Sept 24)" },
    { number: 6, title: "Reporting and Analyzing Inventory", taught: ["2026-10-08"], homework: "2026-10-11", exam: "Midterm 2", lab: "Lab Quiz 2" },
    { number: 7, title: "Internal Control and Cash", taught: ["2026-10-13", "2026-10-15"], homework: "2026-10-18", exam: "Midterm 2", lab: "Lab Quiz 3" },
    { number: 8, title: "Reporting and Analyzing Receivables", taught: ["2026-10-20", "2026-10-22"], homework: "2026-10-25", exam: "Midterm 2", lab: "Lab Quiz 3" },
    { number: 9, title: "Reporting and Analyzing Long-Lived Assets", taught: ["2026-10-29", "2026-11-03"], homework: "2026-11-08", exam: "Final", lab: "Lab Quiz 3" },
    { number: 10, title: "Reporting and Analyzing Liabilities", taught: ["2026-11-05", "2026-11-17"], homework: "2026-11-22", exam: "Final", lab: "Lab Quiz 3", note: "Exclude bonds not issued at face value" },
    { number: 11, title: "Reporting and Analyzing Shareholders’ Equity", taught: ["2026-11-19", "2026-11-24"], homework: "2026-11-29", exam: "Final" },
    { number: 13, title: "Statement of Cash Flows", taught: ["2026-11-26", "2026-12-01"], homework: "2026-12-06", exam: "Final", note: "Exclude the direct method" },
    { number: 14, title: "Performance Evaluation", taught: ["2026-12-03"], homework: "2026-12-06", exam: "Final" }
  ],

  labs: [
    ["Sep 2 – Sep 8", "Set up on WileyPlus"],
    ["Sep 9 – 15", "Chapter 1, set up on WileyPlus"],
    ["Sep 16 – 22", "Chapter 2"],
    ["Sep 23 – 29", "Chapter 3"],
    ["Oct 1 – 7", "Lab Quiz 1 (Ch 1, 2, 3), in person in the lab"],
    ["Oct 8 – 14", "Chapter 4 (Monday Oct 12 lab will be recorded)"],
    ["Oct 15 – 21", "Chapter 5"],
    ["Oct 22 – 28", "Chapter 6"],
    ["Oct 29 – Nov 4", "Lab Quiz 2 (Ch 4, 5, 6), in person in the lab"],
    ["Nov 5 – 18", "Chapter 7 (Nov 9–13 is Reading Week)"],
    ["Nov 19 – 25", "Chapter 8"],
    ["Nov 26 – Dec 2", "Chapter 9"],
    ["Dec 3 – 7", "Chapter 10 (recorded for Tue & Wed classes)"],
    ["Dec 7", "Lab Quiz 3 (Ch 7, 8, 9, 10), done outside of lab, 50 min timed"]
  ],

  events: [
    // ---- Exams ----
    { date: "2026-10-01", time: "09:30", title: "Midterm Exam 1", type: "exam", exam: "midterm-1", weight: "25%", location: "In class, Room 9-215 (paper)", covers: [1, 2, 3, 4] },
    { date: "2026-10-27", time: "09:30", title: "Midterm Exam 2", type: "exam", exam: "midterm-2", weight: "25%", location: "In class, Room 9-215 (paper)", covers: [5, 6, 7, 8] },
    { date: "2026-12-09", end: "2026-12-18", title: "Final Exam", type: "exam", exam: "final", weight: "30%", location: "Date & time TBA by the Registrar (check myStudentSystem)", covers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14], notes: "Cumulative, with emphasis on Ch 9–11, 13–14." },

    // ---- Lab quizzes ----
    { date: "2026-10-01", end: "2026-10-07", title: "Lab Quiz 1", type: "quiz", weight: "part of 5%", location: "In your lab (50 min)", covers: [1, 2, 3] },
    { date: "2026-10-29", end: "2026-11-04", title: "Lab Quiz 2", type: "quiz", weight: "part of 5%", location: "In your lab (50 min)", covers: [4, 5, 6] },
    { date: "2026-12-07", title: "Lab Quiz 3", type: "quiz", weight: "part of 5%", location: "Outside of lab (50 min timed)", covers: [7, 8, 9, 10] },

    // ---- WileyPlus homework ----
    { date: "2026-09-13", title: "Ch 1 homework due", type: "assignment", covers: [1] },
    { date: "2026-09-20", title: "Ch 3 homework due", type: "assignment", covers: [3] },
    { date: "2026-09-20", title: "Ch 2 homework due", type: "assignment", covers: [2] },
    { date: "2026-09-27", title: "Ch 4 homework due", type: "assignment", covers: [4] },
    { date: "2026-10-11", title: "Ch 5 homework due", type: "assignment", covers: [5] },
    { date: "2026-10-11", title: "Ch 6 homework due", type: "assignment", covers: [6] },
    { date: "2026-10-18", title: "Ch 7 homework due", type: "assignment", covers: [7] },
    { date: "2026-10-25", title: "Ch 8 homework due", type: "assignment", covers: [8] },
    { date: "2026-11-08", title: "Ch 9 homework due", type: "assignment", covers: [9] },
    { date: "2026-11-22", title: "Ch 10 homework due", type: "assignment", covers: [10] },
    { date: "2026-11-29", title: "Ch 11 homework due", type: "assignment", covers: [11] },
    { date: "2026-12-06", title: "Ch 13 homework due", type: "assignment", covers: [13] },
    { date: "2026-12-06", title: "Ch 14 homework due", type: "assignment", covers: [14] },

    // ---- Classes ----
    { date: "2026-09-03", time: "09:30", title: "Intro + Ch 1", type: "class", covers: [1] },
    { date: "2026-09-08", time: "09:30", title: "Ch 1 & Ch 3", type: "class", covers: [1, 3] },
    { date: "2026-09-10", time: "09:30", title: "Ch 3", type: "class", covers: [3] },
    { date: "2026-09-15", time: "09:30", title: "Ch 3 & Ch 2", type: "class", covers: [3, 2] },
    { date: "2026-09-17", time: "09:30", title: "Ch 2", type: "class", covers: [2] },
    { date: "2026-09-22", time: "09:30", title: "Ch 4", type: "class", covers: [4] },
    { date: "2026-09-24", time: "09:30", title: "Ch 4 (+ watch Ch 5 video)", type: "class", covers: [4, 5] },
    { date: "2026-09-29", title: "No classes", type: "break" },
    { date: "2026-10-06", time: "09:30", title: "Ch 5", type: "class", covers: [5] },
    { date: "2026-10-08", time: "09:30", title: "Ch 6", type: "class", covers: [6] },
    { date: "2026-10-13", time: "09:30", title: "Ch 7", type: "class", covers: [7] },
    { date: "2026-10-15", time: "09:30", title: "Ch 7", type: "class", covers: [7] },
    { date: "2026-10-20", time: "09:30", title: "Ch 8", type: "class", covers: [8] },
    { date: "2026-10-22", time: "09:30", title: "Ch 8", type: "class", covers: [8] },
    { date: "2026-10-29", time: "09:30", title: "Ch 9", type: "class", covers: [9] },
    { date: "2026-11-03", time: "09:30", title: "Ch 9", type: "class", covers: [9] },
    { date: "2026-11-05", time: "09:30", title: "Ch 10", type: "class", covers: [10] },
    { date: "2026-11-10", end: "2026-11-13", title: "Reading Week (no classes)", type: "break" },
    { date: "2026-11-17", time: "09:30", title: "Ch 10 (online, pre-recorded)", type: "class", covers: [10] },
    { date: "2026-11-19", time: "09:30", title: "Ch 11", type: "class", covers: [11] },
    { date: "2026-11-24", time: "09:30", title: "Ch 11", type: "class", covers: [11] },
    { date: "2026-11-26", time: "09:30", title: "Ch 13", type: "class", covers: [13] },
    { date: "2026-12-01", time: "09:30", title: "Ch 13", type: "class", covers: [13] },
    { date: "2026-12-03", time: "09:30", title: "Ch 14 (last class)", type: "class", covers: [14] }
  ]
};
