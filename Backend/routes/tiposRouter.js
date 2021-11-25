const Tipo = require("../models/Tipo");
const tiposRouter = require("express").Router();
const { verifyToken } = require("../utils/middlewares");

//tiposRouter.use(verifyToken); 

tiposRouter.get("/", (req, res, next) => { 
    Tipo.find({}) 
        .then(tipos => {
            res.json(tipos); 
        })
        .catch(err => {
            next(err);
        });
});

tiposRouter.post("/", (req, res, next) => {
    const { descripcion } = req.body;

    const tipoNuevo = new Tipo({
        descripcion
    });

    tipoNuevo.save() 
        .then(tipoCargado => {
            res.json(tipoCargado); 
        })
        .catch(err => {
            next(err);
        });
});

module.exports = tiposRouter;
