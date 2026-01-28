import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { slideInFromLeftVariants, slideInFromRightVariants } from '../utils/animationVariants';

export default function About() {
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
      id="about"
      className="py-20 bg-white"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={slideInFromLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full flex items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-30 blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <img
                src="/photo.jpeg"
                alt="A Vamshi Kumar - Frontend Developer"
                className="w-72 h-72 object-cover rounded-2xl shadow-2xl border-4 border-white/10 relative z-10"
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideInFromRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={`${cardVariant} p-6 rounded-2xl`}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-900' : 'text-gray-900'}`}
              >
                About Me
              </motion.h2>
              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mb-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-600'}`}
              >
                I am a Frontend Developer with 3+ years of professional experience in building modern, responsive, and scalable user interfaces. I specialize in React.js, Next.js, JavaScript (ES6+), and Tailwind CSS, with a strong focus on performance, accessibility, and clean component architecture.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-600'}`}
              >
                I have hands-on experience converting Figma designs into pixel-perfect UI, integrating REST APIs, and optimizing applications using memoization, lazy loading, and code splitting. I enjoy collaborating in Agile teams and delivering production-ready frontend solutions.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
