// HR Interview Preparation & Behavioral Questions Dataset
window.JobPortalData = window.JobPortalData || {};

window.JobPortalData.hr = {
  starFramework: {
    title: "The STAR Framework for Behavioral Interviews",
    description: "The gold standard methodology used by Amazon, Google, Microsoft, and top MNCs to evaluate behavioral competency.",
    steps: [
      {
        letter: "S",
        name: "Situation",
        desc: "Set the context. Describe the specific event, challenge, or project background. Keep it concise (15-20% of your answer)."
      },
      {
        letter: "T",
        name: "Task",
        desc: "Identify your exact responsibility or challenge. What goal were you tasked to accomplish? (10-15% of your answer)."
      },
      {
        letter: "A",
        name: "Action",
        desc: "Detail the specific actions YOU took. Highlight your analytical thinking, collaboration, tools, and technical skills (50-60% of your answer)."
      },
      {
        letter: "R",
        name: "Result",
        desc: "Share the measurable outcome. Quantify achievements (percentages, time saved, revenue, user adoption) and lessons learned (15-20% of your answer)."
      }
    ]
  },
  questions: [
    {
      id: "hr-1",
      question: "Tell me about yourself.",
      category: "Introduction",
      objective: "Assessing your elevator pitch, communication clarity, career trajectory, and relevance to the role.",
      framework: "Present -> Past -> Future (2 Minutes max rule)",
      modelAnswer: "I'm a final-year Computer Science graduate passionate about building scalable web systems and problem-solving. Over the past two years, I've deepened my foundation in Data Structures, Algorithms, and Full-Stack Development with React and Node.js. During my summer internship at XYZ, I optimized database queries that reduced page load times by 35% for over 20,000 active users. What excites me about joining your team is your innovative work in high-throughput cloud platforms, where I can apply my algorithmic rigor and contribute to high-impact product features from day one.",
      pitfalls: [
        "Don't recite your entire resume chronologically from high school.",
        "Don't share personal life details (hobbies, family background) unless explicitly prompted.",
        "Don't exceed 90 to 120 seconds."
      ],
      proTips: "End with a clear, positive hook connecting your current capabilities directly to the role you're interviewing for."
    },
    {
      id: "hr-2",
      question: "Describe a time you faced a difficult conflict within your team and how you handled it.",
      category: "Behavioral & STAR",
      objective: "Testing your emotional intelligence, conflict resolution, active listening, and team-first orientation.",
      framework: "STAR Method",
      modelAnswer: "During our final semester capstone project, our 4-person team was divided on architectural design: two wanted a NoSQL database for rapid schema iteration, while the other two insisted on PostgreSQL for transactional ACID guarantees. Deadlines were slipping due to deadlock discussions. I scheduled a 30-minute structured whiteboard session where we documented our core user queries, read-vs-write ratios, and consistency needs against benchmark trade-offs. We realized 80% of our operations required strict relational integrity, so we opted for PostgreSQL while utilizing JSONB fields for dynamic attributes. This resolved the dispute objectively without personal friction, and we delivered the project two weeks ahead of schedule.",
      pitfalls: [
        "Never blame or badmouth your teammates or manager.",
        "Don't claim you've never had a conflict (implies lack of experience or self-awareness).",
        "Don't let the story end unresolved."
      ],
      proTips: "Focus on data-driven decision making and depersonalizing conflicts."
    },
    {
      id: "hr-3",
      question: "What is your greatest weakness, and how are you addressing it?",
      category: "Self-Awareness",
      objective: "Measuring honesty, self-reflection, and proactive self-improvement.",
      framework: "Real Weakness -> Tangible Remediation -> Measurable Progress",
      modelAnswer: "Earlier in my college projects, I tended to hesitate before delegating tasks or asking for help when hitting a technical roadblock, because I wanted to solve everything independently. While this sharpened my persistence, it sometimes risked sprint deadlines. To remedy this, I implemented a personal '30-minute rule': if I am stuck on a bug or design hurdle after 30 minutes of deep documentation research and debugging, I document the exact steps I've tried and reach out to a senior peer or mentor. This has significantly accelerated our delivery cycles and taught me how collaborative code reviews often spark much cleaner solutions.",
      pitfalls: [
        "Avoid cliché faux-weaknesses like 'I'm too much of a perfectionist' or 'I work too hard'.",
        "Never cite a weakness essential to the core job (e.g. 'I struggle with coding algorithms').",
        "Never mention a weakness without showing your actionable improvement plan."
      ],
      proTips: "Select a real behavioral trait you have actively worked on with tangible positive results."
    },
    {
      id: "hr-4",
      question: "Why do you want to join our company specifically?",
      category: "Company Knowledge",
      objective: "Checking whether you did deep homework on their products, engineering culture, and values, or just applied blindly.",
      framework: "Product/Tech Passion + Culture Alignment + Mutual Growth",
      modelAnswer: "I've been closely following your engineering blog, particularly how your team scaled real-time event streaming to support peak flash sales. As someone who has spent the last year diving deep into distributed systems and concurrency, the opportunity to tackle problems at that scale is exhilarating. Furthermore, having spoken with alumni currently at your company, I admire the high ownership culture and continuous mentorship you provide to junior engineers. I want to build my foundation in an environment that prizes engineering excellence and customer obsession.",
      pitfalls: [
        "Don't give generic praise that could apply to any company ('You are a big company with great brand name').",
        "Don't focus solely on perks, snacks, or salary.",
        "Don't mispronounce company products or recent public news."
      ],
      proTips: "Mention at least one specific product feature, open-source contribution, or recent initiative from their engineering blog."
    },
    {
      id: "hr-5",
      question: "Where do you see yourself in 3 to 5 years?",
      category: "Ambition & Stability",
      objective: "Checking career ambition, realism, and retention likelihood.",
      framework: "Mastery of Core Craft -> Cross-functional Ownership -> Technical Leadership",
      modelAnswer: "In the first 1-2 years, my primary goal is to master your codebase, internal tooling, and write clean, dependable production code with minimal oversight. By year 3 to 5, I aspire to grow into a senior engineering role where I can lead architectural design for complex services, mentor junior developers, and act as a bridge between technical execution and business roadmap objectives.",
      pitfalls: [
        "Don't say 'I want your job' or 'I want to start my own startup in 2 years'.",
        "Avoid vague or clueless statements like 'I don't know, let's see where life takes me'."
      ],
      proTips: "Show that you are committed to deepening both technical depth and leadership impact within the organization."
    }
  ],
  closingQuestions: [
    "What are the most challenging technical problems your team is currently solving this quarter?",
    "How does your team foster continuous learning and mentorship for junior software engineers?",
    "What does a successful first 90 days look like for someone stepping into this role?",
    "How does engineering collaborate with product and design during the sprint discovery phase?"
  ]
};
