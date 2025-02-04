const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // This enables CORS for all routes
app.use(express.json());

// Cargar datos desde el JSON
const data = JSON.parse(fs.readFileSync("ciudades.json", "utf-8"));

// Ruta para obtener todas las ciudades
app.get("/ciudades", (req, res) => {
  res.json(data);
});

// Ruta para filtrar ciudades por temperatura, viento o presión
app.get("/filtrar", (req, res) => {
  const { temperatura, precipitaciones, viento } = req.query;

  let ciudadesFiltradas = data;

 // Filtrar por temperatura
if (temperatura) {
  if (temperatura === "Frio") {
    // Asegurarnos de que las ciudades con temperaturas entre -5 y 8 grados pasen el filtro
    ciudadesFiltradas = ciudadesFiltradas.filter((c) => {
      console.log(`Ciudad: ${c.Ciudad}, Temperatura: ${c.Temperatura}`);  // Mostrar la temperatura
      return c.Temperatura >= -5 && c.Temperatura <= 8;
    });
  } else if (temperatura === "Templado") {
    ciudadesFiltradas = ciudadesFiltradas.filter(
      (c) => c.Temperatura >= 9 && c.Temperatura <= 20
    );
  } else if (temperatura === "Calido") {
    ciudadesFiltradas = ciudadesFiltradas.filter(
      (c) => c.Temperatura >= 21 && c.Temperatura <= 30
    );
  } else if (temperatura === "Caluroso") {
    ciudadesFiltradas = ciudadesFiltradas.filter(
      (c) => c.Temperatura > 30
    );
  }
}


// Filtrar por precipitaciones
if (precipitaciones) {
  if (precipitaciones === "Seco") {
    ciudadesFiltradas = ciudadesFiltradas.filter(
      (c) => c.Precipitaciones >= 0 && c.Precipitaciones <= 250
    );
  } else if (precipitaciones === "Moderado") {
    ciudadesFiltradas = ciudadesFiltradas.filter(
      (c) => c.Precipitaciones >= 250 && c.Precipitaciones <= 600
    );
  } else if (precipitaciones === "Lluvioso") {
    ciudadesFiltradas = ciudadesFiltradas.filter(
      (c) => c.Precipitaciones >= 601 && c.Precipitaciones <= 900
    );
  } else if (precipitaciones === "Muy Lluvioso") {
    ciudadesFiltradas = ciudadesFiltradas.filter(
      (c) => c.Precipitaciones >= 901
    );
  }
}

// Filtrar por viento
if (viento) {
  if (viento === "Calmo") {
    ciudadesFiltradas = ciudadesFiltradas.filter(
      (c) => c.Viento >= 0 && c.Viento <= 10
    );
  } else if (viento === "Brisa") {
    ciudadesFiltradas = ciudadesFiltradas.filter(
      (c) => c.Viento >= 11 && c.Viento <= 14
    );
  } else if (viento === "Ventoso") {
    ciudadesFiltradas = ciudadesFiltradas.filter(
      (c) => c.Viento >= 15 && c.Viento <= 25
    );
  } else if (viento === "Muy Ventoso") {
    ciudadesFiltradas = ciudadesFiltradas.filter(
      (c) => c.Viento > 25
    );
  }
}

// Si no hay coincidencias, se devuelve un array vacío
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