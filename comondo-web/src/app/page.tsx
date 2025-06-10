import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-gray-800">
      {/* Navigation */}
      <nav className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-200">
        <div className="text-2xl font-bold text-green-600">Comondo</div>
        <div className="flex space-x-6">
          <a href="/" className="text-orange-500 hover:text-orange-700">Home</a>
          <a href="#" className="hover:text-gray-600">Our Product</a>
          <a href="/ContactUs" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Contact Us</a>
          <select className="border-none focus:outline-none">
            <option>EN</option>
            <option>ID</option>
          </select>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl py-10 px-6">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Powered by coconut, driven by purpose</h1>
          <p className="text-lg md:text-xl mb-6">From your kitchen to your table, we&apos;ve got you a fresh coconut every day.</p>
        </div>
        <div className="w-full md:w-1/2">
          <img src="https://via.placeholder.com/500x300" alt="Coconut Beach" className="w-full h-auto rounded-lg" />
        </div>
      </section>

      {/* Info Section */}
      <section className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl py-10 px-6">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <img src="https://via.placeholder.com/200x200" alt="Comondo Logo" className="w-full h-auto" />
        </div>
        <div className="w-full md:w-2/3 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What does Comondo mean?</h2>
          <p className="mb-4">Co = Coconut (Italian)<br />Mondo = World (Italian)<br />Comondo = The Coconut World</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Comondo?</h2>
          <p>We&apos;re inspired by the coconut, a remarkably versatile fruit that has nourished and supported people for generations. Grown abundantly across Southeast Asia, especially in Indonesia, one of the world&apos;s top producers, it&apos;s a natural gift with many potentials. At Comondo, we harness this local richness and global relevance to create purposeful coconut-based products that promote better living and a more sustainable future.</p>
        </div>
      </section>
    </div>
  );
}
