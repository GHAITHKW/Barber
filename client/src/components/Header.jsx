function Header() {
  return (
    <nav className="fixed top-0 w-full bg-brand-dark/90 backdrop-blur-md border-b border-brand-gray z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-3xl font-bold tracking-wider text-brand-accent">
          4K <span className="text-white text-xl font-normal">BARBER</span>
        </a>

        <nav className="hidden md:flex space-x-9 text-sm font-medium">
          <a href="#hero" className="hover:text-brand-accent transition-colors">الرئيسية</a>
          <a href="#services" className="hover:text-brand-accent transition-colors">خدماتنا</a>
          <a href="#gallery" className="hover:text-brand-accent transition-colors ml-5">أعمالنا</a>
          <a href="#booking" className="hover:text-brand-accent transition-colors mr-1">احجز الآن</a>
        </nav>

        <a href="#booking" className="hidden md:inline-block bg-brand-accent text-brand-dark font-semibold px-5 py-2 rounded shadow-md hover:bg-yellow-500 transition-all">
          احجز موعداً
        </a>
      </div>
    </nav>
  )
}

export default Header