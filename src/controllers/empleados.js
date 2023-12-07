const Empleado = require('../models/empleados');
const { response } = require('express');

const getEmpleados = async (req, res = response) => {
    try {
        const empleados = await Empleado.findAll();
        res.json({ empleados });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los empleados ' });
    }
}

const getEmpleado = async (req, res = response) => {
    const id_empleado = req.params.id;

    try {
        const empleado = await Empleado.findByPk(id_empleado);

        if (empleado) {
            res.json(empleado);
        } else {
            res.status(404).json({ error: `Empleado no encontrado ${documento}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el empleado' });
    }
}

const postEmpleado = async (req, res = response) => {
    const { nombre, apellido, correo, documento, telefono, estado } = req.body;
    console.log(nombre, apellido, correo, documento, telefono, estado)

    try {
        const crearempleado = await Empleado.create({
            nombre: nombre,
            apellido: apellido,
            correo: correo, 
            documento: documento, 
            telefono: telefono, 
            estado: estado
        });
        res.status(201).json({ message: 'Empleado agregado exitosamente', empleado: crearempleado });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al agregar el empleado' + error});
    }
}


const putEmpleado = async (req, res = response) => {
    const id_empleado = req.params.id;
    const updatedData = req.body;

    console.log(id_empleado, updatedData);

    try {
        const empleado = await Empleado.findByPk(id_empleado);

        if (empleado) {
            await empleado.update(updatedData);
            res.json({
                msg: `Empleado actualizado exitosamente.`,
                empleado: empleado
            });
        } else {
            res.status(404).json({ error: `No se encontró el empleado con el ID: ${id_empleado}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el empleado' });
    }
}

const cambiarEstadoEmpleado = async (req, res = response) => {
    const id_empleado = req.params.id;

    try {
        const empleado = await Empleado.findByPk(id_empleado);

        if (empleado) {
            empleado.toggleEstado(); 
            res.json({
                msg: `Estado del empleado actualizado exitosamente. Nuevo estado: ${empleado.estado}`,
                empleado: empleado
            });
        } else {
            res.status(404).json({ error: `No se encontró el empleado con el ID: ${id_empleado}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el estado del empleado' });
    }
};

module.exports = {
    getEmpleado,
    getEmpleados,
    postEmpleado,
    putEmpleado,
    cambiarEstadoEmpleado
};