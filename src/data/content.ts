export type Lang = 'en' | 'vi'

/** Static profile facts shared by both languages. */
export const profile = {
  name: 'Le Duc Tri',
  nameVi: 'Lê Đức Trí',
  initials: 'LDT',
  email: 'leductri12321@gmail.com',
  phoneDisplay: '0345 142 309',
  phoneIntlDisplay: '+84 345 142 309',
  phoneHref: 'tel:+84345142309',
  github: 'https://github.com/trimikey',
  githubHandle: '@trimikey',
  // NOTE: URL taken from the Stitch design. Verify it before publishing.
  linkedin: 'https://www.linkedin.com/in/leductri',
  location: 'Ho Chi Minh City, Vietnam',
  timezone: 'UTC+7',
  /** Put your PDF at public/cv/Le-Duc-Tri-CV.pdf */
  cvUrl: '/cv/Le-Duc-Tri-CV.pdf',
  avatar: '/avatar.jpg',
  year: 2026,
} as const

export type Stat = { value: string; label: string }
export type Bullet = { title: string; desc: string }

export type ExperienceItem = {
  period: string
  title: string
  company: string
  location?: string
  tagline: string
  summary: string
  bullets: Bullet[]
}

export type Project = {
  category: string
  period: string
  title: string
  role: string
  description: string
  highlights: string[]
  tech: string[]
  github?: string
  status?: string
}

export type SkillGroupKey = 'frontend' | 'backend' | 'database' | 'devops'
export type SkillGroup = { key: SkillGroupKey; title: string; items: string[] }
export type Cert = { year: string; title: string; desc: string; issuer: string }

export type Content = {
  nav: {
    about: string
    experience: string
    projects: string
    skills: string
    certifications: string
    contact: string
    hire: string
    switchToLight: string
    switchToDark: string
  }
  hero: {
    available: string
    greeting: string
    role: string
    description: string
    ctaProjects: string
    ctaCv: string
    location: string
    stats: Stat[]
  }
  about: {
    label: string
    title: string
    p1: string
    p2: string
    quote: string
    education: {
      label: string
      school: string
      degree: string
      period: string
      gpa: string
      desc: string
    }
  }
  experience: {
    label: string
    title: string
    subtitle: string
    items: ExperienceItem[]
    education: {
      period: string
      title: string
      company: string
      location: string
      summary: string
    }
  }
  projects: {
    label: string
    title: string
    subtitle: string
    roleLabel: string
    sourceCode: string
    items: Project[]
  }
  skills: {
    label: string
    title: string
    subtitle: string
    groups: SkillGroup[]
    languages: { title: string; items: { name: string; level: string }[] }
  }
  certs: {
    label: string
    title: string
    subtitle: string
    items: Cert[]
  }
  contact: {
    label: string
    title: string
    subtitle: string
    cards: { email: string; phone: string; github: string; location: string }
    availability: string
    form: {
      title: string
      name: string
      email: string
      subject: string
      message: string
      namePlaceholder: string
      emailPlaceholder: string
      subjectPlaceholder: string
      messagePlaceholder: string
      submit: string
      hint: string
      defaultSubject: string
    }
  }
  footer: {
    tagline: string
    navTitle: string
    channelsTitle: string
    rights: string
    built: string
  }
}

