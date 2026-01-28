import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { staggerContainerVariants, staggerItemVariants } from '../utils/animationVariants';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  const cardVariant =
    theme === 'dark'
      ? 'card bg-neutral-900 text-white'
      : theme === 'glass'
      ? 'card glass-card text-gray-900'
      : theme === 'material'
      ? 'card material-card'
      : 'card bg-white';

  const projects: Project[] = [
  {
    title: 'Books Innings – Interactive Math Learning Platform',
    description:
      'Interactive math learning platform with real-time examples and topic-wise assignments. Implemented Redux for state management to handle navigation, scoring, and progress tracking. Designed a clean, responsive UI with Tailwind CSS and added a point-based reward system to improve student engagement.',
    image:
      'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React.js', 'Redux', 'Tailwind CSS', 'UI Development', 'State Management'],
  },
  {
    title: 'Events Innings – Educational & Internship Platform',
    description:
      'Frontend platform for managing bootcamps and internship opportunities. Built responsive user interfaces for course enrollment, scheduling, contact forms, and payment flows. Efficiently managed application state using Redux to ensure a smooth and consistent user experience.',
    image:
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React.js', 'Redux', 'Tailwind CSS', 'Responsive UI', 'API Integration'],

  },
  {
    title: 'Instaread Playlist – Content Playback & Reading Platform',
    description:
      'Built a dynamic playlist feature allowing users to add, remove, and manage reading content seamlessly. Implemented automated next-article transitions and optimized UI interactions, resulting in a 30% increase in user engagement.',
    image:
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Next.js', 'Tailwind CSS', 'UI Optimization', 'User Experience'],

  },
  {
    title: 'Rate Manager – Automated Pricing & Penalty Management',
    description:
      'Frontend automation platform for managing pricing and penalty workflows based on configurable business rules. Developed reusable UI components using React and Redux and improved overall application performance by 20% through optimization techniques.',
    image:
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React.js', 'Redux', 'Tailwind CSS', 'Performance Optimization', 'Reusable Components'],
  },
];


  return (
    <motion.section
      id="projects"
      className="py-20 bg-white"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and creativity
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={staggerItemVariants}
              whileHover={{ y: -8 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300 group perspective cursor-pointer ${cardVariant}`}
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative overflow-hidden h-48"
                animate={{ rotateY: hoveredIndex === index ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex items-center justify-center space-x-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                </motion.div>
              </motion.div>

              <motion.div className="p-6" animate={{ y: hoveredIndex === index ? -5 : 0 }}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: hoveredIndex === index ? 360 : 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Star
                      size={20}
                      className={`${hoveredIndex === index ? 'fill-cyan-400 text-cyan-400' : 'text-gray-300'} transition-colors`}
                    />
                  </motion.div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                <motion.div className="flex flex-wrap gap-2" layout>
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 text-sm rounded-full border border-blue-200"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
