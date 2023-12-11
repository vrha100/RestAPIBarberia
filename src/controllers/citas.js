const Citas = require('../models/citas');
const { response } = require('express');
const moment = require('moment');
const { Op } = require('sequelize');
const Citas_Servicios = require('../models/citas_servicios');

const getCitas = async (req, res = response) => {
  try {
    const listCitas = await Citas.findAll();
    res.json({ listCitas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de citas' });
  }
}

const getCitasHoy = async (req, res = response) => {
  try {
    // Obtener la fecha actual en formato 'YYYY-MM-DD'
    const fechaActual = moment().format('YYYY-MM-DD');

    // Obtener las citas del día actual con estado "Programado"
    const listCitas = await Citas.findAll({
      where: {
        [Op.and]: [
          {
            Fecha_Atencion: {
              [Op.gte]: fechaActual + 'T00:00:00.000Z', // Mayor o igual que la fecha actual
              [Op.lt]: fechaActual + 'T23:59:59.999Z', // Menor que el final del día
            },
          },
          {
            estado: 'Programada',
          },
        ],
      },
    });

    res.json({ listCitas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de citas' });
  }
};

const getCita = async (req, res = response) => {
  const { id } = req.params;
  try {
    const cita = await Citas.findByPk(id);
    if (cita) {
      res.json(cita);
    } else {
      res.status(404).json({ error: `No se encontró la cita con ID ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la cita' });
  }
}

const putCita = async (req, res = response) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const cita = await Citas.findByPk(id);

    if (cita) {
      await cita.update(body);
      res.json({ msg: 'La cita fue actualizada exitosamente' });
    } else {
      res.status(404).json({ error: `No se encontró la cita con ID ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la cita' });
  }
}

const putCitaEstado = async (req, res = response) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const cita = await Citas.findByPk(id);

    if (cita) {
      await cita.update(body);
      res.json({ msg: 'La cita fue actualizada exitosamente' });
    } else {
      res.status(404).json({ error: `No se encontró la cita con ID ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la cita' });
  }
}

const postCita = async (req, res = response) => {
  const body = req.body;

  try {
    const newCita = await Citas.create(body);
    res.json(newCita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la cita' });
  }
}

const deleteCita = async (req, res = response) => {
  const { id } = req.params;

  try {
    const cita = await Citas.findByPk(id);

    if (cita) {
      await cita.destroy();
      res.json('La cita fue eliminada exitosamente');
    } else {
      res.status(404).json({ error: `No se encontró la cita con ID ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la cita' });
  }
}

module.exports = {
  getCita,
  getCitas,
  getCitasHoy,
  postCita,
  putCita,
  putCitaEstado,
  deleteCita
};
