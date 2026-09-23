import { useState } from 'react'

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '#hero', label: 'الرئيسية' },
    { href: '#services', label: 'خدماتنا' },
    { href: '#gallery', label: 'أعمالنا' },
    { href: '#booking', label: 'احجز الآن' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-brand-dark/90 backdrop-blur-md border-b border-brand-gray z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-3xl font-bold tracking-wider text-brand-accent">
          4K <span className="text-white text-xl font-normal">BARBER</span>
        </a>

        {/* قائمة الديسكتوب */}
        <nav className="hidden md:flex space-x-9 text-sm font-medium">
          <a href="#hero" className="hover:text-brand-accent transition-colors">الرئيسية</a>
          <a href="#services" className="hover:text-brand-accent transition-colors">خدماتنا</a>
          <a href="#gallery" className="hover:text-brand-accent transition-colors ml-5">أعمالنا</a>
          <a href="#booking" className="hover:text-brand-accent transition-colors mr-1">احجز الآن</a>
        </nav>

        <a href="#booking" className="hidden md:inline-block bg-brand-accent text-brand-dark font-semibold px-5 py-2 rounded shadow-md hover:bg-yellow-500 transition-all">
          احجز موعداً
        </a>

        {/* زر الهامبرغر - يظهر بالجوال بس */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
          aria-label="فتح القائمة"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* قائمة الجوال المنسدلة */}
      {isOpen && (
        <div className="md:hidden bg-brand-dark border-t border-brand-gray px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="hover:text-brand-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Header