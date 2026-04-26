import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCollectionData, useConfig } from '../hooks/usePortfolioData.js'
import { createItem, editItem, removeItem, saveConfig, uploadImage } from '../lib/firebaseCrud.js'

const tabs = ['profile', 'skills', 'projects', 'experience', 'certificates', 'about']

function SectionWrap({ title, children }) {
  return (
    <section
      className="rounded-2xl border p-6 shadow-[0_10px_50px_rgba(0,0,0,0.12)]"
      style={{ borderColor: 'var(--border)', background: 'var(--card-bg)' }}
    >
      <h2 className="mb-5 text-xl font-semibold tracking-wide">{title}</h2>
      {children}
    </section>
  )
}

function Input(props) {
  const { className = '', ...rest } = props
  return (
    <input
      {...rest}
      className={`rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:border-white/30 ${className}`}
      style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
    />
  )
}

function Area(props) {
  const { className = '', ...rest } = props
  return (
    <textarea
      {...rest}
      className={`rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:border-white/30 ${className}`}
      style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
    />
  )
}

function PrimaryButton({ children, ...props }) {
  const { className = '', ...rest } = props
  return (
    <button
      {...rest}
      className={`rounded-xl px-3 py-2.5 text-sm font-medium transition hover:opacity-90 ${className}`}
      style={{ background: 'var(--accent)', color: 'var(--bg)' }}
    >
      {children}
    </button>
  )
}

function UploadField({ label, onSelect, previewUrl, busy }) {
  const [fileName, setFileName] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  const handleFile = (file) => {
    if (!file) return
    setFileName(file.name)
    onSelect(file)
  }

  return (
    <div
      className="group cursor-pointer rounded-2xl border p-4 transition"
      style={{
        borderColor: isDragging ? 'var(--accent)' : 'var(--border)',
        background: 'var(--bg-secondary)',
      }}
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragging(true)
      }}
      onDragEnter={(event) => {
        event.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={(event) => {
        event.preventDefault()
        setIsDragging(false)
      }}
      onDrop={(event) => {
        event.preventDefault()
        setIsDragging(false)
        handleFile(event.dataTransfer.files?.[0])
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium">{label}</p>
        <span className="rounded-full border px-2.5 py-1 text-xs" style={{ borderColor: 'var(--border)' }}>
          {busy ? 'Uploading...' : 'Choose file'}
        </span>
      </div>
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        Drag & drop or click. PNG/JPG/WebP recommended.
      </p>
      {fileName && (
        <p className="mt-2 truncate text-xs" style={{ color: 'var(--text-muted)' }}>
          {fileName}
        </p>
      )}
      {previewUrl && (
        <img
          src={previewUrl}
          alt={label}
          className="mt-3 h-28 w-full rounded-xl object-cover"
          loading="lazy"
        />
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0])
        }}
      />
    </div>
  )
}

