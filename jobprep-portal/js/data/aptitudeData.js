// Aptitude Preparation Dataset: Notes, Formulas, and Practice MCQs
window.JobPortalData = window.JobPortalData || {};

window.JobPortalData.aptitude = {
  topics: [
    { id: "quant", name: "Quantitative Aptitude", icon: "calculator" },
    { id: "logical", name: "Logical Reasoning", icon: "brain" },
    { id: "verbal", name: "Verbal Ability", icon: "book-open" }
  ],
  notes: {
    quant: [
      {
        title: "Percentages & Profit-Loss Formulas",
        summary: "Fundamental ratios and shortcut rules for fast calculation in campus placements.",
        content: `
### Key Conversion Table:
- $1/2 = 50\\%$
- $1/3 = 33.33\\%$
- $1/4 = 25\\%$
- $1/5 = 20\\%$
- $1/6 = 16.66\\%$
- $1/7 = 14.28\\%$
- $1/8 = 12.5\\%$
- $1/9 = 11.11\\%$
- $1/11 = 9.09\\%$

### Essential Formulas:
1. **Percentage Increase/Decrease:**  
   $$\\text{Percentage Change} = \\frac{\\text{Difference}}{\\text{Original Value}} \\times 100$$
2. **Successive Percentage Changes ($a\\%$ and $b\\%$):**  
   $$\\text{Net Change} = a + b + \\frac{a \\times b}{100}$$  
   *(Use negative sign for decrease/discount)*
3. **Profit & Loss:**  
   - $\\text{Profit} = SP - CP$  
   - $\\text{Profit}\\% = \\frac{\\text{Profit}}{CP} \\times 100$  
   - $\\text{Discount}\\% = \\frac{MP - SP}{MP} \\times 100$  
4. **False Weight Shortcut:**  
   $$\\text{Gain}\\% = \\frac{\\text{Error}}{\\text{True Value} - \\text{Error}} \\times 100$$
        `
      },
      {
        title: "Time, Speed & Distance",
        summary: "Relative speed, train problems, and average speed shortcuts.",
        content: `
### Fundamental Concept:
$$\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}$$
- Conversion: $1\\text{ km/hr} = \\frac{5}{18}\\text{ m/s}$
- $1\\text{ m/s} = \\frac{18}{5}\\text{ km/hr}$

### Golden Rules:
1. **Average Speed (Equal Distances at $x$ and $y$ speed):**  
   $$\\text{Average Speed} = \\frac{2xy}{x + y}$$
2. **Relative Speed:**
   - Moving in **opposite** directions: $S_{rel} = S_1 + S_2$
   - Moving in **same** direction: $S_{rel} = |S_1 - S_2|$
3. **Trains Crossing:**
   - Time to cross pole/man: $T = \\frac{\\text{Length of Train}}{\\text{Speed of Train}}$
   - Time to cross platform/bridge: $T = \\frac{L_{train} + L_{platform}}{\\text{Speed of Train}}$
        `
      },
      {
        title: "Time & Work Shortcuts",
        summary: "LCM method, efficiency ratios, and pipes/cisterns tricks.",
        content: `
### The LCM Method (Fastest Approach):
Instead of fractions ($1/A + 1/B$), assume **Total Work = LCM of individual times**.
- Example: A takes 10 days, B takes 15 days.
  - $\\text{LCM}(10, 15) = 30$ units total work.
  - Efficiency of A = $30 / 10 = 3$ units/day.
  - Efficiency of B = $30 / 15 = 2$ units/day.
  - Combined Efficiency = $3 + 2 = 5$ units/day.
  - Days needed together = $30 / 5 = 6$ days!

### Man-Days Formula:
$$\\frac{M_1 \\times D_1 \\times H_1}{W_1} = \\frac{M_2 \\times D_2 \\times H_2}{W_2}$$
*(Where $M$ = Men, $D$ = Days, $H$ = Hours/day, $W$ = Work done)*
        `
      }
    ],
    logical: [
      {
        title: "Blood Relations & Coded Hierarchy",
        summary: "Family tree mapping, generation levels, and gender symbols.",
        content: `
### Standard Symbol Convention:
- **Male**: $[+]$ or Square box $\\square$
- **Female**: $[-]$ or Circle $\\bigcirc$
- **Spouse**: Double horizontal line $=$
- **Siblings**: Single horizontal line $-$
- **Generations (Parent -> Child)**: Vertical drop line $|$

### High-Yield Tips:
1. Always establish the gender before concluding relationships.
2. Break down long complex statements starting from the pronoun **"my"** or **"of"**!
3. Maternal relations originate from Mother's side; Paternal from Father's side.
        `
      },
      {
        title: "Syllogisms & Venn Diagram Rules",
        summary: "Definite vs possibility conclusions and complementary pairs.",
        content: `
### Standard Statements & Venn Diagrams:
1. **All A are B**: Circle A entirely enclosed inside circle B.
2. **Some A are B**: Overlapping intersection between A and B.
3. **No A is B**: Two disjoint circles with a bar/cross between them.
4. **Some A are not B**: Definite unshaded portion of A outside B.

### Complementary Pairs (Either / Or Condition):
If both individual conclusions are false individually, an "Either/Or" case holds when:
- Pair 1: **Some** + **No**
- Pair 2: **All** + **Some not**
- Both elements must be identical in both conclusions.
        `
      }
    ],
    verbal: [
      {
        title: "Common Sentence Correction & Grammar Traps",
        summary: "Subject-verb agreement, modifier placement, and parallel structure.",
        content: `
### Critical Grammar Traps in Placement Tests:
1. **Subject-Verb Agreement with 'Neither/Nor' & 'Either/Or':**  
   The verb always agrees with the *closest subject*.
   - *Example:* "Neither the manager nor the **developers were** present."
2. **Misplaced Modifiers:**  
   The modifying clause must immediately touch the noun it describes.
   - *Wrong:* "Barking loudly, I opened the door to the dog."
   - *Correct:* "I opened the door to the barking dog."
3. **Parallelism:**  
   List items must share uniform grammatical structure.
   - *Correct:* "He likes **reading**, **coding**, and **traveling**."
        `
      }
    ]
  },
  questions: [
    {
      id: "q-1",
      category: "quant",
      topic: "Percentages & Profit",
      difficulty: "Easy",
      question: "A merchant sells an article at 20% profit. If the cost price was ₹500, what is the selling price?",
      options: ["₹550", "₹580", "₹600", "₹620"],
      answer: 2,
      explanation: "Cost Price = ₹500. Profit = 20% of ₹500 = ₹100. Selling Price = ₹500 + ₹100 = ₹600."
    },
    {
      id: "q-2",
      category: "quant",
      topic: "Time & Work",
      difficulty: "Medium",
      question: "A can complete a piece of work in 12 days and B can do it in 18 days. If they work together for 4 days, what fraction of work is left?",
      options: ["1/3", "4/9", "5/9", "7/18"],
      answer: 1,
      explanation: "Total Work = LCM(12, 18) = 36 units. Rate of A = 36/12 = 3 units/day. Rate of B = 36/18 = 2 units/day. In 4 days, they complete (3 + 2) * 4 = 20 units. Remaining work = 36 - 20 = 16 units. Fraction left = 16/36 = 4/9."
    },
    {
      id: "q-3",
      category: "quant",
      topic: "Speed, Time & Distance",
      difficulty: "Medium",
      question: "A train 180 meters long is running at a speed of 54 km/hr. How much time will it take to cross a platform 270 meters long?",
      options: ["20 seconds", "25 seconds", "30 seconds", "35 seconds"],
      answer: 2,
      explanation: "Speed in m/s = 54 * (5/18) = 15 m/s. Total distance to cover = Train length + Platform length = 180 + 270 = 450 meters. Time = 450 / 15 = 30 seconds."
    },
    {
      id: "q-4",
      category: "quant",
      topic: "Permutations & Combinations",
      difficulty: "Hard",
      question: "In how many different ways can the letters of the word 'LEADER' be arranged?",
      options: ["720", "360", "120", "180"],
      answer: 1,
      explanation: "Total letters = 6. Letter 'E' repeats twice. Ways = 6! / 2! = 720 / 2 = 360 ways."
    },
    {
      id: "q-5",
      category: "logical",
      topic: "Blood Relations",
      difficulty: "Medium",
      question: "Pointing to a photograph, Ramesh said, 'She is the daughter of the only son of my grandfather.' How is the girl related to Ramesh?",
      options: ["Mother", "Sister", "Aunt", "Cousin"],
      answer: 1,
      explanation: "'Only son of my grandfather' refers to Ramesh's father. 'Daughter of my father' is Ramesh's sister."
    },
    {
      id: "q-6",
      category: "logical",
      topic: "Coding-Decoding",
      difficulty: "Easy",
      question: "In a certain code language, 'STABLE' is coded as 'TUDCMF'. How will 'TARGET' be coded in that language?",
      options: ["UBSHFU", "TCSIFU", "UBSHFV", "VATIGV"],
      answer: 0,
      explanation: "Each letter is shifted forward by +1: S->T, T->U, A->B, B->C, L->M, E->F. For 'TARGET': T->U, A->B, R->S, G->H, E->F, T->U => 'UBSHFU'."
    },
    {
      id: "q-7",
      category: "logical",
      topic: "Series Completion",
      difficulty: "Medium",
      question: "Find the next number in the series: 3, 7, 15, 31, 63, ?",
      options: ["95", "111", "127", "129"],
      answer: 2,
      explanation: "Pattern is (x * 2 + 1): 3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63, 63*2+1=127."
    },
    {
      id: "q-8",
      category: "verbal",
      topic: "Sentence Correction",
      difficulty: "Easy",
      question: "Choose the correct alternative: 'Neither the teacher nor the students ____ present at the auditorium.'",
      options: ["was", "were", "is", "has been"],
      answer: 1,
      explanation: "In 'Neither... nor' constructions, the verb agrees with the closer subject. Since 'students' is plural, the plural verb 'were' is correct."
    },
    {
      id: "q-9",
      category: "verbal",
      topic: "Vocabulary",
      difficulty: "Medium",
      question: "Select the synonym for 'EPHEMERAL':",
      options: ["Eternal", "Transient", "Gigantic", "Obscure"],
      answer: 1,
      explanation: "'Ephemeral' means lasting for a very short time. 'Transient' is an exact synonym."
    }
  ]
};
