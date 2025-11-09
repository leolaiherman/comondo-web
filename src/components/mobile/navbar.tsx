'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '@/components/ui/LanguageProvider'

export default function NavigationBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Lock scroll and enable escape-to-close while the menu is open.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
      setIsNavVisible(true);
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('overflow-hidden');
    };
  }, [menuOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ids = ['hero', 'about', 'mission', 'impact', 'advantage', 'products', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      if (rafRef.current !== null) return;

      rafRef.current = window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const lastY = lastScrollYRef.current;
        const delta = currentY - lastY;

        if (!menuOpen) {
          if (currentY < 80) {
            setIsNavVisible(true);
          } else if (delta > 12) {
            setIsNavVisible(false);
          } else if (delta < -6) {
            setIsNavVisible(true);
          }
        } else {
          setIsNavVisible(true);
        }

        lastScrollYRef.current = currentY;
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [menuOpen]);

  const linkStyle = (href: string) => {
    if (href.startsWith('#')) {
      const id = href.replace('#', '');
      const isActive = activeSection === id;
      return {
        color: isActive ? 'var(--color-secondary)' : 'var(--color-primary)',
        borderColor: isActive ? 'var(--color-secondary)' : 'rgba(255,255,255,0.1)',
      };
    }
    const isActive = pathname === href;
    return {
      color: isActive ? 'var(--color-secondary)' : 'var(--color-primary)',
      borderColor: isActive ? 'var(--color-secondary)' : 'rgba(255,255,255,0.1)',
    };
  };

  const closeMenu = () => setMenuOpen(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <>
      <nav
        className={`sticky top-0 z-40 flex w-full items-center justify-between gap-4 border border-white/30 bg-white/70 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-transform duration-200 ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {/* Menu toggle */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/80 shadow-[0_4px_18px_rgba(0,0,0,0.15)] backdrop-blur-xl"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-(--color-primary)">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-(--color-primary)">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>

        {/* Center: Logo */}
        <div className="flex flex-1 justify-center">
          <Image src="comondo_1tc.png" alt="Comondo Logo" width={100} height={36} className="object-contain" />
        </div>

        {/* Right: Language selector */}
        <div className="flex items-center">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as any)}
            className="border-none bg-transparent text-base font-semibold text-(--foreground) focus:outline-none"
            style={{ fontWeight: 700, height: 'auto' }}
          >
            <option value="en">{t('nav.en')}</option>
            <option value="id">{t('nav.id')}</option>
          </select>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white text-(--foreground)">
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
            <Image src="comondo_1tc.png" alt="Comondo Logo" width={110} height={40} className="object-contain" />
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-black/5"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-(--color-primary)">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-8">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-xl font-semibold" style={linkStyle('/')} onClick={closeMenu}>
                {t('nav.home')}
              </Link>
              <Link href="/about" className="text-xl font-semibold" style={linkStyle('/about')} onClick={closeMenu}>
                {t('nav.about')}
              </Link>

              {/* Products accordion on mobile */}
              <div>
                <button
                  className="w-full flex items-center justify-between text-xl font-semibold"
                  onClick={() => setProductsOpen((s) => !s)}
                  aria-expanded={productsOpen}
                >
                  <span>{t('nav.products')}</span>
                  <span className="ml-3">{productsOpen ? '−' : '+'}</span>
                </button>
                {productsOpen && (
                  <div className="mt-3 flex flex-col gap-2 pl-3">
                    <Link href="/products/koko-santan" className="text-base font-semibold" onClick={() => { closeMenu(); }}>
                      KOKO Santan
                    </Link>
                    <Link href="/products/cocoingredients" className="text-base font-semibold" onClick={() => { closeMenu(); }}>
                      CocoIngredients
                    </Link>
                    <Link href="/products/techondo" className="text-base font-semibold" onClick={() => { closeMenu(); }}>
                      Techondo
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/partner" className="text-xl font-semibold" style={linkStyle('/partner')} onClick={closeMenu}>
                {t('nav.partner')}
              </Link>
            </div>
          </div>

          <div className="border-t border-black/10 px-5 pb-10 pt-5">
            <Link
              href="https://linktr.ee/comondoid"
              className="flex items-center justify-center rounded-full bg-(--color-accent) py-3 text-lg font-semibold text-white transition-colors hover:bg-(--color-accent-hover)"
              onClick={closeMenu}
            >
              {t('nav.contact_cta')}
            </Link>

            <div className="mt-5">
              <label htmlFor="mobile-language" className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-black/60">
                {t('nav.language_label') ?? 'Language'}
              </label>
              <select
                id="mobile-language"
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                className="w-full rounded-xl border border-black/10 bg-black/5 py-3 px-4 text-base font-semibold text-(--foreground) focus:outline-none"
              >
                <option value="en">{t('nav.en')}</option>
                <option value="id">{t('nav.id')}</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
}