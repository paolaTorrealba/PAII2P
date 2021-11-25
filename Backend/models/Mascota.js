const mongoose = require('mongoose');

const {model, Schema} = mongoose;


const mascotaSchema = new Schema({
        nombre : {type: String, required : true},
        edad : {type: Number, required: true, min:0, max:30},
        tipo : {type: String, required : true},
        observaciones : {type: String},
        vacunado : {type: Boolean, required : true},
});

mascotaSchema.set('toJSON', {
    transform:( (document, mascotasToJSON) => {

        mascotasToJSON.id = mascotasToJSON._id.toString();
        delete mascotasToJSON._id;
        delete mascotasToJSON.__v;

    })
})

module.exports = model('Mascota', mascotaSchema);