const en: Content = {
  nav: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    certifications: 'Certifications',
    contact: 'Contact',
    hire: 'Hire Me',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
  },
  hero: {
    available: 'Available for opportunities',
    greeting: "Hi, I'm",
    role: 'Fullstack Web Developer',
    description:
      'Enthusiastic and fast-learning Full Stack Web Developer based in Ho Chi Minh City. I craft solid web architectures, intuitive UI/UX, robust APIs, and high-performance fullstack applications.',
    ctaProjects: 'View Projects',
    ctaCv: 'Download CV',
    location: 'Ho Chi Minh City, VN',
    stats: [
      { value: '7.5/10', label: 'GPA at FPT University' },
      { value: '4+', label: 'Production projects' },
      { value: '2', label: 'Industry internships' },
    ],
  },
  about: {
    label: 'Career Objective',
    title: 'Clean code and rigorous architecture, shipped with care.',
    p1: 'Enthusiastic and fast-learning Full Stack Developer with a solid understanding of web development fundamentals, including UI/UX, APIs, and database management. I specialize in high-performance web architectures, real-time engines, and scalable microservices.',
    p2: 'I am looking to gain practical experience, contribute to meaningful projects, and grow into a professional software engineer who delivers high code quality and user-centric design.',
    quote: 'Clean code and rigorous architecture are the foundation of sustainable digital products.',
    education: {
      label: 'Education',
      school: 'FPT University',
      degree: 'Bachelor of Information Technology',
      period: '2022 - 2026',
      gpa: 'GPA 7.5 / 10.0',
      desc: 'Strong foundations in data structures, OOP, software architecture, databases, and distributed web development.',
    },
  },
  experience: {
    label: 'Career Milestones',
    title: 'Work Experience & Internships',
    subtitle:
      'Hands-on software delivery within professional teams, real-time backends, and performance optimization workflows.',
    items: [
      {
        period: '08/2025 - 12/2025',
        title: 'Backend Developer Intern',
        company: 'FPT Software',
        location: 'Ho Chi Minh City',
        tagline: 'Cinema Management Platform Core',
        summary:
          'Collaborated closely with senior software architects to build a fault-tolerant cinema reservation ecosystem using NestJS. Handled concurrency locking for high-demand premiere ticketing windows.',
        bullets: [
          {
            title: 'Redis Seat Locking',
            desc: 'Prevented double-bookings through atomic distributed locks with TTL fallback counters.',
          },
          {
            title: 'Stripe API & Webhooks',
            desc: 'Engineered secure checkout sessions with asynchronous confirmation and idempotent event listeners.',
          },
          {
            title: 'AWS S3 & Dynamic QR',
            desc: 'Automated real-time QR code generation for entry credentials and synced ticket assets to AWS S3.',
          },
        ],
      },
      {
        period: '06/2025 - 11/2025',
        title: 'Web Developer Intern',
        company: 'Revoland',
        tagline: 'Front-End & SEO Optimization',
        summary:
          'Executed market research and technical SEO implementations. Introduced server-side rendering (SSR) strategies to substantially improve search discoverability and initial render speed.',
        bullets: [
          {
            title: 'SEO & SSR Delivery',
            desc: 'Engineered server-rendered components, cutting page load metrics and increasing crawler visibility.',
          },
          {
            title: 'Performance Refactoring',
            desc: 'Optimized graphic assets, script bundles, and critical CSS paths across core landing routes.',
          },
          {
            title: 'Responsive UI/UX',
            desc: 'Maintained multi-device responsiveness and systematically patched regression bugs.',
          },
        ],
      },
    ],
    education: {
      period: '2022 - 2026',
      title: 'Bachelor of Information Technology',
      company: 'FPT University',
      location: 'Ho Chi Minh City',
      summary:
        'GPA 7.5 / 10.0. Core foundations in software architecture, databases, fullstack web development, and algorithms.',
    },
  },
  projects: {
    label: 'Engineering Showcase',
    title: 'Featured Projects',
    subtitle:
      'Real-world fullstack platforms engineered with modular architecture, real-time pipelines, and scalable database schemas.',
    roleLabel: 'Role',
    sourceCode: 'Source code',
    items: [
      {
        category: 'LegalTech / Real-time Marketplace',
        period: '12/2025 - 04/2026',
        title: 'Lawyer Platform & Consultation Portal',
        role: 'Fullstack Developer (Real-time & AI Integration)',
        description:
          'Professional legal consultation marketplace connecting certified attorneys and clients. Features dynamic case checklists, multi-stage milestone tracking, automated escrow disbursement, and an AI assistant for initial consultations.',
        highlights: [
          'Peer-to-peer 1-on-1 video calling and encrypted real-time chat via WebRTC + Socket.io.',
          'Evidence Intake Scoring (ICS) and dynamic case lifecycle milestone tracking.',
          'AI consultation assistant that parses legal inquiries for rapid triage.',
        ],
        tech: ['React', 'Node.js', 'Express', 'MySQL', 'Socket.io', 'WebRTC', 'Tailwind CSS', 'AI Integration'],
        github: 'https://github.com/trimikey/BE_LAW',
      },
      {
        category: 'E-Commerce / Booking Platform',
        period: '12/2025 - 04/2026',
        title: 'Pet Hotel & Shop Management System',
        role: 'Fullstack Web Developer (TypeScript & Automation)',
        description:
          'Full-stack pet care platform for overnight boarding and grooming services with inventory tracking, dynamic deposit calculation, and automated PDF invoicing.',
        highlights: [
          'Booking engine enforcing a 20% deposit for stays of 2 days or more before room allocation.',
          'Automated PDF invoices generated by headless Puppeteer worker processes.',
          'node-cron background workers for recurring nutrition and medication alerts, plus real-time exercise updates.',
        ],
        tech: ['ReactJS', 'Express (TypeScript)', 'MongoDB', 'Socket.io', 'Puppeteer', 'node-cron'],
        status: 'Production complete',
      },
      {
        category: 'Enterprise / High-Concurrency Backend',
        period: '08/2025 - 12/2025',
        title: 'Cinema Management System (FPT Software)',
        role: 'Backend Developer Intern',
        description:
          'High-performance cinema booking backend built with NestJS as the core internship project at FPT Software. Delivers sub-second seat holding under heavy ticket bursts, integrated payments, and cloud asset storage.',
        highlights: [
          'Distributed seat reservations with Redis caching and TTL auto-release.',
          'Stripe payment pipeline handling automated status transitions and refunds.',
          'AWS S3 media integration and automated QR code ticket generation.',
        ],
        tech: ['NestJS', 'Redis', 'MySQL', 'Stripe', 'AWS S3', 'Socket.io'],
        github: 'https://github.com/Shu1237/Be_Movie_Theater',
      },
      {
        category: 'HealthTech / Pregnancy Monitoring',
        period: '04/2025 - 08/2025',
        title: 'Baby & Mom - Pregnancy Tracking',
        role: 'Fullstack Web Developer',
        description:
          'Comprehensive pregnancy management platform documenting week-by-week prenatal milestones and biometric records, with direct channels between expectant mothers and healthcare professionals.',
        highlights: [
          'Fetal growth milestone logging with interactive weight and metric charts.',
          'Real-time messaging engine connecting expectant mothers and clinic specialists.',
          'Checkup schedule reminders with automated recurring alerts.',
        ],
        tech: ['ReactJS', 'Node.js', 'MongoDB', 'Socket.io'],
        github: 'https://github.com/trimikey/SWP391_babyandmom-',
      },
    ],
  },
  skills: {
    label: 'Tooling & Ecosystem',
    title: 'Technical Skills',
    subtitle:
      'Strict typing, scalable schemas, modern CSS primitives, and low-latency asynchronous runtimes.',
    groups: [
      {
        key: 'frontend',
        title: 'Frontend',
        items: ['ReactJS', 'Next.js', 'React Native', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Material UI', 'Flutter', 'Bootstrap'],
      },
      {
        key: 'backend',
        title: 'Backend & Core',
        items: ['NestJS', 'Node.js', 'Express', 'Spring Boot', 'TypeScript', 'Java Android'],
      },
      {
        key: 'database',
        title: 'Databases & ORM',
        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'TypeORM', 'Mongoose'],
      },
      {
        key: 'devops',
        title: 'Real-time & DevOps',
        items: ['Socket.io', 'WebRTC', 'Puppeteer', 'AWS S3', 'Docker', 'Git'],
      },
    ],
    languages: {
      title: 'Languages',
      items: [
        { name: 'Vietnamese', level: 'Native speaker' },
        { name: 'English', level: 'Working proficiency, technical documentation' },
      ],
    },
  },
  certs: {
    label: 'Accredited Credentials',
    title: 'Certifications',
    subtitle: 'Continuous professional education in AI, Agile SDLC, and code quality.',
    items: [
      { year: '2026', title: 'Google AI Professional', desc: 'Applied AI workflows, LLM prompting and API integration.', issuer: 'Coursera' },
      { year: '2025', title: 'Project Management Principles & Practices', desc: 'Agile frameworks, sprint scoping and delivery.', issuer: 'Coursera' },
      { year: '2025', title: 'Ethical Emerging Technologist', desc: 'Responsible AI development and privacy compliance.', issuer: 'Coursera' },
      { year: '2024', title: 'Software Development Lifecycle (SDLC)', desc: 'SDLC architectures, CI/CD and deployment hygiene.', issuer: 'Coursera' },
      { year: '2024', title: 'Java Testing', desc: 'Unit testing, JUnit and test-driven methodology.', issuer: 'Coursera' },
      { year: '2023', title: 'Academic Skills for Success', desc: 'Research synthesis, problem formulation and execution.', issuer: 'Coursera' },
    ],
  },
  contact: {
    label: 'Get in Touch',
    title: "Let's build something resilient.",
    subtitle:
      'Seeking full-time roles, engineering internships, and ambitious fullstack projects. I typically respond within 24 hours.',
    cards: {
      email: 'Primary inbox',
      phone: 'Phone / Zalo',
      github: 'GitHub repository',
      location: 'Base location',
    },
    availability: 'Accepting new opportunities now.',
    form: {
      title: 'Send a message',
      name: 'Your name',
      email: 'Email address',
      subject: 'Subject / Scope',
      message: 'Message',
      namePlaceholder: 'Jane Doe',
      emailPlaceholder: 'jane@company.com',
      subjectPlaceholder: 'Fullstack Developer position at ...',
      messagePlaceholder: 'Tell me about the role, the team, and the timeline...',
      submit: 'Send message',
      hint: 'Opens your email client with the message pre-filled.',
      defaultSubject: 'Contact from portfolio',
    },
  },
  footer: {
    tagline:
      'Fullstack Web Developer focused on resilient distributed services and high-performance interactive interfaces.',
    navTitle: 'Navigation',
    channelsTitle: 'Direct channels',
    rights: 'All rights reserved.',
    built: 'Built with React, TypeScript and Tailwind CSS.',
  },
}

