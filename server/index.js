require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const app = express();
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server شغال تمام!");
});

// route لجلب كل الخدمات
app.get("/api/services", async (req, res) => {
  const services = await prisma.service.findMany();
  res.json(services);
});

// route لإنشاء حجز جديد
app.post("/api/appointments", async (req, res) => {
  const { name, phone, datetime, serviceId } = req.body;

  const existing = await prisma.appointment.findFirst({
    where: { datetime: new Date(datetime) },
  });

  if (existing) {
    return res.status(409).json({ error: "هاد الوقت محجوز مسبقاً" });
  }

  const appointment = await prisma.appointment.create({
    data: {
      name,
      phone,
      datetime: new Date(datetime),
      serviceId: Number(serviceId),
    },
  });

  res.json(appointment);
});

// جلب الأوقات المحجوزة بتاريخ معين
app.get("/api/appointments/booked-times", async (req, res) => {
  const { date } = req.query; // مثال: 2026-09-15

  const startOfDay = new Date(`${date}T00:00:00.000Z`);
  const endOfDay = new Date(`${date}T23:59:59.999Z`);

  const appointments = await prisma.appointment.findMany({
    where: {
      datetime: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    select: { datetime: true },
  });

  const bookedHours = appointments.map((a) => a.datetime.toISOString());
  res.json(bookedHours);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
