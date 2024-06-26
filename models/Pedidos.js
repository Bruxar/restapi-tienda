const moongose = require('mongoose');
const Schema = moongose.Schema;

const pedidosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes'
    },
    pedido: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'Productos'
        },
        cantidad: Number
    }],
    total: {
        type: Number
    }
});

module.exports = moongose.model('Pedidos', pedidosSchema);