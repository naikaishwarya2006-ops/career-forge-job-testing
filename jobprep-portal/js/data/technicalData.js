// Core Computer Science Technical Notes & Practice MCQs
window.JobPortalData = window.JobPortalData || {};

window.JobPortalData.technical = {
  subjects: [
    { id: "os", name: "Operating Systems", icon: "cpu" },
    { id: "dbms", name: "DBMS & SQL", icon: "database" },
    { id: "cn", name: "Computer Networks", icon: "network" },
    { id: "oops", name: "OOPs & System Design", icon: "code" }
  ],
  notes: {
    os: [
      {
        title: "Process vs Thread & CPU Scheduling",
        summary: "Process states, context switching, multithreading models, and CPU scheduling algorithms.",
        content: `
### Process vs Thread:
| Feature | Process | Thread (Lightweight Process) |
|---|---|---|
| **Definition** | Program in execution with private address space | Entity within a process sharing memory/resources |
| **Memory** | Own independent memory space | Shares heap, code, data with sibling threads |
| **Context Switch** | Heavy; requires saving PCB and flushing cache | Fast; saves only registers, PC, and stack pointer |
| **Communication** | IPC (Pipes, Sockets, Shared Memory) | Direct memory access via shared variables |

### 4 Necessary Conditions for Deadlock (Coffman Conditions):
1. **Mutual Exclusion:** At least one resource must be non-shareable.
2. **Hold and Wait:** A process is holding at least one resource and waiting to acquire others.
3. **No Preemption:** Resources cannot be forcibly revoked; must be released voluntarily.
4. **Circular Wait:** A closed cycle exists where $P_0$ waits for $P_1$, $P_1$ waits for $P_2$, ..., and $P_n$ waits for $P_0$.

### Paging & Virtual Memory:
- **Paging:** Divides virtual memory into fixed-size **Pages** and physical memory into fixed-size **Frames**.
- **Page Fault:** Interrupt raised when a requested page is not currently in RAM, triggering page replacement (e.g. LRU, FIFO).
- **Thrashing:** System spends more time swapping pages in and out than executing instructions due to insufficient memory.
        `
      }
    ],
    dbms: [
      {
        title: "ACID Properties & Database Normalization",
        summary: "Atomicity, Consistency, Isolation, Durability, Transactions, Normal Forms (1NF to BCNF).",
        content: `
### ACID Properties:
- **Atomicity:** All operations in a transaction succeed completely, or all are rolled back ("All or Nothing").
- **Consistency:** Database transitions from one valid state to another, preserving integrity constraints.
- **Isolation:** Concurrent transactions execute without interfering with one another.
- **Durability:** Once committed, transaction results survive even system crashes.

### Normal Forms (1NF -> BCNF):
1. **1NF (First Normal Form):** Each column holds atomic (indivisible) values; no repeating groups or arrays.
2. **2NF (Second Normal Form):** Must be in 1NF + **No Partial Dependency** (all non-key attributes fully depend on the whole primary key).
3. **3NF (Third Normal Form):** Must be in 2NF + **No Transitive Dependency** (non-prime attributes cannot depend on other non-prime attributes: $X \\rightarrow Y$ where $X$ is not superkey).
4. **BCNF (Boyce-Codd Normal Form):** For every functional dependency $X \\rightarrow Y$, $X$ MUST be a superkey.

### SQL Joins Cheat Sheet:
- **INNER JOIN:** Records having matching keys in both tables.
- **LEFT JOIN:** All records from left table, and matching records from right table (NULL if no match).
- **FULL OUTER JOIN:** All records from both tables.
        `
      }
    ],
    cn: [
      {
        title: "OSI vs TCP/IP & Protocols",
        summary: "7 layers of OSI, TCP vs UDP, 3-way handshake, DNS, and HTTP/HTTPS.",
        content: `
### OSI 7-Layer Hierarchy:
1. **Application:** HTTP, HTTPS, FTP, SMTP, DNS
2. **Presentation:** Encryption (TLS/SSL), Compression, Serialization
3. **Session:** Session management, RPC
4. **Transport:** TCP (reliable, connection-oriented) vs UDP (fast, connectionless)
5. **Network:** IP addressing, Routing protocols (OSPF, BGP)
6. **Data Link:** Framing, MAC addressing, Error detection (CRC)
7. **Physical:** Cables, Bits, Hubs, Signaling

### TCP 3-Way Handshake:
1. **SYN:** Client sends \`SYN (seq = x)\` to Server.
2. **SYN-ACK:** Server responds with \`SYN-ACK (seq = y, ack = x + 1)\`.
3. **ACK:** Client sends \`ACK (ack = y + 1)\`. Connection Established!

### HTTP vs HTTPS:
HTTPS encrypts HTTP traffic via **TLS/SSL** over port 443 using asymmetric encryption for key exchange and symmetric encryption (AES) for data transmission.
        `
      }
    ],
    oops: [
      {
        title: "The 4 OOP Pillars & SOLID Principles",
        summary: "Encapsulation, Abstraction, Inheritance, Polymorphism, and clean architectural design.",
        content: `
### The 4 Pillars:
1. **Encapsulation:** Bundling data (variables) and methods within a class while restricting direct external access (private fields + public getters/setters).
2. **Abstraction:** Hiding complex implementation details and exposing only essential interfaces (Interfaces, Abstract Classes).
3. **Inheritance:** Deriving new classes from existing classes to promote code reuse (\`extends\` / \`implements\`).
4. **Polymorphism:**
   - *Compile-time (Static):* Method Overloading (same name, different arguments).
   - *Runtime (Dynamic):* Method Overriding (virtual functions, dynamic dispatch).

### SOLID Principles:
- **S - Single Responsibility:** A class should have only one reason to change.
- **O - Open/Closed:** Open for extension, closed for modification.
- **L - Liskov Substitution:** Subtypes must be substitutable for their base types without altering program correctness.
- **I - Interface Segregation:** Prefer multiple small, client-specific interfaces over one large general-purpose interface.
- **D - Dependency Inversion:** Depend on abstractions, not on concrete implementations.
        `
      }
    ]
  },
  questions: [
    {
      id: "tq-1",
      subject: "os",
      question: "Which of the following is NOT a necessary Coffman condition for a deadlock to occur?",
      options: ["Mutual Exclusion", "Circular Wait", "Preemption allowed", "Hold and Wait"],
      answer: 2,
      explanation: "'No Preemption' is the necessary condition. If preemption is allowed, deadlocks can be broken and prevented."
    },
    {
      id: "tq-2",
      subject: "os",
      question: "What is 'Thrashing' in an Operating System?",
      options: [
        "A CPU scheduling bug where processes freeze",
        "A condition where system spends more time page swapping than executing code",
        "Overheating of CPU cores during intensive computing",
        "Failure of cache memory synchronization"
      ],
      answer: 1,
      explanation: "Thrashing occurs when the virtual memory subsystem is in a constant state of paging (swapping pages in and out of RAM), drastically degrading throughput."
    },
    {
      id: "tq-3",
      subject: "dbms",
      question: "In relational database design, which normal form strictly requires that for every functional dependency X -> Y, X must be a superkey?",
      options: ["1NF", "2NF", "3NF", "Boyce-Codd Normal Form (BCNF)"],
      answer: 3,
      explanation: "BCNF is a stricter version of 3NF. In BCNF, every determinant X in a functional dependency X -> Y must be a candidate key / superkey."
    },
    {
      id: "tq-4",
      subject: "dbms",
      question: "Which property in ACID ensures that committed transactions survive subsequent system crashes or power failures?",
      options: ["Atomicity", "Consistency", "Isolation", "Durability"],
      answer: 3,
      explanation: "Durability guarantees that once a transaction has been committed, it will remain committed even in the event of a system crash or power outage."
    },
    {
      id: "tq-5",
      subject: "cn",
      question: "Which transport layer protocol is connectionless and does not guarantee packet delivery order?",
      options: ["TCP", "UDP", "SCTP", "BGP"],
      answer: 1,
      explanation: "UDP (User Datagram Protocol) is a lightweight, connectionless protocol with minimal overhead that does not guarantee delivery, order, or error recovery."
    },
    {
      id: "tq-6",
      subject: "cn",
      question: "In the TCP 3-way handshake, what is the sequence of packets exchanged between client and server?",
      options: ["SYN -> ACK -> SYN", "SYN -> SYN-ACK -> ACK", "ACK -> SYN -> ACK", "SYN -> PSH -> FIN"],
      answer: 1,
      explanation: "Client initiates with SYN; Server replies with SYN-ACK; Client concludes handshake with ACK."
    },
    {
      id: "tq-7",
      subject: "oops",
      question: "Which SOLID principle states that derived classes must be substitutable for their base classes without breaking program correctness?",
      options: ["Single Responsibility Principle", "Open/Closed Principle", "Liskov Substitution Principle", "Interface Segregation Principle"],
      answer: 2,
      explanation: "The Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the application."
    },
    {
      id: "tq-8",
      subject: "oops",
      question: "Method Overloading is an example of which type of polymorphism?",
      options: ["Compile-time (Static) Polymorphism", "Runtime (Dynamic) Polymorphism", "Coercion Polymorphism", "Parametric Polymorphism"],
      answer: 0,
      explanation: "Method Overloading is resolved at compile time based on parameter types and counts, hence it is compile-time (static) polymorphism."
    }
  ]
};
