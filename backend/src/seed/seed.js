require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");

const User = require("../models/User");
const Profile = require("../models/Profile");
const Skill = require("../models/Skill");
const Experience = require("../models/Experience");
const Education = require("../models/Education");
const Project = require("../models/Project");
const Certificate = require("../models/Certificate");

/**
 * ZAROORI: main fields hamesha ENGLISH me hote hain (default language).
 * Hindi aur Hinglish sirf `translations` object ke andar jaate hain.
 *
 *   shortBio: "English text"                  <- website pe default yahi dikhega
 *   translations.hi.shortBio: "हिंदी text"
 *   translations.hinglish.shortBio: "Hinglish text"
 *
 * Agar translation missing ho to apne aap English chal jaati hai.
 */

// ============================================================
// SKILLS - technology ke naam har language me same rehte hain,
// isliye inka koi translation nahi
// ============================================================
const skills = [
  { name: "JavaScript", category: "Frontend", order: 1 },
  { name: "React.js", category: "Frontend", order: 2 },
  { name: "Next.js", category: "Frontend", order: 3 },
  { name: "Material UI", category: "Frontend", order: 4 },
  { name: "Bootstrap", category: "Frontend", order: 5 },
  { name: "HTML5 & CSS3", category: "Frontend", order: 6 },

  { name: "Node.js", category: "Backend", order: 1 },
  { name: "Express.js", category: "Backend", order: 2 },
  { name: "REST APIs", category: "Backend", order: 3 },
  { name: "JWT Authentication", category: "Backend", order: 4 },

  { name: "MongoDB", category: "Database", order: 1 },
  { name: "Mongoose", category: "Database", order: 2 },

  { name: "Git & GitHub", category: "Tools", order: 1 },
  { name: "Postman", category: "Tools", order: 2 },
  { name: "Cloudinary", category: "Tools", order: 3 },
  { name: "PowerShell", category: "Tools", order: 4 },

  { name: "Manual Testing", category: "Other", order: 1 },
];

// ============================================================
// EXPERIENCE
// ============================================================
const experience = [
  {
    role: "Frontend Developer",
    company: "STAQO",
    employmentType: "Full-time",
    location: "Noida, Uttar Pradesh, India - On-site",
    startDate: new Date("2025-06-01"),
    endDate: null,
    isCurrent: true,
    points: [
      "Independently handled both frontend and backend development for a Task Management System.",
      "Built task assignment, task tracking, attendance management and employee management modules.",
      "Implemented reporting features to track activities, performance and project progress.",
      "Worked on CRM systems and managed CMS platforms, including website maintenance and content updates.",
      "Contributed to a School ERP system, covering several school management modules.",
      "Designed and built responsive, user-friendly UI components.",
      "Handled bulk file management operations, including renaming thousands of files and cleaning up missing or unnecessary ones.",
    ],
    skills: ["React.js", "Node.js", "MongoDB", "Material UI", "REST APIs"],
    translations: {
      hi: {
        role: "फ्रंटएंड डेवलपर",
        location: "नोएडा, उत्तर प्रदेश, भारत - ऑन-साइट",
        points: [
          "Task Management System का फ्रंटएंड और बैकएंड दोनों स्वतंत्र रूप से संभाला।",
          "Task assignment, task tracking, attendance management और employee management modules बनाए।",
          "Activities, performance और project progress ट्रैक करने के लिए reporting features बनाए।",
          "CRM systems और CMS platforms पर काम किया, website maintenance और content updates सहित।",
          "School ERP system के development में योगदान दिया - कई school management modules।",
          "Responsive, user-friendly UI components डिज़ाइन और develop किए।",
          "Bulk file management - हज़ारों files rename कीं और cleanup किया।",
        ],
      },
      hinglish: {
        role: "Frontend Developer",
        location: "Noida, Uttar Pradesh, India - On-site",
        points: [
          "Task Management System ka frontend aur backend dono independently handle kiya.",
          "Task assignment, task tracking, attendance aur employee management modules banaye.",
          "Reporting features banaye - activities, performance aur project progress track karne ke liye.",
          "CRM systems aur CMS platforms pe kaam kiya, website maintenance aur content updates ke saath.",
          "School ERP system ke development me contribute kiya - kai school management modules.",
          "Responsive, user-friendly UI components banaye.",
          "Bulk file management - hazaaron files rename kiye aur cleanup kiya.",
        ],
      },
    },
  },
  {
    role: "Frontend Web Developer",
    company: "STAQO",
    employmentType: "Part-time",
    location: "Noida, Uttar Pradesh, India",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2026-11-01"),
    isCurrent: false,
    points: [
      "Contributed to CMS workflow testing and resolved API-level issues.",
      "Handled website updates, feature enhancements, debugging and maintenance.",
    ],
    skills: ["JavaScript", "CSS", "Postman"],
    translations: {
      hi: {
        role: "फ्रंटएंड वेब डेवलपर",
        location: "नोएडा, उत्तर प्रदेश, भारत",
        points: [
          "CMS workflow testing में योगदान दिया और API-level issues हल किए।",
          "Website updates, feature enhancements, debugging और maintenance संभाला।",
        ],
      },
      hinglish: {
        role: "Frontend Web Developer",
        location: "Noida, Uttar Pradesh, India",
        points: [
          "CMS workflow testing me contribute kiya aur API-level issues solve kiye.",
          "Website updates, feature enhancements, debugging aur maintenance handle kiya.",
        ],
      },
    },
  },
];

