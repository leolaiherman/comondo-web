'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function NavigationBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const baseLink = 'block py-2 px-4 text-lg font-semibold transition-colors hover:text-[var(--color-secondary)]';
  const linkStyle = (href: string) => ({ color: pathname === href ? 'var(--color-secondary)' : 'var(--color-primary)' });

  return (
    <nav className="w-full py-4 px-4 flex items-center justify-between gap-4 border-b border-gray-200 sticky top-0 z-50 bg-white">
      {/* Left: Coconut icon as menu toggle */}
      <button
        className="flex items-center"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Open menu"
      >
        <Image src="cocofruit.png" alt="Menu" width={40} height={40} className="object-contain" />
      </button>

      {/* Center: Logo */}
      <div className="flex-1 flex justify-center">
        <Image src="comondo_1tc.png" alt="Comondo Logo" width={100} height={36} className="object-contain" />
      </div>

      {/* Right: Language selector */}
      <div className="flex items-center">
        <select
          className="border-none focus:outline-none bg-transparent text-[var(--foreground)] text-base font-semibold cursor-pointer"
          style={{ fontWeight: 700, height: "auto" }}
        >
          <option>EN</option>
          <option>ID</option>
        </select>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex flex-col">
          <div className="bg-white w-3/4 max-w-xs h-full shadow-lg p-6 flex flex-col gap-6">
            <button
              className="self-end mb-2"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <span className="text-3xl font-bold">&times;</span>
            </button>
            <Link href="/" className={baseLink} style={linkStyle('/')} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="#about" className={baseLink} style={linkStyle('#about')} onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link href="#products" className={baseLink} style={linkStyle('#products')} onClick={() => setMenuOpen(false)}>
              Products
            </Link>
            <Link href="#impact" className={baseLink} style={linkStyle('#impact')} onClick={() => setMenuOpen(false)}>
              Impact
            </Link>
            <Link
              href="https://linktr.ee/comondoid"
              className="bg-[var(--color-accent)] text-white text-lg font-semibold rounded-full flex items-center justify-center py-3 px-6 mt-4 hover:bg-[var(--color-accent-hover)] transition-all"
              style={{ fontSize: 18 }}
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
}