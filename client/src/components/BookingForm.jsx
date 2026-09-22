import { useState, useEffect } from "react";

function BookingForm() {
  const [services, setServices] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceId: "",
    date: "",
    time: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, serviceId: data[0].id }));
        }
      })
      .catch((err) => console.error("خطأ بجلب الخدمات:", err));
  }, []);

  // كل ما يتغير التاريخ، نجيب الأوقات المحجوزة بهاليوم
  useEffect(() => {
    if (!formData.date) {
      setBookedTimes([]);
      return;
    }
    fetch(
      `${import.meta.env.VITE_API_URL}/api/appointments/booked-times?date=${formData.date}`,
    )
      .then((res) => res.json())
      .then((data) => setBookedTimes(data))
      .catch((err) => console.error("خطأ بجلب الأوقات المحجوزة:", err));
  }, [formData.date]);

  // نبني قائمة الأوقات الممكنة (10 صباحاً - 9 مساءً، كل ساعة)
  const allSlots = [];
  for (let hour = 10; hour <= 21; hour++) {
    allSlots.push(hour);
  }

  function isSlotBooked(hour) {
    if (!formData.date) return false;
    const slotDateTime = new Date(
      `${formData.date}T${String(hour).padStart(2, "0")}:00:00`,
    );
    return bookedTimes.some(
      (bt) => new Date(bt).getTime() === slotDateTime.getTime(),
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "date" ? { time: "" } : {}),
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const datetime = `${formData.date}T${String(formData.time).padStart(2, "0")}:00:00`;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/appointments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            serviceId: formData.serviceId,
            datetime,
          }),
        },
      );

      if (res.status === 409) {
        setStatus("conflict");
        return;
      }
      if (!res.ok) throw new Error("فشل الحجز");

      // نجهز رسالة واتساب بتفاصيل الحجز
      const selectedService = services.find(
        (s) => s.id === Number(formData.serviceId),
      );
      const serviceName = selectedService ? selectedService.name : "";
      const message = `مرحباً، بدي ثبت حجز موعد:
الاسم: ${formData.name}
الهاتف: ${formData.phone}
الخدمة: ${serviceName}
التاريخ: ${formData.date}
الوقت: ${formData.time}:00`;

      const whatsappNumber = "963936707552";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      setStatus("success");
      setFormData((prev) => ({
        ...prev,
        name: "",
        phone: "",
        date: "",
        time: "",
      }));

      // نفتح واتساب بنفس الصفحة بعد ثانية بسيطة (يعطي وقت لرسالة النجاح تظهر)
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 1000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section id="booking" className="py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="bg-brand-gray p-8 md:p-12 rounded-2xl border border-gray-800 shadow-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              احجز موعدك الآن بالدقة الكاملة
            </h2>
            <p className="text-gray-400 text-sm">
              اختر الخدمة والوقت المناسب وسنكون بانتظارك
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  الاسم الكريم
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-brand-dark border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                  placeholder="محمد أحمد"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  رقم الجوال
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-brand-dark border border-gray-700 rounded p-3 text-white text-left focus:outline-none focus:border-brand-accent transition-colors"
                  placeholder="05xxxxxxxx"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  اختر الخدمة
                </label>
                <select
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  className="w-full bg-brand-dark border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.price} ر.س
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  التاريخ
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-brand-dark border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                الوقت
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                disabled={!formData.date}
                className="w-full bg-brand-dark border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50"
                required
              >
                <option value="">-- اختر الوقت --</option>
                {allSlots.map((hour) => (
                  <option key={hour} value={hour} disabled={isSlotBooked(hour)}>
                    {hour}:00 {isSlotBooked(hour) ? "(محجوز)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-accent text-brand-dark font-bold py-4 rounded text-lg shadow-md hover:bg-yellow-500 transition-all block text-center"
            >
              تأكيد حجز الموعد
            </button>

            {status === "success" && (
              <p className="text-green-500 text-center">
                تم حجز موعدك بنجاح! ✅
              </p>
            )}
            {status === "conflict" && (
              <p className="text-yellow-500 text-center">
                عذراً، هاد الوقت انحجز للتو من شخص تاني. اختر وقت تاني.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-center">
                صار خطأ، حاول مرة تانية.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default BookingForm;
