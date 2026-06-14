import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import DeleteModal from '../components/DeleteModal.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../hooks/useTheme.js'

const sectionConfig = {
  hero: {
    title: 'Hero',
    mode: 'single',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'title', label: 'Title', type: 'textarea' },
      { key: 'cta', label: 'CTA Text', type: 'text' },
      { key: 'avatarUrl', label: 'Avatar (URL or Upload)', type: 'image' },
      { key: 'iconUrl', label: 'Icon (URL or Upload)', type: 'image' },
    ],
  },
  about: {
    title: 'About Me',
    mode: 'single',
    fields: [
      { key: 'bio', label: 'Bio', type: 'textarea' },
      { key: 'valuesText', label: 'Values (comma separated)', type: 'text' },
      { key: 'aboutPhotoUrl', label: 'About Photo (URL or Upload)', type: 'image' },
    ],
  },
  webProjects: {
    title: 'Web Projects',
    mode: 'list',
    fields: [
      { key: 'name', label: 'Project Name', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'techStack', label: 'Tech Stack', type: 'text' },
      { key: 'githubLink', label: 'GitHub Link', type: 'text' },
      { key: 'liveLink', label: 'Live Link', type: 'text' },
      { key: 'image', label: 'Image (URL or Upload)', type: 'image' },
    ],
    labelKey: 'name',
  },
  graphicDesignProjects: {
    title: 'Graphic Design',
    mode: 'list',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'image', label: 'Image (URL or Upload)', type: 'image' },
    ],
    labelKey: 'title',
  },
  skills: {
    title: 'Skills',
    mode: 'list',
    fields: [
      { key: 'name', label: 'Skill Name', type: 'text' },
      { key: 'icon', label: 'Icon (URL or Upload)', type: 'image' },
    ],
    labelKey: 'name',
  },
  experience: {
    title: 'Experience',
    mode: 'list',
    fields: [
      { key: 'company', label: 'Company', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'dateRange', label: 'Date Range', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
    labelKey: 'role',
  },
  certificates: {
    title: 'Certificates',
    mode: 'list',
    fields: [
      { key: 'name', label: 'Certificate Name', type: 'text' },
      { key: 'issuer', label: 'Issuer', type: 'text' },
      { key: 'date', label: 'Date', type: 'text' },
      { key: 'image', label: 'Image (URL or Upload)', type: 'image' },
    ],
    labelKey: 'name',
  },
}

function buildEmpty(fields) {
  return fields.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {})
}

const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target.result
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX_WIDTH = 800
        const MAX_HEIGHT = 800
        let width = img.width
        let height = img.height
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.7))
      }
    }
  })
}

// Dynamic styles using CSS variables for dark mode
const s = {
  page: {
    minHeight: '100vh',
    background: 'var(--bg)',
    color: 'var(--text)',
    padding: '32px',
    fontFamily: "var(--font-body), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    transition: 'background 0.4s ease, color 0.4s ease',
  },
  layout: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gap: '24px',
    gridTemplateColumns: '240px 1fr',
  },
  sidebar: {
    border: '1px solid var(--border)',
    padding: '24px',
    background: 'var(--bg)',
    transition: 'border-color 0.4s ease, background 0.4s ease',
    borderRadius: '12px',
  },
  sidebarTitle: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '16px',
    color: 'var(--text)',
  },
  sidebarEmail: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginBottom: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  navBtn: (active) => ({
    display: 'block',
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    textAlign: 'left',
    border: active ? '1px solid var(--text)' : '1px solid var(--border)',
    background: active ? 'var(--text)' : 'transparent',
    color: active ? 'var(--bg)' : 'var(--text)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    marginBottom: '8px',
    transition: 'all 0.2s ease',
  }),
  actionBtn: {
    display: 'block',
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'center',
    textDecoration: 'none',
    marginBottom: '8px',
    transition: 'border-color 0.2s ease, color 0.2s ease',
  },
  main: {
    border: '1px solid var(--border)',
    padding: '32px',
    background: 'var(--bg)',
    transition: 'border-color 0.4s ease, background 0.4s ease',
    borderRadius: '12px',
  },
  mainHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
  mainTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--text)',
  },
  newBtn: {
    padding: '10px 16px',
    fontSize: '14px',
    border: '1px solid var(--color-primary)',
    background: 'transparent',
    color: 'var(--color-primary)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    borderRadius: '8px',
    fontWeight: 500,
  },
  form: {
    marginBottom: '24px',
    padding: '24px',
    border: '1px solid var(--border)',
    display: 'grid',
    gap: '16px',
    background: 'var(--card-bg)',
    transition: 'border-color 0.4s ease, background 0.4s ease',
    borderRadius: '12px',
  },
  label: {
    fontSize: '14px',
  },
  labelText: {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-muted)',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    color: 'var(--text)',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease, background 0.2s ease',
    outline: 'none',
    borderRadius: '8px',
  },
  textarea: {
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    color: 'var(--text)',
    fontFamily: 'inherit',
    minHeight: '80px',
    resize: 'vertical',
    transition: 'border-color 0.2s ease, background 0.2s ease',
    outline: 'none',
    borderRadius: '8px',
  },
  uploadBtn: {
    padding: '8px 14px',
    fontSize: '13px',
    border: '1px solid var(--border)',
    background: 'var(--bg-secondary)',
    color: 'var(--text)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    borderRadius: '6px',
  },
  submitBtn: {
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 600,
    border: '1px solid var(--color-primary)',
    background: 'var(--color-primary)',
    color: '#ffffff',
    cursor: 'pointer',
    fontFamily: 'inherit',
    marginTop: '8px',
    transition: 'all 0.2s ease',
    borderRadius: '8px',
  },
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '16px',
    border: '1px solid var(--border)',
    marginBottom: '8px',
    background: 'var(--bg)',
    transition: 'all 0.3s ease',
    borderRadius: '10px',
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: '14px',
    color: 'var(--text)',
  },
  cardSub: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginTop: '4px',
  },
  editBtn: {
    padding: '6px 14px',
    fontSize: '13px',
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    borderRadius: '6px',
  },
  deleteBtn: {
    padding: '6px 14px',
    fontSize: '13px',
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    borderRadius: '6px',
  },
  signOutBtn: {
    display: 'block',
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid rgba(200,0,0,0.3)',
    background: 'transparent',
    color: '#e53e3e',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    borderRadius: '6px',
    marginTop: '16px',
  },
  primaryBtn: {
    padding: '8px 16px',
    fontSize: '13px',
    border: '1px solid var(--color-primary)',
    background: 'var(--color-primary)',
    color: '#ffffff',
    cursor: 'pointer',
    fontFamily: 'inherit',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
  },
}

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
}