// ============================================================
// EDUCATION
// ============================================================
const education = [
  {
    degree: "Bachelor of Laws (LL.B.)",
    field: "Law",
    institution: "CCS (Chaudhary Charan Singh) University",
    startYear: 2024,
    endYear: 2027,
    grade: "7",
    points: [
      "Contract Law & Legal Agreements",
      "Cyber Law & IT Regulations",
      "Data Privacy & Fundamental Rights",
      "Company Law & Corporate Governance",
    ],
    order: 1,
    translations: {
      hi: {
        degree: "विधि स्नातक (LL.B.)",
        field: "विधि",
        institution: "सी.सी.एस. (चौधरी चरण सिंह) विश्वविद्यालय",
        points: [
          "अनुबंध कानून और कानूनी समझौते",
          "साइबर कानून और IT नियम",
          "डेटा प्राइवेसी और मौलिक अधिकार",
          "कंपनी कानून और कॉर्पोरेट गवर्नेंस",
        ],
      },
      hinglish: {
        degree: "Bachelor of Laws (LL.B.)",
        field: "Law",
        institution: "CCS (Chaudhary Charan Singh) University",
        points: [
          "Contract Law aur legal agreements",
          "Cyber Law aur IT regulations",
          "Data Privacy aur fundamental rights",
          "Company Law aur corporate governance",
        ],
      },
    },
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    field: "Information Technology",
    institution: "Brahmanand Group of Institutions, Bulandshahr",
    startYear: 2021,
    endYear: 2024,
    grade: "8",
    points: [
      "Completed an internship at STAQO, gaining hands-on web development experience.",
      "Winner of the District-Level Chess Competition.",
      "Achieved 1st position in class.",
    ],
    order: 2,
    translations: {
      hi: {
        degree: "कंप्यूटर एप्लिकेशन स्नातक (BCA)",
        field: "सूचना प्रौद्योगिकी",
        institution: "ब्रह्मानंद ग्रुप ऑफ़ इंस्टिट्यूशंस, बुलंदशहर",
        points: [
          "STAQO में इंटर्नशिप पूरी की और व्यावहारिक web development अनुभव प्राप्त किया।",
          "ज़िला स्तरीय शतरंज प्रतियोगिता के विजेता।",
          "कक्षा में प्रथम स्थान।",
        ],
      },
      hinglish: {
        degree: "Bachelor of Computer Applications (BCA)",
        field: "Information Technology",
        institution: "Brahmanand Group of Institutions, Bulandshahr",
        points: [
          "STAQO me internship ki aur practical web development experience mila.",
          "District-Level Chess Competition ke winner.",
          "Class me 1st position.",
        ],
      },
    },
  },
];

