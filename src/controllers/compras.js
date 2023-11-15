const Compras = require('../models/compras');
const { response } = require('express');

const getCompras = async (req, res = response) => {
  try {
    const listCompras = await Compras.findAll();
    res.json({ listCompras });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de compras' });
  }
}

const getCompra = async (req, res = response) => {
  const { id } = req.params;
  try {
    const compra = await Compras.findByPk(id);
    if (compra) {
      res.json(compra);
    } else {
      res.status(404).json({ error: `No se encontró la compra con ID ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la compra' });
  }
}

const putCompra = async (req, res = response) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const compra = await Compras.findByPk(id);

    if (compra) {
      await compra.update(body);
      res.json({ msg: 'La compra fue actualizada exitosamente' });
    } else {
      res.status(404).json({ error: `No se encontró la compra con ID ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la compra' });
  }
}

const postCompra = async (req, res = response) => {
  const body = req.body;

  try {
    // Calcular el total de la compra
    const total = body.cantidad * body.precio_unitario;
    body.total = total; // Agregar el total al objeto de compra

    const newCompra = await Compras.create(body);
    res.json(newCompra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la compra' });
  }
}


const deleteCompra = async (req, res = response) => {
  const { id } = req.params;

  try {
    const compra = await Compras.findByPk(id);

    if (compra) {
      await compra.destroy();
      res.json('La compra fue eliminada exitosamente');
    } else {
      res.status(404).json({ error: `No se encontró la compra con ID ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la compra' });
  }
}

module.exports = {
  getCompra,
  getCompras,
  postCompra,
  putCompra,
  deleteCompra
};
