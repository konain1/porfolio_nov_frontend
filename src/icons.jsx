import {
  SiReact, SiJavascript, SiTailwindcss, SiTypescript, SiNextdotjs,
  SiNodedotjs, SiMongodb, SiGit, SiFigma,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import {
  FaLaptopCode, FaMobileScreen, FaPenRuler, FaGaugeHigh,
  FaGraduationCap, FaBriefcase, FaHandshake,
  FaLinkedinIn, FaGithub, FaXTwitter, FaInstagram, FaWhatsapp,
} from 'react-icons/fa6';

export const skillIcons = {
  react: { Icon: SiReact, color: '#61dafb' },
  javascript: { Icon: SiJavascript, color: '#f7df1e' },
  tailwind: { Icon: SiTailwindcss, color: '#38bdf8' },
  typescript: { Icon: SiTypescript, color: '#3178c6' },
  nextjs: { Icon: SiNextdotjs, color: 'var(--text)' },
  reactnative: { Icon: TbBrandReactNative, color: '#61dafb' },
  node: { Icon: SiNodedotjs, color: '#5fa04e' },
  mongodb: { Icon: SiMongodb, color: '#47a248' },
  git: { Icon: SiGit, color: '#f05032' },
  figma: { Icon: SiFigma, color: '#f24e1e' },
};

export const serviceIcons = {
  web: FaLaptopCode,
  mobile: FaMobileScreen,
  design: FaPenRuler,
  speed: FaGaugeHigh,
};

export const experienceIcons = {
  work: FaBriefcase,
  freelance: FaHandshake,
  education: FaGraduationCap,
};

export const socialIcons = {
  linkedin: { Icon: FaLinkedinIn, label: 'LinkedIn' },
  github: { Icon: FaGithub, label: 'GitHub' },
  twitter: { Icon: FaXTwitter, label: 'X (Twitter)' },
  instagram: { Icon: FaInstagram, label: 'Instagram' },
  whatsapp: { Icon: FaWhatsapp, label: 'WhatsApp' },
};