// ============================================================
// PROJECTS
//
// liveUrl / githubUrl khali hain - apne deploy kiye hue links
// admin panel se daalo (ya yahan bhar do seed chalane se pehle).
// ============================================================
const projects = [
  {
    title: "Task Management System",
    shortDescription:
      "End-to-end ERP for employee task assignment, tracking, attendance and reporting. Built both the frontend and backend on my own.",
    longDescription:
      "An internal ERP built for STAQO, covering task assignment, task tracking, attendance management, employee management and reporting. I handled both the frontend and the backend independently, from database design through to the UI.\n\nThe hardest part was the reporting module, where every employee's daily activity, task completion rate and project progress had to come together on a single dashboard without the queries slowing down.",
    category: "ERP",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Material UI"],
    liveUrl: "",
    githubUrl: "",
    demoCredentials: [],
    isFeatured: true,
    isConfidential: true,
    order: 1,
    translations: {
      hi: {
        title: "टास्क मैनेजमेंट सिस्टम",
        shortDescription:
          "कर्मचारियों के task assignment, tracking, attendance और reporting के लिए end-to-end ERP। फ्रंटएंड और बैकएंड दोनों खुद बनाए।",
        longDescription:
          "STAQO के लिए बनाया गया internal ERP जिसमें task assignment, task tracking, attendance management, employee management और reporting modules हैं। मैंने इस प्रोजेक्ट का फ्रंटएंड और बैकएंड दोनों स्वतंत्र रूप से संभाला - database design से लेकर UI तक।",
      },
      hinglish: {
        title: "Task Management System",
        shortDescription:
          "Employee task assignment, tracking, attendance aur reporting ke liye end-to-end ERP. Frontend aur backend dono akele banaya.",
        longDescription:
          "STAQO ke liye banaya gaya internal ERP jisme task assignment, task tracking, attendance management, employee management aur reporting modules hain. Database design se lekar UI tak sab maine khud handle kiya.",
      },
    },
  },
  {
    title: "School ERP System",
    shortDescription:
      "School management platform covering students, staff, attendance and reports.",
    longDescription:
      "A School ERP system with student management, staff management, attendance and reporting modules. I worked across several of the school management functionalities.",
    category: "ERP",
    techStack: ["React.js", "Node.js", "MongoDB", "REST APIs"],
    liveUrl: "",
    githubUrl: "",
    demoCredentials: [],
    isFeatured: true,
    isConfidential: true,
    order: 2,
    translations: {
      hi: {
        title: "स्कूल ERP सिस्टम",
        shortDescription:
          "छात्र, स्टाफ, attendance और reports को कवर करने वाला school management platform।",
        longDescription:
          "School ERP system जिसमें student management, staff management, attendance और reporting modules हैं।",
      },
      hinglish: {
        title: "School ERP System",
        shortDescription: "School management ke multiple modules - students, staff, attendance aur reports.",
        longDescription:
          "School ERP system jisme student management, staff management, attendance aur reporting modules hain.",
      },
    },
  },
  {
    title: "E-Commerce Platform",
    shortDescription:
      "Full-featured MERN e-commerce site with a product catalogue, cart, authentication and order management.",
    longDescription:
      "An e-commerce application built with MongoDB, Express, React and Node. It includes product listing with search and filters, a shopping cart, JWT authentication, order management and an admin panel.",
    category: "Full Stack",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    liveUrl: "",
    githubUrl: "",
    // EXAMPLE - yeh dummy credentials hain. Apne demo ke asli test accounts
    // yahan daalo ya admin panel se edit karo. SIRF demo accounts, kabhi
    // kisi production system ka login nahi.
    demoCredentials: [
      {
        role: "Super Admin",
        email: "superadmin@demo.test",
        password: "Demo@1234",
        note: "Full access - users, orders and settings",
      },
      {
        role: "Admin",
        email: "admin@demo.test",
        password: "Demo@1234",
        note: "Can manage products and orders",
      },
      {
        role: "User",
        email: "user@demo.test",
        password: "Demo@1234",
        note: "Regular customer view - cart and orders",
      },
    ],
    demoNote: "The demo data resets every night, so feel free to try anything.",
    isFeatured: true,
    order: 3,
    translations: {
      hi: {
        title: "ई-कॉमर्स प्लेटफ़ॉर्म",
        shortDescription:
          "MERN stack पर बना full-featured e-commerce site - product catalog, cart, authentication और orders।",
        longDescription:
          "MongoDB, Express, React और Node पर बनी e-commerce application जिसमें product listing, search और filter, shopping cart, JWT authentication, order management और admin panel शामिल है।",
      },
      hinglish: {
        title: "E-Commerce Platform",
        shortDescription:
          "MERN stack pe bani full-featured e-commerce site - product catalog, cart, auth aur orders.",
        longDescription:
          "MongoDB, Express, React aur Node pe bani e-commerce application jisme product listing, cart, JWT auth aur admin panel hai.",
      },
    },
  },
  {
    title: "Client Business Website",
    shortDescription:
      "A responsive business website built and delivered for a client, from design through to deployment.",
    longDescription:
      "An end-to-end responsive website built and delivered for a client. I handled everything from gathering requirements to deployment and post-launch maintenance.",
    category: "Client Work",
    techStack: ["React.js", "Bootstrap", "JavaScript"],
    liveUrl: "",
    githubUrl: "",
    demoCredentials: [],
    isFeatured: true,
    order: 4,
    translations: {
      hi: {
        title: "क्लाइंट बिज़नेस वेबसाइट",
        shortDescription:
          "एक क्लाइंट के लिए बनाई और डिलीवर की गई responsive business website - design से deployment तक।",
        longDescription:
          "एक क्लाइंट के लिए end-to-end responsive website बनाई। Requirement gathering से लेकर deployment और maintenance तक सब संभाला।",
      },
      hinglish: {
        title: "Client Business Website",
        shortDescription:
          "Client ke liye banayi gayi responsive business website - design se deployment tak.",
        longDescription:
          "Ek client ke liye end-to-end responsive website banayi aur deliver ki. Requirement gathering se deployment tak sab handle kiya.",
      },
    },
  },
];

