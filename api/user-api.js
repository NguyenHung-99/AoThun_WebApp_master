const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Account = require('../models/accounts');
const Address = require('../models/address');
const Swal = require('sweetalert2');

//Open form đăng kí tài khoản
router.get('/signup', async function(req, res, next) {

    res.render('registration', { msg: req.flash('msg') });
});

//Tạo tài khoản người dùng
router.post('/create', async(req, res) => {
    User.findOne({ email: req.body.email })
        .then(async(result) => {
            //Email đã tồn tại trong hê thống
            if (result) {
                req.flash('msg', 'Email đã được sử dụng!!!')
                res.redirect('/api/signup');
            }
            //result = null: email này chưa đăng kí trong hệ thống
            else {
                // Tạo account cho user
                let userAccount = new Account();
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
                // res.render('login', { msg: "Đăng kí thành công!!!" });
            }
        })
        .catch(err => res.status(404).json({ msg: 'Sorry! email not found' }));
});
//open login form
router.get('/login', async(req, res, next) => {
    //sử dụng flash để lấy được msg thông báo từ form login
    res.render('login', { msg: req.flash('msg') });
})
router.get('/home', (req, res) => {
    //sử dụng flash để lấy được msg thông báo từ form login
    res.render('home', { msg: req.flash('msg') });
})
router.post('/confirm', async(req, res) => {
    User.findOne({ email: req.body.email }).then((result) => {
        if (result) {
            console.log(result);
        } else {
            //chưa có tài khoản trong hệ thống
            req.flash('msg', 'Tài khoản không hợp lệ!! Vui lòng đăng kí tài khoản!!')
            res.redirect('/api/login');
        }
    }).catch(err => res.status(404).json({ msg: 'Sorry! email not found' }));
    // User.findOne({ email: req.body.email }).then(async(result) => {
    //     if (result) {
    //         Account.findById(result.account).then(user => {
    //             //password true => login, false thông báo msg
    //             if (req.body.matKhau === user.matKhau) {
    //                 req.flash('msg', 'login success');
    //                 res.redirect('/api/home');
    //                 //res.render('home', { msg: "Đăng nhập thành công" });
    //             } else {
    //                 req.flash('msg', 'Mật khẩu không hợp lệ!! Vui lòng nhập lại mật khẩu!!')
    //                 res.redirect('/api/login');
    //             }
    //         }).catch(err => res.json({
    //             msg: err.messege,
    //         }))
    //     } else {
    //         //chưa có tài khoản trong hệ thống
    //         req.flash('msg', 'Tài khoản không hợp lệ!! Vui lòng đăng kí tài khoản!!')
    //         res.redirect('/api/login');
    //     }
    // }).catch(err => res.status(404).json({ msg: 'Sorry! email not found' }));

})

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