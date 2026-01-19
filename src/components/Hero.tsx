import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  staggerContainerVariants,
  staggerItemVariants,
  floatingVariants,
  pulseVariants,
  useMousePosition,
} from '../utils/animationVariants';

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const mousePosition = useMousePosition();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const words = ['beautiful UIs', 'scalable web apps', 'accessible experiences', 'pixel-perfect designs'];
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const TYPING_SPEED = 80;
  const DELETING_SPEED = 40;
  const PAUSE = 1300;

  // typing / deleting loop
  useEffect(() => {
    const full = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(full.slice(0, displayed.length + 1));
      } else {
        setDisplayed(full.slice(0, Math.max(0, displayed.length - 1)));
      }
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex]);

  // when a word finishes typing, pause then start deleting
  useEffect(() => {
    if (!isDeleting && displayed === words[wordIndex]) {
      const t = setTimeout(() => setIsDeleting(true), PAUSE);
      return () => clearTimeout(t);
    }
  }, [displayed, isDeleting, wordIndex]);

  // when deletion completes, move to next word
  useEffect(() => {
    if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }
  }, [isDeleting, displayed]);

  const { theme } = useTheme();

  const sectionBg = theme === 'dark' ? 'bg-slate-900' : theme === 'glass' ? 'bg-gradient-to-br from-white/5 via-blue-50/5 to-white/5' : 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800';

  return (
    <motion.section id="home" variants={container} initial="hidden" animate="visible" className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-16 ${sectionBg}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"></div>
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div className="text-center" variants={item}>
          <motion.h1
            variants={item}
            className={`text-5xl md:text-7xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent animate-pulse">
              Vamshi Kumar
            </span>
          </motion.h1>

          <motion.div variants={item} className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-cyan-300 animate-spin" size={24} style={{ animationDuration: '3s' }} />
            <p className={`text-xl md:text-2xl ${theme === 'dark' ? 'text-cyan-100' : 'text-cyan-700'}`}>
              MERN Stack Developer | 3+ Years
            </p>
          </motion.div>

          <motion.p variants={item} className="text-lg text-blue-100 max-w-2xl mx-auto mb-6">
            Building scalable, high-performance, and user-centric web applications with the MERN stack. Specialized in React, Next.js, Node.js, and MongoDB for end-to-end development.
          </motion.p>

          <div className="flex items-center justify-center mb-10">
            <span className="text-cyan-200 mr-3">I build</span>
            <div className="h-10">
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent inline-flex items-center">
                <span>{displayed}</span>
                <span className="ml-1 inline-block w-1 h-6 bg-cyan-300 animate-pulse" aria-hidden />
              </motion.span>
            </div>
          </div>

          <motion.div
            variants={item}
            className="flex justify-center space-x-4 mb-12"
            style={{
              transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`,
            }}
          >
            <motion.a
              href="https://github.com/akunamoni"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-2xl border border-cyan-500/30"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/vamshi-kumar-akunamonu"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-2xl border border-cyan-500/30"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="mailto:vamshikumarakunamoni@gmail.com"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-all shadow-lg hover:shadow-2xl border border-cyan-500/30"
            >
              <Mail size={24} />
            </motion.a>
          </motion.div>

          <motion.button
            whileHover={{ y: -5, boxShadow: '0 0 30px rgba(6, 182, 212, 0.8)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#about')}
            className="inline-flex items-center space-x-2 text-cyan-200 hover:text-cyan-100 transition-all border border-cyan-500 px-6 py-3 rounded-full hover:border-cyan-300 hover:bg-cyan-600/10"
          >
            <span>Explore More</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowDown size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
