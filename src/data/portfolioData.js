// src/data/portfolioData.js
import About from "../components/InfoPanel/About";
import Skills from "../components/InfoPanel/Skills";
import Projects from "../components/InfoPanel/Projects";
import Contact from "../components/InfoPanel/Contact";

export const sectionColors = {
  about: 0x00d4aa,
  skills: 0x6c63ff,
  projects: 0xff6b35,
  contact: 0x2196f3,
};

export const portfolioData = {
  about: {
    title: "About Me",
    component: About,
    content: `
      <h2>Ravi Shankar Kumar</h2>
      <h3>MERN Stack Developer</h3>
      <p>React.js developer with hands-on experience building full-stack applications using the MERN stack. Skilled in building scalable UIs with React, managing state with Context API, and deploying responsive web apps. Passionate about clean code and user-focused design. Constant learner who enjoys exploring new frontend technologies.</p>
      
      <h3>Education</h3>
      <p><strong>B.Tech in Computer Science & Engineering</strong></p>
      <p>Galgotias University, Greater Noida, India (2019 – 2023)</p>
      
      <h3>Professional Summary</h3>
      <p>Experienced in developing responsive single-page applications with modern React patterns, state management, and RESTful API integration. Strong focus on user experience and performance optimization.</p>
    `,
  },
  skills: {
    title: "Technical Skills",
    component: Skills,
    content: `
      <h2>Technical Expertise</h2>
      <h3>Programming Languages</h3>
      <ul>
        <li>JavaScript (ES6+)</li>
        <li>HTML5 & CSS3</li>
      </ul>
      
      <h3>Frontend Technologies</h3>
      <ul>
        <li>React.js (Hooks, Context API, Router DOM)</li>
        <li>Bootstrap & Responsive Design</li>
        <li>Flexbox & CSS Grid</li>
        <li>Media Queries & Mobile-First Design</li>
      </ul>
      
      <h3>Backend Technologies</h3>
      <ul>
        <li>Node.js & Express.js</li>
        <li>RESTful API Development</li>
        <li>Authentication & Authorization</li>
      </ul>
      
      <h3>Databases & Tools</h3>
      <ul>
        <li>MongoDB & Mongoose ODM</li>
        <li>Git & GitHub Version Control</li>
        <li>VS Code, Postman</li>
        <li>Vercel Deployment</li>
      </ul>
      
      <h3>Specializations</h3>
      <ul>
        <li>MERN Stack Development</li>
        <li>State Management (Context API)</li>
        <li>Component-Based Architecture</li>
        <li>Responsive Web Applications</li>
      </ul>
    `,
  },
  projects: {
    title: "Featured Projects",
    component: Projects,
    content: `
      <h2>Project Portfolio</h2>
      
      <h3>🚀 Engineering Resource Management System</h3>
      <p><strong>Latest Project - MERN Stack</strong></p>
      <p>Full-stack application for managing engineering team assignments across projects. Features authentication with Manager/Engineer roles, capacity tracking, project assignment system, and real-time availability planning.</p>
      <p><strong>Tech Stack:</strong> React, Node.js, Express, MongoDB, JWT Authentication</p>
      <p><strong>Key Features:</strong> Role-based dashboards, capacity calculations, skill matching, assignment tracking</p>
      <p>🔗 <strong>Live:</strong> resource-pro.vercel.app | 💻 <strong>Code:</strong> GitHub/RaviShankar-18/resource-pro</p>
      
      <h3>🛒 ShopEasy - E-Commerce Platform</h3>
      <p>Single-page MERN application with comprehensive e-commerce functionality including product browsing, detailed product pages, shopping cart, and wishlist management.</p>
      <p><strong>Features:</strong> Global search, category filters, price range sorting, responsive design with Bootstrap</p>
      <p><strong>Tech:</strong> React, Node.js, Express, MongoDB, React Router DOM, Context API</p>
      
      <h3>🎪 Gatherly - Event Management</h3>
      <p>Web application for browsing and viewing details of upcoming events with dynamic filtering capabilities.</p>
      <p><strong>Features:</strong> Event listing, detail pages, online/offline filters, speaker information, session details</p>
      <p><strong>Tech:</strong> React, Node.js, Express, MongoDB, Bootstrap</p>
      
      <h3>📚 Book Management API</h3>
      <p>Backend-focused REST API with full CRUD operations for book management system.</p>
      <p><strong>Features:</strong> Complete RESTful endpoints, MongoDB integration, Express.js routing</p>
      <p><strong>Tech:</strong> Express.js, MongoDB, Mongoose, RESTful API Design</p>
    `,
  },
  contact: {
    title: "Get In Touch",
    component: Contact,
    content: `
      <h2>Contact Information</h2>
      <h3>Let's Connect!</h3>
      <p>I'm actively seeking opportunities to contribute to innovative projects and grow as a MERN stack developer. Open to discussing full-time positions, freelance projects, and collaboration opportunities.</p>
      
      <h3>Contact Details</h3>
      <p>📧 <strong>Email:</strong> ravishankarkumar.work@gmail.com</p>
      <p>📱 <strong>Phone:</strong> +91 9354419407</p>
      <p>💻 <strong>GitHub:</strong> github.com/RaviShankar-18</p>
      <p>🌐 <strong>Portfolio:</strong> ravi-portfolio-five.vercel.app</p>
      <p>⚡ <strong>CodeSandbox:</strong> codesandbox.io/u/ravishankar-18</p>
      
      <h3>Professional Focus</h3>
      <p>🎯 Seeking: MERN Stack Developer positions</p>
      <p>🌟 Specialization: React.js, Full-Stack Development</p>
      <p>📍 Location: India (Open to remote work)</p>
      <p>💼 Available for immediate opportunities</p>
      
      <h3>What I Bring</h3>
      <p>✨ Clean, maintainable code practices</p>
      <p>🚀 Performance-optimized applications</p>
      <p>📱 Mobile-first responsive design</p>
      <p>🔄 Continuous learning mindset</p>
    `,
  },
};
