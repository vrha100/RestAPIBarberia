const Compras = require('../models/compras');
const { response } = require('express');
const Detallecompras = require('../models/detalleCompras');
const Productos = require('../models/productos')

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

const getComprasDetalles = async (req, res = response) => {
  try {
    // Obtener todas las compras
    const compras = await Compras.findAll();

    // Verificar si hay compras
    if (!compras || compras.length === 0) {
      return res.status(404).json({ error: 'No se encontraron compras' });
    }

    // Crear un array para almacenar las compras con sus detalles
    const comprasConDetalles = [];

    // Para cada compra, buscar sus detalles
    for (const compra of compras) {
      const detallesCompra = await Detallecompras.findAll({
        where: { id_compra: compra.id_compra },
      });

      // Agregar la compra y sus detalles al array
      comprasConDetalles.push({
        compra,
        detallesCompra,
      });
    }

    // Responder con el array de compras y detalles
    res.json(comprasConDetalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las compras y sus detalles' });
  }
};

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

const cambiarEstadoCompra = async (req, res = response) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const compra = await Compras.findByPk(id, {
      include: [Detallecompras], // Incluir detalles de compra
    });

    if (compra) {
      // Verificar si el estado actual es diferente de "Pagado"
      if (compra.estado !== 'Pagado') {
        // Actualizar solo el campo 'estado'
        await compra.update({ estado: estado });

        // Iterar a través de los detalles de compra y actualizar los productos
        for (const detalle of compra.detallecompras) {
          const producto = await Productos.findByPk(detalle.id_producto);

          if (producto) {
            // Actualizar stock, precioCosto, precios, o cualquier otra lógica que necesites
            // Aquí se supone que tienes métodos o lógica en tu modelo de Producto
            // para actualizar la información según tus necesidades.
            await producto.update({
              stock: producto.stock + detalle.cantidad,
              precioCosto: detalle.precioUnitario, // Suponiendo que precioUnitario es el costo de compra
              precioVenta: detalle.precioVenta,
            });
          }
        }

        res.json({ msg: 'El estado de la compra fue actualizado y productos actualizados exitosamente' });
      } else {
        res.status(400).json({ error: 'La compra ya está marcada como Pagada' });
      }
    } else {
      res.status(404).json({ error: `No se encontró la compra con ID ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el estado de la compra', detalle: error.message });
  }
};

const postCompra = async (req, res = response) => {
  const body = req.body;

  try {
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
  getComprasDetalles,
  postCompra,
  putCompra,
  deleteCompra,
  cambiarEstadoCompra
};
