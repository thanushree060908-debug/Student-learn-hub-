import React, { useState, useMemo, useEffect } from "react";
import {
  Search, Menu, X, Sun, Moon, BookOpen, Map, Library, Info, User,
  ChevronRight, ChevronLeft, CheckCircle2, Circle, PlayCircle, FileText,
  Dumbbell, HelpCircle, Award, Bookmark, TrendingUp, Calculator,
  BarChart3, MessageSquare, Laptop, FileSpreadsheet, Mail, Phone,
  MapPin, Star, LogOut, GraduationCap, Sparkles, Clock, ChevronDown,
  Home as HomeIcon, Mail as MailIcon
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/* DATA                                                                    */
/* ---------------------------------------------------------------------- */

const COURSES = [
  {
    id: "excel",
    title: "Microsoft Excel",
    category: "Technology",
    level: "Beginner",
    icon: FileSpreadsheet,
    hours: 6,
    summary: "Build real spreadsheet skills — formulas, tables, and charts you'll use in every class and job.",
    lessons: [
      {
        title: "Getting Started with Excel",
        duration: "12 min",
        notes: "Excel organizes data into rows and columns called cells. A cell reference like B3 tells you the column (B) and row (3). You'll learn how to enter data, select ranges, and format cells so a sheet is easy to read.",
        practice: "Open a blank sheet. Enter a list of 5 subjects in column A and your marks in column B. Bold the header row and widen the columns to fit the text.",
        quiz: { q: "What does the cell reference C4 mean?", options: ["Column C, Row 4", "Row C, Column 4", "Cell number 34", "Sheet 4, Cell C"], answer: 0 }
      },
      {
        title: "Core Formulas: SUM, IF, VLOOKUP",
        duration: "18 min",
        notes: "Formulas start with =. SUM adds a range, IF returns one value when a condition is true and another when false, and VLOOKUP looks up a value in one column and returns a matching value from another.",
        practice: "Using your marks list, write =SUM() for the total, and an =IF() formula that marks each subject as \"Pass\" or \"Fail\" using 40 as the cutoff.",
        quiz: { q: "Which formula adds up a range of numbers?", options: ["=IF()", "=SUM()", "=VLOOKUP()", "=COUNT()"], answer: 1 }
      },
      {
        title: "Working with PivotTables",
        duration: "16 min",
        notes: "A PivotTable summarizes a large table without changing the original data. Drag a field into Rows to group by it, and a numeric field into Values to total, count, or average it.",
        practice: "Build a small sales table with Product and Amount columns, then create a PivotTable that totals Amount by Product.",
        quiz: { q: "What is the main benefit of a PivotTable?", options: ["It deletes duplicate rows", "It summarizes data without altering the source", "It only works with text", "It replaces charts"], answer: 1 }
      },
      {
        title: "Charts and Simple Dashboards",
        duration: "14 min",
        notes: "Charts turn numbers into a shape people can read at a glance. Bar charts compare categories, line charts show change over time, and combining a few charts on one sheet creates a mini dashboard.",
        practice: "Turn your PivotTable into a bar chart, then add a title and axis labels so it reads clearly on its own.",
        quiz: { q: "Which chart type is best for showing a trend over time?", options: ["Pie chart", "Bar chart", "Line chart", "Scatter chart"], answer: 2 }
      }
    ]
  },
  {
    id: "powerbi",
    title: "Power BI",
    category: "Technology",
    level: "Intermediate",
    icon: BarChart3,
    hours: 7,
    summary: "Turn raw spreadsheets into interactive dashboards that tell a clear, honest story.",
    lessons: [
      {
        title: "The Power BI Interface & Importing Data",
        duration: "15 min",
        notes: "Power BI Desktop has three views: Report, Data, and Model. You import data from files or databases through Get Data, then shape it in Power Query before it ever reaches a chart.",
        practice: "Import a CSV of sample sales data and rename the query so it clearly describes its contents.",
        quiz: { q: "Where do you clean and shape data before building visuals?", options: ["Report view", "Power Query", "Model view", "Publish settings"], answer: 1 }
      },
      {
        title: "Building Your First Report",
        duration: "20 min",
        notes: "Visuals are built by dragging fields onto the canvas. A bar chart needs a category and a value; a card visual just needs one number, like total revenue.",
        practice: "Build a report page with one card showing total sales and one bar chart showing sales by region.",
        quiz: { q: "What's the minimum you need for a bar chart visual?", options: ["Two categories", "A category and a value", "Three measures", "A map field"], answer: 1 }
      },
      {
        title: "DAX Basics",
        duration: "22 min",
        notes: "DAX is the formula language behind Power BI's calculations. A measure like Total Sales = SUM(Sales[Amount]) recalculates automatically as filters change on the report.",
        practice: "Write a measure that calculates average order value, then add it as a card visual.",
        quiz: { q: "What does a DAX measure do?", options: ["Formats text only", "Recalculates based on report filters", "Imports new tables", "Deletes rows"], answer: 1 }
      },
      {
        title: "Publishing & Sharing Dashboards",
        duration: "13 min",
        notes: "Once a report is ready, you publish it to the Power BI Service, where it becomes a shareable dashboard that others can view or interact with through a browser.",
        practice: "Write a one-paragraph plan for who would view your dashboard and which single number they'd care about most.",
        quiz: { q: "Where does a report go once you publish it?", options: ["Power BI Service", "Excel", "Power Query", "The Model view"], answer: 0 }
      }
    ]
  },
  {
    id: "accounting",
    title: "Accounting Fundamentals",
    category: "Finance",
    level: "Beginner",
    icon: Calculator,
    hours: 8,
    summary: "Learn debits, credits, and financial statements from first principles.",
    lessons: [
      {
        title: "The Accounting Equation",
        duration: "14 min",
        notes: "Every business fits one equation: Assets = Liabilities + Equity. What a company owns is always financed by either what it owes others or what the owners have invested.",
        practice: "List three things a small business might own (assets) and classify each as financed by debt or by the owner.",
        quiz: { q: "What does the accounting equation state?", options: ["Revenue = Expenses", "Assets = Liabilities + Equity", "Profit = Assets - Cash", "Equity = Revenue - Assets"], answer: 1 }
      },
      {
        title: "Recording Transactions",
        duration: "20 min",
        notes: "Every transaction is recorded as a journal entry with at least one debit and one credit of equal value. Debits increase assets and expenses; credits increase liabilities, equity, and revenue.",
        practice: "Record a journal entry for a business buying office supplies for cash.",
        quiz: { q: "In double-entry accounting, every transaction affects:", options: ["Only one account", "At least two accounts", "Only cash", "Only revenue accounts"], answer: 1 }
      },
      {
        title: "Trial Balance & Adjustments",
        duration: "18 min",
        notes: "A trial balance lists every account and its balance to check that total debits equal total credits before financial statements are prepared, after any adjusting entries.",
        practice: "Given a short list of account balances, check whether the debits and credits match.",
        quiz: { q: "What is a trial balance used to confirm?", options: ["That profit is positive", "That debits equal credits", "That cash increased", "That taxes are paid"], answer: 1 }
      },
      {
        title: "Reading Financial Statements",
        duration: "20 min",
        notes: "The income statement shows profit over a period, the balance sheet shows financial position at a point in time, and the cash flow statement tracks actual cash moving in and out.",
        practice: "Given a simple income statement, identify revenue, expenses, and net profit.",
        quiz: { q: "Which statement shows financial position at a single point in time?", options: ["Income statement", "Cash flow statement", "Balance sheet", "Trial balance"], answer: 2 }
      }
    ]
  },
  {
    id: "finance",
    title: "Personal & Corporate Finance",
    category: "Finance",
    level: "Intermediate",
    icon: TrendingUp,
    hours: 6,
    summary: "Understand budgeting, the time value of money, and how companies decide where to invest.",
    lessons: [
      {
        title: "Budgeting Basics",
        duration: "12 min",
        notes: "A budget compares expected income against planned spending across categories, so you can see a shortfall or surplus before it happens rather than after.",
        practice: "Draft a simple monthly budget with three income and five expense categories.",
        quiz: { q: "What is the main purpose of a budget?", options: ["To track past spending only", "To plan income against spending in advance", "To calculate taxes", "To record investments"], answer: 1 }
      },
      {
        title: "Time Value of Money",
        duration: "18 min",
        notes: "Money today is worth more than the same amount later because it can earn a return. Present value discounts future cash back to today's terms using a chosen interest rate.",
        practice: "Calculate the present value of ₹10,000 received in 3 years at a 8% discount rate.",
        quiz: { q: "Why is money today worth more than the same amount in the future?", options: ["Inflation always falls", "It can be invested to earn a return", "Prices never change", "Banks require it"], answer: 1 }
      },
      {
        title: "Understanding Financial Statements",
        duration: "16 min",
        notes: "Investors and managers read the same three statements as accountants, but focus on ratios like profit margin and debt-to-equity to judge performance and risk over time.",
        practice: "Calculate the net profit margin from a given revenue and net income figure.",
        quiz: { q: "What does net profit margin measure?", options: ["Revenue divided by assets", "Net income divided by revenue", "Debt divided by equity", "Cash divided by liabilities"], answer: 1 }
      },
      {
        title: "Introduction to Investing",
        duration: "15 min",
        notes: "Common investment types include stocks, bonds, and mutual funds, each with a different balance of risk and expected return. Diversifying across several reduces the impact of any single loss.",
        practice: "List two investment types and one risk associated with each.",
        quiz: { q: "What is the main benefit of diversification?", options: ["Guarantees profit", "Reduces the impact of a single loss", "Eliminates all risk", "Increases fees"], answer: 1 }
      }
    ]
  },
  {
    id: "bizcomm",
    title: "Business Communication",
    category: "Communication",
    level: "Beginner",
    icon: MessageSquare,
    hours: 5,
    summary: "Write, speak, and present with clarity — the skill recruiters notice first.",
    lessons: [
      {
        title: "Written Communication Essentials",
        duration: "13 min",
        notes: "Clear business writing follows the 7 Cs — Clear, Concise, Concrete, Correct, Coherent, Complete, and Courteous. State your purpose in the first line, then support it.",
        practice: "Rewrite a wordy email so it fits in three short sentences without losing the request.",
        quiz: { q: "Which of these is one of the 7 Cs of communication?", options: ["Casual", "Concise", "Complicated", "Colorful"], answer: 1 }
      },
      {
        title: "Verbal & Non-verbal Communication",
        duration: "14 min",
        notes: "Tone, pace, and pauses carry meaning in speech, while posture, eye contact, and gestures carry meaning without a single word — the two need to match to be believable.",
        practice: "Record yourself explaining your favorite subject for 60 seconds, then note one thing your tone communicated well.",
        quiz: { q: "Non-verbal communication mainly includes:", options: ["Word choice", "Posture, eye contact, and gestures", "Grammar rules", "Email formatting"], answer: 1 }
      },
      {
        title: "Presentation Skills",
        duration: "16 min",
        notes: "A strong presentation opens with why the topic matters, uses slides to support rather than replace your voice, and closes with a clear takeaway the audience can repeat back.",
        practice: "Outline a 3-slide presentation on a topic you know well: one hook slide, one content slide, one takeaway slide.",
        quiz: { q: "What should slides do in a presentation?", options: ["Replace the speaker's voice", "Support what the speaker says", "Contain full paragraphs", "Be read word for word"], answer: 1 }
      },
      {
        title: "Interview & Resume Skills",
        duration: "15 min",
        notes: "A resume should lead with achievements, not duties — use numbers where possible. In interviews, the STAR method (Situation, Task, Action, Result) keeps answers structured and specific.",
        practice: "Write one resume bullet point for a project you've done, using a number to show its impact.",
        quiz: { q: "What does the STAR method help structure?", options: ["Resume formatting", "Interview answers", "Email subject lines", "Presentation slides"], answer: 1 }
      }
    ]
  },
  {
    id: "techbasics",
    title: "Basic Technology Skills",
    category: "Technology",
    level: "Beginner",
    icon: Laptop,
    hours: 4,
    summary: "Get comfortable with computers, files, and everyday software — no assumptions made.",
    lessons: [
      {
        title: "Understanding Your Computer",
        duration: "10 min",
        notes: "An operating system (Windows, macOS) manages your files and runs your programs. Knowing your way around the desktop, taskbar, and settings makes everything else easier.",
        practice: "Find and open your computer's settings panel, then locate the storage and Wi-Fi sections.",
        quiz: { q: "What does an operating system do?", options: ["Only browses the internet", "Manages files and runs programs", "Only plays media", "Stores passwords"], answer: 1 }
      },
      {
        title: "Files, Folders & Cloud Storage",
        duration: "12 min",
        notes: "Organizing files into clearly named folders saves hours later. Cloud storage like Google Drive keeps a copy online, so your work survives even if a device is lost.",
        practice: "Create a folder structure for your current semester with one subfolder per subject.",
        quiz: { q: "What is one advantage of cloud storage?", options: ["It never needs internet", "Your files are backed up online", "It's always free unlimited space", "It deletes old files automatically"], answer: 1 }
      },
      {
        title: "Email & Online Etiquette",
        duration: "11 min",
        notes: "A professional email has a clear subject line, a greeting, a short body, and a sign-off. Avoid all caps, reply promptly, and double-check the recipient before sending.",
        practice: "Draft a short email to a professor asking for a deadline extension, following the structure above.",
        quiz: { q: "What should a professional email subject line do?", options: ["Be left blank", "Clearly state the purpose", "Use all caps", "Include emojis only"], answer: 1 }
      },
      {
        title: "Staying Safe Online",
        duration: "12 min",
        notes: "Strong, unique passwords and two-factor authentication protect your accounts. Be cautious of links in unexpected emails — phishing attempts often imitate real organizations.",
        practice: "Check whether any of your accounts share a password, and change one to something unique.",
        quiz: { q: "What does two-factor authentication add to a password?", options: ["A second, independent verification step", "A shorter login time", "Automatic backups", "Nothing extra"], answer: 0 }
      }
    ]
  }
];

const LEARNING_PATHS = [
  { title: "Data & Analytics Track", steps: ["Basic Technology Skills", "Microsoft Excel", "Power BI"], blurb: "From your first spreadsheet to a published dashboard." },
  { title: "Finance Career Track", steps: ["Accounting Fundamentals", "Personal & Corporate Finance", "Business Communication"], blurb: "Build the numbers skills employers ask for, then learn to present them." },
  { title: "Campus-to-Career Track", steps: ["Business Communication", "Basic Technology Skills", "Microsoft Excel"], blurb: "The practical basics every internship assumes you already know." }
];

const FAQS = [
  { q: "Is Student Learn Hub free to use?", a: "Every course on the platform is free for students. Create an account to save your progress across sessions." },
  { q: "Do I need prior experience to start?", a: "No. Every learning path starts with a Beginner course, and lessons assume no prior knowledge unless stated." },
  { q: "How long does a course take?", a: "Most courses take 4–8 hours total, split into short lessons of 10–20 minutes so you can fit them around classes." },
  { q: "Can I get a certificate?", a: "Yes. Completing every lesson and quiz in a course unlocks a badge and a certificate on your dashboard." },
  { q: "Can I use this on my phone?", a: "Yes, the site is fully responsive and works on mobile, tablet, and desktop." }
];

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];
const CATEGORIES = ["All", "Technology", "Finance", "Communication"];

