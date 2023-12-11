const Insumo = require('../models/insumos');
const { response } = require('express');

const getInsumos = async (req, res = response) => {
    try {
        console.log('Entró a getInsumos');
        // Utiliza findAll para obtener una lista de todos los insumos
        const listInsumos = await Insumo.findAll();
        console.log('Listado de insumos:', listInsumos);
        res.json({ listInsumos });
    } catch (err) {
        console.error('Error en getInsumos:', err);
        res.status(500).json({
            msg: 'Error al obtener la lista de insumos.',
            error: err.message,
        });
    }
};

const getInsumo = async (req, res = response) => {
    try {
        const { id } = req.params;
        const insumo = await Insumo.findByPk(id);
        
        if (insumo){
            res.json(insumo);
        } else {
            res.status(404).json({ msg: 'No se encontró el insumo' });
        }
    } catch (err) {
        console.error('Error en getInsumo:', err);
        res.status(500).json({
            msg: 'Error al obtener el insumo.',
            error: err.message,
        });
    }
};

const putInsumo = async (req, res = response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        const insumo = await Insumo.findByPk(id);
        if (insumo) {
            await insumo.update(body);
            res.json({ msg: `El insumo fue actualizado exitosamente.` });
        } else {
            res.status(404).json({ error: `No se encontró el insumo con ID ${id}` });
        }
    } catch (err) {
        console.error('Error en putInsumo:', err);
        res.status(500).json({
            msg: 'Error al actualizar el insumo.',
            error: err.message,
        });
    }
};

const postInsumo = async (req, res = response) => {
    try {
        const { body } = req;

        const nuevoInsumo = await Insumo.create(body);
        console.log('Se creó un nuevo insumo:', nuevoInsumo);

        res.json({
            msg: "Se creó un nuevo insumo",
            insumo: nuevoInsumo,
        });
    } catch (err) {
        console.error('Error en postInsumo:', err.message);
        res.status(500).json({
            msg: "Hubo un error en la creación del insumo.",
            error: err.message,
        });
    }
};

const deleteInsumo = async (req, res = response) => {
    const { id } = req.params;

    try {
        const insumo = await Insumo.findByPk(id);

        if (insumo) {
            await insumo.destroy();
            res.json({ msg: 'El insumo fue eliminado exitosamente.' });
        } else {
            res.status(404).json({ msg: `No se encontró el insumo con ID ${id}` });
        }
    } catch (err) {
        console.error('Error en deleteInsumo:', err);
        res.status(500).json({
            msg: 'Error al eliminar el insumo.',
            error: err.message,
        });
    }
};

module.exports = {
    getInsumo,
    getInsumos,
    postInsumo,
    putInsumo,
    deleteInsumo,
};
