const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

//Aqui linkeamos tanto la base de datos como las rutas para traerlos al script
const { connect } = require("./src/utils/db");
const userRoutes = require("./src/api/routes/user.routes");
const emergencyRoutes = require("./src/api/routes/emergency.routes");
const diarioRoutes = require("./src/api/routes/diario.routes");
const foodRoutes = require("./src/api/routes/food.routes");
const allergiesRoutes = require("./src/api/routes/allergies.routes");

const HTTPSTATUSCODE = require("./src/utils/httpStatusCode");

const PORT = process.env.PORT;

const app = express();
connect();

//Esto se usa para que no inyecten codigo de mongo y express y externos se puedan meter en nuestra BBDD
const mongoSanitize = require("express-mongo-sanitize");
const User = require("./src/api/models/user.model");
app.use(mongoSanitize());

//Recibir e interpretar JSON desde Postman o un front
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Antes lo tenia en false, no se cual es la diferencia

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});
app.use(
	cors({
		origin: ["http://localhost:3000", "http://localhost:4200", "http://localhost:3001"],
		credentials: true,
	})
);
app.use(logger("dev"));
app.set("secretKey", "nodeRestApi");

app.use("/users", userRoutes);
app.use("/emergency", emergencyRoutes);
app.use("/diario", diarioRoutes);
app.use("/food", foodRoutes);
app.use("/allergies", allergiesRoutes);

app.post("/registro", async (req, res) => {
  console.log(req.body);
	try {
		const newUser = new User(req.body);
		//Encriptar Password
		newUser.password = bcrypt.hashSync(newUser.password, 10);
		const createdUser = await newUser.save();

		return res.status(201).json(createdUser);
	} catch (error) {
		return res.status(500).json(error);
	}
});

app.post("/login", async (req, res, next) => {
	console.log(req.body.email, req.body.password);
	try {
		const userInfo = await User.findOne({ email: req.body.email });
		//comprueba si la contraseña que te envían coincide con la que tienes guardada de ese email
		if (bcrypt.compareSync(req.body.password, userInfo.password)) {
			console.log("Todo correcto");
			// if (userInfo.password == req.body.password) {
			userInfo.password = null;
			const token = jwt.sign(
				{
					id: userInfo._id,
					email: userInfo.email,
				},
				req.app.get("secretKey"),
				{ expiresIn: "1d" }
			);
			// localStorage.setItem('token', token)
			//devuelvo el token y email, con la contraseña null
			return res.json({
				status: 200,
				message: HTTPSTATUSCODE[200],
				data: { user: userInfo, token: token },
			});
		} else {
			return res.json({
				status: 400,
				message: HTTPSTATUSCODE[400],
				data: null,
			});
		}
	} catch (error) {
		return next(error, "Error en login");
	}
});

app.post("/logout", (req, res, next) => {
  console.log("Log out");
	try {
		return res.json({
			status: 200,
			message: HTTPSTATUSCODE[200],
			token: null,
		});
	} catch (error) {
		return next(error);
	}
});

app.get("/", (req, res, next) => {
	res.status(200).json({
		status: 200,
		data: {
			method: "GET",
			message: "Bienvenido a la app. Estás en la ruta base",
		},
	});
});

/*desactivar el encabezado http x-powered-by, que muestra la tecnología con que se desarrolló la api*/
app.disable("x-powered-by");

/*MANEJO DE ERRORES*/
app.use((req, res, next) => {
	let error = new Error();
	error.status = 404;
	error.message = HTTPSTATUSCODE[404];
	next(error);
});

app.use((error, req, res, next) => {
	return res.status(error.status || 500).json(error.message || "Unexpected error");
});

app.listen(PORT, () => console.log(`escuchando en el puerto http://localhost:${PORT}`));
