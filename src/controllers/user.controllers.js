const User = require('../models/User');

const { encriptarPassword } = require('../helpers/password');

const userController = {};

// devuelve los datos del usuario logeado 
userController.getUser = (req, res) => {
    const userData = req.user
    return res.json(userData);
}

// registra un nuevo usuario en la db
userController.postUser = async (req, res) => {
    const { email, password, name } = req.body;
    
    const passwordEncriptada = encriptarPassword(password);

    const userAct = await User.findOne({ email });
    
    //userAct && res.status(400)
    const newUser = new User({
        name,
        password: passwordEncriptada,
        email
    });

    try {
        await newUser.save();

        const userAct = await User.findOne({ email });

        console.log(userAct)

        return res.json({
            message: 'Usuario cargado correctamente',
            userAct: userAct
        });
    } catch (error) {
        return res.json({
            message: 'No se pudo cargar el usuario.',
            error,
        });
    }
} 

// edita los datos del usuario logeado
userController.putUser = async (req, res) => {
    const userId = req.user._id;
    const { email, password, name } = req.body;

    const filter = { _id: userId, isActive: true }
    const update = {}

    if (email) {
        update.email = email;
    }

    if (password) {
        const passwordEncriptada = encriptarPassword(password);
        update.password = passwordEncriptada;
    }

    if (name) {
        update.name = name;
    }
    
    try{ 
        const userUpdated = await User.findOneAndUpdate(filter, update);

        // busco nuevamente al usuario ya actualizado
        const user = await User.findById(userId)
        //SOLO SE VE EN CONSOLA
        console.log(user);

        if(!userUpdated) {
            return res.status(400).json({
                message: 'No se pudo actualizar el Usuario',
            })
        }
    
        return res.json({
            message: 'El usauario se actualizo correctamente',
            user
        });
    }catch(erro){
        return res.status(400).json({
            message: 'Ocurrio un error al actualizar el usuario',
        });
    }
}

//Elimino el usuario(borrado logico)
userController.deleteUser = async(req, res) => {
    const userId = req.user._id;

    //const filter = { userId }
    const update = { isActive: false }

    try {
        const userUpdated = await User.findOneAndUpdate(userId, update);

        if (!userUpdated) {
            return res.status(400).json({
                message: 'No se pudo eliminar el Usuario.'
            });
        }

        return res.json({
            message: 'Usuario eliminado correctamente.'
        });
    }  catch (error) {
        return res.status(400).json({
            message: 'Ocurrió un error al borrar al Usuario.'
        });
    }
}


module.exports = userController;