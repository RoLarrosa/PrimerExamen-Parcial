const jwt = require('jsonwebtoken');
const User = require('../models/User');

const validarJWT = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            msg: 'Error de autenticación - No hay token en la petición'
        });
    };

    try {
        // decodifico el token con la clave secreta y tomo el valor de uid
        const { uid } = await jwt.verify(token, process.env.SECRET)

        const usuario = await User.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                error: 'Token no válido - usuario no existe en BD'
            });
        }

        if (!usuario.isActive) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado false'
            });
        }

        // con la clave _doc obtengo solamente los datos del ususario
        req.user = usuario._doc;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Error de autenticación - Token no válido'
        })
    }
}

module.exports = validarJWT