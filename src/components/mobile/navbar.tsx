'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function NavigationBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (href: string) =>
    `block py-2 px-4 text-lg font-semibold transition-colors ${
      pathname === href ? 'text-[#E2861D]' : 'text-[#0C4D38]'
    } hover:text-[#E2861D]`;

  return (
    <nav className="w-full py-3 px-4 flex items-center justify-between border-b border-gray-200 sticky top-0 z-50 bg-white">
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
          className="border-none focus:outline-none bg-transparent text-[#120305] text-base font-semibold"
          style={{ fontWeight: 700, height: "auto" }}
        >
          <option>EN</option>
          <option>ID</option>
        </select>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex flex-col">
          <div className="bg-white w-3/4 max-w-xs h-full shadow-lg p-6 flex flex-col gap-4">
            <button
              className="self-end mb-4"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <span className="text-2xl font-bold">&times;</span>
            </button>
            <Link href="/" className={linkClass('/')} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/Product" className={linkClass('/Product')} onClick={() => setMenuOpen(false)}>
              Our Product
            </Link>
            <Link
              href="/ContactUs"
              className="bg-[#339777] text-white text-lg font-semibold rounded-[24px] flex items-center justify-center py-3 px-4 mt-4"
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