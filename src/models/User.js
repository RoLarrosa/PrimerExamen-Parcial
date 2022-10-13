const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true
});

// redefino el valor del método toJSON
UserSchema.methods.toJSON = () => {
    let methods;

    if (typeof UserSchema.methods === 'object') {
        // en caso de que methods sea un objeto lo dejo igual
        methods = UserSchema.methods;
    } else {
        // en caso de que methods no sea objeto lo transformo en uno
        methods = UserSchema.methods.toObject();
    }

    const { password, _id, ...user } = methods

    // asigno un nuevo valor llamado uid
    user.uid = _id;

    return user;
}


module.exports = model('Users', UserSchema);