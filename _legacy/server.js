require("dotenv").config();
const express = require("express");
const path = require("path");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(compression());
app.use(express.static(path.join(__dirname, "public"), { maxAge: "1d" }));
app.use("/components", express.static(path.join(__dirname, "components")));

const nodemailer = require("nodemailer");

// Leer credenciales desde variables de entorno (sin valores por defecto sensibles)
const MAIL_USER = process.env.MAIL_USER || "";
const MAIL_PASS = process.env.MAIL_PASS || "";

// Configuración de transporte nodemailer (puedes usar Gmail, SMTP propio, etc.)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

if (!MAIL_USER || !MAIL_PASS) {
  console.warn(
    "AVISO: MAIL_USER o MAIL_PASS no están definidas en el entorno. Configure .env con credenciales válidas."
  );
}

// Middleware para servir vistas dinámicamente con validación robusta
app.get("/:view", (req, res) => {
  const view = req.params.view;
  const allowedViews = ["index", "servicios", "faq", "contacto"];
  if (allowedViews.includes(view)) {
    res.sendFile(path.join(__dirname, `views/${view}.html`));
  } else {
    res.status(404).send("Página no encontrada");
  }
});

// Ruta para la raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Endpoint para formulario de contacto
app.post("/api/contacto", async (req, res) => {
  console.log("POST /api/contacto llamado");
  const { nombre, email, empresa, mensaje } = req.body;
  console.log("Datos recibidos:", { nombre, email, empresa, mensaje });
  if (!nombre || !email || !mensaje) {
    console.log("Faltan campos obligatorios");
    return res.status(400).json({ error: "Campos obligatorios faltantes." });
  }
  try {
    console.log("Intentando enviar correo...");
    await transporter.sendMail({
      from: MAIL_USER,
      to: MAIL_USER,
      subject: "Nuevo contacto desde Escudo Laboral",
      html: `<h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>`,
    });
    console.log("Correo enviado correctamente");
    res.json({ success: true });
  } catch (err) {
    console.error("Error enviando correo:", err);
    res
      .status(500)
      .json({ error: "No se pudo enviar el correo.", detalle: err.message });
  }
});

// Manejo de 404
app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
