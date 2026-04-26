import {
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGsap,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVite,
} from 'react-icons/si'
import { useTheme } from '../hooks/useTheme.js'
import { iconMap } from '../lib/iconMap.js'
import LogoLoop from './LogoLoop.jsx'

const defaults = [
  { iconName: 'SiReact', label: 'React', node: <SiReact /> },
  { iconName: 'SiNextdotjs', label: 'Next.js', node: <SiNextdotjs /> },
  { iconName: 'SiTypescript', label: 'TypeScript', node: <SiTypescript /> },
  { iconName: 'SiTailwindcss', label: 'Tailwind CSS', node: <SiTailwindcss /> },
  { iconName: 'SiFramer', label: 'Framer Motion', node: <SiFramer /> },
  { iconName: 'SiGsap', label: 'GSAP', node: <SiGsap /> },
  { iconName: 'SiThreedotjs', label: 'Three.js', node: <SiThreedotjs /> },
  { iconName: 'SiFigma', label: 'Figma', node: <SiFigma /> },
  { iconName: 'SiFirebase', label: 'Firebase', node: <SiFirebase /> },
  { iconName: 'SiNodedotjs', label: 'Node.js', node: <SiNodedotjs /> },
  { iconName: 'SiVite', label: 'Vite', node: <SiVite /> },
]

function Skills({ skills }) {
  const { theme } = useTheme()
  const fadeColor = theme === 'dark' ? '#0a0a0a' : '#f5f2ed'
  const data = skills.length
    ? skills.map((s) => {
        const Icon = iconMap[s.iconName]
        return { title: s.label, node: Icon ? <Icon /> : <SiReact /> }
      })
    : defaults

  return (
    <section id="skills" className="section-wrap">
      <div className="container">
        <p className="label">// SKILLS</p>
        <h2 className="title">Technologies &amp; Tools</h2>
        <div className="mt-8 text-3xl">
          <LogoLoop
            logos={data}
            speed={60}
            hoverSpeed={0}
            gap={28}
            logoHeight={34}
            fadeOutColor={fadeColor}
            renderItem={(item) => (
              <div title={item.title} className="rounded-xl border p-2.5 transition hover:scale-110" style={{ borderColor: 'var(--border)', background: 'var(--card-bg)' }}>
                {item.node}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  )
}

export default Skills
