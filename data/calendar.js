/*
 * ACCT 212 — course calendar.
 *
 * Fill this in from the course outline. Dates are YYYY-MM-DD (local time, optional HH:MM).
 * type: "exam" | "quiz" | "assignment" | "class" | "other"
 * Exams show up in the dashboard countdown automatically.
 *
 * Example:
 *   { date: "2026-10-15", time: "10:00", title: "Midterm 1", type: "exam",
 *     weight: "25%", location: "Room 7-218", covers: ["ch1", "ch3", "ch2", "ch4", "ch5"] }
 */
window.COURSE = {
  code: "ACCT 212",
  name: "Financial Accounting",
  school: "MacEwan University",
  term: "Fall 2026",
  textbook: "Kimmel, Weygandt, Mitchell, Trenholm, Irvine & Burnley — Financial Accounting: Tools for Business Decision-Making, 9th Canadian Edition",
  outlineLoaded: false, // set to true once the dates below come from the course outline

  events: [
    // Dates will be added from the course outline.
  ]
};
