import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-10 px-4 py-8 flex flex-col items-center gap-6 sm:px-8 sm:py-10">
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
      <div className="text-center">
        <h3 className="text-base font-semibold mb-1 sm:text-lg">Contact Us</h3>
        <p className="text-gray-700 text-sm sm:text-base">
          Email: <a href="mailto:comondoid@gmail.com">comondoid@gmail.com</a>
        </p>
        <p className="text-gray-700 text-sm sm:text-base">
          Instagram: <a href="https://instagram.com/comondoid" target="_blank" rel="noopener noreferrer">@comondoid</a>
        </p>
      </div>

      {/* Copyright */}
      <div className="text-gray-500 text-xs mt-4 sm:text-sm">
        &copy; {new Date().getFullYear()} Comondo. All rights reserved.
      </div>
    </footer>
  );
}