const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); 
const socketIO = require('socket.io');

const authController = require('../controllers/authController');
const { sequelize } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8095;
    this.path = '/api';
    this.middlewares();
    this.routes();
    this.createServer(); 
    this.sockets(); 
  }

  createServer() {
    this.server = http.createServer(this.app);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Está escuchando por el puerto ${this.port}`);
    });
  }

  middlewares() {
    this.app.use(express.static(__dirname + '/public'));
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  routes() {
    this.app.post(`${this.path}/login`, authController.iniciarSesion);
    this.app.use(this.path,require('../routes/roles')) 
    this.app.use(this.path,require('../routes/usuarios'))  
    this.app.use(this.path,require('../routes/permisos'))
    this.app.use(this.path,require('../routes/ventas')) 
    this.app.use(this.path,require('../routes/productos')) 
    this.app.use(this.path,require('../routes/agenda')) 
    this.app.use(this.path,require('../routes/citas'))  
    this.app.use(this.path,require('../routes/compras'))  
    this.app.use(this.path, require('../routes/registroFacial'))
    this.app.use(this.path,require('../routes/proveedores'))
    this.app.use(this.path,require('../routes/insumos'))  
    this.app.use(this.path,require('../routes/clientes'))  
    this.app.use(this.path,require('../routes/servicios'))
    this.app.use(this.path,require('../routes/empleados'))
    this.app.use(this.path,require('../routes/detalleCompras'))
    this.app.use(this.path,require('../routes/citas_servicios'))
  }

  sockets() {
    this.io = socketIO(this.server, {
      cors: {
        origin: 'http://localhost:3001',
        methods: ['GET','POST'],
        credentials: true,
      },
    });

    // Manejo de eventos de Socket.IO aquí...
    this.io.on('connection', (socket) => {
      console.log('Conectado');

      socket.on('mensaje', (data) => {
        console.log('Mensaje recibido:', data);
        console.log('mensaje', '¡Hola felix Por fin!');
      });

      socket.emit('mensaje', '¡Hola felix Por fin!');
    });
  }
}

module.exports = Server;

