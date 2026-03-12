import Link from 'next/link';

export default function Footer() {
  const links = ['About', 'Services', 'Portfolio', 'Testimonials', 'Contact'];
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Link href="/" className="font-sans text-2xl font-bold text-white">Karun</Link>
            <p className="font-sans text-sm text-gray-500 mt-1">Freelancer &amp; Project Manager</p>
          </div>
          <nav className="flex flex-wrap gap-6 justify-center">
            {links.map(l => (
              <Link key={l} href={`#${l.toLowerCase()}`} className="font-sans text-sm text-gray-400 hover:text-white transition-colors">{l}</Link>
            ))}
          </nav>
          <div className="flex gap-4">
            <Link href="/admin" className="font-mono text-xs text-gray-600 hover:text-gray-400 transition-colors">Admin</Link>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-gray-600">&copy; {new Date().getFullYear()} Karun. All rights reserved.</p>
          <p className="font-sans text-xs text-gray-600">Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
