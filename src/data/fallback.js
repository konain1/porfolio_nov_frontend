// Bundled copy of backend/src/seed/data.js — shown while the API loads or if it is unreachable.

const data = {
  profile: {
    name: 'Kaunain Kasab',
    role: 'Frontend Developer',
    intro:
      'I design and build modern, responsive websites and mobile apps that look great, load fast and help businesses grow. Have an idea? Let’s turn it into a real product.',
    aboutTitle: 'Turning Ideas Into',
    aboutHighlight: 'Digital Reality',
    about:
      'I’m a frontend developer based in Delhi with an MCA and BCA from Lovely Professional University. Since January 2022 I’ve been building production interfaces at Proveway, and I also work as a freelancer with Sun-Bean. I help founders, startups and small businesses go from idea to a polished website or mobile app — clean code, smooth user experience and on-time delivery.',
    email: 'kaunainkasab@gmail.com',
    phone: '+91 80707 40009',
    location: 'Delhi, India',
    careerStart: '2022-01-01',
    available: true,
    avatar: '', // e.g. '/avatar.png' — put the image in frontend/public
    resumeUrl: '/resume.pdf', // put your CV in frontend/public/resume.pdf
    stats: [
      { value: 'auto', label: 'Years' }, // "auto" = calculated from careerStart
      { value: '10+', label: 'Projects' },
      { value: '100%', label: 'Dedication' },
    ],
    socials: {
      whatsapp: 'https://wa.me/918070740009',
      linkedin: '',
      github: '',
      twitter: '',
      instagram: '',
    },
  },

  services: [
    {
      title: 'Website Development',
      description: 'Fast, SEO-friendly business websites, landing pages and web apps built with React and Next.js.',
      icon: 'web',
    },
    {
      title: 'Mobile App Development',
      description: 'Cross-platform Android & iOS apps with React Native — one codebase, native feel.',
      icon: 'mobile',
    },
    {
      title: 'UI / UX to Code',
      description: 'Pixel-perfect, responsive conversion of your Figma or XD designs into clean, reusable components.',
      icon: 'design',
    },
    {
      title: 'Speed & Maintenance',
      description: 'Performance tuning, bug fixes, new features and ongoing support for your existing product.',
      icon: 'speed',
    },
  ],

  experience: [
    { kind: 'work', title: 'Frontend Developer', org: 'Proveway', period: 'Jan 2022 – Present', badge: 'Full-time', icon: 'work' },
    { kind: 'work', title: 'Freelance Developer', org: 'Sun-Bean', period: 'Ongoing', badge: 'Freelance', icon: 'freelance' },
    { kind: 'education', title: 'MCA — Master of Computer Applications', org: 'Lovely Professional University', period: 'Post-graduation', badge: 'Degree', icon: 'education' },
    { kind: 'education', title: 'BCA — Bachelor of Computer Applications', org: 'Lovely Professional University', period: 'Graduation', badge: 'Degree', icon: 'education' },
  ],

  skills: [
    { name: 'React.js', level: 95, icon: 'react' },
    { name: 'JavaScript', level: 92, icon: 'javascript' },
    { name: 'Tailwind CSS', level: 90, icon: 'tailwind' },
    { name: 'TypeScript', level: 85, icon: 'typescript' },
    { name: 'Next.js', level: 87, icon: 'nextjs' },
    { name: 'React Native', level: 82, icon: 'reactnative' },
    { name: 'Node.js & Express', level: 78, icon: 'node' },
    { name: 'MongoDB', level: 75, icon: 'mongodb' },
    { name: 'Git & GitHub', level: 88, icon: 'git' },
  ],

  // Sample projects — replace with your real work (title, links, tech, image).
  projects: [
    {
      title: 'ShopNest',
      subtitle: 'E-commerce Store',
      description: 'Full-stack online store with cart, checkout and an admin panel.',
      category: 'web',
      tech: ['React', 'Node.js', 'MongoDB'],
      color: '#8b5cf6',
      liveUrl: '',
      githubUrl: '',
    },
    {
      title: 'Insightly',
      subtitle: 'Admin Dashboard',
      description: 'Analytics dashboard with charts, tables, filters and dark mode.',
      category: 'web',
      tech: ['React', 'Tailwind', 'Chart.js'],
      color: '#6366f1',
      liveUrl: '',
      githubUrl: '',
    },
    {
      title: 'FitPulse',
      subtitle: 'Fitness Mobile App',
      description: 'Workout tracker with plans, progress charts and reminders.',
      category: 'mobile',
      tech: ['React Native', 'Expo'],
      color: '#ec4899',
      liveUrl: '',
      githubUrl: '',
    },
    {
      title: 'Wanderly',
      subtitle: 'Travel Website',
      description: 'Tour booking website with search, packages and enquiries.',
      category: 'web',
      tech: ['Next.js', 'Tailwind'],
      color: '#06b6d4',
      liveUrl: '',
      githubUrl: '',
    },
    {
      title: 'FoodieHub',
      subtitle: 'Food Ordering App',
      description: 'Restaurant ordering app with menu, cart and live order status.',
      category: 'mobile',
      tech: ['React Native', 'Firebase'],
      color: '#f59e0b',
      liveUrl: '',
      githubUrl: '',
    },
    {
      title: 'Bloom Studio',
      subtitle: 'Agency Landing Page',
      description: 'Animated, conversion-focused landing page for a creative agency.',
      category: 'web',
      tech: ['React', 'GSAP'],
      color: '#10b981',
      liveUrl: '',
      githubUrl: '',
    },
  ],
};

export default data;
