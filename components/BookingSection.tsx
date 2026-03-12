import Link from 'next/link';

export default function BookingSection() {
  return (
    <section id="booking" className="bg-[#0A0A0A] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="border border-[#1B6B5A]/30 bg-[#1B6B5A]/5 p-12 lg:p-20 text-center">
          <p className="font-sans text-xs tracking-widest text-[#1B6B5A] uppercase mb-6">Ready to Start?</p>
          <h2 className="font-sans text-5xl lg:text-7xl font-bold text-white mb-6">
            Book a <em className="italic font-light">Project</em>
          </h2>
          <p className="font-sans text-gray-400 max-w-xl mx-auto mb-10 text-lg">
            Let&apos;s discuss your project and turn your vision into reality. I&apos;m accepting new projects for 2026.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/booking" className="btn-primary text-base px-10 py-4">
              Start Your Project &rarr;
            </Link>
            <Link href="#contact" className="btn-outline text-base px-10 py-4">
              Ask a Question
            </Link>
          </div>
          <div className="flex justify-center gap-12 mt-12 pt-12 border-t border-white/10">
            <div>
              <p className="font-sans font-bold text-white text-lg">2-3 Days</p>
              <p className="font-sans text-xs text-gray-500 tracking-widest uppercase mt-1">Response Time</p>
            </div>
            <div>
              <p className="font-sans font-bold text-white text-lg">100%</p>
              <p className="font-sans text-xs text-gray-500 tracking-widest uppercase mt-1">Satisfaction</p>
            </div>
            <div>
              <p className="font-sans font-bold text-white text-lg">NDA</p>
              <p className="font-sans text-xs text-gray-500 tracking-widest uppercase mt-1">Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