// ============================================================
// CERTIFICATES
// ============================================================
const certificates = [
  {
    title: "District Level Chess Competition - Winner",
    issuer: "District Sports Authority",
    issueDate: new Date("2023-02-01"),
    order: 1,
    translations: {
      hi: { title: "ज़िला स्तरीय शतरंज प्रतियोगिता - विजेता", issuer: "ज़िला खेल प्राधिकरण" },
      hinglish: { title: "District Level Chess Competition - Winner", issuer: "District Sports Authority" },
    },
  },
  {
    title: "General Knowledge Competition",
    issuer: "Brahmanand Group of Institutions",
    issueDate: new Date("2022-08-01"),
    order: 2,
    translations: {
      hi: { title: "सामान्य ज्ञान प्रतियोगिता", issuer: "ब्रह्मानंद ग्रुप ऑफ़ इंस्टिट्यूशंस" },
      hinglish: { title: "General Knowledge Competition", issuer: "Brahmanand Group of Institutions" },
    },
  },
  {
    title: "Web Development Internship",
    issuer: "STAQO",
    issueDate: new Date("2024-06-01"),
    order: 3,
    translations: {
      hi: { title: "वेब डेवलपमेंट इंटर्नशिप", issuer: "STAQO" },
      hinglish: { title: "Web Development Internship", issuer: "STAQO" },
    },
  },
];

