"use client"

import DesktopNav from './desktop/navbar'
import MobileNav from './mobile/navbar'

export default function NavigationBar() {
  return (
    <>
      {/* Desktop: shown on md+ */}
      <div className="hidden md:block">
        <DesktopNav />
      </div>

      {/* Mobile: shown below md */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </>
  )
}
