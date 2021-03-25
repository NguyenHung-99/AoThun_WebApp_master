const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

    phanQuyen: {
        type: String,

        default: 'user',
    },
    trangThai: {
        type: String,

        default: 'false',
    }
});
module.exports = Account = mongoose.model('account', accountSchema);