const vi: Content = {
  nav: {
    about: 'Về tôi',
    experience: 'Kinh nghiệm',
    projects: 'Dự án',
    skills: 'Kỹ năng',
    certifications: 'Chứng chỉ',
    contact: 'Liên hệ',
    hire: 'Tuyển tôi',
    switchToLight: 'Chuyển sang giao diện sáng',
    switchToDark: 'Chuyển sang giao diện tối',
  },
  hero: {
    available: 'Sẵn sàng đón nhận cơ hội mới',
    greeting: 'Xin chào, tôi là',
    role: 'Kỹ sư Lập trình Fullstack Web',
    description:
      'Lập trình viên Fullstack nhiệt huyết và tiếp thu nhanh tại TP. Hồ Chí Minh. Tôi xây dựng kiến trúc web vững chắc, UI/UX trực quan, API ổn định và các ứng dụng fullstack hiệu năng cao.',
    ctaProjects: 'Xem dự án',
    ctaCv: 'Tải CV',
    location: 'TP. Hồ Chí Minh, VN',
    stats: [
      { value: '7.5/10', label: 'GPA tại Đại học FPT' },
      { value: '4+', label: 'Dự án thực tế' },
      { value: '2', label: 'Kỳ thực tập doanh nghiệp' },
    ],
  },
  about: {
    label: 'Mục tiêu nghề nghiệp',
    title: 'Mã nguồn sạch và kiến trúc chặt chẽ, giao hàng bằng sự cẩn trọng.',
    p1: 'Lập trình viên Fullstack nhiệt huyết, tiếp thu nhanh, nắm vững nền tảng phát triển web bao gồm UI/UX, API và quản trị cơ sở dữ liệu. Chuyên xây dựng các kiến trúc web hiệu năng cao, cơ chế real-time và hệ thống microservices có khả năng mở rộng.',
    p2: 'Tôi mong muốn tích lũy kinh nghiệm thực tế, đóng góp vào các dự án có ý nghĩa và phát triển thành một kỹ sư phần mềm chuyên nghiệp với chất lượng mã nguồn cao và thiết kế lấy người dùng làm trung tâm.',
    quote: 'Mã nguồn sạch và kiến trúc chặt chẽ là nền tảng của mọi sản phẩm số bền vững.',
    education: {
      label: 'Học vấn',
      school: 'Đại học FPT',
      degree: 'Cử nhân Công nghệ Thông tin',
      period: '2022 - 2026',
      gpa: 'GPA 7.5 / 10.0',
      desc: 'Nền tảng vững về cấu trúc dữ liệu, OOP, kiến trúc phần mềm, cơ sở dữ liệu và phát triển web phân tán.',
    },
  },
  experience: {
    label: 'Cột mốc sự nghiệp',
    title: 'Kinh nghiệm làm việc & Thực tập',
    subtitle:
      'Tham gia trực tiếp quy trình phát triển phần mềm trong môi trường chuyên nghiệp, backend thời gian thực và tối ưu hiệu năng.',
    items: [
      {
        period: '08/2025 - 12/2025',
        title: 'Thực tập sinh Lập trình Backend',
        company: 'FPT Software',
        location: 'TP. Hồ Chí Minh',
        tagline: 'Hệ thống lõi quản lý rạp chiếu phim',
        summary:
          'Phối hợp cùng các kiến trúc sư phần mềm cao cấp xây dựng hệ sinh thái đặt vé xem phim chịu lỗi cao bằng NestJS. Xử lý khóa ghế đồng thời cho các đợt mở bán vé có lưu lượng đột biến.',
        bullets: [
          {
            title: 'Khóa ghế với Redis',
            desc: 'Ngăn đặt trùng vé bằng cơ chế khóa phân tán nguyên tử kết hợp bộ đếm TTL tự động giải phóng.',
          },
          {
            title: 'Stripe API & Webhooks',
            desc: 'Tích hợp cổng thanh toán an toàn, xác nhận giao dịch bất đồng bộ và xử lý sự kiện idempotent.',
          },
          {
            title: 'AWS S3 & mã QR tự động',
            desc: 'Tự động tạo mã QR vé điện tử thời gian thực và đồng bộ tài nguyên vé lên AWS S3.',
          },
        ],
      },
      {
        period: '06/2025 - 11/2025',
        title: 'Thực tập sinh Lập trình Web',
        company: 'Revoland',
        tagline: 'Tối ưu Front-End & SEO',
        summary:
          'Thực hiện nghiên cứu thị trường, triển khai SEO kỹ thuật và chiến lược Server-Side Rendering (SSR) nhằm cải thiện đáng kể khả năng tìm kiếm và tốc độ tải trang ban đầu.',
        bullets: [
          {
            title: 'Triển khai SEO & SSR',
            desc: 'Xây dựng các component kết xuất phía máy chủ, giảm thời gian tải trang và tăng khả năng thu thập của bộ máy tìm kiếm.',
          },
          {
            title: 'Tái cấu trúc hiệu năng',
            desc: 'Tối ưu tài nguyên đồ họa, gói script và CSS quan trọng trên các trang đích chính.',
          },
          {
            title: 'UI/UX đa thiết bị',
            desc: 'Đảm bảo giao diện thích ứng mượt mà trên mọi kích cỡ màn hình và xử lý triệt để lỗi giao diện.',
          },
        ],
      },
    ],
    education: {
      period: '2022 - 2026',
      title: 'Cử nhân Công nghệ Thông tin',
      company: 'Đại học FPT',
      location: 'TP. Hồ Chí Minh',
      summary:
        'GPA 7.5 / 10.0. Nền tảng cốt lõi về kiến trúc phần mềm, cơ sở dữ liệu, phát triển web fullstack và thuật toán.',
    },
  },
  projects: {
    label: 'Dự án nổi bật',
    title: 'Dự án đã triển khai thực tế',
    subtitle:
      'Các nền tảng fullstack hoàn chỉnh với kiến trúc module, đường truyền real-time và schema cơ sở dữ liệu tối ưu.',
    roleLabel: 'Vai trò',
    sourceCode: 'Mã nguồn',
    items: [
      {
        category: 'LegalTech / Sàn giao dịch real-time',
        period: '12/2025 - 04/2026',
        title: 'Nền tảng Kết nối & Tư vấn Luật',
        role: 'Lập trình viên Fullstack (Real-time & Tích hợp AI)',
        description:
          'Sàn tư vấn pháp lý chuyên nghiệp kết nối luật sư và thân chủ. Tích hợp danh sách công việc động, theo dõi cột mốc vụ việc đa giai đoạn, ký quỹ giải ngân tự động và trợ lý AI tư vấn sơ bộ.',
        highlights: [
          'Gọi video P2P 1-1 và phòng chat mã hóa thời gian thực qua WebRTC + Socket.io.',
          'Hệ thống chấm điểm chứng cứ tiếp nhận (ICS) và theo dõi cột mốc vòng đời vụ việc.',
          'Trợ lý AI phân tích câu hỏi pháp lý để phân luồng nhanh.',
        ],
        tech: ['React', 'Node.js', 'Express', 'MySQL', 'Socket.io', 'WebRTC', 'Tailwind CSS', 'AI Integration'],
        github: 'https://github.com/trimikey/BE_LAW',
      },
      {
        category: 'Thương mại điện tử / Đặt lịch',
        period: '12/2025 - 04/2026',
        title: 'Hệ thống Quản lý Khách sạn & Cửa hàng Thú cưng',
        role: 'Lập trình viên Fullstack (TypeScript & Tự động hóa)',
        description:
          'Nền tảng chăm sóc thú cưng fullstack cho dịch vụ lưu trú qua đêm và spa, kèm quản lý kho, tính cọc tự động và xuất hóa đơn PDF điện tử.',
        highlights: [
          'Cơ chế đặt cọc bắt buộc 20% cho lưu trú từ 2 ngày trước khi cấp phòng.',
          'Tự động xuất hóa đơn PDF qua tiến trình Puppeteer headless.',
          'node-cron điều phối nhắc lịch ăn uống, dùng thuốc định kỳ và cập nhật vận động thời gian thực.',
        ],
        tech: ['ReactJS', 'Express (TypeScript)', 'MongoDB', 'Socket.io', 'Puppeteer', 'node-cron'],
        status: 'Đã hoàn thành sản phẩm',
      },
      {
        category: 'Doanh nghiệp / Backend chịu tải cao',
        period: '08/2025 - 12/2025',
        title: 'Hệ thống Đặt vé Rạp chiếu phim (FPT Software)',
        role: 'Thực tập sinh Lập trình Backend',
        description:
          'Backend đặt vé rạp chiếu phim hiệu năng cao xây dựng bằng NestJS, dự án cốt lõi trong kỳ thực tập tại FPT Software. Giữ ghế dưới 1 giây trong giờ cao điểm, tích hợp thanh toán và lưu trữ đám mây.',
        highlights: [
          'Giữ chỗ phân tán bằng Redis và cơ chế tự động hủy quá hạn với TTL.',
          'Quy trình thanh toán Stripe tự động cập nhật trạng thái đơn hàng và hoàn tiền.',
          'Tích hợp AWS S3 cho tài nguyên media và tự động tạo vé mã QR.',
        ],
        tech: ['NestJS', 'Redis', 'MySQL', 'Stripe', 'AWS S3', 'Socket.io'],
        github: 'https://github.com/Shu1237/Be_Movie_Theater',
      },
      {
        category: 'Y tế số / Theo dõi thai kỳ',
        period: '04/2025 - 08/2025',
        title: 'Mẹ và Bé - Theo dõi Thai kỳ',
        role: 'Lập trình viên Fullstack Web',
        description:
          'Nền tảng quản lý thai kỳ toàn diện ghi nhận tiến trình phát triển thai nhi theo tuần, lưu chỉ số sinh trắc và kết nối trực tiếp thai phụ với bác sĩ chuyên khoa.',
        highlights: [
          'Ghi nhận cột mốc phát triển thai nhi kèm biểu đồ tương tác về cân nặng và chỉ số.',
          'Kênh nhắn tin thời gian thực giữa thai phụ và đội ngũ bác sĩ.',
          'Nhắc lịch khám định kỳ với cảnh báo tự động lặp lại.',
        ],
        tech: ['ReactJS', 'Node.js', 'MongoDB', 'Socket.io'],
        github: 'https://github.com/trimikey/SWP391_babyandmom-',
      },
    ],
  },
  skills: {
    label: 'Công cụ & Hệ sinh thái',
    title: 'Kỹ năng chuyên môn',
    subtitle:
      'Kiểm soát kiểu tĩnh chặt chẽ, schema mở rộng, CSS hiện đại và runtime bất đồng bộ độ trễ thấp.',
    groups: [
      {
        key: 'frontend',
        title: 'Frontend',
        items: ['ReactJS', 'Next.js', 'React Native', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Material UI', 'Flutter', 'Bootstrap'],
      },
      {
        key: 'backend',
        title: 'Backend & Hệ thống lõi',
        items: ['NestJS', 'Node.js', 'Express', 'Spring Boot', 'TypeScript', 'Java Android'],
      },
      {
        key: 'database',
        title: 'Cơ sở dữ liệu & ORM',
        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'TypeORM', 'Mongoose'],
      },
      {
        key: 'devops',
        title: 'Real-time & DevOps',
        items: ['Socket.io', 'WebRTC', 'Puppeteer', 'AWS S3', 'Docker', 'Git'],
      },
    ],
    languages: {
      title: 'Ngoại ngữ',
      items: [
        { name: 'Tiếng Việt', level: 'Bản ngữ' },
        { name: 'Tiếng Anh', level: 'Giao tiếp làm việc, đọc hiểu tài liệu kỹ thuật' },
      ],
    },
  },
  certs: {
    label: 'Chứng chỉ được kiểm định',
    title: 'Chứng chỉ chuyên môn',
    subtitle: 'Liên tục trau dồi về AI, quy trình Agile SDLC và chất lượng mã nguồn.',
    items: [
      { year: '2026', title: 'Google AI Professional', desc: 'Quy trình ứng dụng AI, tối ưu prompt LLM và tích hợp API.', issuer: 'Coursera' },
      { year: '2025', title: 'Project Management Principles & Practices', desc: 'Khung Agile, phân rã sprint và giao nhận sản phẩm.', issuer: 'Coursera' },
      { year: '2025', title: 'Ethical Emerging Technologist', desc: 'Phát triển AI có trách nhiệm và tuân thủ quyền riêng tư.', issuer: 'Coursera' },
      { year: '2024', title: 'Software Development Lifecycle (SDLC)', desc: 'Kiến trúc quy trình phần mềm, CI/CD và chuẩn phát hành.', issuer: 'Coursera' },
      { year: '2024', title: 'Java Testing', desc: 'Unit test, JUnit và phương pháp TDD.', issuer: 'Coursera' },
      { year: '2023', title: 'Academic Skills for Success', desc: 'Tổng hợp nghiên cứu, tư duy giải quyết vấn đề và thực thi.', issuer: 'Coursera' },
    ],
  },
  contact: {
    label: 'Kênh liên lạc',
    title: 'Cùng xây dựng hệ thống bền vững.',
    subtitle:
      'Đang tìm kiếm vị trí toàn thời gian, thực tập kỹ sư phần mềm và các dự án fullstack tiềm năng. Phản hồi trong vòng 24 giờ.',
    cards: {
      email: 'Hộp thư chính',
      phone: 'Điện thoại / Zalo',
      github: 'Kho mã nguồn GitHub',
      location: 'Địa bàn hoạt động',
    },
    availability: 'Sẵn sàng tiếp nhận cơ hội mới ngay bây giờ.',
    form: {
      title: 'Gửi tin nhắn',
      name: 'Họ và tên',
      email: 'Địa chỉ email',
      subject: 'Vị trí / Phạm vi hợp tác',
      message: 'Nội dung',
      namePlaceholder: 'Nguyễn Văn A',
      emailPlaceholder: 'hr@congty.com',
      subjectPlaceholder: 'Vị trí Fullstack Developer tại ...',
      messagePlaceholder: 'Chia sẻ về vị trí, đội ngũ và thời gian dự kiến...',
      submit: 'Gửi tin nhắn',
      hint: 'Mở ứng dụng email của bạn với nội dung được điền sẵn.',
      defaultSubject: 'Liên hệ từ portfolio',
    },
  },
  footer: {
    tagline:
      'Kỹ sư Fullstack Web tập trung vào dịch vụ phân tán bền bỉ và giao diện tương tác hiệu năng cao.',
    navTitle: 'Điều hướng',
    channelsTitle: 'Kênh liên kết',
    rights: 'Bảo lưu mọi quyền.',
    built: 'Xây dựng với React, TypeScript và Tailwind CSS.',
  },
}

export const content: Record<Lang, Content> = { en, vi }
