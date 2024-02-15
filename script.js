const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv").config();


//Aqui linkeamos tanto la base de datos como las rutas para traerlos al script
const {connect} = require('./src/utils/db')
const userRoutes = require('./src/api/routes/user.routes')
const emergencyRoutes = require('./src/api/routes/emergency.routes')
const foodRoutes = require('./src/api/routes/food.routes')
const allergiesRoutes = require('./src/api/routes/allergies.routes')

const HTTPSTATUSCODE = require('./src/utils/httpStatusCode');

const PORT = process.env.PORT;

const app = express();
connect();

//Esto se usa para que no inyecten codigo de mongo y express y externos se puedan meter en nuestra BBDD
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());

//Recibir e interpretar JSON desde Postman o un front
app.use(express.json())
app.use(express.urlencoded({extended:true})) //Antes lo tenia en false, no se cual es la diferencia

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:3001'],
  credentials: true,
}));
app.use(logger("dev"));
app.set("secretKey", "nodeRestApi");

app.use('/users', userRoutes)
app.use('/emergency', emergencyRoutes)
app.use('/food', foodRoutes)
app.use('/allergies', allergiesRoutes)
app.get('/', (req, res, next) => {
  res.status(200).json({
      status: 200,
  data: {
    method: "GET",
    message: "Bienvenido a la app. Estás en la ruta base",
  },
  })
})

/*desactivar el encabezado http x-powered-by, que muestra la tecnología con que se desarrolló la api*/
app.disable('x-powered-by');

/*MANEJO DE ERRORES*/
app.use((req, res, next) => {
  let error = new Error();
  error.status = 404;
  error.message = HTTPSTATUSCODE[404];
  next(error);
})

app.use((error, req, res, next) => {
  return res.status(error.status || 500).json(error.message || 'Unexpected error');
})

app.listen(PORT, () =>
  console.log(`escuchando en el puerto http://localhost:${PORT}`)
);
