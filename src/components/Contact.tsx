import { Github, Linkedin, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { fadeInUpVariants } from '../utils/animationVariants';
import emailjs from '@emailjs/browser';

// Read EmailJS config from Vite env (VITE_ prefixed)
const EMAILJS_SERVICE_ID = (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) || 'your_service_id';
const EMAILJS_TEMPLATE_ID = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) || 'your_template_id';
const EMAILJS_PUBLIC_KEY = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string) || 'your_public_key';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        message,
      };

      const res = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      if (res.status === 200) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const { theme } = useTheme();
  const formVariant =
    theme === 'dark'
      ? 'card bg-neutral-800 text-white'
      : theme === 'glass'
      ? 'card glass-card text-gray-900'
      : theme === 'material'
      ? 'card material-card'
      : 'card bg-white';

  return (
    <motion.section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Have a project in mind or just want to chat? Send a message and I'll get back to you.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`${formVariant} p-8 rounded-2xl border border-gray-200`}
        >
          <div className="grid grid-cols-1 gap-4">
            <motion.input
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileFocus={{ scale: 1.02, boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500 transition-all"
            />
            <motion.input
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileFocus={{ scale: 1.02, boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500 transition-all"
            />
            <motion.textarea
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileFocus={{ scale: 1.02, boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="Message"
              className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-cyan-500 transition-all resize-none"
            />

            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-md shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                      <Send size={20} />
                    </motion.div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>

              <motion.div className="text-sm">
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-green-600 flex items-center gap-2"
                  >
                    <CheckCircle size={20} />
                    Message sent!
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-600 flex items-center gap-2"
                  >
                    <AlertCircle size={20} />
                    Error. Try again.
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.form>

        <motion.div
          className="mt-8 text-center text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="mb-4">Or connect on social & reach out directly:</p>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center space-x-4">
              <motion.a
                href="https://github.com/akunamoni"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.4 }}
                className="text-gray-600 hover:text-blue-600 p-3 rounded-full border border-gray-300 hover:border-blue-600 transition-all"
                title="GitHub"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/vamshi-kumar-akunamonu"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.4 }}
                className="text-gray-600 hover:text-blue-600 p-3 rounded-full border border-gray-300 hover:border-blue-600 transition-all"
                title="LinkedIn"
              >
                <Linkedin size={24} />
              </motion.a>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <a href="tel:+917386526988" className="hover:text-blue-600 transition-colors">
                📱 +91-7386526988
              </a>
              <a href="mailto:vamshikumarakunamoni@gmail.com" className="hover:text-blue-600 transition-colors">
                ✉️ vamshikumarakunamoni@gmail.com
              </a>
              <p>📍 Hyderabad</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.footer
        className="mt-20 pt-8 border-t border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">© 2024-2025 Vamshi Kumar. MERN Stack Developer | Built with React, Tailwind CSS & Framer Motion</p>
        </div>
      </motion.footer>
    </motion.section>
  );
}
