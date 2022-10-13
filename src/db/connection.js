const mongoose = require('mongoose');

/*const user = 'proyecto_1';
const password = 'GvjIxyFz2e70jNOZ';
const dbname = 'proyecto_express';*/
//const uri = `mongodb+srv://${user}:${password}@cluster0.aixqygc.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const dbConnect = async () => {
    const uri = "mongodb+srv://rocio:rocio@cluster0.aixqygc.mongodb.net/proyecto_express?retryWrites=true&w=majority";

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Conectado a la Base de Datos');
    }).catch(error => {
        console.log('Error al conectar la Base de Datos');
        console.log(error);
    });
}

module.exports = dbConnect;