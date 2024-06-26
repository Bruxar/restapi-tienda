const Productos = require('../models/Productos');

/* Configuracion de Multer */
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no valido'))
        }
    },
}

//Pasar config y el campo
const upload = multer(configuracionMulter).single('imagen');

//Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error });
        }
        return next();
    });
}

//Agrega un nuevo producto
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        if (req.file.filename) {
            producto.imagen = req.file.filename;
        }

        //Almacenar registro
        await producto.save();
        res.json({ mensaje: 'Se agrego un nuevo producto' });
    } catch (error) {
        console.log(error);
        next();
    }
}       

//Muestra todos los productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        //Obtener todos los productos
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Muestra un producto en especifico por su ID
exports.mostrarProducto = async (req, res, next) => {
    const producto = await Productos.findById(req.params.idProducto);

    if (!producto) {
        res.json({ mensaje: 'Ese producto no existe' });
        return next();
    }

    //Mostrar el producto
    res.json(producto);
}

//Actualizar producto
exports.actualizarProducto = async (req, res, next) => {
    try {

        let productoAnterior = await Productos.findById(req.params.idProducto);

        //Construir un nuevo producto
        let nuevoProducto = req.body;

        //Verificar nueva imagen
        if(req.file.filename) {
            nuevoProducto.imagen = req.file.filename;
        }else{
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({ _id: req.params.idProducto }, req.body ,{
            new: true
        });

        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Eliminar producto
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Productos.findByIdAndDelete({ _id: req.params.idProducto });
        res.json({ mensaje: 'El producto se ha eliminado' });

    }catch (error) {
        console.log(error);
        next();
    }
}