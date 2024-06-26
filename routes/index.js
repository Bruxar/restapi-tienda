const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');

module.exports = function () {

    /** Clientes **/

    //Agrega nuevos clientes POST
    router.post('/clientes', clienteController.nuevoCliente);

    //Obtener todos los registros de clientes GET
    router.get('/clientes', clienteController.mostrarClientes);

    //Muestra un cliente en especifico por su ID
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    //Actualizar cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    //Eliminar cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    /** Productos **/

    //Agrega nuevos productos POST
    router.post('/productos',
        productosController.subirArchivo,
        productosController.nuevoProducto);

    //Muestra todos los productos
    router.get('/productos', productosController.mostrarProductos);

    //Muestra un producto en especifico por su ID
    router.get('/productos/:idProducto', productosController.mostrarProducto);

    //Actualizar producto
    router.put('/productos/:idProducto',
        productosController.subirArchivo,
        productosController.actualizarProducto);
    
    //Eliminar producto
    router.delete('/productos/:idProducto', productosController.eliminarProducto);

    /** Pedidos **/
    //Agrega nuevos pedidos
    router.post('/pedidos', pedidosController.nuevoPedido);

    //Mostar todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);

    //Muestra un pedido en especifico por su ID
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);

    //Actualizar un pedido
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);

    //Elimina un pedido
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);

    return router;
}

