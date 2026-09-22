import { useState, useEffect } from 'react'

function Services() {
  const [services, setServices] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/services`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error('خطأ بجلب الخدمات:', err))
  }, [])

  const icons = ['✂️', '🪒', '💆‍♂️']

  return (
    <section id="services" className="py-24 bg-brand-gray/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            خدماتنا المتميزة
          </h2>
          <div className="h-1 w-20 bg-brand-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-brand-gray p-8 rounded-lg border border-gray-800 hover:border-brand-accent/50 transition-all group"
            >
              <div className="text-brand-accent text-4xl mb-4 group-hover:scale-110 transition-transform">
                {icons[index] || '✂️'}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
              <span className="text-brand-accent font-semibold block text-lg">
                {service.price} ل.س
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services