// ============================================================
// PROFILE
// ============================================================
const profile = {
  fullName: "Rahul Sharma",
  title: "Frontend Developer | MERN Stack",
  tagline:
    "Based in Noida - I build ERP, CRM and CMS systems with React, Next.js and Node.js.",
  shortBio:
    "I'm Rahul Sharma, a frontend developer based in Noida. For the last 1.5 years I've been at STAQO, where I built an entire Task Management System on my own - both the frontend and the backend. I've worked on School ERP, CRM and CMS platforms, where the job isn't just building screens but understanding how a business actually runs.",
  longBio:
    "My background is a little unusual: I finished a BCA in Information Technology and I'm currently studying for an LL.B. That gives me a working understanding of contract law, cyber law and data privacy - a rare combination for teams building compliance-heavy or legal-tech products, because I can read requirements from both sides.\n\nI work with React, Next.js, Node.js and MongoDB, and I enjoy building clean, responsive interfaces that hold up on every device.",

  aboutHighlights: [
    {
      title: "Why law and tech together",
      body:
        "After my BCA I started an LL.B. It gave me a working understanding of contract law, cyber law and data privacy. For teams building compliance-heavy or legal-tech products that's a rare combination - I can translate requirements more accurately because I understand the language on both sides.",
    },
    {
      title: "How I work",
      body:
        "I start with the problem, then decide the data structure, and only then the UI. Working on a production ERP taught me that the hardest part isn't building a screen - it's understanding the business workflow behind it. I write comments where the 'why' needs explaining, not the 'what'.",
    },
    {
      title: "What I'm learning right now",
      body:
        "Testing (Jest and React Testing Library) and system design. After working on a production ERP I understood how risky refactoring is without tests.",
    },
  ],

  resumeUrl: "/resume.pdf",
  email: "rahulsharma101102@gmail.com",
  phone: "+91 97617 09408",
  location: "Noida, Uttar Pradesh, India",

  socials: {
    linkedin: "https://www.linkedin.com/in/rahul-sharma-a62442421/",
    github: "",
    instagram: "",
    twitter: "",
  },

  stats: [
    { label: "Years of experience", value: "1.5+" },
    { label: "Projects delivered", value: "6+" },
    { label: "ERP systems built", value: "2" },
    { label: "Education", value: "BCA + LL.B" },
  ],

  // Hero image ki positioning ke defaults.
  // Admin panel -> Profile se image upload karke adjust kar sakte ho.
  heroFocus: { x: 50, y: 50 },
  heroFocusMobile: { x: 50, y: 40 },
  heroOverlay: 82,
  heroBlur: 0,

  translations: {
    hi: {
      fullName: "राहुल शर्मा",
      title: "फ्रंटएंड डेवलपर | MERN स्टैक",
      tagline:
        "नोएडा से - React, Next.js और Node.js के साथ ERP, CRM और CMS सिस्टम बनाता हूँ।",
      shortBio:
        "मैं राहुल शर्मा हूँ, नोएडा में रहने वाला एक फ्रंटएंड डेवलपर। पिछले 1.5 साल से STAQO में हूँ, जहाँ मैंने एक पूरा Task Management System अकेले बनाया - फ्रंटएंड और बैकएंड दोनों। School ERP, CRM और CMS platforms पर काम किया है, जहाँ सिर्फ़ screen बनाना नहीं बल्कि यह समझना पड़ता है कि business असल में चलता कैसे है।",
      longBio:
        "मेरा बैकग्राउंड थोड़ा अलग है: BCA (Information Technology) पूरा कर चुका हूँ और अभी LL.B कर रहा हूँ। इससे मुझे contract law, cyber law और data privacy की समझ है - compliance-heavy या legal-tech products बनाने वाली टीमों के लिए यह एक दुर्लभ संयोजन है, क्योंकि मैं दोनों तरफ़ की भाषा समझता हूँ।\n\nमैं React, Next.js, Node.js और MongoDB के साथ काम करता हूँ, और ऐसे साफ़, responsive interfaces बनाने में मज़ा आता है जो हर device पर टिके रहें।",
      aboutHighlights: [
        {
          title: "लॉ और टेक साथ में क्यों",
          body:
            "BCA के बाद मैंने LL.B शुरू की। इससे मुझे contract law, cyber law और data privacy की व्यावहारिक समझ मिली। Compliance-heavy या legal-tech products बनाने वाली टीमों के लिए यह दुर्लभ संयोजन है - मैं requirements को ज़्यादा सही तरीके से translate कर पाता हूँ।",
        },
        {
          title: "मैं कैसे काम करता हूँ",
          body:
            "पहले problem समझता हूँ, फिर data structure तय करता हूँ, और उसके बाद UI. Production ERP पर काम करके सीखा कि सबसे मुश्किल हिस्सा screen बनाना नहीं - उसके पीछे का business workflow समझना होता है।",
        },
        {
          title: "अभी क्या सीख रहा हूँ",
          body:
            "Testing (Jest और React Testing Library) और system design. Production ERP पर काम करने के बाद समझ आया कि tests के बिना refactor करना कितना risky है।",
        },
      ],
      stats: [
        { label: "वर्षों का अनुभव", value: "1.5+" },
        { label: "पूरे किए प्रोजेक्ट", value: "6+" },
        { label: "ERP सिस्टम बनाए", value: "2" },
        { label: "शिक्षा", value: "BCA + LL.B" },
      ],
    },
    hinglish: {
      fullName: "Rahul Sharma",
      title: "Frontend Developer | MERN Stack",
      tagline:
        "Noida se - React, Next.js aur Node.js ke saath ERP, CRM aur CMS systems banata hoon.",
      shortBio:
        "Main Rahul Sharma hoon - Noida me based ek frontend developer. Pichle 1.5 saal se STAQO me kaam kar raha hoon, jahan maine ek poora Task Management System akele banaya - frontend aur backend dono. School ERP, CRM aur CMS platforms pe kaam kiya hai, jahan sirf page banana nahi balki real business workflows samajhna padta hai.",
      longBio:
        "Mera background thoda alag hai: BCA (Information Technology) complete kar chuka hoon aur abhi LL.B kar raha hoon. Isse mujhe contract law, cyber law aur data privacy ki samajh hai - compliance-heavy ya legal-tech products banane wali teams ke liye yeh ek rare combination hai.\n\nMain React, Next.js, Node.js aur MongoDB ke saath kaam karta hoon, aur clean, responsive interfaces banane me mazaa aata hai jo har device pe theek chalein.",
      aboutHighlights: [
        {
          title: "Law aur tech saath me kyun",
          body:
            "BCA ke baad LL.B shuru ki. Isse contract law, cyber law aur data privacy ki samajh hai - legal-tech products banane wali teams ke liye rare combination hai, kyunki main dono taraf ki bhasha samajhta hoon.",
        },
        {
          title: "Main kaise kaam karta hoon",
          body:
            "Pehle problem samajhta hoon, phir data structure decide karta hoon, uske baad UI. Production ERP pe seekha ki sabse mushkil hissa screen banana nahi - uske peeche ka business workflow samajhna hota hai.",
        },
        {
          title: "Abhi kya seekh raha hoon",
          body:
            "Testing (Jest aur React Testing Library) aur system design. Production ERP pe kaam karne ke baad samajh aaya ki tests ke bina refactor karna kitna risky hai.",
        },
      ],
      stats: [
        { label: "Saal ka experience", value: "1.5+" },
        { label: "Projects deliver kiye", value: "6+" },
        { label: "ERP systems banaye", value: "2" },
        { label: "Padhai", value: "BCA + LL.B" },
      ],
    },
  },
};

