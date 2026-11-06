# DSA Interview 150 — LeetCode Prep Handbook

A lightweight, offline-capable personal preparation handbook for all 150 questions from the [LeetCode Top Interview 150](https://leetcode.com/studyplan/top-interview-150/) study plan.

## Features

- 📚 All 150 questions with complete Java solutions
- 🗂️ 21 topic groups organized by pattern
- 🎯 Per-question: description, intuition, approach, Java code, complexity, interview notes
- ✅ Progress tracking (completed, bookmarked, revision list)
- 🔍 Instant search by title, number, topic
- 🌙 Light / Dark mode
- ⌨️ Keyboard shortcuts
- 💾 LocalStorage persistence — works offline
- 📱 Fully responsive mobile layout

## Running the App

Just open `index.html` in any modern browser:

```bash
open leetcode-interview-150/index.html
```

No build step, no server, no dependencies.

## Project Structure

```
leetcode-interview-150/
├── index.html          # App shell and HTML structure
├── styles.css          # Design system and all styles
├── app.js              # Application logic (vanilla JS)
├── data/
│   ├── questions.js    # Main data entry point (loads all parts)
│   ├── q_part1.js      # Two Pointers, Sorting, DP, Greedy
│   ├── q_part2.js      # Math, Prefix Sum, Stack, String, Trie, Sliding Window
│   ├── q_part3.js      # Matrix, HashMap, Union-Find, Linked List
│   └── q_part4.js      # Trees, Bit Manipulation, BFS, Topo Sort, Backtracking, Binary Search, Heap
└── README.md
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search |
| `N` | Next question |
| `P` | Previous question |
| `B` | Bookmark current question |
| `C` | Mark current question complete |
| `Esc` | Go back |

## Question Distribution

- **Total:** 150 questions
- **Easy:** 40 | **Medium:** 92 | **Hard:** 18

| # | Topic | Count |
|---|-------|-------|
| 1 | Two Pointers | 14 |
| 2 | Sorting | 5 |
| 3 | Dynamic Programming | 9 |
| 4 | Greedy | 6 |
| 5 | Math and Number Theory | 8 |
| 6 | Prefix Sum | 1 |
| 7 | Stack | 8 |
| 8 | Other / String and Intervals | 5 |
| 9 | Trie | 5 |
| 10 | Sliding Window | 5 |
| 11 | Matrix and Grid | 11 |
| 12 | Hash Map | 4 |
| 13 | Union-Find | 4 |
| 14 | Linked List | 15 |
| 15 | Tree Traversal | 18 |
| 16 | Bit Manipulation | 7 |
| 17 | Breadth-First Search | 4 |
| 18 | Topological Sort | 2 |
| 19 | Backtracking | 7 |
| 20 | Binary Search | 8 |
| 21 | Heap / Priority Queue | 4 |

## Technology

- Pure HTML5, CSS3, Vanilla JS (ES6+)
- No frameworks, no build tools, no backend
- LocalStorage for persistence
- Inline SVG icons

