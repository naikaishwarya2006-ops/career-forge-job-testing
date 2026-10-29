# CareerForge - Job Portal & Tech Interview Preparation Ecosystem

A comprehensive, production-grade web application integrating a full **Job Portal** with an end-to-end **Interview Preparation Suite** (Aptitude, Core Computer Science, HR Round), **Dedicated Topic-Wise DSA Sheet Tracker**, **Company-Specific Hiring Processes**, an **Interactive Mock Test Simulator**, and an **ATS Resume Analyzer**.

---

## 🌟 Key Modules & Features

### 1. 💼 Job Portal
- **Rich Tech Job Listings**: High-paying roles across Amazon, Google, Microsoft, Swiggy, TCS, Infosys, Razorpay, and top startups.
- **Advanced Multi-Dimensional Filtering**:
  - Filter by Category (*Software Engineering, Frontend, Backend, Data & AI, DevOps & Cloud*).
  - Filter by Experience (*Freshers, 0-1 yr, 1-3 yrs*).
  - Filter by Job Type (*Full-time, Internship, Remote, Hybrid*).
  - Instant live keyword search by role, skills, or company.
- **Interactive Job Details Modal**: Comprehensive breakdown of responsibilities, requirements, CTC breakdown, skills pills, and perks.
- **Easy 1-Click Application Flow**:
  - Pre-filled modal with resume upload simulation, portfolio links, and personalized pitch.
  - Live status tracking (*Submitted, Under Review, Shortlisted*).
- **Recruiter Job Posting**:
  - Recruiters can publish live job openings directly into the portal state.
- **Bookmarking & Application Management**:
  - Save favorite jobs with persistent `localStorage` synchronization.
  - Dedicated "My Applications" drawer to monitor active pipelines.

---

