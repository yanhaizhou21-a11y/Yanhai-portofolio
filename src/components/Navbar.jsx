const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <a href="#hero" className="text-sm font-medium tracking-[0.2em] text-black">
          PORTFOLIO
        </a>
        <ul className="hidden gap-5 text-xs text-gray-700 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a className="transition hover:text-black" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