function AdminPage() {
  const { data, replaceSection, resetData } = usePortfolio()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('webProjects')
  const [editId, setEditId] = useState(null)
  const [formState, setFormState] = useState({})
  const [deleteState, setDeleteState] = useState({ open: false, id: null, label: '' })
  const { isDark, toggleTheme } = useTheme()

  const config = sectionConfig[activeTab]
  const isSingleSection = config.mode === 'single'
  const items = isSingleSection ? [] : data[activeTab]
  const emptyState = useMemo(() => buildEmpty(config.fields), [config.fields])
  const singleSectionForm = useMemo(() => {
    if (!isSingleSection) return emptyState
    if (activeTab === 'about') {
      const aboutData = data.about || {}
      return {
        bio: aboutData.bio || '',
        valuesText: Array.isArray(aboutData.values) ? aboutData.values.join(', ') : '',
        aboutPhotoUrl: aboutData.aboutPhotoUrl || '',
      }
    }
    return { ...emptyState, ...(data[activeTab] || {}) }
  }, [activeTab, data, emptyState, isSingleSection])
  const activeForm = Object.keys(formState).length ? formState : singleSectionForm

  const setField = (key, value) => setFormState((prev) => ({ ...prev, [key]: value }))

  const handleImageUpload = async (key, file) => {
    if (!file) return
    try {
      const base64 = await compressImage(file)
      setField(key, base64)
    } catch (err) {
      console.error('Image compression failed', err)
      alert('Failed to process image')
    }
  }

  const startNew = () => {
    setEditId(null)
    setFormState(emptyState)
  }

  const startEdit = (item) => {
    setEditId(item.id)
    setFormState(item)
  }

  const saveItem = async (event) => {
    event.preventDefault()
    try {
      if (isSingleSection) {
        if (activeTab === 'about') {
          const values = (activeForm.valuesText || '').split(',').map((v) => v.trim()).filter(Boolean)
          await replaceSection('about', { bio: activeForm.bio || '', values, aboutPhotoUrl: activeForm.aboutPhotoUrl || '' })
        } else {
          await replaceSection(activeTab, activeForm)
        }
        setFormState({})
        alert('Saved!')
        return
      }
      const nextItem = { ...activeForm, id: editId || `${activeTab}-${Date.now()}` }
      const nextItems = editId ? items.map((item) => (item.id === editId ? nextItem : item)) : [nextItem, ...items]
      await replaceSection(activeTab, nextItems)
      setEditId(null)
      setFormState(emptyState)
      alert('Saved!')
    } catch (err) {
      console.error(err)
      alert('Failed to save data!')
    }
  }

  const requestDelete = (item) =>
    setDeleteState({ open: true, id: item.id, label: item[config.labelKey] || 'Untitled Item' })

  const confirmDelete = () => {
    replaceSection(activeTab, items.filter((item) => item.id !== deleteState.id))
    setDeleteState({ open: false, id: null, label: '' })
  }

  return (
    <div style={s.page}>
      <DeleteModal
        open={deleteState.open}
        label={deleteState.label}
        onCancel={() => setDeleteState({ open: false, id: null, label: '' })}
        onConfirm={confirmDelete}
      />
      <div style={s.layout}>
        <aside style={s.sidebar}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h1 style={{ ...s.sidebarTitle, marginBottom: 0 }}>Admin</h1>
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
              style={{ width: '32px', height: '32px', fontSize: '14px' }}
            >
              {isDark ? '☀' : '☾'}
            </button>
          </div>
          {user && <p style={s.sidebarEmail}>{user.email}</p>}
          <nav>
            {Object.entries(sectionConfig).map(([key, value]) => (
              <motion.button
                key={key}
                type="button"
                onClick={() => {
                  setActiveTab(key)
                  setEditId(null)
                  setFormState({})
                }}
                style={s.navBtn(activeTab === key)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {value.title}
              </motion.button>
            ))}
          </nav>
          <div style={{ marginTop: '24px' }}>
            <motion.button
              type="button"
              onClick={resetData}
              style={s.actionBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Reset to Defaults
            </motion.button>
            <Link to="/" style={s.actionBtn}>
              Back to Portfolio
            </Link>
            <motion.button
              type="button"
              onClick={async () => {
                await logout()
                navigate('/xon2-admin/login', { replace: true })
              }}
              style={s.signOutBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Out
            </motion.button>
          </div>
        </aside>

        <motion.section
          style={s.main}
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={s.mainHeader}>
            <h2 style={s.mainTitle}>{config.title}</h2>
            {!isSingleSection && (
              <motion.button
                type="button"
                style={s.newBtn}
                onClick={startNew}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                + New Item
              </motion.button>
            )}
          </div>

          <motion.form
            style={s.form}
            onSubmit={saveItem}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {config.fields.map((field) => (
              <label key={field.key} style={s.label}>
                <span style={s.labelText}>{field.label}</span>
                {field.type === 'textarea' ? (
                  <textarea
                    value={activeForm[field.key] ?? ''}
                    onChange={(event) => setField(field.key, event.target.value)}
                    style={s.textarea}
                  />
                ) : field.type === 'image' ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Paste Image URL or upload below..."
                      value={activeForm[field.key] ?? ''}
                      onChange={(event) => setField(field.key, event.target.value)}
                      style={s.input}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                      <label style={s.uploadBtn}>
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageUpload(field.key, e.target.files[0])}
                        />
                      </label>
                      {activeForm[field.key] && (
                        <img
                          src={activeForm[field.key]}
                          alt="Preview"
                          style={{ height: '40px', width: '40px', objectFit: 'cover', border: '1px solid var(--border)' }}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={activeForm[field.key] ?? ''}
                    onChange={(event) => setField(field.key, event.target.value)}
                    style={s.input}
                  />
                )}
              </label>
            ))}
            <motion.button
              type="submit"
              style={s.submitBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSingleSection ? 'Save Changes' : editId ? 'Update Item' : 'Add Item'}
            </motion.button>
          </motion.form>

          {!isSingleSection && (
            <div>
              <AnimatePresence mode="popLayout">
                {items.map((item, i) => (
                  <motion.article
                    key={item.id}
                    style={s.card}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={i}
                    layout
                    whileHover={{
                      borderColor: 'var(--text)',
                      boxShadow: '3px 3px 0 var(--text)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {activeTab === 'skills' && item.icon && (
                        <img src={item.icon} alt={item.name} style={{ height: '28px', width: '28px', objectFit: 'contain' }} />
                      )}
                      {activeTab !== 'skills' && item.image && (
                        <img
                          src={item.image}
                          alt=""
                          style={{ height: '40px', width: '56px', objectFit: 'cover', border: '1px solid var(--border)' }}
                        />
                      )}
                      <div>
                        <h3 style={s.cardTitle}>{item[config.labelKey]}</h3>
                        <p style={s.cardSub}>
                          {config.fields
                            .map((f) => f.key)
                            .filter((key) => key !== config.labelKey && key !== 'icon' && key !== 'image')
                            .map((key) => item[key])
                            .filter(Boolean)
                            .join(' \u2022 ')}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <motion.button
                        type="button"
                        style={s.editBtn}
                        onClick={() => startEdit(item)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        type="button"
                        style={s.deleteBtn}
                        onClick={() => requestDelete(item)}
                        whileHover={{ scale: 1.05, color: '#e53e3e' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Delete
                      </motion.button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.section>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 240px 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export default AdminPage
