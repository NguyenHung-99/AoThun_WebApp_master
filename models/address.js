const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({

    diaChi: {
        type: String,
        default: "",
    },
    phuongXa: {
        type: String,
        default: "",
    },
    quanHuyen: {
        type: String,
        default: "",
    },
    tinhThanhPho: {
        type: String,
        default: "",
    }
});
module.exports = Address = mongoose.model('address', addressSchema);