import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <p className="font-serif text-3xl font-light mb-4">Karun</p>
          <p className="font-sans text-sm text-gray-400 max-w-xs leading-relaxed">
            Multi-sector freelancer and project manager delivering high-impact outcomes across web, brand, and operations.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="font-mono text-xs tracking-widest text-gray-500 hover:text-[#C9A84C] transition-colors">LI</a>
            <a href="#" className="font-mono text-xs tracking-widest text-gray-500 hover:text-[#C9A84C] transition-colors">TW</a>
            <a href="#" className="font-mono text-xs tracking-widest text-gray-500 hover:text-[#C9A84C] transition-colors">GH</a>
          </div>
        </div>
        <div>
          <p className="font-mono text-xs tracking-widest text-[#C9A84C] uppercase mb-4">Navigate</p>
          {['About', 'Services', 'Portfolio', 'Testimonials', 'Contact'].map(link => (
            <Link key={link} href={`#${link.toLowerCase()}`}
              className="block font-sans text-sm text-gray-400 hover:text-white py-1 transition-colors">{link}</Link>
          ))}
        </div>
        <div>
          <p className="font-mono text-xs tracking-widest text-[#C9A84C] uppercase mb-4">Get in Touch</p>
          <p className="font-sans text-sm text-gray-400">Open for collaborations & freelance projects.</p>
          <Link href="#booking" className="inline-block mt-4 bg-[#1B6B5A] text-[#F5F0E8] px-6 py-2 font-sans text-sm hover:bg-[#154f43] transition-colors">
            Book a Call
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-800 px-6 py-4 max-w-7xl mx-auto flex justify-between items-center">
        <p className="font-mono text-xs text-gray-600">&copy; 2026 Karun. All rights reserved.</p>
        <p className="font-mono text-xs text-gray-600">Built with Next.js & Supabase</p>
      </div>
    </footer>
  );
}
