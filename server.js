const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000; // Usa el puerto del servidor o 3000 en local

// Middleware
app.use(cors());
app.use(express.json());

// Cargar datos desde el JSON
const data = JSON.parse(fs.readFileSync("ciudades.json", "utf-8"));

// Ruta para obtener todas las ciudades
app.get("/ciudades", (req, res) => {
  res.json(data);
});

// Ruta para filtrar ciudades por temperatura, viento o presión
app.get("/filtrar", (req, res) => {
  const { temperatura, viento, presion } = req.query;

  let ciudadesFiltradas = data;

  if (temperatura) {
    ciudadesFiltradas = ciudadesFiltradas.filter(
      (c) => c.Temperatura >= parseFloat(temperatura)
    );
  }

  if (viento) {
    ciudadesFiltradas = ciudadesFiltradas.filter(
      (c) => c.Viento >= parseFloat(viento)
    );
  }

  if (presion) {
    ciudadesFiltradas = ciudadesFiltradas.filter(
      (c) => c.Presion >= parseFloat(presion)
    );
  }

  res.json(ciudadesFiltradas);
});

// Ruta de prueba para verificar que el servidor está corriendo
app.get("/", (req, res) => {
  res.send("API de Clima funcionando correctamente 🚀");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
