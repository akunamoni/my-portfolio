import { motion } from 'framer-motion';
import { Code2, Database, Cpu, Layers, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { staggerContainerVariants, staggerItemVariants, pulseVariants } from '../utils/animationVariants';

const categories = [
  { icon: Code2, title: 'Frontend', tags: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Hooks', 'Context API'] },
  { icon: Layers, title: 'State & Data', tags: ['Redux Toolkit', 'React Query', 'TanStack Query', 'Zustand'] },
  { icon: Code2, title: 'Styling', tags: ['Tailwind CSS', 'Material-UI', 'ShadCN UI', 'Styled-Components', 'Sass', 'CSS Modules'] },
  { icon: Cpu, title: 'Tools', tags: ['Git/GitHub', 'Vite', 'Webpack', 'Jest', 'React Testing Library'] },
  { icon: Zap, title: 'Cloud & DevOps', tags: ['Vercel', 'Netlify', 'AWS (S3, EC2)', 'Docker', 'Performance Optimization'] },
];

export default function Skills() {
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
      id="skills"
      className="py-20 bg-white"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">A selection of technologies and tools I use frequently.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                variants={staggerItemVariants}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-xl border border-gray-200 shadow-sm hover:border-cyan-400 transition-all cursor-pointer group ${cardVariant}`}
              >
                <motion.div
                  className="flex items-center mb-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-md flex items-center justify-center mr-3 group-hover:shadow-lg"
                    animate={pulseVariants.animate}
                    initial={pulseVariants.initial}
                  >
                    <Icon className="text-white" size={20} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900">{c.title}</h3>
                </motion.div>
                <motion.div className="flex flex-wrap gap-2">
                  {c.tags.map((t, idx) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgb(6, 182, 212)' }}
                      transition={{ delay: idx * 0.05 }}
                      className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full border border-blue-100 hover:text-white transition-all cursor-pointer"
                    >
                      {t}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
