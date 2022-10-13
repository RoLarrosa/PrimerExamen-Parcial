const { model, Schema } = require('mongoose');

const TaskSchema = new Schema({
    titulo: {
        type: String,
        require: true,
        unique: true,
    },
    descripcion: {
        type: String,
        require: true,
    },
    estado: {
        type: String,
        default: 'No entregado',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = model('Tasks', TaskSchema);