'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function NavigationBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const baseLinkClasses = 'text-[18px] font-semibold transition-colors';

  const linkStyle = (href: string) => ({
    color: pathname === href ? 'var(--color-secondary)' : 'var(--color-primary)'
  });

  return (
    <nav className="w-full py-4 px-4 md:px-16 flex items-center gap-6 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      {/* Left: Logo (and on mobile the burger) */}
      <div className="flex items-center gap-4 md:gap-8 flex-1">
        {/* Mobile: burger button */}
        <button
          className="md:hidden p-2 rounded-md"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--foreground)]">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <Image src="/comondo_1tc.png" alt="Comondo Logo" width={150} height={50} className="object-contain" />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className={baseLinkClasses + ' hover:text-[var(--color-secondary)]'} style={linkStyle('/')}>Home</Link>
          <Link href="#about" className={baseLinkClasses + ' hover:text-[var(--color-secondary)]'} style={linkStyle('#about')}>About</Link>
          <Link href="#products" className={baseLinkClasses + ' hover:text-[var(--color-secondary)]'} style={linkStyle('#products')}>Products</Link>
          <Link href="#impact" className={baseLinkClasses + ' hover:text-[var(--color-secondary)]'} style={linkStyle('#impact')}>Impact</Link>
        </div>
      </div>

      {/* Right: CTA and language, hidden on small and shown on md+ */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="https://linktr.ee/comondoid"
            className="py-3 px-6 text-white font-semibold rounded-full flex items-center justify-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] transition-all"
            style={{
                fontSize: "18px",
                height: "auto",
        }}>
            Contact Us
        </Link>
        <select className="border-none focus:outline-none bg-transparent text-[var(--foreground)] text-[18px] font-semibold cursor-pointer"
        style={{fontWeight: 700, height: "auto"}}>
          <option>EN</option>
          <option>ID</option>
        </select>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex">
          <div className="bg-white w-3/4 max-w-xs h-full shadow-lg p-6 flex flex-col gap-6">
            <button className="self-end" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <span className="text-3xl font-bold">&times;</span>
            </button>
            <Link href="/" className={baseLinkClasses + ' block py-2'} style={linkStyle('/')} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="#about" className={baseLinkClasses + ' block py-2'} style={linkStyle('#about')} onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="#products" className={baseLinkClasses + ' block py-2'} style={linkStyle('#products')} onClick={() => setMenuOpen(false)}>Products</Link>
            <Link href="#impact" className={baseLinkClasses + ' block py-2'} style={linkStyle('#impact')} onClick={() => setMenuOpen(false)}>Impact</Link>
            <Link href="https://linktr.ee/comondoid" className="mt-4 bg-[var(--color-accent)] text-white font-semibold rounded-full flex items-center justify-center py-3 px-4" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          </div>
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
}