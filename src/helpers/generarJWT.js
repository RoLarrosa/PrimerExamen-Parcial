const jwt = require('jsonwebtoken');

const generarJWT = uid => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { uid }, // encierra el id del usuario en un objeto
            process.env.SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if(err){
                    reject('No se pudo generar el token');
                }

                // resuelve la promesa y retorna el token
                resolve(token);
            }
        );
    });
}

module.exports = generarJWT;