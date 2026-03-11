'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = ['About', 'Services', 'Portfolio', 'Testimonials', 'Contact'];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#F5F0E8]/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-light text-[#0D0D0D]">Karun</Link>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link key={link} href={`#${link.toLowerCase()}`}
              className="font-sans text-sm tracking-wide text-gray-600 hover:text-[#1B6B5A] transition-colors">
              {link}
            </Link>
          ))}
          <Link href="#booking" className="bg-[#1B6B5A] text-[#F5F0E8] px-6 py-2 font-sans text-sm tracking-wide hover:bg-[#154f43] transition-colors">
            Book a Project
          </Link>
        </div>
        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`w-6 h-px bg-[#0D0D0D] mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-px bg-[#0D0D0D] mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-px bg-[#0D0D0D] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#F5F0E8] border-t border-gray-200 px-6 py-8">
          {navLinks.map(link => (
            <Link key={link} href={`#${link.toLowerCase()}`}
              className="block font-sans text-lg py-3 text-gray-700 hover:text-[#1B6B5A] border-b border-gray-100"
              onClick={() => setMenuOpen(false)}>
              {link}
            </Link>
          ))}
          <Link href="#booking" className="block mt-6 bg-[#1B6B5A] text-[#F5F0E8] px-6 py-3 font-sans text-sm text-center"
            onClick={() => setMenuOpen(false)}>Book a Project</Link>
        </div>
      )}
    </header>
  );
}
