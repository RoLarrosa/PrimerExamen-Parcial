const router = require('express').Router();
const validarJWT = require('../middlewares/validarJWT');
const { getUser, postUser, putUser, deleteUser } = require('../controllers/user.controllers');

// Conseguir datos del usuario loggeado
router.get('/user', [validarJWT], getUser);

// Agregar un usuario
router.post('/user', [], postUser);

//Actualizar usuario
router.put('/user', [validarJWT], putUser);

//Borrar usuario
router.delete('/user',[validarJWT], deleteUser)

module.exports = router; 