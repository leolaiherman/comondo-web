import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-16 px-8 py-10 flex flex-col items-center gap-8">
      {/* Logo */}
      <div>
        <Image
          src="/comondo_logo.png"
          alt="Comondo Logo"
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>

      {/* Contact Us */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
        <p className="text-gray-700">
          Email: <a href="mailto:comondoid@gmail.com">comondoid@gmail.com</a>
        </p>
        <p className="text-gray-700">
          Instagram: <a href="https://instagram.com/comondoid" target="_blank" rel="noopener noreferrer">@comondoid</a>
        </p>
      </div>

      {/* Copyright */}
      <div className="text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} Comondo. All rights reserved.
      </div>
    </footer>
  );
}