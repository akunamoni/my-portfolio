import { Briefcase, Calendar, CheckCircle, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { staggerItemVariants } from '../utils/animationVariants';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      title: 'Software Developer',
      company: 'Innings2 Pvt Ltd',
      period: 'Aug 2023 - May 2025',
      description: 'Developed full-stack enterprise-grade web applications using MERN stack, implementing state management and performance optimization.',
      achievements: [
        'Developed full-stack enterprise-grade web applications using MERN stack (MongoDB, Express.js, React.js, Node.js)',
        'Implemented state management with Redux Toolkit and data fetching with React Query, improving page load performance',
        'Optimized applications with code splitting, lazy loading, and image optimization, achieving high Lighthouse scores',
        'Built and maintained reusable component libraries adopted across projects',
        'Mentored junior developers and led sessions on MERN best practices',
      ],
    },
    {
      title: 'Product Developer',
      company: 'Caddy Code Solutions Pvt Ltd',
      period: 'Jun 2022 - Jun 2023',
      description: 'Designed and implemented full-stack features, converting designs into responsive UIs with React and backend APIs.',
      achievements: [
        'Designed and implemented full-stack features, converting Figma designs into responsive UIs with React.js',
        'Integrated REST APIs with Axios and developed secure JWT-based authentication flows on Node.js',
        'Optimized rendering performance using useMemo, useCallback, and React.memo, reducing re-renders by ~35%',
        'Built complex features like real-time dashboards, multi-step forms, and data tables with filtering and pagination',
        'Participated in code reviews to maintain high-quality standards across frontend and backend',
      ],
    },
    {
      title: 'Web Developer Intern',
      company: 'Caddy Code Solutions Pvt Ltd',
      period: 'Jan 2022 - May 2022',
      description: 'Implemented interactive full-stack features and UI enhancements using React.js and Node.js.',
      achievements: [
        'Implemented interactive full-stack features and UI enhancements using React.js and Node.js basics',
        'Translated Figma/XD designs into pixel-perfect responsive components',
        'Resolved frontend-backend integration issues and gained hands-on experience with modern web development',
        'Earned Bright Beginner Award from Caddy Code for outstanding performance',
      ],
    },
  ];

  const { theme } = useTheme();
  const cardVariant =
    theme === 'dark'
      ? 'card bg-neutral-800 text-white'
      : theme === 'glass'
      ? 'card glass-card text-gray-900'
      : theme === 'material'
      ? 'card material-card'
      : 'card bg-white';

  return (
    <motion.section
      id="experience"
      className="py-20 bg-white"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">My professional journey and the amazing companies I've worked with</p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 via-cyan-600 to-blue-600 hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />

          <motion.div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={staggerItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <motion.div
                  className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full items-center justify-center shadow-lg z-10"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Trophy className="text-white" size={28} />
                </motion.div>

                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`rounded-xl p-6 transition-all duration-300 border border-gray-200 hover:border-blue-300 group ${cardVariant}`}
                  >
                    <div className="flex md:hidden items-center mb-4">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mr-4"
                        whileHover={{ rotate: 180 }}
                      >
                        <Trophy className="text-white" size={20} />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center text-blue-600 text-sm font-medium"
                      >
                        <Calendar size={16} className="mr-2" />
                        {exp.period}
                      </motion.div>
                    </div>

                    <div className="hidden md:flex items-center justify-end text-blue-600 text-sm font-medium mb-2">
                      {index % 2 === 0 && (
                        <>
                          <Calendar size={16} className="mr-2" />
                          {exp.period}
                        </>
                      )}
                    </div>

                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors"
                    >
                      {exp.title}
                    </motion.h3>
                    <motion.h4
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-lg font-semibold text-cyan-600 mb-3"
                    >
                      {exp.company}
                    </motion.h4>

                    <div className="hidden md:flex items-center justify-start text-blue-600 text-sm font-medium mb-2">
                      {index % 2 !== 0 && (
                        <>
                          <Calendar size={16} className="mr-2" />
                          {exp.period}
                        </>
                      )}
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-600 mb-4"
                    >
                      {exp.description}
                    </motion.p>

                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: index % 2 === 0 ? 10 : -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-start text-gray-700 text-sm"
                        >
                          <motion.span
                            className="inline-block w-2 h-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mr-3 mt-1.5 flex-shrink-0"
                            whileHover={{ scale: 1.5 }}
                          />
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
