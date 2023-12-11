const Rol = require('../models/roles');
const Permiso = require('../models/permisos');
const { response } = require('express');


const getRoles = async (req, res = response) => {
    try {
        const listaRoles = await Rol.findAll();
        res.json({ listaRoles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener roles' });
    }
}

const getRol = async (req, res = response) => {
    const { id } = req.params;
    try {
        const rol = await Rol.findByPk(id);
        if (rol) {
            res.json(rol);
        } else {
            res.status(404).json({ error: `No se encontró el rol con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el rol' });
    }
}

const putRol = async (req, res = response) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const rol = await Rol.findByPk(id);
        if (rol) {
            await rol.update(body);
            res.json({
                msg: 'El rol fue actualizado exitosamente.'
            });
        } else {
            res.status(404).send(`No se encontró el rol con ID ${id}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el rol' });
    }
}

const postRol = async (req, res = response) => {
    const { nombre, estado, permisos } = req.body;
  
    try {
      // Crea el rol
      const nuevoRol = await Rol.create({ nombre, estado });
  
      // Asigna permisos al rol
      if (permisos && permisos.length > 0) {
        await nuevoRol.setPermisos(permisos);
      }
  
      res.json(nuevoRol);
    } catch (error) {
      console.error("Error al crear el rol:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };

const deleteRol = async (req, res = response) => {
    const { id } = req.params;
    try {
        const rol = await Rol.findByPk(id);
        if (rol) {
            await rol.destroy();
            res.json('El rol fue eliminado exitosamente');
        } else {
            res.status(404).json({ error: `No se encontró un rol con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el rol' });
    }
}


const asignarPermisoRol = async (req, res = response) => {
    const { id_rol, id_permisos } = req.body;
  
    try {
      // Busca el rol por su ID
      const rol = await Rol.findByPk(id_rol, { include: 'permisos' });
  
      if (!rol) {
        // Si no se encuentra el rol, devuelve un error
        return res.status(404).json({ error: "No se encontró un rol con el ID proporcionado" });
      }
  
      // Asigna los permisos al rol
      await rol.setPermisos(id_permisos);
  
      // Retorna el rol actualizado con sus permisos
      const rolConPermisos = await Rol.findByPk(id_rol, {
        include: [{ model: Permiso, as: 'permisos' }],
      });
  
      res.json(rolConPermisos);
    } catch (error) {
      console.error("Error al asignar permisos al rol:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };

module.exports = {
    getRol,
    getRoles,
    postRol,
    putRol,
    deleteRol,
    asignarPermisoRol
};

