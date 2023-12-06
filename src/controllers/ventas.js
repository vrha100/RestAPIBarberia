const Venta = require('../models/ventas');
const DetalleProducto = require('../models/detalleProducto');
const DetalleServicio = require('../models/detalleServicio');
const Producto = require('../models/productos')

const { response } = require('express');

const getVentas = async (req, res = response) => {
  try {
    const ventas = await Venta.findAll();
    res.json({ ventas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener elementos de Venta' });
  }
}

const getVenta = async (req, res = response) => {
  const { id } = req.params;

  try {
    const venta = await Venta.findByPk(id);

    if (venta) {
      res.json(venta);
    } else {
      res.status(404).json({ error: `No se encontró un elemento de Venta con ID ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el elemento de Venta' });
  }
}

const postVentas = async (req, res = response) => {
  // Obtener datos de la solicitud
  const { nueva_venta } = req.body;
  try {
    // Crear la venta
    const productos = nueva_venta.productos;
    const servicios = nueva_venta.servicios;
    const precio = calculateTotalPrice(productos, servicios);
    const venta = await Venta.create({
      id_cita: nueva_venta.citaId,
      id_cliente: nueva_venta.clienteId,
      id_empleado: nueva_venta.empleadoId,
      numeroFactura: nueva_venta.numeroFactura,
      precio: precio,
      estado: 'Pendiente',
      nombre: nueva_venta.nombre,
      apellido: nueva_venta.apellido,
      documento: nueva_venta.documento
    });
    let id_venta = venta.get('id_ventas');
    console.log(productos)
    console.log(servicios)
    // Agregar detalles de productos
    if (productos.length > 0) {
      console.log('Entramos al detalle de productos')
      for (let producto of productos) {
        var valor_total = producto.cantidad * producto.precio;
        try {
          let detalle_prod = await DetalleProducto.create({
            id_ventas: id_venta,
            id_producto: producto.id_producto,
            cantidad: producto.cantidad,
            valor_venta: producto.precio,
            valor_total: valor_total
          });
          console.log('producto registrado')
        } catch (error) {
          console.error('Error al registrar el producto:', error);
          continue;
        }
        const productoActual = await Producto.findByPk(producto.id_producto);
        if (productoActual) {
          productoActual.stock -= producto.cantidad;
          await productoActual.save();
          console.log('Stock actualizado para el producto');
        } else {
          console.error('Producto no encontrado en la base de datos');
        }
      }
    }

    if (servicios.length > 0) {
      console.log('Entramos al detalle de servicios')
      for (let servicio of servicios) {
        var valor_total = servicio.cantidad * servicio.precio;
        try {
          await DetalleServicio.create({
            id_ventas: id_venta,
            id_servicio: servicio.id,
            cantidad: servicio.cantidad,
            valor_venta: servicio.precio,
            valor_total: valor_total
          });
          console.log('servicio registrado')
        } catch (error) {
          console.error('Error al registrar el servicio:', error);
          continue;
        }
      }
    }

    res.status(201).json({
      "message": 'Venta creada exitosamente',
      "venta": venta,
      "productos_vendidos": productos,
      "servicios_vendidos": servicios
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

function calculateTotalPrice(productos, servicios) {
  let totalPrice = 0;
  for (const producto of productos) {
    totalPrice += producto.cantidad * producto.precio;
  }
  for (const servicio of servicios){
    totalPrice += servicio.cantidad * servicio.precio;
  }
  return totalPrice;
}


const anularVenta = async (req, res = response) => {
  const id_ventas = req.params.id; // Supongo que el ID de la venta se pasa como un parámetro en la URL

  try {
    const venta = await Venta.findByPk(id_ventas);

    if (!venta) {
      return res.status(404).json({ error: 'La venta no fue encontrada' });
    }

    // Eliminar la venta
    await venta.destroy();

    return res.json({ message: 'Venta eliminada con éxito' });
  } catch (error) {
    return res.status(500).json({ error: `Error al eliminar la venta: ${error.message}` });
  }
}

const cambiarEstado = async (req, res = response) =>{
  const id_ventas = req.params.id;

  try {
      const venta = await Venta.findByPk(id_ventas);

      if (venta) {
          venta.toggleEstado(); 
          res.json({
              msg: `Estado de la venta actualizado exitosamente. Nuevo estado: ${venta.estado}`,
              venta: venta
          });
      } else {
          res.status(404).json({ error: `No se encontró la venta con el ID: ${id_ventas}` });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el estado de la venta.' });
  }
}

const cancelarVenta = async (req, res = response) => {
  const  { id_ventas } = req.params;

  try {
    const venta = await Venta.findByPk(id_ventas);
    if (!venta) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    if (venta.estado === 'Cancelado') {
      return res.status(400).json({ error: 'La venta ya está cancelada' });
    }
    venta.estado = 'Cancelado';
    await venta.save();

    return res.json({ message: 'Venta cancelada exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  getVentas,
  postVentas,
  anularVenta,
  cancelarVenta
};
