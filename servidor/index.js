const express = require('express');
const conectarDB = require('./config/db');

//Creamo el servidor
const app = express();
//Conectamos a la base de datos
conectarDB();

app.use(express.json());

app.use('/api/products', require('./routes/product'));

app.listen(4000, () => {
    console.log('El servidor esta funcionando en el puerto 4000');
});

