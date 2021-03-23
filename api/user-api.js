const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Account = require('../models/accounts');
const Address = require('../models/address');

//Open form đăng kí tài khoản
router.get('/signup', function(req, res, next) {

    res.render('registration', { msg: "helo" });
});

//Tạo tài khoản người dùng
router.post('/create', async(req, res) => {

    User.findOne({ email: req.body.email })
        .then(async(result) => {
            //Email đã tồn tại trong hê thống
            if (result) {
                res.render({ msg: "Email đã được sử dụng!!!" });
            }
            //result = null: email này chưa đăng kí trong hệ thống
            else {
                // Tạo account cho user
                const matKhau = req.body.matKhau;
                let accounts = {};
                accounts.matKhau = matKhau;
                let userAccount = new Account(accounts);
                await userAccount.save();

                //Tạo Address mặc định cho user
                let userAddress = new Address();
                await userAddress.save();

                //Tạo user
                let user = {};
                user.ten = req.body.ten;
                user.sdt = req.body.sdt;
                user.email = req.body.email;
                user.gioiTinh = req.body.gioiTinh;
                user.account = userAccount.id;
                user.diaChi = userAddress.id;
                let users = new User(user);
                await users.save();

            }
        })
        .catch(err => res.status(404).json({ msg: 'Sorry! email not found' }));

});

router.post('/updateAddress/:id', async(req, res) => {

    User.findById(req.params.id).then((user => {
        //Tìm thấy user
        let address = {};
        address.diaChi = req.body.diaChi;
        address.phuongXa = req.body.phuongXa;
        address.quanHuyen = req.body.quanHuyen;
        address.tinhThanhPho = req.body.tinhThanhPho;
        Address.findByIdAndUpdate(user.diaChi, address, { new: true }, function(err, updated) {
            if (err) {
                console.log(err);
            } else {
                res.json({ updated });
            }
        });

    })).catch(err => res.json({
        msg: err.messege,
    }))



});
module.exports = router;