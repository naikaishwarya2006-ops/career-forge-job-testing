// Comprehensive Companies Hiring Process, Exam Patterns, Syllabi & Eligibility
window.JobPortalData = window.JobPortalData || {};

window.JobPortalData.companies = [
  {
    id: "comp-tcs",
    name: "Tata Consultancy Services (TCS)",
    tier: "IT Services & Global Consulting",
    logo: "TCS",
    logoBg: "bg-indigo-600",
    packageOverview: "Ninja: ₹3.36 - 3.6 LPA | Digital: ₹7.0 - 7.5 LPA | Prime: ₹9.0 - 11.5 LPA",
    eligibility: {
      degree: "B.E / B.Tech / M.E / M.Tech / MCA / M.Sc",
      minCgpa: "Minimum 60% or 6.0 CGPA throughout 10th, 12th, Diploma & Graduation",
      backlogs: "Maximum 1 active backlog permitted at the time of appearing (must be cleared before joining)",
      gapPolicy: "Overall academic gap must not exceed 24 months with legitimate documentation"
    },
    examPattern: [
      {
        section: "Part A - Foundation Section (75 mins)",
        details: "Cognitive skills mandatory for all candidates. Traits: Numerical Ability (20 Qs), Reasoning Ability (20 Qs), Verbal Ability (25 Qs). Total 65 Qs.",
        negativeMarking: "No negative marking"
      },
      {
        section: "Part B - Advanced Section (35 mins)",
        details: "Determines Digital & Prime eligibility. Advanced Quantitative Ability (10 Qs), Advanced Reasoning (10 Qs). Total 20 Qs.",
        negativeMarking: "No negative marking"
      },
      {
        section: "Part C - Coding Assessment (90 mins)",
        details: "Hands-on coding: 2 Problems. Problem 1: Standard DSA / Arrays / Math (Easy-Medium, 30 mins). Problem 2: Advanced DP / Graphs / Matrix (Medium-Hard, 60 mins). Supported languages: C, C++, Java, Python, Perl.",
        negativeMarking: "Evaluated on all hidden test cases"
      },
      {
        section: "Technical + Managerial + HR Interview (30-45 mins)",
        details: "Questions on Project work, OOPs, SQL, Data Structures, Problem Solving, and Behavioral fitment.",
        negativeMarking: "N/A"
      }
    ],
    syllabus: {
      quant: "Number Systems, LCM & HCF, Percentages, Time & Work, Speed Distance Time, Profit & Loss, Ratio & Proportion, Permutations & Combinations, Probability.",
      reasoning: "Blood Relations, Syllogisms, Coding-Decoding, Seating Arrangement, Data Sufficiency, Series, Direction Sense.",
      verbal: "Reading Comprehension, Sentence Completion, Error Identification, Para Jumbles, Vocabulary & Idioms.",
      coding: "Arrays, Strings, Recursion, Dynamic Programming, Binary Trees, Hashing, Matrix Manipulations, Complexity Analysis."
    },
    interviewQuestions: [
      "Explain the difference between clustered and non-clustered indexes in SQL.",
      "How does HashMap handle collisions internally in Java?",
      "Walk me through the architecture of your final year academic project.",
      "Given an unsorted array, find the maximum product of three integers."
    ],
    prepStrategy: "Focus on speed in Part A foundation test. Solving both coding questions within time with zero compilation errors guarantees a TCS Digital or Prime interview shortlist."
  },
  {
    id: "comp-infosys",
    name: "Infosys",
    tier: "IT Services & Enterprise Transformation",
    logo: "INFY",
    logoBg: "bg-sky-600",
    packageOverview: "Systems Engineer (SE): ₹3.6 LPA | Digital Specialist Engineer (DSE): ₹6.5 LPA | Specialist Programmer (SP): ₹9.5 LPA",
    eligibility: {
      degree: "B.E / B.Tech / M.Tech / MCA",
      minCgpa: "Minimum 60% or 6.0 CGPA in 10th, 12th, and current degree",
      backlogs: "Zero active backlogs allowed at the time of appearing",
      gapPolicy: "Up to 2 years education gap allowed with genuine reasons"
    },
    examPattern: [
      {
        section: "Round 1: Online Assessment (100 mins)",
        details: "Reasoning Ability (15 Qs, 25 mins), Technical Ability / Math (10 Qs, 35 mins), Verbal Ability (20 Qs, 20 mins), Pseudocode (5 Qs, 10 mins), Numerical Puzzle (4 Qs, 10 mins).",
        negativeMarking: "No negative marking"
      },
      {
        section: "HackWithInfy / InfyTQ (For DSE & SP Roles) (180 mins)",
        details: "3 High-level Competitive Programming problems (Greedy, Dynamic Programming, Advanced Trees, Graphs). Solving 2-3 questions unlocks ₹9.5 LPA SP interview.",
        negativeMarking: "Evaluated on hidden test cases and execution time"
      },
      {
        section: "Round 2: Technical + HR Interview (30-40 mins)",
        details: "Deep dive into OOPs, DBMS queries, basic algorithms, resume projects, and behavioral scenarios.",
        negativeMarking: "N/A"
      }
    ],
    syllabus: {
      quant: "Permutations & Combinations, Probability, Cryptarithmetic puzzles, Time & Speed, Number series.",
      reasoning: "Data Interpretation, Syllogisms, Critical Reasoning, Seating Arrangement.",
      pseudocode: "Bitwise operators, Loop termination, Recursion tracing, Time complexity.",
      coding: "Trees, Graphs, Sliding Window, Dynamic Programming, Substrings, Binary Search."
    },
    interviewQuestions: [
      "What is the difference between method overloading and method overriding?",
      "Write a SQL query to find the second highest salary without using LIMIT or TOP.",
      "Explain the concept of Virtual Memory and Page Replacement in OS.",
      "Solve: Detect a cycle in a directed graph using DFS."
    ],
    prepStrategy: "Practice Cryptarithmetic and Pseudocode questions for the standard test. For DSE/SP, practice LeetCode Medium/Hard DP and Graph problems extensively."
  },
  {
    id: "comp-amazon",
    name: "Amazon",
    tier: "Product Giant & Cloud Infrastructure",
    logo: "AMZN",
    logoBg: "bg-amber-600",
    packageOverview: "SDE-1: ₹28,00,000 - ₹34,00,000 CTC (Base + RSUs + Sign-on Bonus)",
    eligibility: {
      degree: "B.Tech / M.Tech / M.S in CS, IT, ECE, or related engineering branches",
      minCgpa: "7.0+ CGPA preferred (No active backlogs)",
      backlogs: "Zero active backlogs",
      gapPolicy: "Evaluated on skill merit; no strict restriction"
    },
    examPattern: [
      {
        section: "Round 1: Online Assessment (OA) (90-100 mins)",
        details: "2 Coding Problems on LeetCode Medium/Hard level (Arrays, DP, Trees, Graphs, Strings) + Work Style Assessment (Behavioral questions testing Amazon's 16 Leadership Principles).",
        negativeMarking: "Strict test case thresholds"
      },
      {
        section: "Round 2: Technical Interview 1 (60 mins)",
        details: "Live coding on CollabEdit: Data Structures & Algorithms (Trees, Heaps, Graphs). Followed by 15 mins on Amazon Leadership Principles using the STAR method.",
        negativeMarking: "Evaluated on optimal time/space complexity and clean code"
      },
      {
        section: "Round 3: Technical Interview 2 (60 mins)",
        details: "Advanced DSA (Dynamic Programming, Graph algorithms, Complex edge cases) + Low-Level System Design (Object-Oriented Design, Class Diagrams) + Leadership Principles.",
        negativeMarking: "N/A"
      },
      {
        section: "Round 4: Bar Raiser Interview (60 mins)",
        details: "Conducted by a certified Bar Raiser outside the hiring team. In-depth dive into past project failures, trade-offs, and rigorous evaluation of Customer Obsession & Ownership.",
        negativeMarking: "Veto authority on candidate hiring"
      }
    ],
    syllabus: {
      dsa: "Arrays, Hash Tables, Two Pointers, Linked Lists, Binary Trees, BST, Heaps, Graphs (Dijkstra, Topological Sort), Dynamic Programming, Trie.",
      systemDesign: "Low-Level Design (LLD): Parking Lot, Elevator System, Tic-Tac-Toe, LRU Cache, SOLID Principles, Design Patterns.",
      leadershipPrinciples: "Customer Obsession, Ownership, Invent and Simplify, Are Right A Lot, Learn and Be Curious, Bias for Action, Deliver Results."
    },
    interviewQuestions: [
      "Design an LRU Cache with O(1) get and put operations.",
      "Given a binary tree, find the maximum path sum between any two nodes.",
      "Tell me about a time when you had to take an unpopular technical decision with incomplete information.",
      "Serialize and deserialize a Binary Tree."
    ],
    prepStrategy: "Master LeetCode Blind 75 and prepare at least two compelling STAR-format stories for each of Amazon's 16 Leadership Principles."
  },
  {
    id: "comp-google",
    name: "Google",
    tier: "Product Giant & Deep Tech",
    logo: "GOOG",
    logoBg: "bg-blue-600",
    packageOverview: "Software Engineer L3 (Entry Level): ₹32,00,000 - ₹45,00,000 CTC",
    eligibility: {
      degree: "B.E / B.Tech / M.Tech / PhD in Computer Science or equivalent field",
      minCgpa: "No formal CGPA cutoff; strictly evaluated on algorithmic prowess",
      backlogs: "Must have completed degree requirements prior to onboarding",
      gapPolicy: "No restriction"
    },
    examPattern: [
      {
        section: "Round 1: Google Online Challenge (GOC) (60 mins)",
        details: "2 High-level algorithmic and mathematical coding problems on Google's testing platform.",
        negativeMarking: "Evaluated on asymptotic correctness and edge cases"
      },
      {
        section: "Technical Interview Rounds 1 to 3 (45 mins each)",
        details: "Pure algorithmic problem solving on Google Docs or Chromebook without IDE auto-complete. Topics: Advanced Graphs, Combinatorics, DP on trees, Segment Trees, Geometry.",
        negativeMarking: "N/A"
      },
      {
        section: "Googleyness & Leadership Round (45 mins)",
        details: "Behavioral interview assessing intellectual humility, doing the right thing, comfort with ambiguity, and collaborative instincts.",
        negativeMarking: "N/A"
      },
      {
        section: "Hiring Committee Review",
        details: "Independent committee evaluates feedback packets across all rounds to make final offer decisions.",
        negativeMarking: "N/A"
      }
    ],
    syllabus: {
      dsa: "Advanced Graphs (Tarjan's, Bridges, Eulerian path), Dynamic Programming, Binary Search on Answer, Segment Trees, Fenwick Trees, Disjoint Set Union (DSU), String Hashing.",
      csCore: "Deep understanding of Big-O asymptotic limits, memory allocations, CPU caching effects, thread concurrency."
    },
    interviewQuestions: [
      "Find the median of two sorted arrays in O(log(min(m, n))) time.",
      "Given an n x n chessboard, find the minimum knight moves to reach target from source.",
      "Describe a time when you received constructive negative feedback from a senior and how you adjusted."
    ],
    prepStrategy: "Communicate your thought process out loud before typing code. Clarify boundary constraints, write bug-free modular code on plain text editor, and analyze complexities precisely."
  },
  {
    id: "comp-accenture",
    name: "Accenture",
    tier: "IT Services & Tech Consulting",
    logo: "ACN",
    logoBg: "bg-purple-700",
    packageOverview: "Associate Software Engineer (ASE): ₹4.5 LPA | Advanced ASE: ₹6.5 LPA",
    eligibility: {
      degree: "B.E / B.Tech all branches, MCA, M.Sc (CS/IT)",
      minCgpa: "Minimum 65% or 6.5 CGPA with no standing backlogs",
      backlogs: "0 active backlogs allowed",
      gapPolicy: "Maximum 1 year education gap between qualifications"
    },
    examPattern: [
      {
        section: "Round 1: Cognitive & Technical Assessment (90 mins)",
        details: "Cognitive (English Ability 17 Qs, Critical Thinking 18 Qs, Abstract Reasoning 15 Qs) + Technical (Common App & MS Office 12 Qs, Pseudocode 18 Qs, Networking & Cloud Security 10 Qs). Total 90 Qs.",
        negativeMarking: "No negative marking (Sectional cutoffs apply)"
      },
      {
        section: "Round 2: Coding Assessment (45 mins)",
        details: "2 Coding questions (Hands-on). Question 1: String manipulation or Array logic. Question 2: Math / Matrix / Basic Sorting. Unlocks immediately if Round 1 is cleared.",
        negativeMarking: "Evaluated on all test cases"
      },
      {
        section: "Round 3: Communication Assessment (30 mins)",
        details: "Automated AI-based spoken test evaluating Sentence Mastery, Vocabulary, Fluency, and Pronunciation via headset.",
        negativeMarking: "Scored on speech clarity"
      },
      {
        section: "Round 4: Technical & HR Interview (20-30 mins)",
        details: "Discussion of resume projects, core tech interests, adaptability, and shift flexibility.",
        negativeMarking: "N/A"
      }
    ],
    syllabus: {
      cognitive: "Critical Reasoning, Analytical puzzles, English comprehension, Flowcharts.",
      technical: "MS Excel/Office shortcuts, Pseudocode tracing, Cloud basics (AWS/Azure concepts), Network security, OOPs fundamentals.",
      coding: "Arrays, Strings, Number theory, Palindromes, Matrix transformations."
    },
    interviewQuestions: [
      "What is the difference between IPv4 and IPv6?",
      "Write a program to reverse words in a given sentence without reversing individual letters.",
      "Are you comfortable relocating or working across flexible shift rotations?"
    ],
    prepStrategy: "Round 1 has strict sectional cutoffs—do not spend all time on one section. Practice speaking clearly into a microphone for the automated Communication Assessment."
  },
  {
    id: "comp-microsoft",
    name: "Microsoft",
    tier: "Product Giant & Cloud Leader",
    logo: "MSFT",
    logoBg: "bg-teal-600",
    packageOverview: "Software Engineer: ₹25,00,000 - ₹35,00,000 CTC + Health & Benefits",
    eligibility: {
      degree: "B.E / B.Tech / M.Tech in CS/IT/ECE or related branches",
      minCgpa: "7.0+ CGPA preferred throughout academics",
      backlogs: "Zero active backlogs allowed",
      gapPolicy: "Up to 12 months with valid reasons"
    },
    examPattern: [
      {
        section: "Round 1: Codility Online Assessment (70 mins)",
        details: "2-3 algorithmic problems focusing on edge cases, correctness, and clean execution under time limits.",
        negativeMarking: "Strict automated test suite"
      },
      {
        section: "Round 2: Technical Interview 1 (60 mins)",
        details: "In-depth problem solving on Arrays, Linked Lists, Trees, and algorithmic optimization with code walkthrough.",
        negativeMarking: "N/A"
      },
      {
        section: "Round 3: Technical Interview 2 & Low-Level Design (60 mins)",
        details: "DSA + Designing clean, extensible object-oriented systems (e.g. Design a Meeting Scheduler, File System, or Notification Engine).",
        negativeMarking: "N/A"
      },
      {
        section: "Round 4: Partner / Director Round (AA Round) (60 mins)",
        details: "Focuses on architectural intuition, growth mindset, technical passion, and alignment with Microsoft's mission.",
        negativeMarking: "N/A"
      }
    ],
    syllabus: {
      dsa: "Binary Trees, BST, Linked Lists, Dynamic Programming, Graphs, Trie, Sliding Window, Two Pointers.",
      design: "Design Patterns (Factory, Strategy, Observer, Decorator), Concurrency & Thread safety, SOLID principles."
    },
    interviewQuestions: [
      "Reverse nodes in k-Group in a Linked List.",
      "Design an efficient key-value store with transaction support (commit, rollback).",
      "Explain the concept of Growth Mindset and give an example of how you applied it recently."
    ],
    prepStrategy: "Emphasize writing clean, production-grade, readable code with descriptive variable names. Microsoft values code quality and design elegance as much as algorithmic complexity."
  }
];
