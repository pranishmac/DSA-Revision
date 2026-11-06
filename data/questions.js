/**
 * DSA Interview 150 — Question Data Entry Point
 *
 * This file is intentionally minimal. The actual question data is split across:
 *   q_part1.js  — Two Pointers, Sorting, Dynamic Programming, Greedy (34 questions)
 *   q_part2.js  — Math, Prefix Sum, Stack, String/Intervals, Trie, Sliding Window (32 questions)
 *   q_part3.js  — Matrix, HashMap, Union-Find, Linked List (34 questions)
 *   q_part4.js  — Trees, Bit Manipulation, BFS, Topological Sort, Backtracking, Binary Search, Heap (50 questions)
 *
 * All parts are loaded via <script> tags in index.html BEFORE app.js,
 * so QUESTIONS_PART1..4 are available as globals when app.js runs.
 *
 * The app.js merges them in initData():
 *   [...QUESTIONS_PART1, ...QUESTIONS_PART2, ...QUESTIONS_PART3, ...QUESTIONS_PART4]
 */

// Defensive guard: ensure globals exist even if a part file fails to load
if (typeof QUESTIONS_PART1 === 'undefined') { console.warn('q_part1.js not loaded'); var QUESTIONS_PART1 = []; }
if (typeof QUESTIONS_PART2 === 'undefined') { console.warn('q_part2.js not loaded'); var QUESTIONS_PART2 = []; }
if (typeof QUESTIONS_PART3 === 'undefined') { console.warn('q_part3.js not loaded'); var QUESTIONS_PART3 = []; }
if (typeof QUESTIONS_PART4 === 'undefined') { console.warn('q_part4.js not loaded'); var QUESTIONS_PART4 = []; }

