import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeleteModal from '../components/DeleteModal.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const sectionConfig = {
  hero: {
    title: 'Hero',
    mode: 'single',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'title', label: 'Title', type: 'textarea' },
      { key: 'cta', label: 'CTA Text', type: 'text' },
    ],
  },
  about: {
    title: 'About Me',
    mode: 'single',
    fields: [
      { key: 'bio', label: 'Bio', type: 'textarea' },
      { key: 'valuesText', label: 'Values (comma separated)', type: 'text' },
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
      { key: 'image', label: 'Image URL', type: 'text' },
    ],
    labelKey: 'name',
  },
  graphicDesignProjects: {
    title: 'Graphic Design',
    mode: 'list',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'image', label: 'Image URL', type: 'text' },
    ],
    labelKey: 'title',
  },
  skills: {
    title: 'Skills',
    mode: 'list',
    fields: [
      { key: 'name', label: 'Skill Name', type: 'text' },
      { key: 'icon', label: 'Icon URL (e.g. devicons CDN)', type: 'text' },
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
      { key: 'image', label: 'Image URL', type: 'text' },
    ],
    labelKey: 'name',
  },
}

function buildEmpty(fields) {
  return fields.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {})
}

function AdminPage() {
  const { data, replaceSection, resetData } = usePortfolio()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('webProjects')
  const [editId, setEditId] = useState(null)
  const [formState, setFormState] = useState({})
  const [deleteState, setDeleteState] = useState({ open: false, id: null, label: '' })

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
      }
    }
    return {
      ...emptyState,
      ...(data[activeTab] || {}),
    }
  }, [activeTab, data, emptyState, isSingleSection])
  const activeForm = Object.keys(formState).length ? formState : singleSectionForm

  const setField = (key, value) => setFormState((prev) => ({ ...prev, [key]: value }))

  const startNew = () => {
    setEditId(null)
    setFormState(emptyState)
  }

  const startEdit = (item) => {
    setEditId(item.id)
    setFormState(item)
  }

  const saveItem = (event) => {
    event.preventDefault()
    if (isSingleSection) {
      if (activeTab === 'about') {
        const values = (activeForm.valuesText || '')
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean)
        replaceSection('about', {
          bio: activeForm.bio || '',
          values,
        })
      } else {
        replaceSection(activeTab, activeForm)
      }
      setFormState({})
      return
    }

    const nextItem = {
      ...activeForm,
      id: editId || `${activeTab}-${Date.now()}`,
    }
    const nextItems = editId
      ? items.map((item) => (item.id === editId ? nextItem : item))
      : [nextItem, ...items]
    replaceSection(activeTab, nextItems)
    setEditId(null)
    setFormState(emptyState)
  }

  const requestDelete = (item) =>
    setDeleteState({ open: true, id: item.id, label: item[config.labelKey] || 'Untitled Item' })

  const confirmDelete = () => {
    replaceSection(
      activeTab,
      items.filter((item) => item.id !== deleteState.id),
    )
    setDeleteState({ open: false, id: null, label: '' })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-8 text-white !cursor-auto [&_*]:!cursor-auto md:px-8">
      <DeleteModal
        open={deleteState.open}
        label={deleteState.label}
        onCancel={() => setDeleteState({ open: false, id: null, label: '' })}
        onConfirm={confirmDelete}
      />
      <div className="mx-auto grid w-full max-w-7xl gap-5 md:grid-cols-[16rem_1fr]">
        <aside className="rounded-xl border border-white/10 bg-[#141414] p-4">
          <h1 className="mb-4 text-xl font-bold text-white">Admin Panel</h1>
          {user && (
            <p className="mb-4 truncate text-xs text-gray-500" title={user.email}>
              {user.email}
            </p>
          )}
          <nav className="space-y-2">
            {Object.entries(sectionConfig).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveTab(key)
                  setEditId(null)
                  setFormState({})
                }}
                className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                  activeTab === key
                    ? 'border-white bg-white text-black'
                    : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {value.title}
              </button>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={resetData}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-400 transition hover:border-white/20 hover:text-white"
            >
              Reset to Defaults
            </button>
            <Link
              to="/"
              className="rounded-lg bg-white px-3 py-2 text-center text-sm text-black transition hover:bg-gray-200"
            >
              Back to Portfolio
            </Link>
            <button
              type="button"
              onClick={async () => {
                await logout()
                navigate('/admin-login-x7', { replace: true })
              }}
              className="rounded-lg border border-red-900/30 px-3 py-2 text-sm text-red-400 transition hover:border-red-500 hover:text-red-300"
            >
              Sign Out
            </button>
          </div>
        </aside>

        <section className="rounded-xl border border-white/10 bg-[#141414] p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">{config.title}</h2>
            {!isSingleSection && (
              <button
                type="button"
                className="rounded-lg border border-white/15 px-4 py-2 text-sm text-gray-400 transition hover:border-white hover:text-white"
                onClick={startNew}
              >
                + New Item
              </button>
            )}
          </div>

          <form className="mb-6 grid gap-3 rounded-xl border border-white/10 bg-[#0d0d0d] p-4" onSubmit={saveItem}>
            {config.fields.map((field) => (
              <label key={field.key} className="text-sm">
                <span className="mb-1 block font-medium text-gray-400">{field.label}</span>
                {field.type === 'textarea' ? (
                  <textarea
                    value={activeForm[field.key] ?? ''}
                    onChange={(event) => setField(field.key, event.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-white placeholder-gray-600 focus:border-white/30 focus:outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={activeForm[field.key] ?? ''}
                    onChange={(event) => setField(field.key, event.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-white placeholder-gray-600 focus:border-white/30 focus:outline-none"
                  />
                )}
              </label>
            ))}
            <button
              type="submit"
              className="mt-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-200"
            >
              {isSingleSection ? 'Save Changes' : editId ? 'Update Item' : 'Add Item'}
            </button>
          </form>

          {!isSingleSection && <div className="space-y-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#0d0d0d] p-3"
              >
                <div className="flex items-center gap-3">
                  {/* Show icon preview for skills, image thumbnail for others with images */}
                  {activeTab === 'skills' && item.icon && (
                    <img src={item.icon} alt={item.name} className="h-8 w-8 object-contain" />
                  )}
                  {activeTab !== 'skills' && item.image && (
                    <img src={item.image} alt="" className="h-10 w-14 rounded object-cover border border-white/10" />
                  )}
                  <div>
                    <h3 className="font-semibold text-white">{item[config.labelKey]}</h3>
                    <p className="text-sm text-gray-600">
                      {config.fields
                        .map((f) => f.key)
                        .filter((key) => key !== config.labelKey && key !== 'icon' && key !== 'image')
                        .map((key) => item[key])
                        .filter(Boolean)
                        .join(' • ')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-md border border-white/10 px-3 py-1 text-sm text-gray-400 transition hover:border-white/20 hover:text-white"
                    onClick={() => startEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-red-900/30 px-3 py-1 text-sm text-red-400 transition hover:border-red-500 hover:text-red-300"
                    onClick={() => requestDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>}
        </section>
      </div>
    </div>
  )
}

export default AdminPage
