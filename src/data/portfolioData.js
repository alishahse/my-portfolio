export const portfolioData = {
  personalInfo: {
    name: "Ali Khan",
    title: "Frontend Developer",
    subtitle: "Building modern, high-performance web applications with React.js, Next.js & Tailwind CSS",
    phone: "+92 320 9019579",
    email: "alishahdev2@gmail.com",
    location: "Pakistan",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    bio: "Frontend developer specializing in building production-grade travel and operational platforms. Experienced in crafting seamless user experiences, responsive multi-step workflows, and modular component architectures using React, Next.js, and modern styling libraries."
  },
  
  summary: "Frontend developer building production travel and operations platforms with React.js, Next.js, and Tailwind CSS. At PHPTravels, I delivered modern user interfaces for BookNow.co hotel booking, Travelnext modules (Visa, Umrah, User & Support dashboards), and an internal enterprise operations CRM. Passionate about turning complex business workflows into clean, intuitive, and accessible user experiences.",

  skillCategories: [
    {
      category: "Frontend Core & Frameworks",
      icon: "Code2",
      description: "Building responsive, modern, and high-performance single page applications",
      skills: [
        { name: "React.js", level: "Advanced" },
        { name: "Next.js", level: "Advanced" },
        { name: "JavaScript (ES6+)", level: "Advanced" },
        { name: "HTML5 & Semantic Markup", level: "Expert" },
        { name: "Modern CSS3", level: "Expert" },
      ]
    },
    {
      category: "State Management & Architecture",
      icon: "Layers",
      description: "Managing predictable state, data flows, and component hierarchies",
      skills: [
        { name: "Redux", level: "Advanced" },
        { name: "Redux Toolkit", level: "Advanced" },
        { name: "Context API", level: "Advanced" },
        { name: "Custom Hooks & State Logic", level: "Advanced" },
        { name: "Component Lifecycle", level: "Advanced" }
      ]
    },
    {
      category: "UI Libraries & Responsive Design",
      icon: "Palette",
      description: "Crafting pixel-perfect layouts, design systems, and animations",
      skills: [
        { name: "Tailwind CSS", level: "Expert" },
        { name: "Material UI", level: "Advanced" },
        { name: "Bootstrap", level: "Advanced" },
        { name: "Responsive & Mobile-First", level: "Expert" },
        { name: "Modern Flexbox & CSS Grid", level: "Expert" }
      ]
    },
    {
      category: "Tools & Browser APIs",
      icon: "Wrench",
      description: "Version control, build tooling, and native browser capabilities",
      skills: [
        { name: "Git", level: "Advanced" },
        { name: "GitHub", level: "Advanced" },
        { name: "Vite & Modern Tooling", level: "Advanced" },
        { name: "Webcam & Media APIs", level: "Proficient" },
        { name: "Component-Driven Architecture", level: "Expert" }
      ]
    }
  ],

  projects: [
    {
      id: "crm-platform",
      title: "Enterprise Operations CRM",
      subtitle: "Internal Operations & Productivity Platform",
      badge: "Featured Project",
      tag: "Next.js • Tailwind CSS • Browser APIs",
      github: "https://github.com",
      description: "A comprehensive enterprise CRM designed from scratch with Next.js and Tailwind CSS, featuring real-time operational dashboards, webcam attendance verification, desktop-class mail interface, and live task timers.",
      highlights: [
        "Interactive Dashboard: Designed dynamic metric overview cards, real-time KPI counters, and quick-action shortcuts for daily team workflows.",
        "Smart Attendance UI: Built punch-in/out interactive workflow featuring client-side webcam snapshot capture, photo verification preview gallery, and local timezone clock.",
        "3-Column Mail Client: Engineered a desktop-class email interface with folder navigation (Inbox, Sent, Drafts, etc.), responsive preview pane, rich compose editor, and draft management.",
        "Meeting Management UI: Created interactive meeting scheduling screens with status toggles (done, cancel), inline editing, and intuitive action controls.",
        "Task Management & Filters: Built task boards with client-side status filtering, instant keyword search, visual progress bars, priority badges, and due dates.",
        "Live Task Time Tracker: Built a real-time HH:MM:SS digital timer with play/pause/reset controls and visual active-tracking indicators.",
        "Task Quick Actions: Implemented one-click list actions, confirmation modals, and reactive state updates for smooth management."
      ],
      techStack: ["Next.js", "Tailwind CSS", "JavaScript (ES6+)", "Webcam API", "Context API", "Responsive UI"]
    },
    {
      id: "booknow-hotel",
      title: "BookNow.co",
      subtitle: "Production Hotel Booking & Reservation UI",
      badge: "PHPTravels Production",
      tag: "React.js • Tailwind CSS • State Architecture",
      github: null,
      description: "A high-conversion hotel booking platform featuring intuitive admin and customer authentication workflows, multi-step reservation booking wizard, room catalog displays, and dynamic availability calendars.",
      highlights: [
        "Authentication Workflows: Built responsive authentication portals for admin and customer users, including validation-rich login, registration, and permission-based view routing.",
        "Hotel Booking Wizard: Engineered multi-step reservation processing interfaces, interactive review steps, and clear confirmation summaries.",
        "Room Showcase & Catalog: Implemented dynamic room listing cards, detailed modal views, interactive pricing selectors, and calendar-based availability selectors.",
        "Reactive State Architecture: Created seamless component state flows ensuring smooth navigation between catalog browsing, room selection, and checkout views."
      ],
      techStack: ["React.js", "Tailwind CSS", "Redux Toolkit", "Component Architecture", "Modern UI"]
    },
    {
      id: "travelnext-suite",
      title: "Travelnext",
      subtitle: "Travel Management & Modular Operations Suite",
      badge: "PHPTravels Production",
      tag: "Next.js • React • Modular Component UI",
      github: null,
      description: "A modular travel platform containing specialized interfaces for Visa configuration, Umrah pilgrimage package showcases, comprehensive user management directories, and support ticketing threads.",
      highlights: [
        "Visa Module UI: Developed intuitive configuration interfaces, multi-tier pricing calculators, document requirement checklists, interactive image galleries, and bulk-action table management.",
        "Umrah Package Showcase: Created rich package cards, visual day-by-day itineraries, bundled service selectors, drag-and-drop file upload zones, multilingual interfaces, and real-time currency conversion widgets.",
        "User Management Directory: Built interactive user directories, role metric cards, activity feeds, quick search/filter tables, and linked detail drawers.",
        "Support & Analytics Interface: Implemented a responsive ticketing interface with threaded conversation UI, dynamic status badges, and filterable data tables."
      ],
      techStack: ["Next.js", "React.js", "Tailwind CSS", "Redux", "Data Tables UI"]
    }
  ],

  experience: [
    {
      role: "Frontend Developer",
      company: "PHPTravels",
      period: "Sep 2025 - Present",
      location: "Pakistan",
      type: "Full-time",
      summary: "Responsible for crafting frontend web interfaces and interactive features across high-traffic travel products and internal operations platforms.",
      keyAchievements: [
        "Engineered the complete customer & admin interfaces for BookNow.co hotel booking portal.",
        "Developed modular UI components for Travelnext suite including Visa, Umrah, User Management, and Support ticketing interfaces.",
        "Designed and implemented an enterprise operations CRM from scratch with real-time UI, webcam capture, desktop mail client, and live time-tracking."
      ]
    }
  ],

  education: {
    degree: "BS in Computer Science",
    institution: "Gomal University",
    period: "Jul 2020 - Jul 2024",
    gpa: "3.07 / 4.00",
    details: "Focused on software engineering principles, web technologies, computer graphics, human-computer interaction, and algorithm design."
  }
};
