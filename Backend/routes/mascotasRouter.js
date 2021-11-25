const mascotasRouter = require("express").Router();
const Mascota = require("../models/Mascota");
const { verifyToken } = require("../utils/middlewares");



// descomentar para que el token funcione
// mascotasRouter.use(verifyToken);


//  para realizar una petición, ir a "headers" y poner: "Authorization" --> "Bearer + token"

mascotasRouter.get("/", (req, res, next) => {
    Mascota.find({}).then(mascotas => {
            res.json(mascotas);
    })    
    .catch (error => {
        next(error);
    })
});


mascotasRouter.get("/:id", (req, res, next) => {
    const id = req.params.id;
    Mascota.findById(id).then(mascota => {
        if (mascota){
            res.json(mascota);
        }
        res.status(404).end();
    })
    .catch( error => {
        next(error);
    })
});


mascotasRouter.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Mascota.findByIdAndRemove(id)    
    .then(result => {
        if (result){
            res.status(204).end();
        }
        res.status(404).end();
    })    
    .catch( error => {
        next(error);
    })

});


mascotasRouter.post("/", (req, res, next) => {
    const {nombre, edad, tipo, observaciones, vacunado} = req.body;
        const nuevaMascota = new Mascota({
            nombre,
            edad,
            tipo,
            observaciones,
            vacunado
        });
        nuevaMascota.save()
        .then(mascota => res.json(mascota))        
        .catch( (error) => {
            next (error);
        })

});



mascotasRouter.put("/:id", (req, res, next) => {

    const id = req.params.id;
    const {nombre, edad, tipo, observaciones, vacunado} = req.body;
    if (!nombre || !edad || !tipo || !observaciones) 
          res.status(400)
          .send({ error: "ERROR: Faltan campos de la mascota." })
          .end();
    const infoMascota = {nombre, edad, tipo, observaciones, vacunado}; 
    Mascota.findByIdAndUpdate(id, infoMascota, {new:true}).then(mascota => {

        if (nombre)
        {
            infoMascota.nombre = nombre;
        }

        if (observaciones)
        {
            infoMascota.observaciones = observaciones;
        }

        if (edad)
        {
            infoMascota.edad = edad;
        }

        if (tipo)
        {
            infoMascota.tipo = tipo;
        }

        if (vacunado)
        {
            infoMascota.vacunado = vacunado;
        }

        res.json(mascota);
        res.status(400).end();
    })

    .catch( error => {

        next (error);
    }) 

});


module.exports = mascotasRouter;