// ============================================================
const run = async () => {
  await connectDB();

  console.log("Clearing old data...");
  await Promise.all([
    User.deleteMany(),
    Profile.deleteMany(),
    Skill.deleteMany(),
    Experience.deleteMany(),
    Education.deleteMany(),
    Project.deleteMany(),
    Certificate.deleteMany(),
  ]);

  await User.create({
    name: "Rahul Sharma",
    email: process.env.ADMIN_EMAIL || "rahulsharma101102@gmail.com",
    password: process.env.ADMIN_PASSWORD || "Admin@123",
  });

  await Profile.create(profile);
  await Skill.insertMany(skills);
  await Experience.insertMany(experience);
  await Education.insertMany(education);
  await Certificate.insertMany(certificates);

  // insertMany pre("validate") hook skip kar deta hai, aur slug wahin banta hai -
  // isliye projects ke liye create() ka loop
  for (const p of projects) await Project.create(p);

  console.log("");
  console.log("Seed complete.");
  console.log(`  Admin email    : ${process.env.ADMIN_EMAIL}`);
  console.log(`  Admin password : ${process.env.ADMIN_PASSWORD}`);
  console.log("");
  console.log("Ab http://localhost:3000/login se login karo.");
  console.log("Projects ke live links aur demo credentials admin panel se bhar do.");

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
