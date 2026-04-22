import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteModal from '../components/DeleteModal.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'

const sectionConfig = {
  webProjects: {
    title: 'Web Projects',
    fields: ['name', 'description', 'techStack', 'githubLink', 'liveLink', 'image'],
    labelKey: 'name',
  },
  graphicDesignProjects: {
    title: 'Graphic Design',
    fields: ['title', 'image'],
    labelKey: 'title',
  },
  skills: {
    title: 'Skills',
    fields: ['category', 'name', 'logo', 'level'],
    labelKey: 'name',
  },
  experience: {
    title: 'Experience',
    fields: ['company', 'role', 'dateRange', 'description'],
    labelKey: 'role',
  },
  certificates: {
    title: 'Certificates',
    fields: ['name', 'issuer', 'date', 'image'],
    labelKey: 'name',
  },
}

function buildEmpty(fields) {
  return fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {})
}

function AdminPage() {
  const { data, replaceSection, resetData } = usePortfolio()
  const [activeTab, setActiveTab] = useState('webProjects')
  const [editId, setEditId] = useState(null)
  const [formState, setFormState] = useState({})
  const [deleteState, setDeleteState] = useState({ open: false, id: null, label: '' })

  const config = sectionConfig[activeTab]
  const items = data[activeTab]
  const emptyState = useMemo(() => buildEmpty(config.fields), [config.fields])
  const activeForm = Object.keys(formState).length ? formState : emptyState

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
    const nextItem = {
      ...activeForm,
      id: editId || `${activeTab}-${Date.now()}`,
      level: activeTab === 'skills' ? Number(activeForm.level || 0) : activeForm.level,
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
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-8">
      <DeleteModal
        open={deleteState.open}
        label={deleteState.label}
        onCancel={() => setDeleteState({ open: false, id: null, label: '' })}
        onConfirm={confirmDelete}
      />
      <div className="mx-auto grid w-full max-w-7xl gap-5 md:grid-cols-[16rem_1fr]">
        <aside className="rounded-xl border border-gray-300 bg-white p-4">
          <h1 className="mb-4 text-xl font-bold">Admin Panel</h1>
          <p className="mb-4 text-xs text-gray-500">Route: /admin-sp</p>
          <nav className="space-y-2">
            {Object.entries(sectionConfig).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveTab(key)
                  setEditId(null)
                  setFormState(buildEmpty(sectionConfig[key].fields))
                }}
                className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                  activeTab === key
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:bg-gray-100'
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
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm transition hover:bg-gray-100"
            >
              Reset to Defaults
            </button>
            <Link
              to="/"
              className="rounded-lg bg-black px-3 py-2 text-center text-sm text-white transition hover:bg-gray-800"
            >
              Back to Portfolio
            </Link>
          </div>
        </aside>

        <section className="rounded-xl border border-gray-300 bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{config.title}</h2>
            <button
              type="button"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100"
              onClick={startNew}
            >
              New Item
            </button>
          </div>

          <form className="mb-6 grid gap-3 rounded-xl border border-gray-300 p-4" onSubmit={saveItem}>
            {config.fields.map((field) => (
              <label key={field} className="text-sm">
                <span className="mb-1 block font-medium capitalize text-gray-700">{field}</span>
                {field === 'description' ? (
                  <textarea
                    value={activeForm[field] ?? ''}
                    onChange={(event) => setField(field, event.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
                  />
                ) : (
                  <input
                    type={field === 'level' ? 'number' : 'text'}
                    value={activeForm[field] ?? ''}
                    onChange={(event) => setField(field, event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
                  />
                )}
              </label>
            ))}
            <button
              type="submit"
              className="mt-2 rounded-lg bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800"
            >
              {editId ? 'Update Item' : 'Add Item'}
            </button>
          </form>

          <div className="space-y-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-300 p-3"
              >
                <div>
                  <h3 className="font-semibold text-black">{item[config.labelKey]}</h3>
                  <p className="text-sm text-gray-600">
                    {config.fields
                      .filter((field) => field !== config.labelKey)
                      .map((field) => item[field])
                      .filter(Boolean)
                      .join(' • ')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 px-3 py-1 text-sm transition hover:bg-gray-100"
                    onClick={() => startEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 px-3 py-1 text-sm transition hover:bg-gray-100"
                    onClick={() => requestDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminPage
