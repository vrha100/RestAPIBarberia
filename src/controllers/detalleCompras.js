const DetalleCompras = require('../models/detalleCompras');
const { response } = require('express');

const getDetalleCompras = async (req, res = response) => {
  try {
    const listDetalleCompras = await DetalleCompras.findAll();
    res.json({ listDetalleCompras });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de detalles de compras' });
  }
};

const getDetalleCompra = async (req, res = response) => {
  const { id } = req.params;
  try {
    const detalleCompra = await DetalleCompras.findByPk(id);
    if (detalleCompra) {
      res.json(detalleCompra);
    } else {
      res.status(404).json({ error: `No se encontró el detalle de compra con ID ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el detalle de compra' });
  }
};

const putDetalleCompra = async (req, res = response) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const detalleCompra = await DetalleCompras.findByPk(id);

    if (detalleCompra) {
      await detalleCompra.update(body);
      res.json({ msg: 'El detalle de compra fue actualizado exitosamente' });
    } else {
      res.status(404).json({ error: `No se encontró el detalle de compra con ID ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el detalle de compra' });
  }
};

const postDetalleCompra = async (req, res = response) => {
  const body = req.body;

  try {
    const newDetalleCompra = await DetalleCompras.create(body);
    res.json(newDetalleCompra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el detalle de compra' });
  }
};

const deleteDetalleCompra = async (req, res = response) => {
  const { id } = req.params;

  try {
    const detalleCompra = await DetalleCompras.findByPk(id);

    if (detalleCompra) {
      await detalleCompra.destroy();
      res.json('El detalle de compra fue eliminado exitosamente');
    } else {
      res.status(404).json({ error: `No se encontró el detalle de compra con ID ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el detalle de compra' });
  }
};

module.exports = {
  getDetalleCompra,
  getDetalleCompras,
  postDetalleCompra,
  putDetalleCompra,
  deleteDetalleCompra
};