function Admin() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('profile')
  const [busy, setBusy] = useState(false)
  const config = useConfig()
  const skills = useCollectionData('skills')
  const projects = useCollectionData('projects')
  const experience = useCollectionData('experience')
  const certificates = useCollectionData('certificates')

  const [profile, setProfile] = useState({})
  const [about, setAbout] = useState({})
  const [skillForm, setSkillForm] = useState({ iconName: 'SiReact', label: '' })
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: 'graphic',
    tags: '',
    link: '',
    featured: true,
    imageUrl: '',
  })
  const [experienceForm, setExperienceForm] = useState({ yearRange: '', company: '', role: '', description: '' })
  const [certificateForm, setCertificateForm] = useState({ title: '', issuer: '', date: '', link: '', imageUrl: '' })

  const withUpload = async (file, folder, setter, key) => {
    if (!file) return
    setBusy(true)
    const url = await uploadImage(file, folder)
    setter((prev) => ({ ...prev, [key]: url }))
    setBusy(false)
  }

  const saveProfile = async () => saveConfig({ ...config, ...profile })
  const saveAbout = async () => saveConfig({ ...config, ...about })

  return (
    <main className="section-wrap border-t-0 !pt-28">
      <div className="container grid gap-6 md:grid-cols-[260px_1fr]">
        <aside
          className="h-fit rounded-2xl border p-4 shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
          style={{ borderColor: 'var(--border)', background: 'var(--card-bg)' }}
        >
          <p className="mb-1 text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
            Dashboard
          </p>
          <p className="mb-4 text-2xl" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            SOLKINGS Admin
          </p>
          <div className="grid gap-2.5">
            {tabs.map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className="rounded-xl border px-3 py-2.5 text-left text-sm capitalize transition"
                style={{
                  borderColor: tab === item ? 'transparent' : 'var(--border)',
                  background: tab === item ? 'var(--accent)' : 'transparent',
                  color: tab === item ? 'var(--bg)' : 'var(--text)',
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            onClick={async () => {
              await logout()
              navigate('/admin/login')
            }}
            className="mt-5 w-full rounded-xl border px-3 py-2.5 text-sm"
            style={{ borderColor: 'var(--border)' }}
          >
            Sign out
          </button>
        </aside>
        <div className="space-y-5">
          {tab === 'profile' && (
            <SectionWrap title="Profile / Hero">
              <div className="grid gap-3">
                <Input value={profile.name ?? config.name ?? ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Name" />
                <Input value={profile.role ?? config.role ?? ''} onChange={(e) => setProfile({ ...profile, role: e.target.value })} placeholder="Role" />
                <Area value={profile.heroTagline ?? config.heroTagline ?? ''} onChange={(e) => setProfile({ ...profile, heroTagline: e.target.value })} placeholder="Tagline" rows={3} />
                <div className="grid gap-3 md:grid-cols-2">
                  <UploadField
                    label="Avatar Image"
                    busy={busy}
                    previewUrl={profile.avatarUrl ?? config.avatarUrl}
                    onSelect={(file) => withUpload(file, 'config', setProfile, 'avatarUrl')}
                  />
                  <UploadField
                    label="Hero Pattern Image"
                    busy={busy}
                    previewUrl={profile.iconUrl ?? config.iconUrl}
                    onSelect={(file) => withUpload(file, 'config', setProfile, 'iconUrl')}
                  />
                </div>
                <PrimaryButton onClick={saveProfile} disabled={busy}>Save Profile</PrimaryButton>
              </div>
            </SectionWrap>
          )}

          {tab === 'about' && (
            <SectionWrap title="About">
              <div className="grid gap-3">
                <Area value={about.aboutBio ?? config.aboutBio ?? ''} onChange={(e) => setAbout({ ...about, aboutBio: e.target.value })} placeholder="Bio" rows={4} />
                <UploadField
                  label="About Photo"
                  busy={busy}
                  previewUrl={about.aboutPhotoUrl ?? config.aboutPhotoUrl}
                  onSelect={(file) => withUpload(file, 'about', setAbout, 'aboutPhotoUrl')}
                />
                <PrimaryButton onClick={saveAbout} disabled={busy}>Save About</PrimaryButton>
              </div>
            </SectionWrap>
          )}

          {tab === 'skills' && (
            <SectionWrap title="Skills">
              <div className="flex gap-2">
                <Input value={skillForm.iconName} onChange={(e) => setSkillForm({ ...skillForm, iconName: e.target.value })} placeholder="iconName" />
                <Input value={skillForm.label} onChange={(e) => setSkillForm({ ...skillForm, label: e.target.value })} placeholder="label" />
                <PrimaryButton onClick={() => createItem('skills', skillForm)}>Add</PrimaryButton>
              </div>
              <div className="mt-4 grid gap-2">
                {skills.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl border px-3 py-2.5" style={{ borderColor: 'var(--border)' }}>
                    <p>{item.iconName} · {item.label}</p>
                    <button onClick={() => removeItem('skills', item.id)} className="text-sm text-red-400">Delete</button>
                  </div>
                ))}
              </div>
            </SectionWrap>
          )}

          {tab === 'projects' && (
            <SectionWrap title="Projects">
              <div className="grid gap-2 md:grid-cols-2">
                <Input value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} placeholder="title" />
                <Input value={projectForm.category} onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })} placeholder="graphic/web" />
                <Area value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} placeholder="description" className="md:col-span-2" rows={3} />
                <Input value={projectForm.tags} onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })} placeholder="tags comma separated" className="md:col-span-2" />
                <Input value={projectForm.link} onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })} placeholder="link" className="md:col-span-2" />
                <label className="text-sm">Featured <input type="checkbox" checked={projectForm.featured} onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })} /></label>
                <UploadField
                  label="Project Thumbnail"
                  busy={busy}
                  previewUrl={projectForm.imageUrl}
                  onSelect={(file) => withUpload(file, 'projects', setProjectForm, 'imageUrl')}
                />
                <PrimaryButton onClick={() => createItem('projects', { ...projectForm, tags: projectForm.tags.split(',').map((v) => v.trim()).filter(Boolean) })} className="md:col-span-2">Add project</PrimaryButton>
              </div>
              <div className="mt-4 grid gap-2">
                {projects.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl border px-3 py-2.5" style={{ borderColor: 'var(--border)' }}>
                    <p>{item.title} · {item.category}</p>
                    <div className="flex gap-3 text-sm">
                      <button onClick={() => editItem('projects', item.id, { featured: !item.featured })}>Toggle featured</button>
                      <button onClick={() => removeItem('projects', item.id)} className="text-red-400">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </SectionWrap>
          )}

          {tab === 'experience' && (
            <SectionWrap title="Experience">
              <div className="grid gap-2">
                <Input value={experienceForm.yearRange} onChange={(e) => setExperienceForm({ ...experienceForm, yearRange: e.target.value })} placeholder="year range" />
                <Input value={experienceForm.company} onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })} placeholder="company" />
                <Input value={experienceForm.role} onChange={(e) => setExperienceForm({ ...experienceForm, role: e.target.value })} placeholder="role" />
                <Area value={experienceForm.description} onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })} placeholder="description" rows={3} />
                <PrimaryButton onClick={() => createItem('experience', experienceForm)}>Add experience</PrimaryButton>
              </div>
              <div className="mt-4 grid gap-2">
                {experience.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl border px-3 py-2.5" style={{ borderColor: 'var(--border)' }}>
                    <p>{item.yearRange} · {item.company}</p>
                    <button onClick={() => removeItem('experience', item.id)} className="text-sm text-red-400">Delete</button>
                  </div>
                ))}
              </div>
            </SectionWrap>
          )}

          {tab === 'certificates' && (
            <SectionWrap title="Certificates">
              <div className="grid gap-2">
                <Input value={certificateForm.title} onChange={(e) => setCertificateForm({ ...certificateForm, title: e.target.value })} placeholder="title" />
                <Input value={certificateForm.issuer} onChange={(e) => setCertificateForm({ ...certificateForm, issuer: e.target.value })} placeholder="issuer" />
                <Input value={certificateForm.date} onChange={(e) => setCertificateForm({ ...certificateForm, date: e.target.value })} placeholder="date" />
                <Input value={certificateForm.link} onChange={(e) => setCertificateForm({ ...certificateForm, link: e.target.value })} placeholder="link" />
                <UploadField
                  label="Certificate Image"
                  busy={busy}
                  previewUrl={certificateForm.imageUrl}
                  onSelect={(file) => withUpload(file, 'certificates', setCertificateForm, 'imageUrl')}
                />
                <PrimaryButton onClick={() => createItem('certificates', certificateForm)}>Add certificate</PrimaryButton>
              </div>
              <div className="mt-4 grid gap-2">
                {certificates.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl border px-3 py-2.5" style={{ borderColor: 'var(--border)' }}>
                    <p>{item.title}</p>
                    <button onClick={() => removeItem('certificates', item.id)} className="text-sm text-red-400">Delete</button>
                  </div>
                ))}
              </div>
            </SectionWrap>
          )}
        </div>
      </div>
    </main>
  )
}

export default Admin
