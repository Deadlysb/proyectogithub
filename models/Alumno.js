const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    edad: {type: Number, required: true},
    genero: {type: String, required: true},
    carrera: {type: String, required: true},
    comentarios: {type: String}
}, {
    timestamps: true
});

module.exports = mongoose.model('Alumno', alumnoSchema, 'alumnos');