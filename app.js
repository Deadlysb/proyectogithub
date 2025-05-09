// importando
// Descargar npm install swagger-jsdoc swagger-ui-express
// Descargar npm install dotenv
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Alumno = require('./models/Alumno');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Iniciando el proyecto express
const app = express();

// Asegurando que los datos se manden en formato json
app.use(express.json());

const swaggerOption = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Alumnos',
            version: '1.0.0',
            description: 'API para gestionar los alumnos'
        },
        servers: [
            {
                url: 'https://proyectogithub-production.up.railway.app/'
            },
            {
                url: 'http://localhost:4000'
            }
        ]
    },
    apis: ['./app.js']
}

const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Otorga permisos
app.use(cors());

const MONGO_URI = process.env.URL_Mongodb;

mongoose.connect(MONGO_URI).then(()=>{
    console.log('se conectó correctamente');
}).catch((err)=>{
    console.log('Error encontrado', err);
});

/**
* @swagger
* /alumnos:
*   post:
*     summary: Crear un nuevo alumno
*     requestBody: 
*          required: true
*          content:
*             application/json:
*                   schema:
*                      type: object
*                      properties:
*                           nombre:
*                               type: string
*                           apellido:
*                               type: string
*                           edad: 
*                               type: integer
*                           genero:
*                                type: string
*                           carrera:
*                                type: string
*                           comentarios:
*                                type: string
*                      required:
*                           - nombre
*                           - apellido
*                           - edad
*                           - genero
*                           - carrera
*     responses:
*           201:
*               description: Alumno de registro correctamente
*           400: 
*               description: Error al registrar
*/

app.post('/alumnos', async (req, res)=>{
    try {
        const nuevoAlumno = new Alumno(req.body);
        await nuevoAlumno.save();
        res.status(201).json({message: 'Alumno registrado correctamente'});
    }
    catch (err) {
        res.status(400).json({message: 'error'});
    }
});

/**
* @swagger
* /alumnos:
*   get:
*     summary: Obtiene todos los alumnos
*     responses:
*           200:
*               description: Lista completa de alumnos
*           400: 
*               description: Error al listar
*/

app.get('/alumnos', async (req, res)=>{
    try {
        const listadoAlumnos = await Alumno.find();
        res.status(200).json(listadoAlumnos);
    }
    catch {
        res.status(400).json({message: "Error al listar"});
    }
});

app.listen(4000, ()=> {
    console.log('Levantado correctamente');
});