const moongose = require('mongoose');
const Schema = moongose.Schema;

const productosSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    precio: {
        type: Number
    },
    imagen: {
        type: String
    }
});

module.exports = moongose.model('Productos', productosSchema);