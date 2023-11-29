const Pagos = require('../models/pagos');
const { response } = require('express');

const getPagos = async (req, res = response) => {
  try {
    const listPagos = await Pagos.findAll();
    res.json({ listPagos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de pagos' });
  }
};

const getPago = async (req, res = response) => {
  const { id } = req.params;
  try {
    const pago = await Pagos.findByPk(id);
    if (pago) {
      res.json(pago);
    } else {
      res.status(404).json({ error: `No se encontró el pago con ID ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el pago' });
  }
};

const putPago = async (req, res = response) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const pago = await Pagos.findByPk(id);

    if (pago) {
      await pago.update(body);
      res.json({ msg: 'El pago fue actualizado exitosamente' });
    } else {
      res.status(404).json({ error: `No se encontró el pago con ID ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el pago' });
  }
};

const postPago = async (req, res = response) => {
  const body = req.body;

  try {
    const newPago = await Pagos.create(body);
    res.json(newPago);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el pago' });
  }
};

const deletePago = async (req, res = response) => {
  const { id } = req.params;

  try {
    const pago = await Pagos.findByPk(id);

    if (pago) {
      await pago.destroy();
      res.json('El pago fue eliminado exitosamente');
    } else {
      res.status(404).json({ error: `No se encontró el pago con ID ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el pago' });
  }
};

module.exports = {
  getPago,
  getPagos,
  postPago,
  putPago,
  deletePago
};
