'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/components/ui/LanguageProvider'

export default function NavigationBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Scroll-spy: observe page sections and set the active section id
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ids = ['hero', 'about', 'mission', 'impact', 'advantage', 'products', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry which isIntersecting with the largest intersectionRatio
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
          setActiveSection(visible[0].target.id);
        }
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const baseLinkClasses = 'text-[18px] font-semibold transition-colors';

  const linkStyle = (href: string) => {
    // If href is an in-page anchor (starts with '#'), derive the id and compare to activeSection
    if (href.startsWith('#')) {
      const id = href.replace('#', '');
      return { color: activeSection === id ? 'var(--color-secondary)' : 'var(--color-primary)' };
    }
    // Otherwise fallback to pathname equality (for routes)
    return { color: pathname === href ? 'var(--color-secondary)' : 'var(--color-primary)' };
  };

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
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-(--foreground)">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <Image src="/comondo_1tc.png" alt="Comondo Logo" width={150} height={50} className="object-contain" />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="#hero" className={baseLinkClasses + ' hover:text-(--color-secondary)'} style={linkStyle('#hero')}>{t('nav.home')}</Link>
          <Link href="#about" className={baseLinkClasses + ' hover:text-(--color-secondary)'} style={linkStyle('#about')}>{t('nav.about')}</Link>
          <Link href="#products" className={baseLinkClasses + ' hover:text-(--color-secondary)'} style={linkStyle('#products')}>{t('nav.products')}</Link>
          <Link href="#impact" className={baseLinkClasses + ' hover:text-(--color-secondary)'} style={linkStyle('#impact')}>{t('nav.impact')}</Link>
        </div>
      </div>

      {/* Right: CTA and language, hidden on small and shown on md+ */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="https://linktr.ee/comondoid"
      className="py-3 px-6 text-white font-semibold rounded-full flex items-center justify-center bg-(--color-accent) hover:bg-(--color-accent-hover) transition-all"
            style={{
                fontSize: "18px",
                height: "auto",
        }}>
            {t('nav.contact_cta')}
        </Link>
        <select value={lang} onChange={(e) => setLang(e.target.value as any)} className="border-none focus:outline-none bg-transparent text-(--foreground) text-[18px] font-semibold cursor-pointer"
        style={{fontWeight: 700, height: "auto"}}>
          <option value="en">{t('nav.en')}</option>
          <option value="id">{t('nav.id')}</option>
        </select>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex">
          <div className="bg-white w-3/4 max-w-xs h-full shadow-lg p-6 flex flex-col gap-6">
            <button className="self-end" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <span className="text-3xl font-bold">&times;</span>
            </button>
            <Link href="#hero" className={baseLinkClasses + ' block py-2'} style={linkStyle('#hero')} onClick={() => setMenuOpen(false)}>{t('nav.home')}</Link>
            <Link href="#about" className={baseLinkClasses + ' block py-2'} style={linkStyle('#about')} onClick={() => setMenuOpen(false)}>{t('nav.about')}</Link>
            <Link href="#products" className={baseLinkClasses + ' block py-2'} style={linkStyle('#products')} onClick={() => setMenuOpen(false)}>{t('nav.products')}</Link>
            <Link href="#impact" className={baseLinkClasses + ' block py-2'} style={linkStyle('#impact')} onClick={() => setMenuOpen(false)}>{t('nav.impact')}</Link>
            <Link href="https://linktr.ee/comondoid" className="mt-4 bg-(--color-accent) text-white font-semibold rounded-full flex items-center justify-center py-3 px-4" onClick={() => setMenuOpen(false)}>{t('nav.contact_cta')}</Link>
          </div>
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
}