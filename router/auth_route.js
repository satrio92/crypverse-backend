const express = require('express')
const router = express.Router()
const User = require('../models/user_model')
const {decryption} = require('../controller/user_controller')


router.post('/', async (req, res) => {
    try {
        me  = await User.findOne({ email: req.body.email})
        const decrypt = decryption(me.password, req.body.password).replaceAll("\x00", "")
        console.log(me == null)
        if (me == null) {
            res.json({message: "User tidak ditemukan"})
        } else if (req.body.password != decrypt) {
            res.json({message: "Password tidak sesuai"})
        } else if (me.isVerified == false) {
            res.json({message: "Email belum diverifikasi"})
        } else {
            res.json(me)
        }

    } catch(err) {
        res.json({message: err})
    }
})

module.exports = router