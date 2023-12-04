const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }

  const tokenParts = token.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(403).json({ mensaje: 'Formato de token inválido' });
  }

  const tokenValue = tokenParts[1];

  const secretKey = process.env.JWT_SECRET || 'secreto-seguro';
  jwt.verify(tokenValue, secretKey, (err, decoded) => {
    if (err) {
      console.error('Error al verificar el token:', err);
      return res.status(500).json({ mensaje: 'Error al verificar el token' });
    }

    req.usuario = decoded;

    // Obtén los roles permitidos para la ruta actual
    const rolesPermitidos = obtenerRolesPermitidos(req.path);

    // Verifica si el rol del usuario está en la lista de roles permitidos
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: 'Acceso no autorizado para este usuario' });
    }

    next();
  });

  // Función para obtener roles permitidos basados en la ruta
  function obtenerRolesPermitidos(ruta) {
    const rolesPorRuta = {
      '/api/usuarios': ['admin'],
      '/api/ventas': ['admin'],
      '/api/productos': ['admin'],
      '/api/agenda': ['admin', 'empleado'],
      '/api/citas': ['admin', 'empleado', 'cliente'],
      '/api/compras': ['admin'],
      '/api/proveedores': ['admin'],
      '/api/insumos': ['admin'],
      '/api/clientes': ['admin'],
      '/api/servicios': ['admin'],
      '/api/empleados': ['admin', 'empleado'],
      '/api/permisos': ['admin'],
      // Agrega más rutas y roles según sea necesario
    };

    return rolesPorRuta[ruta] || [];
  }
}

module.exports = verificarToken;
