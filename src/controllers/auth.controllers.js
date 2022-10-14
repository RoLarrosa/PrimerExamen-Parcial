const User = require('../models/User');
const generarJWT = require('../helpers/generarJWT');

const { validarPassword } = require('./../helpers/password');

const authController = {}

authController.postLoginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: 'Error: El usuario no existe.'
        });
    }

    const passwordEncriptada = user.password;
    const validarContra = await validarPassword(password, passwordEncriptada);

    if (!validarContra) {
        return res.status(400).json({
            message: 'Error: La contraseña no es válida.'
        });
    }
    
    // genera el token con el id del usuario
    const token = await generarJWT(user._id)
    
    return res.json({ token });
}

module.exports = authController