/* ---------------------------------------------------------------------- */
/* THEME                                                                   */
/* ---------------------------------------------------------------------- */

const THEME_CSS = `
  .slh-root {
    --bg: #FBFCFE;
    --surface: #FFFFFF;
    --surface-alt: #F1F5FB;
    --border: #E1E7F2;
    --text: #101828;
    --text-muted: #5B6472;
    --primary: #2A4CDB;
    --primary-dark: #1D35A3;
    --primary-tint: #EAEEFD;
    --amber: #E79A1F;
    --amber-tint: #FCF1DD;
    --success: #1C8F63;
    --success-tint: #E4F6EE;
    --shadow: 0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06);
    --radius: 16px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    transition: background 0.25s ease, color 0.25s ease;
  }
  .slh-root.dark {
    --bg: #0A0F1C;
    --surface: #121A2C;
    --surface-alt: #172136;
    --border: #253251;
    --text: #E8ECF6;
    --text-muted: #93A0BC;
    --primary: #5C82FF;
    --primary-dark: #85A2FF;
    --primary-tint: #1B2748;
    --amber: #F0B740;
    --amber-tint: #2C2311;
    --success: #38C48C;
    --success-tint: #12271F;
    --shadow: 0 1px 2px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.25);
  }
  .slh-root * { box-sizing: border-box; }
  .slh-display { font-family: 'Sora', 'Inter', sans-serif; }
  .slh-root button, .slh-root input, .slh-root select { font-family: inherit; }
  .slh-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .slh-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 11px 22px; border-radius: 11px; font-weight: 600; font-size: 0.94rem;
    cursor: pointer; border: 1px solid transparent; transition: transform 0.12s ease, background 0.15s ease, box-shadow 0.15s ease;
  }
  .slh-btn:active { transform: scale(0.97); }
  .slh-btn-primary { background: var(--primary); color: #fff; }
  .slh-btn-primary:hover { background: var(--primary-dark); }
  .slh-btn-ghost { background: transparent; color: var(--text); border-color: var(--border); }
  .slh-btn-ghost:hover { background: var(--surface-alt); }
  .slh-btn-tonal { background: var(--primary-tint); color: var(--primary); }
  .slh-btn-tonal:hover { filter: brightness(0.96); }
  .slh-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    box-shadow: var(--shadow);
  }
  .slh-focusable:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
  .slh-input {
    width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid var(--border);
    background: var(--surface); color: var(--text); font-size: 0.95rem;
  }
  .slh-input:focus { outline: 2px solid var(--primary); outline-offset: 1px; }
  .slh-link { color: var(--text-muted); text-decoration: none; font-size: 0.95rem; cursor: pointer; transition: color 0.15s ease; }
  .slh-link:hover, .slh-link.active { color: var(--primary); }
  .slh-badge {
    display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px;
    font-size: 0.78rem; font-weight: 600;
  }
  .slh-fadein { animation: slhFade 0.5s ease both; }
  @keyframes slhFade { from { opacity:0; transform: translateY(6px);} to {opacity:1; transform:none;} }
  .slh-pulse { animation: slhPulse 2.2s ease-in-out infinite; }
  @keyframes slhPulse { 0%,100% { box-shadow: 0 0 0 0 var(--primary-tint);} 50% { box-shadow: 0 0 0 8px transparent;} }
  @media (prefers-reduced-motion: reduce) {
    .slh-fadein, .slh-pulse { animation: none; }
  }
  .slh-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
  .slh-scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
`;

