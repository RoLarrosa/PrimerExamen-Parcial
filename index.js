require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const conexionDb = require('./src/db/connection')
conexionDb();

const userRoutes = require('./src/routes/user.routes');
const authRoutes = require('./src/routes/auth.routes');
const taskRoutes = require('./src/routes/task.routes');

app.use(express.json());
app.use(userRoutes);
app.use(authRoutes);
app.use(taskRoutes);


app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
}) 