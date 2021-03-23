const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    matKhau: {
        type: String,
        require: true,
    },
    phanQuyen: {
        type: String,

        default: 'user',
    },
    trangThai: {
        type: String,

        default: 'true',
    }
});
module.exports = Account = mongoose.model('account', accountSchema);