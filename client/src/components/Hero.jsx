function Hero() {
  return (
   <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-b from-brand-dark via-brand-gray/40 to-brand-dark"
    >
      <div className="container mx-auto px-6 text-center">
        <span
          className="text-brand-accent font-semibold tracking-widest uppercase block mb-3 text-sm"
          >مرحباً بكم في عالم الدقة</span
        >
        <h1
          className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
        >
          صالون <span className="text-brand-accent">4K</span> للحلاقة والتصفيف
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg mb-8">
          نحن لا نقص الشعر فحسب، بل نعيد تعريف مظهرك بأعلى درجات الدقة
          والاحترافية. تجربة حلاقة بمستوى وضوح 4K.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#booking"
            className="bg-brand-accent text-brand-dark font-bold px-8 py-3 rounded text-lg hover:bg-yellow-500 transition-all"
            >احجز مقعدك الآن</a
          >
          <a
            href="#services"
            className="border border-gray-600 hover:border-brand-accent px-8 py-3 rounded text-lg transition-all"
            >استكشف خدماتنا</a
          >
        </div>
      </div>
    </section>
  );
}

export default Hero;
