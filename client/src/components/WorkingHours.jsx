function WorkingHours() {
  return (
    <section className="bg-brand-dark py-12 border-t border-brand-gray">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold text-brand-accent mb-4">أوقات الدوام</h2>
        <p className="text-lg text-white">
          يومياً من <span className="text-brand-accent font-semibold">10:00 صباحاً</span> حتى <span className="text-brand-accent font-semibold">10:00 مساءً</span>
        </p>
        <p className="text-gray-400 mt-2">
          ⛔ يوم الإجازة الأسبوعية: <span className="font-semibold">الاثنين</span>
        </p>
      </div>
    </section>
  )
}

export default WorkingHours