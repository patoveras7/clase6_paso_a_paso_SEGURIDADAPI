const express = require('express');
const router = express.Router();
const libro = require('../models/moldel1');
const {requiredScopes} = require('express-oauth2-jwt-bearer');


router.get('/', requiredScopes('read:libros'), async (req, res) => { 
    try {
        const libros = await libro.find();
        if(libros!=0){
        res.json(libros);
        } else {
            throw error;
        }
        } catch (error) {
        //next(err);    
        res.status(500).json({ error: "Error al obtener la lista de libros, no existen ejemplares para mostrar." });
        }
});

router.get('/:id', requiredScopes('read:libros'), async (req, res) => {
    try {
    const buscarLibro = await libro.findById(req.params.id);
    res.json(buscarLibro);       
    } catch (error) {
        //next(err);    
    res.status(500).json({ error: 'Error obtener el libro buscado, ID inexistente.' });
    }
    });

router.post('/', requiredScopes('read:libros write:libros'), async (req, res) => {//NO HAY QUE PONERLE LA COMA AL LA AUTORIZACION, 
    //DEBE SER IGUAL AL SCOPE EXHIBIDO JUNTO CON LA KEY
    try {
    const nuevoLibro = new libro(req.body);
    if(!nuevoLibro.titulo || !nuevoLibro.genero || !nuevoLibro.paginas){
        throw error;
    }else{
    await nuevoLibro.save();    
    res.json(nuevoLibro);}
    } catch (error) {
        //next(err);    
    res.status(500).json({ error: "Error al crear el registro del libro, no ingreso los parametros requeridos." });
    }
    });
router.put('/:id', requiredScopes('read:libros write:libros'), async (req, res) => {
        try {
            const modificarLibro = await libro.findByIdAndUpdate(req.params.id, req.body,{new: true});
            if(!req.body.titulo || !req.body.genero || !req.body.paginas){
                throw error;
            } else {
            res.json(modificarLibro);
            }
            } catch (error) {
                //next(err);    
            res.status(500).json({ error: "Error al actualizar el registro del libro. Quizas el ID no es el correcto o no ingreso los parametros de body requeridos." });
            }
            });


router.delete('/:id', requiredScopes('read:libros write:libros'), async (req, res) => {
                try {
                await libro.findByIdAndDelete(req.params.id);
                res.json({ message: 'Registro de libro eliminado correctamente' });       
                } catch (error) {
                    //next(err);    
                res.status(500).json({ error: 'Error al eliminar el registro de libro. El id es incorrecto.' });
                }
                });



module.exports = router;