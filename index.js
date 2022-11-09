require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const conexionDb = require('./src/db/connection')
const cors = require('cors')
conexionDb();

app.use(cors())

const userRoutes = require('./src/routes/user.routes');
const authRoutes = require('./src/routes/auth.routes');
const taskRoutes = require('./src/routes/task.routes');

//middleware se usa para analizar las solicitudes entrantes con cargas JSON
app.use(express.json());

//Especifico las rutas que voy a utilizar
app.use(userRoutes);
app.use(authRoutes);
app.use(taskRoutes);


app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
}) 