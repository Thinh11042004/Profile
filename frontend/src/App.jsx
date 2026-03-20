import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Plus,
  Trash2,
  Settings,
  X,
  Code,
  Layers,
  User,
  Cpu,
  Mail,
  Phone,
  MapPin,
  Send
} from 'lucide-react';

const avatarPlaceholder = "https://avatars.githubusercontent.com/u/140335803?s=400&u=72c1479844fb1d969c57417ba730833aeb20de38&v=4";

const API_BASE = '/api';

const App = () => {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true); // Defaulted to true so the user can easily see the Add buttons
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'skill' or 'project'
  const [formData, setFormData] = useState({});
  const [contactData, setContactData] = useState({ name: '', email: '', content: '' });
  const [contactStatus, setContactStatus] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [skillsRes, projectsRes] = await Promise.all([
        axios.get(`${API_BASE}/skills`),
        axios.get(`${API_BASE}/projects`),
      ]);
      setSkills(skillsRes.data);
      setProjects(projectsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'skill') {
        const payload = { ...formData, level: parseInt(formData.level) };
        if (formData.id) {
          await axios.put(`${API_BASE}/skills/${formData.id}`, payload);
        } else {
          await axios.post(`${API_BASE}/skills`, payload);
        }
      } else {
        if (formData.id) {
          await axios.put(`${API_BASE}/projects/${formData.id}`, formData);
        } else {
          await axios.post(`${API_BASE}/projects`, formData);
        }
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleDelete = async (type, id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`${API_BASE}/${type}s/${id}`);
        fetchData();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('submitting');
    try {
      await axios.post(`${API_BASE}/messages`, contactData);
      setContactStatus('success');
      setContactData({ name: '', email: '', content: '' });
      setTimeout(() => setContactStatus(''), 3000);
    } catch (err) {
      console.error('Contact submit error:', err);
      setContactStatus('error');
    }
  };

  const openForm = (type, data = {}) => {
    setModalType(type);
    setFormData(data);
    setShowModal(true);
  };

  const AnimationVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem 0', alignItems: 'center' }}>
        <h2 className="gradient-text" style={{ fontSize: '1.8rem', fontWeight: 800 }}>TRUONG THINH</h2>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#about" style={{ color: 'white', textDecoration: 'none' }}>About</a>
          <a href="#education" style={{ color: 'white', textDecoration: 'none' }}>Education</a>
          <a href="#skills" style={{ color: 'white', textDecoration: 'none' }}>Skills</a>
          <a href="#projects" style={{ color: 'white', textDecoration: 'none' }}>Projects</a>
          <a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="glass"
            style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', color: 'white' }}
          >
            <Settings size={20} className={isAdmin ? 'gradient-text' : ''} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <motion.div variants={AnimationVariants} initial="hidden" whileInView="visible">
          <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Software Engineering Student</h3>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '2rem' }}>
            Hi, I'm <span className="gradient-text">Nguyen Truong Thinh</span>.
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Final-year software engineering student with hands-on experience building full-stack web applications using React.js, Node.js/NestJS, and PostgreSQL through university projects. Seeking an internship as a backend developer or IT Business Analyst.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><MapPin size={18} /> Ho Chi Minh City</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><Phone size={18} /> 0372513965</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><Mail size={18} /> <a href="mailto:nguyentruongthinh11042004.harry@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none' }}>nguyentruongthinh1104...</a></div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#projects" className="glass" style={{ padding: '1rem 2rem', color: 'white', fontWeight: 600, background: 'var(--primary)', textDecoration: 'none', display: 'inline-block' }}>View Projects</a>
            <a href="https://github.com/Thinh11042004" target="_blank" rel="noreferrer" className="glass" style={{ padding: '1rem 2rem', color: 'white', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Github size={20} /> GitHub</a>
          </div>
        </motion.div>

        <motion.div
          className="float"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative' }}
        >
          <div className="glass" style={{ padding: '1rem', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
            {/* The user can replace this placeholder with their own image URL or local file path later */}
            <img src={avatarPlaceholder} alt="Truong Thinh" style={{ width: '80%', borderRadius: '50%', border: '4px solid var(--primary)' }} />
          </div>
          {/* Decorative bits */}
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(50px)', opacity: 0.5 }}></div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section id="education" className="section">
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>My <span className="gradient-text">Education.</span></h2>
          <p style={{ color: 'var(--text-muted)' }}>Academic background and qualifications.</p>
        </div>
        <div className="glass" style={{ padding: '2rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Ho Chi Minh University of Technology</h3>
            <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '0.5rem' }}>Bachelor of Science in Information Technology (Major in Software Engineering)</p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Cumulative GPA: <span style={{ color: 'white' }}>3.33/4.0</span></p>
            <p style={{ color: 'var(--text-muted)' }}>Relevant Courses: Software Engineering, Web Development, Database Systems, OOP.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Ho Chi Minh City, Vietnam</p>
            <p style={{ color: 'var(--text-muted)' }}>Expected June 2026</p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>Technical <span className="gradient-text">Core.</span></h2>
            <p style={{ color: 'var(--text-muted)' }}>Languages and Frameworks I've mastered.</p>
          </div>
          {
            isAdmin && (
              <button className="glass" onClick={() => openForm('skill')} style={{ padding: '1rem', color: 'white' }}>
                <Plus size={24} />
              </button>
            )
          }
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              className="glass"
              whileHover={{ y: -10, borderColor: 'var(--primary)' }}
              style={{ padding: '2rem', textAlign: 'left', position: 'relative' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div className="gradient-text">
                  {skill.type === 'language' ? <Code size={32} /> : <Layers size={32} />}
                </div>
                {isAdmin && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openForm('skill', skill)} style={{ background: 'none', border: 'none', color: 'white' }}><Settings size={18} /></button>
                    <button onClick={() => handleDelete('skill', skill.id)} style={{ background: 'none', border: 'none', color: '#ef4444' }}><Trash2 size={18} /></button>
                  </div>
                )}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{skill.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{skill.type}</p>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}
                />
              </div>
              <span style={{ fontSize: '0.8rem', marginTop: '0.5rem', display: 'block', textAlign: 'right', color: 'var(--text-muted)' }}>{skill.level}%</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>Featured <span className="gradient-text">Projects.</span></h2>
            <p style={{ color: 'var(--text-muted)' }}>Real-world applications and open-source contributions.</p>
          </div>
          {
            isAdmin && (
              <button className="glass" onClick={() => openForm('project')} style={{ padding: '1rem', color: 'white' }}>
                <Plus size={24} />
              </button>
            )
          }
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
          {projects.map((proj) => (
            <motion.div
              key={proj.id}
              className="glass"
              whileHover={{ scale: 1.02 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ height: '220px', background: 'rgba(255,255,255,0.05)', position: 'relative' }}>
                {proj.imageUrl ? (
                  <img src={proj.imageUrl} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Cpu size={64} style={{ opacity: 0.1 }} />
                  </div>
                )}
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                  {proj.repoUrl && (
                    <a href={proj.repoUrl} target="_blank" className="glass" style={{ padding: '0.5rem', color: 'white' }}><Github size={20} /></a>
                  )}
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" className="glass" style={{ padding: '0.5rem', color: 'white' }}><ExternalLink size={20} /></a>
                  )}
                </div>
              </div>
              <div style={{ padding: '2rem', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.6rem' }}>{proj.title}</h3>
                  {isAdmin && (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => openForm('project', proj)} style={{ background: 'none', border: 'none', color: 'white' }}><Settings size={18} /></button>
                      <button onClick={() => handleDelete('project', proj.id)} style={{ background: 'none', border: 'none', color: '#ef4444' }}><Trash2 size={18} /></button>
                    </div>
                  )}
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>{proj.description}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {proj.tags?.map((tag, idx) => (
                    <span key={idx} style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.08)', borderRadius: '20px', color: 'var(--primary)' }}>#{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>Leave a <span className="gradient-text">Message.</span></h2>
          <p style={{ color: 'var(--text-muted)' }}>Feel free to reach out to me for any opportunities or collaborations.</p>
        </div>
        <div className="glass" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
          {contactStatus === 'success' ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>Message Sent Successfully!</h3>
              <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. I will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={contactData.name}
                onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'white', outline: 'none' }}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={contactData.email}
                onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'white', outline: 'none' }}
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                required
                value={contactData.content}
                onChange={(e) => setContactData({ ...contactData, content: e.target.value })}
                style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'white', resize: 'vertical', outline: 'none' }}
              ></textarea>
              <button
                type="submit"
                disabled={contactStatus === 'submitting'}
                style={{ padding: '1rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', fontWeight: 700, borderRadius: '8px', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: contactStatus === 'submitting' ? 'not-allowed' : 'pointer', opacity: contactStatus === 'submitting' ? 0.7 : 1 }}
              >
                {contactStatus === 'submitting' ? 'Sending...' : 'Send Message'} <Send size={20} />
              </button>
              {contactStatus === 'error' && (
                <p style={{ color: '#ef4444', textAlign: 'center', marginTop: '1rem' }}>Failed to send message. Please try again later.</p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* Footer */}

      <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border-glass)', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>© {new Date().getFullYear()} - Designed by AI for a Future Tech Leader.</p>
      </footer>

      {/* CRUD Modal */}
      <AnimatePresence>
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, zindex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass"
              style={{ width: '90%', maxWidth: '600px', padding: '3rem', position: 'relative' }}
            >
              <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'white' }}>
                <X size={24} />
              </button>
              <h2 style={{ marginBottom: '2rem' }}>{formData.id ? 'Edit' : 'Add'} {modalType}</h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {modalType === 'skill' ? (
                  <>
                    <input
                      placeholder="Skill Name (e.g. React)"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <select
                      value={formData.type || 'language'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="language">Language</option>
                      <option value="framework">Framework</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Level (0-100)"
                      value={formData.level || ''}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      required
                    />
                  </>
                ) : (
                  <>
                    <input
                      placeholder="Project Title"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                    <textarea
                      placeholder="Description"
                      rows="4"
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                    <input
                      placeholder="Image URL"
                      value={formData.imageUrl || ''}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                    <input
                      placeholder="GitHub Link"
                      value={formData.repoUrl || ''}
                      onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                    />
                    <input
                      placeholder="Live Demo Link"
                      value={formData.liveUrl || ''}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    />
                    <input
                      placeholder="Tags (comma separated)"
                      value={formData.tags?.join(', ') || ''}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })}
                    />
                  </>
                )}
                <button type="submit" style={{ padding: '1rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', fontWeight: 700, borderRadius: '10px', marginTop: '1rem' }}>
                  Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        :root {
          --primary: #8b5cf6;
          --secondary: #ec4899;
          --text-muted: #94a3b8;
        }
        @media (max-width: 768px) {
          #about { grid-template-columns: 1fr; text-align: center; }
          h1 { font-size: 3rem !important; }
        }
      `}</style>
    </div>
  );
};

export default App;
