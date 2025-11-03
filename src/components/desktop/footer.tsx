import Image from "next/image";
import { useTranslation } from '@/components/ui/LanguageProvider'

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-16 px-6 md:px-12 py-12 flex flex-col items-center gap-10">
      {/* Logo */}
      <div>
        {/* Use a regular <img> with max-width and auto height so the natural image ratio is preserved
            and we don't hardcode pixel width/height. This lets the browser size the image based
            on its intrinsic size while constraining its maximum display size via CSS. */}
        <img
          src="/comondo_logo.png"
          alt="Comondo Logo"
          className="w-auto max-w-[89px] md:max-w-[100px] h-auto rounded-full"
        />
      </div>

      {/* Contact Us */}
      <div className="text-center flex flex-col gap-3">
        <h3 className="text-lg font-semibold mb-1">{t('footer.contact_us')}</h3>
        <p className="text-gray-700">
          {t('footer.email_label')} <a href="mailto:comondoid@gmail.com" className="hover:underline" style={{ color: 'var(--color-accent)' }}>comondoid@gmail.com</a>
        </p>
        <p className="text-gray-700">
          {t('footer.instagram_label')} <a href="https://instagram.com/comondoid" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--color-accent)' }}>@comondoid</a>
        </p>
      </div>

      {/* Copyright */}
      <div className="text-gray-500 text-sm mt-4">
        {t('footer.copy', { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}