const Agenda = require('../models/agenda');
const { response } = require('express');

const getAgendas = async (req, res = response) => {
    try {
        const agendas = await Agenda.findAll();
        res.json({ agendas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener elementos de Agenda' });
    }
}

const getAgenda = async (req, res = response) => {
    const { id } = req.params;

    try {
        const agenda = await Agenda.findByPk(id);

        if (agenda) {
            res.json(agenda);
        } else {
            res.status(404).json({ error: `No se encontró un elemento de Agenda con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el elemento de Agenda' });
    }
}

const putAgenda = async (req, res = response) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const agenda = await Agenda.findByPk(id);

        if (agenda) {
            await agenda.update(updatedData);
            res.json({
                msg: `El elemento de Agenda fue actualizado exitosamente.`
            });
        } else {
            res.status(404).json({ error: `No se encontró un elemento de Agenda con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el elemento de Agenda' });
    }
}



const postAgenda = async (req, res = response) => {
    const newEntryData = req.body;

    try {
        const createdAgendaItem = await Agenda.create(newEntryData);
        res.status(201).json({ message: 'Agenda guardada exitosamente', agenda: createdAgendaItem });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al crear un elemento de Agenda' });
    }
}


const deleteAgenda = async (req, res = response) => {
    const { id } = req.params;

    try {
        const agenda = await Agenda.findByPk(id);

        if (agenda) {
            await agenda.destroy();
            res.json('Elemento de Agenda eliminado exitosamente');
        } else {
            res.status(404).json({ error: `No se encontró un elemento de Agenda con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el elemento de Agenda' });
    }
}

module.exports = {
    getAgenda,
    getAgendas,
    postAgenda,
    putAgenda,
    deleteAgenda
};
