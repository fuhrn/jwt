import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoutes.js';

// permite que las variables de entorno queden disponibles en server.js.
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

// form data in post request is converted to json object in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/keys/paypal", (req, res) => {
  // "sb" es el modo sandbox de paypal
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// captura el current directory name con el package path
const __dirname = path.resolve();
// middleware para servir archivos estáticos desde la carpeta /frontend_jwt/build
app.use(express.static(path.join(__dirname, "/frontend_jwt/build")));
// todas las rutas que sean accedidas por un client, se redirigirán a index.html
// NOTA: el proyecto tiene que estar compilado con npm run build antes de subirlo a producción/Heroku
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend_jwt/build/index.html"))
);

// para capturar errores de forma asincrona. Primer argumento es err.
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});