'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavigationBar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `text-[20px] font-semibold transition-colors ${
      pathname === href ? 'text-[#E2861D]' : 'text-[#0C4D38]'
    } hover:text-[#E2861D]`;

  return (
    <nav className="w-full py-4 px-16 flex items-center border-b border-gray-200 sticky top-0 z-50 bg-white">
      {/* Left: Logo and main links */}
      <div className="flex items-center space-x-8 flex-1">
        <Image src="/comondo_1tc.png" alt="Comondo Logo" width={150} height={50} className="object-contain" />
        <Link href="/" className={linkClass('/')}>Home</Link>
        <Link href="/Product" className={linkClass('/Product')}>Our Product</Link>
      </div>
      {/* Right: CTA and language */}
      <div className="flex items-center space-x-4">
        <Link href="/ContactUs"
            className="bg-[#339777] text-white text-[20px] font-semibold rounded-[24px] flex items-center justify-center py-4 px-4"
            style={{
                fontSize: 20,
                height: "auto",
        }}>
            Contact Us
        </Link>
        <select className="border-none focus:outline-none bg-transparent text-[#120305] text-[20px] font-semibold"
        style={{fontWeight: 700, height: "auto"}}>
          <option>EN</option>
          <option>ID</option>
        </select>
      </div>
    </nav>
  );
}