### 2. ⚡ Dedicated DSA Preparation Sheet (Topic-Wise Tracker)
- **10 Core Algorithmic Modules**:
  1. Arrays & Hashing (Two Sum, Kadane's Algorithm, Merge Intervals, Product Except Self, etc.)
  2. Two Pointers & Strings (Valid Palindrome, Longest Substring Without Repeating Characters, Trapping Rain Water, etc.)
  3. Linked Lists (Reverse List, Cycle Detection, LRU Cache, etc.)
  4. Stacks & Queues (Valid Parentheses, Next Greater Element, Min Stack, etc.)
  5. Binary Trees & BST (Max Depth, Lowest Common Ancestor, Validate BST, etc.)
  6. Dynamic Programming (Climbing Stairs, Coin Change, Longest Increasing Subsequence, etc.)
  7. Graphs (Number of Islands, Course Schedule / Topological Sort, etc.)
  8. Heaps & Priority Queues (Kth Largest Element, Top K Frequent, etc.)
  9. Recursion & Backtracking (Subsets, Permutations, etc.)
  10. Greedy & Bit Manipulation (Single Number, Counting Bits, etc.)
- **Interactive Feature Set**:
  - Real-time progress bar updating dynamically as problems are marked solved.
  - Difficulty breakdown (Easy, Medium, Hard).
  - Bookmark problems for **Revision**.
  - **In-App Solution Modal**:
    - Intuition & Step-by-Step Approach.
    - Asymptotic Time & Space Complexities ($O(N)$, $O(1)$, etc.).
    - Complete, verified working source code in **C++**, **Java**, and **Python 3** with syntax highlighting and 1-click clipboard copy.
  - **Personal Notes Editor**: Attach personal revision notes, edge cases, and gotchas directly to each problem, saved in local storage.

---

### 3. 📚 Interview Preparation Hub
Structured into three specialized sub-pillars:
#### A. Quantitative & Logical Aptitude
- **Formula Sheets & Mind Maps**: Percentages, Profit & Loss shortcuts, LCM methods for Time & Work, Speed-Distance-Time golden rules, and Blood Relation diagrams.
- **Interactive Practice MCQs**: Multiple-choice placement questions with immediate verification and step-by-step mathematical explanations.

#### B. Technical CS Core
- **Comprehensive Subject Coverage**:
  - **Operating Systems**: Process vs Thread comparison table, 4 Coffman conditions for Deadlocks, Paging, Thrashing, and CPU Scheduling.
  - **DBMS & SQL**: ACID properties, Normalization (1NF, 2NF, 3NF, BCNF), and SQL Joins cheat sheet.
  - **Computer Networks**: OSI 7-Layer Hierarchy, TCP 3-Way Handshake, TCP vs UDP, and HTTP/HTTPS security.
  - **OOPs & Architecture**: The 4 pillars of Object-Oriented Programming and SOLID principles with real-world examples.
- **Subject-Specific Quizzes**: Quick testing modules with answer explanations for each subject.

#### C. HR & Behavioral Interview
- **The STAR Method Interactive Framework**: Situation, Task, Action, Result breakdown with percentage allocation rules.
- **Top 10 Behavioral Scenarios**:
  - *"Tell me about yourself"* (Elevator pitch).
  - *"Conflict resolution in a team"* (STAR response).
  - *"Greatest weakness and remediation"*.
  - *"Why this company specifically?"*.
- **Red Flag Callouts**: Crucial pitfalls to avoid in HR rounds.
- **Closing Questions Playbook**: High-impact questions to ask interviewers at the end of the round.

---

### 4. 🏢 Companies Hiring Process & Patterns
In-depth recruitment roadmaps for top tech firms:
- **Product Giants**: Google, Amazon, Microsoft
- **IT Services & Consulting**: TCS (Ninja, Digital, Prime tracks), Infosys (SE, DSE, Specialist Programmer tracks), Accenture (ASE, Advanced ASE)
- **Detailed Profiles**:
  - Compensation package ranges (CTC breakdown).
  - Official eligibility criteria (degree cutoff, CGPA/%, active backlogs, education gap rules).
  - Round-by-round exam pattern (time limits, question distribution, negative marking rules).
  - Sectional syllabus breakdown.
  - Frequently asked interview questions from past placement cycles.
  - Insider preparation strategy.

---

### 5. 📝 Timed Mock Assessment Simulator
- **Realistic Placement Test Simulation**:
  - 10-15 mixed questions covering Quantitative Aptitude, Logical Reasoning, and Core CS.
  - 15-minute live countdown timer with auto-submit.
  - Question navigation palette showing answered vs unvisited states.
  - Detailed scorecard with accuracy percentage, rating badge, and question-by-question review.

---

### 6. 📄 ATS Resume Analyzer
- **Automated Resume Screening Engine**:
  - Target role selector (*Software Development Engineer, Frontend, Backend, Data Analyst*).
  - Keyword extraction and parser benchmarking against industry standards.
  - Visual compatibility score (0-100%).
  - Highlighted **Matched Keywords** and **Missing Critical Keywords**.
  - Actionable formatting recommendations (Google XYZ formula, metrics quantification).

---

### 7. 📊 Candidate Dashboard
- Dynamic **Career Readiness Meter** calculated from your combined DSA completion, mock test score, and active applications.
- Quick widgets for bookmarked jobs, application status, and starred revision problems.

---

## 🚀 How to Run the Application

### Option 1: Direct Browser Launch (Zero Installation Required)
Simply double-click or open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Brave):
```
file:///C:/Users/hp/.gemini/antigravity/scratch/jobprep-portal/index.html
```

### Option 2: Local HTTP Server (Recommended)
You can serve the directory using any static web server:

**Using Node.js / npx:**
```bash
cd "C:\Users\hp\.gemini\antigravity\scratch\jobprep-portal"
npx serve .
```

**Using Python:**
```bash
cd "C:\Users\hp\.gemini\antigravity\scratch\jobprep-portal"
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 📁 Project Architecture

```
jobprep-portal/
├── index.html                  # Single Page Application entry point
├── package.json                # Project manifest
├── README.md                   # Documentation & guide
├── css/
│   └── styles.css              # Custom styling, animations, glassmorphism, badges
└── js/
    ├── app.js                  # Core controller, reactive state, modals, router
    └── data/
        ├── jobsData.js         # Tech job listings dataset (20+ openings)
        ├── dsaSheetData.js     # Curated SDE sheet with C++/Java/Python solutions
        ├── aptitudeData.js     # Quant, Logical & Verbal notes and practice MCQs
        ├── technicalData.js    # OS, DBMS, Networks, OOPs notes and quizzes
        ├── hrData.js           # STAR framework, model answers & tips
        └── companiesData.js    # Company exam patterns, syllabi & eligibility
```

---

## 💡 Workspace Recommendation
To work on this project in your code editor, set your workspace folder to:
`C:\Users\hp\.gemini\antigravity\scratch\jobprep-portal`
