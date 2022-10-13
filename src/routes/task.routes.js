const router = require('express').Router();
const validarJWT = require('../middlewares/validarJWT');
const {
    getTasks,
    getTaskById,
    postTask,
    putTask,
    deleteTask
} = require('../controllers/task.controllers')

// Ver las tareas creadas
router.get('/task', [validarJWT], getTasks);

// Ver una sola tarea: Por ID
router.get('/task/:taskId', [validarJWT], getTaskById);

// Crear una tarea:
router.post('/task', [validarJWT], postTask);

// Actualizar una tarea:
router.put('/task/:taskId', [validarJWT], putTask);

// Eliminar una tarea:
router.delete('/task/:taskId', [validarJWT], deleteTask);

module.exports = router;