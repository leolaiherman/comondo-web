import Image from "next/image";
import { useTranslation } from '@/components/ui/LanguageProvider'

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-10 px-4 py-8 flex flex-col items-center gap-8 sm:px-8 sm:py-10 sm:gap-10">
      {/* Logo */}
      <div>
        <Image
          src="comondo_logo.png"
          alt="Comondo Logo"
          width={224}
          height={199}
          className="rounded-full"
        />
      </div>

      {/* Contact Us */}
      <div className="text-center flex flex-col gap-3">
        <h3 className="text-base font-semibold mb-1 sm:text-lg">{t('footer.contact_us')}</h3>
        <p className="text-gray-700 text-sm sm:text-base">
          {t('footer.email_label')} <a href="mailto:comondoid@gmail.com" className="hover:underline" style={{ color: 'var(--color-accent)' }}>comondoid@gmail.com</a>
        </p>
        <p className="text-gray-700 text-sm sm:text-base">
          {t('footer.instagram_label')} <a href="https://instagram.com/comondoid" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--color-accent)' }}>@comondoid</a>
        </p>
      </div>

      {/* Copyright */}
      <div className="text-gray-500 text-xs mt-4 sm:text-sm">
        {t('footer.copy', { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}