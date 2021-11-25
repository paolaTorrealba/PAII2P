require('./db/mongo');
const {PORT} = require('./utils/config');
const express = require('express');
const app = express();
const cors = require("cors");
const { handlerError, logger} = require('./utils/middlewares');
const mascotasRouter = require('./routes/mascotasRouter');
const tiposRouter = require('./routes/tiposRouter');
const loginRouter = require('./routes/loginRouter');
const usersRouter = require('./routes/usersRouter');

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
    res.send("<h1> Mi api Mascotas </h1>");
});

app.use('/api/mascotas', mascotasRouter);
app.use("/api/tipos", tiposRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);

app.use(handlerError);


app.listen(PORT, () => {

    console.log("Escuchando en el puerto: " + PORT);
});