/* ---------------------------------------------------------------------- */
/* SMALL SHARED COMPONENTS                                                */
/* ---------------------------------------------------------------------- */

function ProgressBar({ value, height = 8 }) {
  return (
    <div style={{ background: "var(--surface-alt)", borderRadius: 999, height, overflow: "hidden", border: "1px solid var(--border)" }}>
      <div style={{
        width: `${Math.max(0, Math.min(100, value))}%`, height: "100%",
        background: "linear-gradient(90deg, var(--primary), var(--primary-dark))",
        borderRadius: 999, transition: "width 0.4s ease"
      }} />
    </div>
  );
}

function LevelPill({ level }) {
  const colors = {
    Beginner: { bg: "var(--success-tint)", fg: "var(--success)" },
    Intermediate: { bg: "var(--amber-tint)", fg: "var(--amber)" },
    Advanced: { bg: "var(--primary-tint)", fg: "var(--primary)" }
  };
  const c = colors[level] || colors.Beginner;
  return <span className="slh-badge" style={{ background: c.bg, color: c.fg }}>{level}</span>;
}

function CourseCard({ course, progress, onOpen, bookmarked, onToggleBookmark }) {
  const Icon = course.icon;
  return (
    <div className="slh-card slh-fadein" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14, cursor: "pointer" }}
      onClick={() => onOpen(course.id)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: "var(--primary-tint)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Icon size={22} color="var(--primary)" />
        </div>
        <button className="slh-focusable" aria-label="Bookmark course"
          onClick={(e) => { e.stopPropagation(); onToggleBookmark(course.id); }}
          style={{ background: "none", border: "none", cursor: "pointer", color: bookmarked ? "var(--amber)" : "var(--text-muted)" }}>
          <Bookmark size={19} fill={bookmarked ? "var(--amber)" : "none"} />
        </button>
      </div>
      <div>
        <h3 className="slh-display" style={{ margin: "0 0 6px", fontSize: "1.08rem", fontWeight: 600 }}>{course.title}</h3>
        <p style={{ margin: 0, fontSize: "0.89rem", color: "var(--text-muted)", lineHeight: 1.55 }}>{course.summary}</p>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <LevelPill level={course.level} />
        <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
          <Clock size={13} /> {course.hours}h
        </span>
      </div>
      {progress > 0 && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 5 }}>
            <span>Progress</span><span>{progress}%</span>
          </div>
          <ProgressBar value={progress} height={6} />
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* HEADER / FOOTER                                                        */
/* ---------------------------------------------------------------------- */

