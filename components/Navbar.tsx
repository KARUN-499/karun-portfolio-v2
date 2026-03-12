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
      scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-sans text-xl font-bold text-white tracking-wide">Karun</Link>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link key={link} href={`#${link.toLowerCase()}`}
              className="font-sans text-sm text-gray-300 hover:text-white transition-colors tracking-wide">
              {link}
            </Link>
          ))}
          <Link href="#booking" className="bg-[#1B6B5A] text-white px-5 py-2 font-sans text-sm tracking-wide hover:bg-[#154f43] transition-colors">
            Book a Project
          </Link>
        </div>
        {/* Mobile hamburger */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-white/10 px-6 py-6 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link key={link} href={`#${link.toLowerCase()}`}
              className="font-sans text-sm text-gray-300 hover:text-white transition-colors tracking-wide"
              onClick={() => setMenuOpen(false)}>
              {link}
            </Link>
          ))}
          <Link href="#booking" className="bg-[#1B6B5A] text-white px-5 py-2 font-sans text-sm tracking-wide text-center hover:bg-[#154f43] transition-colors"
            onClick={() => setMenuOpen(false)}>Book a Project</Link>
        </div>
      )}
    </header>
  );
}