function Header({ page, setPage, dark, setDark, user, mobileOpen, setMobileOpen }) {
  const nav = [
    { key: "home", label: "Home" },
    { key: "courses", label: "Courses" },
    { key: "paths", label: "Learning Paths" },
    { key: "resources", label: "Resources" },
    { key: "about", label: "About" }
  ];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
      <div className="slh-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GraduationCap size={19} color="#fff" />
          </div>
          <span className="slh-display" style={{ fontWeight: 700, fontSize: "1.08rem" }}>Student Learn Hub</span>
        </div>

        <nav style={{ display: "flex", gap: 28 }} className="slh-desktop-nav">
          {nav.map(n => (
            <span key={n.key} className={`slh-link slh-focusable ${page === n.key ? "active" : ""}`}
              style={{ fontWeight: page === n.key ? 600 : 500 }}
              onClick={() => setPage(n.key)} tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setPage(n.key)}>
              {n.label}
            </span>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button className="slh-btn slh-focusable" aria-label="Toggle dark mode"
            onClick={() => setDark(!dark)}
            style={{ background: "var(--surface-alt)", border: "1px solid var(--border)", width: 38, height: 38, padding: 0, borderRadius: 10 }}>
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="slh-btn slh-btn-tonal slh-focusable" style={{ display: "none" }} />
          {user.loggedIn ? (
            <span className="slh-btn slh-btn-tonal slh-focusable" style={{ cursor: "pointer" }} onClick={() => setPage("dashboard")}>
              <User size={16} /> {user.name.split(" ")[0]}
            </span>
          ) : (
            <span className="slh-btn slh-btn-primary slh-focusable" style={{ cursor: "pointer" }} onClick={() => setPage("login")}>
              Log In
            </span>
          )}
          <button className="slh-focusable" aria-label="Menu" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer" }} id="slh-hamburger">
            <Menu size={22} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "12px 24px 18px", display: "flex", flexDirection: "column", gap: 14 }} id="slh-mobile-nav">
          {nav.map(n => (
            <span key={n.key} className="slh-link" style={{ fontSize: "1rem" }}
              onClick={() => { setPage(n.key); setMobileOpen(false); }}>{n.label}</span>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .slh-desktop-nav { display: none !important; }
          #slh-hamburger { display: inline-flex !important; align-items:center; justify-content:center; }
        }
      `}</style>
    </header>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: 80, padding: "48px 0 32px", background: "var(--surface)" }}>
      <div className="slh-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 32 }}>
        <div style={{ maxWidth: 280 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <GraduationCap size={18} color="var(--primary)" />
            <span className="slh-display" style={{ fontWeight: 700 }}>Student Learn Hub</span>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.6 }}>
            Practical skills for college students — Excel, Power BI, accounting, finance, communication, and everyday technology.
          </p>
        </div>
        <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 10, fontSize: "0.9rem" }}>Explore</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span className="slh-link" onClick={() => setPage("courses")}>Courses</span>
              <span className="slh-link" onClick={() => setPage("paths")}>Learning Paths</span>
              <span className="slh-link" onClick={() => setPage("resources")}>Resources</span>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 10, fontSize: "0.9rem" }}>Support</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span className="slh-link" onClick={() => setPage("faq")}>FAQ</span>
              <span className="slh-link" onClick={() => setPage("contact")}>Contact</span>
              <span className="slh-link" onClick={() => setPage("about")}>About</span>
            </div>
          </div>
        </div>
      </div>
      <div className="slh-container" style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--border)", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        © 2026 Student Learn Hub. Built for students, by students.
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------- */
/* SKILL PATH VISUAL (hero signature element)                             */
/* ---------------------------------------------------------------------- */

function SkillPathVisual() {
  const nodes = [
    { label: "Tech Basics", icon: Laptop },
    { label: "Excel", icon: FileSpreadsheet },
    { label: "Power BI", icon: BarChart3 },
    { label: "Accounting", icon: Calculator },
    { label: "Communication", icon: MessageSquare }
  ];
  return (
    <div className="slh-card" style={{ padding: "26px 22px", minWidth: 260 }}>
      <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 18 }}>
        A typical learning path
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {nodes.map((n, i) => {
          const Icon = n.icon;
          const isFirst = i === 0;
          return (
            <div key={n.label} style={{ display: "flex", alignItems: "stretch" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 34 }}>
                <div className={isFirst ? "slh-pulse" : ""} style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: isFirst ? "var(--primary)" : "var(--surface-alt)",
                  border: isFirst ? "none" : "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <Icon size={14} color={isFirst ? "#fff" : "var(--text-muted)"} />
                </div>
                {i < nodes.length - 1 && <div style={{ width: 2, flex: 1, background: "var(--border)", minHeight: 22 }} />}
              </div>
              <div style={{ paddingLeft: 12, paddingBottom: i < nodes.length - 1 ? 22 : 0, paddingTop: 5 }}>
                <div style={{ fontSize: "0.9rem", fontWeight: isFirst ? 600 : 500 }}>{n.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* HOME PAGE                                                              */
/* ---------------------------------------------------------------------- */

function HomePage({ setPage, openCourse, searchQuery, setSearchQuery, progressFor, bookmarks, toggleBookmark }) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const featured = COURSES;

  const submitSearch = (e) => {
    e.preventDefault();
    setSearchQuery(localQuery);
    setPage("courses");
  };

  return (
    <div>
      <section style={{ padding: "72px 0 56px" }}>
        <div className="slh-container" style={{ display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 420px" }} className="slh-fadein">
            <span className="slh-badge" style={{ background: "var(--primary-tint)", color: "var(--primary)", marginBottom: 18 }}>
              <Sparkles size={13} /> Built for college students
            </span>
            <h1 className="slh-display" style={{ fontSize: "clamp(2.3rem, 4.6vw, 3.4rem)", lineHeight: 1.08, margin: "16px 0 18px", fontWeight: 700 }}>
              Learn skills. Build your future.
            </h1>
            <p style={{ fontSize: "1.08rem", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 480, margin: "0 0 30px" }}>
              Learn practical skills through simple lessons, guided learning paths, and useful resources.
            </p>
            <form onSubmit={submitSearch} style={{ display: "flex", gap: 10, maxWidth: 460, marginBottom: 28 }}>
              <div style={{ position: "relative", flex: 1 }}>
                <Search size={17} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input className="slh-input slh-focusable" style={{ paddingLeft: 40 }}
                  placeholder="What do you want to learn?" value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)} />
              </div>
              <button type="submit" className="slh-btn slh-btn-primary slh-focusable">Search</button>
            </form>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}><strong style={{ color: "var(--text)" }}>6</strong> courses</span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}><strong style={{ color: "var(--text)" }}>24</strong> lessons</span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}><strong style={{ color: "var(--text)" }}>3</strong> guided paths</span>
            </div>
          </div>
          <div style={{ flex: "0 0 auto" }} className="slh-fadein">
            <SkillPathVisual />
          </div>
        </div>
      </section>

      <section style={{ padding: "24px 0 80px" }}>
        <div className="slh-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 className="slh-display" style={{ fontSize: "1.7rem", fontWeight: 700, margin: "0 0 6px" }}>Featured courses</h2>
              <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "0.95rem" }}>Start with the skill you need most right now.</p>
            </div>
            <span className="slh-link" style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: 600 }} onClick={() => setPage("courses")}>
              View all courses <ChevronRight size={16} />
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
            {featured.map(c => (
              <CourseCard key={c.id} course={c} progress={progressFor(c.id)} onOpen={openCourse}
                bookmarked={bookmarks.courses.has(c.id)} onToggleBookmark={toggleBookmark} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 0 80px" }}>
        <div className="slh-container">
          <div className="slh-card" style={{ padding: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, background: "var(--primary-tint)", border: "none" }}>
            <div>
              <h2 className="slh-display" style={{ margin: "0 0 8px", fontSize: "1.4rem", fontWeight: 700 }}>Not sure where to start?</h2>
              <p style={{ margin: 0, color: "var(--text-muted)" }}>Follow a guided learning path built around a goal, not just a topic.</p>
            </div>
            <button className="slh-btn slh-btn-primary slh-focusable" onClick={() => setPage("paths")}>See learning paths</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* COURSES PAGE                                                           */
/* ---------------------------------------------------------------------- */

function CoursesPage({ openCourse, searchQuery, setSearchQuery, progressFor, bookmarks, toggleBookmark }) {
  const [level, setLevel] = useState("All");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return COURSES.filter(c => {
      const matchLevel = level === "All" || c.level === level;
      const matchCat = category === "All" || c.category === category;
      const q = searchQuery.trim().toLowerCase();
      const matchQuery = !q || c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
      return matchLevel && matchCat && matchQuery;
    });
  }, [level, category, searchQuery]);

  return (
    <div className="slh-container" style={{ padding: "48px 24px 80px" }}>
      <h1 className="slh-display" style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 8px" }}>Courses</h1>
      <p style={{ color: "var(--text-muted)", margin: "0 0 28px" }}>Browse every skill on the platform, or filter to find exactly what you need.</p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        <div style={{ position: "relative", flex: "1 1 240px" }}>
          <Search size={16} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input className="slh-input slh-focusable" style={{ paddingLeft: 38 }} placeholder="Search courses..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <select className="slh-input slh-focusable" style={{ width: "auto" }} value={level} onChange={(e) => setLevel(e.target.value)}>
          {LEVELS.map(l => <option key={l} value={l}>{l === "All" ? "All levels" : l}</option>)}
        </select>
        <select className="slh-input slh-focusable" style={{ width: "auto" }} value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c === "All" ? "All categories" : c}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="slh-card" style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>
          No courses match your filters yet. Try a different search term or level.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
          {filtered.map(c => (
            <CourseCard key={c.id} course={c} progress={progressFor(c.id)} onOpen={openCourse}
              bookmarked={bookmarks.courses.has(c.id)} onToggleBookmark={toggleBookmark} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* LEARNING PATHS PAGE                                                    */
/* ---------------------------------------------------------------------- */

function PathsPage({ openCourse }) {
  return (
    <div className="slh-container" style={{ padding: "48px 24px 80px" }}>
      <h1 className="slh-display" style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 8px" }}>Learning paths</h1>
      <p style={{ color: "var(--text-muted)", margin: "0 0 32px", maxWidth: 560 }}>
        A path strings courses together around a goal, so you always know what to learn next.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
        {LEARNING_PATHS.map(path => (
          <div key={path.title} className="slh-card" style={{ padding: 26 }}>
            <h3 className="slh-display" style={{ margin: "0 0 8px", fontSize: "1.15rem", fontWeight: 700 }}>{path.title}</h3>
            <p style={{ margin: "0 0 20px", color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.55 }}>{path.blurb}</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {path.steps.map((step, i) => {
                const course = COURSES.find(c => c.title === step);
                return (
                  <div key={step} style={{ display: "flex", alignItems: "stretch" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 26 }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: "50%", background: "var(--primary-tint)", color: "var(--primary)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, flexShrink: 0
                      }}>{i + 1}</div>
                      {i < path.steps.length - 1 && <div style={{ width: 2, flex: 1, background: "var(--border)", minHeight: 20 }} />}
                    </div>
                    <div className="slh-link" style={{ paddingLeft: 12, paddingBottom: i < path.steps.length - 1 ? 18 : 6, fontSize: "0.92rem", color: "var(--text)" }}
                      onClick={() => course && openCourse(course.id)}>
                      {step}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* RESOURCES PAGE                                                         */
/* ---------------------------------------------------------------------- */

function ResourcesPage() {
  const resources = [
    { title: "Excel Keyboard Shortcuts", type: "Cheat sheet", desc: "The 20 shortcuts that save the most time in everyday spreadsheet work." },
    { title: "Resume Checklist", type: "Checklist", desc: "A 10-point pass to run your resume through before you apply." },
    { title: "Accounting Formula Reference", type: "Reference", desc: "The core equations from the Accounting Fundamentals course in one page." },
    { title: "Email Templates for Students", type: "Templates", desc: "Ready-to-edit templates for professors, internships, and networking." },
    { title: "Power BI DAX Glossary", type: "Reference", desc: "Plain-language definitions for the DAX functions used most often." },
    { title: "Study Planner Template", type: "Template", desc: "A simple weekly layout for balancing coursework and skill-building." }
  ];
  return (
    <div className="slh-container" style={{ padding: "48px 24px 80px" }}>
      <h1 className="slh-display" style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 8px" }}>Resources</h1>
      <p style={{ color: "var(--text-muted)", margin: "0 0 32px" }}>Quick references and templates to use alongside your courses.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        {resources.map(r => (
          <div key={r.title} className="slh-card" style={{ padding: 22 }}>
            <span className="slh-badge" style={{ background: "var(--surface-alt)", color: "var(--text-muted)", marginBottom: 12 }}>{r.type}</span>
            <h3 className="slh-display" style={{ margin: "0 0 6px", fontSize: "1.02rem", fontWeight: 600 }}>{r.title}</h3>
            <p style={{ margin: 0, fontSize: "0.87rem", color: "var(--text-muted)", lineHeight: 1.55 }}>{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* ABOUT PAGE                                                             */
/* ---------------------------------------------------------------------- */

function AboutPage({ setPage }) {
  return (
    <div className="slh-container" style={{ padding: "48px 24px 80px", maxWidth: 760 }}>
      <h1 className="slh-display" style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 18px" }}>About Student Learn Hub</h1>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 18 }}>
        Student Learn Hub was built around a simple idea: the skills that matter most after graduation — spreadsheets, dashboards, basic accounting, clear writing — are rarely taught step by step. We built the course we wished we'd had.
      </p>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 18 }}>
        Every lesson is short on purpose, every course ends with practice you can actually use, and every path is built around a real goal rather than a syllabus.
      </p>
      <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
        <button className="slh-btn slh-btn-primary slh-focusable" onClick={() => setPage("courses")}>Browse courses</button>
        <button className="slh-btn slh-btn-ghost slh-focusable" onClick={() => setPage("contact")}>Contact us</button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* FAQ PAGE                                                               */
/* ---------------------------------------------------------------------- */

function FaqPage() {
  const [open, setOpen] = useState(0);
  return (
    <div className="slh-container" style={{ padding: "48px 24px 80px", maxWidth: 720 }}>
      <h1 className="slh-display" style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 8px" }}>Frequently asked questions</h1>
      <p style={{ color: "var(--text-muted)", margin: "0 0 28px" }}>Everything you need to know before you start learning.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {FAQS.map((f, i) => (
          <div key={f.q} className="slh-card" style={{ padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
              onClick={() => setOpen(open === i ? -1 : i)}>
              <span style={{ fontWeight: 600, fontSize: "0.96rem" }}>{f.q}</span>
              <ChevronDown size={18} style={{ transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s ease", color: "var(--text-muted)", flexShrink: 0 }} />
            </div>
            {open === i && <p style={{ margin: "12px 0 0", color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* CONTACT PAGE                                                           */
/* ---------------------------------------------------------------------- */

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  return (
    <div className="slh-container" style={{ padding: "48px 24px 80px" }}>
      <h1 className="slh-display" style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 8px" }}>Contact us</h1>
      <p style={{ color: "var(--text-muted)", margin: "0 0 32px" }}>Questions, feedback, or a course you'd like to see? Send it over.</p>
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
        <form style={{ flex: "1 1 360px", display: "flex", flexDirection: "column", gap: 14 }}
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          {sent ? (
            <div className="slh-card" style={{ padding: 24, background: "var(--success-tint)", border: "none" }}>
              <strong style={{ color: "var(--success)" }}>Message sent.</strong>
              <p style={{ margin: "6px 0 0", color: "var(--text-muted)", fontSize: "0.9rem" }}>We'll get back to you within two business days.</p>
            </div>
          ) : (
            <>
              <input className="slh-input slh-focusable" required placeholder="Your name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className="slh-input slh-focusable" required type="email" placeholder="Your email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <textarea className="slh-input slh-focusable" required rows={5} placeholder="Your message" value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ resize: "vertical" }} />
              <button type="submit" className="slh-btn slh-btn-primary slh-focusable" style={{ alignSelf: "flex-start" }}>Send message</button>
            </>
          )}
        </form>
        <div style={{ flex: "1 1 240px", display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <MailIcon size={18} color="var(--primary)" style={{ marginTop: 2 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.92rem" }}>Email</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>support@studentlearnhub.example</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Phone size={18} color="var(--primary)" style={{ marginTop: 2 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.92rem" }}>Phone</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>+91 00000 00000</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <MapPin size={18} color="var(--primary)" style={{ marginTop: 2 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.92rem" }}>Based in</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>Bengaluru, India</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* LOGIN PAGE                                                             */
/* ---------------------------------------------------------------------- */

function LoginPage({ setUser, setPage }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = (e) => {
    e.preventDefault();
    setUser({ loggedIn: true, name: form.name || "Student", email: form.email });
    setPage("dashboard");
  };

  return (
    <div className="slh-container" style={{ padding: "56px 24px 90px", display: "flex", justifyContent: "center" }}>
      <div className="slh-card" style={{ padding: 34, width: "100%", maxWidth: 400 }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "var(--surface-alt)", padding: 4, borderRadius: 10 }}>
          {["login", "signup"].map(m => (
            <button key={m} onClick={() => setMode(m)}
              className="slh-focusable"
              style={{
                flex: 1, padding: "9px 0", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.88rem",
                background: mode === m ? "var(--surface)" : "transparent", color: mode === m ? "var(--text)" : "var(--text-muted)",
                boxShadow: mode === m ? "var(--shadow)" : "none"
              }}>
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>
        <h2 className="slh-display" style={{ margin: "0 0 6px", fontSize: "1.3rem", fontWeight: 700 }}>
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p style={{ margin: "0 0 22px", color: "var(--text-muted)", fontSize: "0.88rem" }}>
          {mode === "login" ? "Log in to continue your learning progress." : "It takes less than a minute."}
        </p>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {mode === "signup" && (
            <input className="slh-input slh-focusable" required placeholder="Full name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
          )}
          <input className="slh-input slh-focusable" required type="email" placeholder="Email address" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="slh-input slh-focusable" required type="password" placeholder="Password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button type="submit" className="slh-btn slh-btn-primary slh-focusable" style={{ marginTop: 8 }}>
            {mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>
        <p style={{ marginTop: 18, fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
          This is a demo login — no real account is created.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* COURSE DETAIL PAGE                                                     */
/* ---------------------------------------------------------------------- */

function CourseDetailPage({ course, progressState, setLessonComplete, quizAnswer, setQuizAnswer, bookmarks, toggleLessonBookmark, setPage, user }) {
  const [activeLesson, setActiveLesson] = useState(0);
  const [tab, setTab] = useState("lesson");

  const completed = progressState[course.id]?.completed || new Set();
  const total = course.lessons.length;
  const progressPct = Math.round((completed.size / total) * 100);
  const lesson = course.lessons[activeLesson];
  const lessonKey = `${course.id}:${activeLesson}`;
  const isBookmarked = bookmarks.lessons.has(lessonKey);
  const answered = quizAnswer[lessonKey];

  const Icon = course.icon;

  const goNext = () => {
    if (activeLesson < total - 1) {
      setActiveLesson(activeLesson + 1);
      setTab("lesson");
    }
  };

  return (
    <div className="slh-container" style={{ padding: "36px 24px 80px" }}>
      <span className="slh-link" style={{ display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 18 }} onClick={() => setPage("courses")}>
        <ChevronLeft size={16} /> All courses
      </span>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap", marginBottom: 8 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: "var(--primary-tint)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={22} color="var(--primary)" />
          </div>
          <div>
            <h1 className="slh-display" style={{ margin: 0, fontSize: "1.55rem", fontWeight: 700 }}>{course.title}</h1>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
              <LevelPill level={course.level} />
              <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{total} lessons · {course.hours}h</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ margin: "22px 0 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: 6 }}>
          <span style={{ color: "var(--text-muted)" }}>Your progress</span>
          <span style={{ fontWeight: 600 }}>{progressPct}%</span>
        </div>
        <ProgressBar value={progressPct} />
      </div>

      <div style={{ display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Lesson list sidebar */}
        <div className="slh-card" style={{ flex: "1 1 240px", maxWidth: 280, padding: 10 }}>
          {course.lessons.map((l, i) => (
            <div key={l.title} onClick={() => { setActiveLesson(i); setTab("lesson"); }}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "11px 10px", borderRadius: 10, cursor: "pointer",
                background: i === activeLesson ? "var(--primary-tint)" : "transparent", marginBottom: 2
              }}>
              {completed.has(i) ? <CheckCircle2 size={17} color="var(--success)" /> : <Circle size={17} color="var(--border)" />}
              <div>
                <div style={{ fontSize: "0.86rem", fontWeight: i === activeLesson ? 600 : 500, color: i === activeLesson ? "var(--primary)" : "var(--text)" }}>
                  {i + 1}. {l.title}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{l.duration}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main lesson panel */}
        <div className="slh-card" style={{ flex: "2 1 420px", padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
            <h2 className="slh-display" style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>{lesson.title}</h2>
            <button className="slh-focusable" onClick={() => toggleLessonBookmark(lessonKey)}
              style={{ background: "none", border: "none", cursor: "pointer", color: isBookmarked ? "var(--amber)" : "var(--text-muted)" }}
              aria-label="Bookmark lesson">
              <Bookmark size={19} fill={isBookmarked ? "var(--amber)" : "none"} />
            </button>
          </div>

          <div style={{ display: "flex", gap: 6, marginBottom: 22, borderBottom: "1px solid var(--border)", flexWrap: "wrap" }}>
            {[
              { key: "lesson", label: "Lesson", icon: PlayCircle },
              { key: "notes", label: "Notes", icon: FileText },
              { key: "practice", label: "Practice", icon: Dumbbell },
              { key: "quiz", label: "Quiz", icon: HelpCircle }
            ].map(t => {
              const TIcon = t.icon;
              return (
                <button key={t.key} className="slh-focusable" onClick={() => setTab(t.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "9px 4px", marginRight: 18, background: "none", border: "none",
                    borderBottom: tab === t.key ? "2px solid var(--primary)" : "2px solid transparent",
                    color: tab === t.key ? "var(--primary)" : "var(--text-muted)", fontWeight: 600, fontSize: "0.86rem", cursor: "pointer"
                  }}>
                  <TIcon size={15} /> {t.label}
                </button>
              );
            })}
          </div>

          {tab === "lesson" && (
            <div>
              <div style={{
                background: "var(--surface-alt)", borderRadius: 12, aspectRatio: "16/9", display: "flex",
                flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 18, border: "1px solid var(--border)"
              }}>
                <PlayCircle size={44} color="var(--primary)" />
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{lesson.title} · {lesson.duration}</span>
              </div>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.94rem" }}>{lesson.notes}</p>
            </div>
          )}

          {tab === "notes" && (
            <p style={{ color: "var(--text-muted)", lineHeight: 1.75, fontSize: "0.94rem" }}>{lesson.notes}</p>
          )}

          {tab === "practice" && (
            <div className="slh-card" style={{ padding: 18, background: "var(--surface-alt)", border: "none" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, fontWeight: 600, fontSize: "0.9rem" }}>
                <Dumbbell size={16} color="var(--primary)" /> Try it yourself
              </div>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>{lesson.practice}</p>
            </div>
          )}

          {tab === "quiz" && (
            <div>
              <p style={{ fontWeight: 600, marginBottom: 14, fontSize: "0.95rem" }}>{lesson.quiz.q}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {lesson.quiz.options.map((opt, i) => {
                  const isSelected = answered?.selected === i;
                  const isCorrect = i === lesson.quiz.answer;
                  let bg = "var(--surface)", border = "var(--border)", fg = "var(--text)";
                  if (answered) {
                    if (isCorrect) { bg = "var(--success-tint)"; border = "var(--success)"; fg = "var(--success)"; }
                    else if (isSelected) { bg = "var(--amber-tint)"; border = "var(--amber)"; fg = "var(--amber)"; }
                  }
                  return (
                    <button key={opt} className="slh-focusable" disabled={!!answered}
                      onClick={() => setQuizAnswer(lessonKey, { selected: i, correct: i === lesson.quiz.answer })}
                      style={{
                        textAlign: "left", padding: "11px 14px", borderRadius: 10, border: `1px solid ${border}`, background: bg, color: fg,
                        cursor: answered ? "default" : "pointer", fontSize: "0.9rem"
                      }}>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {answered && (
                <p style={{ fontSize: "0.88rem", color: answered.correct ? "var(--success)" : "var(--amber)", fontWeight: 600 }}>
                  {answered.correct ? "Correct." : `Not quite — the correct answer is "${lesson.quiz.options[lesson.quiz.answer]}".`}
                </p>
              )}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--border)", flexWrap: "wrap", gap: 12 }}>
            <button className="slh-btn slh-focusable" onClick={() => setLessonComplete(course.id, activeLesson)}
              style={{ background: completed.has(activeLesson) ? "var(--success-tint)" : "var(--surface-alt)", color: completed.has(activeLesson) ? "var(--success)" : "var(--text)" }}>
              <CheckCircle2 size={16} /> {completed.has(activeLesson) ? "Completed" : "Mark as Complete"}
            </button>
            <button className="slh-btn slh-btn-primary slh-focusable" disabled={activeLesson === total - 1} onClick={goNext}
              style={{ opacity: activeLesson === total - 1 ? 0.5 : 1, cursor: activeLesson === total - 1 ? "default" : "pointer" }}>
              Next lesson <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* DASHBOARD PAGE                                                         */
/* ---------------------------------------------------------------------- */

function DashboardPage({ user, progressState, quizAnswer, setPage, openCourse, bookmarks }) {
  const enrolledIds = Object.keys(progressState).filter(id => progressState[id]?.completed?.size > 0);
  const enrolledCourses = COURSES.filter(c => enrolledIds.includes(c.id));

  let totalLessons = 0, completedLessons = 0;
  COURSES.forEach(c => { totalLessons += c.lessons.length; });
  Object.values(progressState).forEach(p => { completedLessons += p.completed.size; });

  const quizEntries = Object.entries(quizAnswer);
  const correctQuizzes = quizEntries.filter(([, v]) => v.correct).length;
  const quizScorePct = quizEntries.length ? Math.round((correctQuizzes / quizEntries.length) * 100) : 0;

  const finishedCourses = COURSES.filter(c => (progressState[c.id]?.completed?.size || 0) === c.lessons.length);

  const badges = [
    { label: "First Step", earned: completedLessons >= 1, desc: "Complete your first lesson" },
    { label: "On a Roll", earned: completedLessons >= 5, desc: "Complete 5 lessons" },
    { label: "Course Finisher", earned: finishedCourses.length >= 1, desc: "Finish an entire course" },
    { label: "Quiz Sharp", earned: quizScorePct === 100 && quizEntries.length >= 3, desc: "Score 100% across 3+ quizzes" }
  ];
  const earnedBadges = badges.filter(b => b.earned);

  const recommended = COURSES.filter(c => !enrolledIds.includes(c.id)).slice(0, 3);
  const overallPct = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="slh-container" style={{ padding: "40px 24px 80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30, flexWrap: "wrap", gap: 14 }}>
        <div>
          <h1 className="slh-display" style={{ margin: "0 0 4px", fontSize: "1.7rem", fontWeight: 700 }}>Welcome back, {user.name.split(" ")[0]}</h1>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.94rem" }}>Here's where your learning stands today.</p>
        </div>
        <button className="slh-btn slh-btn-ghost slh-focusable" onClick={() => setPage("home")}>
          <LogOut size={15} /> Log out
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 32 }}>
        {[
          { label: "Courses enrolled", value: enrolledCourses.length },
          { label: "Lessons completed", value: `${completedLessons}/${totalLessons}` },
          { label: "Quiz score average", value: `${quizScorePct}%` },
          { label: "Badges earned", value: earnedBadges.length }
        ].map(stat => (
          <div key={stat.label} className="slh-card" style={{ padding: 20 }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700 }} className="slh-display">{stat.value}</div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "2 1 420px" }}>
          <h2 className="slh-display" style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 14px" }}>Your courses</h2>
          {enrolledCourses.length === 0 ? (
            <div className="slh-card" style={{ padding: 28, textAlign: "center", color: "var(--text-muted)", marginBottom: 30 }}>
              You haven't started a course yet. <span className="slh-link" style={{ fontWeight: 600 }} onClick={() => setPage("courses")}>Browse courses</span> to begin.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 30 }}>
              {enrolledCourses.map(c => {
                const pct = Math.round(((progressState[c.id]?.completed.size || 0) / c.lessons.length) * 100);
                const Icon = c.icon;
                return (
                  <div key={c.id} className="slh-card" style={{ padding: 18, display: "flex", gap: 14, alignItems: "center", cursor: "pointer" }}
                    onClick={() => openCourse(c.id)}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--primary-tint)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={19} color="var(--primary)" />
                    </div>
                    <div style={{ flex: 1, minWidth: 140 }}>
                      <div style={{ fontWeight: 600, fontSize: "0.94rem", marginBottom: 6 }}>{c.title}</div>
                      <ProgressBar value={pct} height={6} />
                    </div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--primary)" }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          )}

          <h2 className="slh-display" style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 14px" }}>Recommended for you</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
            {recommended.map(c => (
              <CourseCard key={c.id} course={c} progress={0} onOpen={openCourse}
                bookmarked={bookmarks.courses.has(c.id)} onToggleBookmark={() => {}} />
            ))}
          </div>
        </div>

        <div style={{ flex: "1 1 260px" }}>
          <h2 className="slh-display" style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 14px" }}>Badges & certificates</h2>
          <div className="slh-card" style={{ padding: 20, marginBottom: 24 }}>
            {badges.map(b => (
              <div key={b.label} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: b.earned ? "var(--amber-tint)" : "var(--surface-alt)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <Award size={17} color={b.earned ? "var(--amber)" : "var(--text-muted)"} />
                </div>
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: b.earned ? "var(--text)" : "var(--text-muted)" }}>{b.label}</div>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {finishedCourses.length > 0 && (
            <>
              <h2 className="slh-display" style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 14px" }}>Certificates</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {finishedCourses.map(c => (
                  <div key={c.id} className="slh-card" style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                    <Star size={16} color="var(--amber)" />
                    <span style={{ fontSize: "0.88rem", fontWeight: 600 }}>{c.title} — Completed</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* LOCAL PERSISTENCE (per-device, saved in this browser only)             */
/* ---------------------------------------------------------------------- */

const STORAGE_KEY = "slh-state-v1";

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      dark: !!parsed.dark,
      user: parsed.user || { loggedIn: false, name: "Student", email: "" },
      progressState: Object.fromEntries(
        Object.entries(parsed.progressState || {}).map(([id, v]) => [id, { completed: new Set(v.completed || []) }])
      ),
      quizAnswer: parsed.quizAnswer || {},
      bookmarkCourses: new Set(parsed.bookmarkCourses || []),
      bookmarkLessons: new Set(parsed.bookmarkLessons || [])
    };
  } catch (e) {
    return null;
  }
}

function saveState(state) {
  try {
    const serializable = {
      dark: state.dark,
      user: state.user,
      progressState: Object.fromEntries(
        Object.entries(state.progressState).map(([id, v]) => [id, { completed: Array.from(v.completed) }])
      ),
      quizAnswer: state.quizAnswer,
      bookmarkCourses: Array.from(state.bookmarkCourses),
      bookmarkLessons: Array.from(state.bookmarkLessons)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  } catch (e) {
    // storage full or unavailable — fail silently, app still works in-memory
  }
}

/* ---------------------------------------------------------------------- */
/* APP ROOT                                                               */
/* ---------------------------------------------------------------------- */

export default function StudentLearnHub() {
  const saved = typeof window !== "undefined" ? loadSavedState() : null;

  const [page, setPageRaw] = useState("home");
  const [dark, setDark] = useState(saved?.dark || false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(saved?.user || { loggedIn: false, name: "Student", email: "" });

  // progressState: { [courseId]: { completed: Set<lessonIndex> } }
  const [progressState, setProgressState] = useState(saved?.progressState || {});
  // quizAnswer: { "courseId:lessonIndex": { selected, correct } }
  const [quizAnswer, setQuizAnswerState] = useState(saved?.quizAnswer || {});
  // bookmarks
  const [bookmarkCourses, setBookmarkCourses] = useState(saved?.bookmarkCourses || new Set());
  const [bookmarkLessons, setBookmarkLessons] = useState(saved?.bookmarkLessons || new Set());

  // Persist to this browser's localStorage whenever meaningful state changes.
  // Each visitor/device keeps their own progress — this does not sync between devices.
  useEffect(() => {
    saveState({ dark, user, progressState, quizAnswer, bookmarkCourses, bookmarkLessons });
  }, [dark, user, progressState, quizAnswer, bookmarkCourses, bookmarkLessons]);

  const setPage = (p) => { setPageRaw(p); setMobileOpen(false); window.scrollTo?.({ top: 0, behavior: "smooth" }); };

  const openCourse = (id) => {
    setSelectedCourseId(id);
    setPage("courseDetail");
  };

  const progressFor = (courseId) => {
    const course = COURSES.find(c => c.id === courseId);
    const completed = progressState[courseId]?.completed?.size || 0;
    return course ? Math.round((completed / course.lessons.length) * 100) : 0;
  };

  const setLessonComplete = (courseId, lessonIndex) => {
    setProgressState(prev => {
      const existing = new Set(prev[courseId]?.completed || []);
      if (existing.has(lessonIndex)) existing.delete(lessonIndex);
      else existing.add(lessonIndex);
      return { ...prev, [courseId]: { completed: existing } };
    });
  };

  const setQuizAnswer = (key, value) => {
    setQuizAnswerState(prev => ({ ...prev, [key]: value }));
  };

  const toggleBookmark = (courseId) => {
    setBookmarkCourses(prev => {
      const next = new Set(prev);
      next.has(courseId) ? next.delete(courseId) : next.add(courseId);
      return next;
    });
  };

  const toggleLessonBookmark = (key) => {
    setBookmarkLessons(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const bookmarks = { courses: bookmarkCourses, lessons: bookmarkLessons };
  const selectedCourse = COURSES.find(c => c.id === selectedCourseId);

  let content;
  if (page === "home") {
    content = <HomePage setPage={setPage} openCourse={openCourse} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
      progressFor={progressFor} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />;
  } else if (page === "courses") {
    content = <CoursesPage openCourse={openCourse} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
      progressFor={progressFor} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />;
  } else if (page === "paths") {
    content = <PathsPage openCourse={openCourse} />;
  } else if (page === "resources") {
    content = <ResourcesPage />;
  } else if (page === "about") {
    content = <AboutPage setPage={setPage} />;
  } else if (page === "faq") {
    content = <FaqPage />;
  } else if (page === "contact") {
    content = <ContactPage />;
  } else if (page === "login") {
    content = <LoginPage setUser={setUser} setPage={setPage} />;
  } else if (page === "courseDetail" && selectedCourse) {
    content = <CourseDetailPage course={selectedCourse} progressState={progressState} setLessonComplete={setLessonComplete}
      quizAnswer={quizAnswer} setQuizAnswer={setQuizAnswer} bookmarks={bookmarks} toggleLessonBookmark={toggleLessonBookmark}
      setPage={setPage} user={user} />;
  } else if (page === "dashboard") {
    if (!user.loggedIn) {
      content = <LoginPage setUser={setUser} setPage={setPage} />;
    } else {
      content = <DashboardPage user={user} progressState={progressState} quizAnswer={quizAnswer} setPage={setPage}
        openCourse={openCourse} bookmarks={bookmarks} />;
    }
  } else {
    content = <HomePage setPage={setPage} openCourse={openCourse} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
      progressFor={progressFor} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />;
  }

  return (
    <div className={`slh-root${dark ? " dark" : ""} slh-scrollbar`}>
      <style>{THEME_CSS}</style>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
      <Header page={page} setPage={setPage} dark={dark} setDark={setDark} user={user} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {content}
      <Footer setPage={setPage} />
    </div>
  );
}
