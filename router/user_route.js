const express = require('express')
const router = express.Router()
const User = require('../models/user_model')
const {encryption, decryption} = require('../controller/user_controller')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'info.crypverse@gmail.com',
      pass: 'biqcvkvgprpshukz'
    }
});

router.post('/', async (req, res) => {
    const userPost = new User({
        nama: req.body.nama,
        email: req.body.email,
        password: encryption(req.body.password, req.body.password)
    })

    try {
        const newUser = await userPost.save()
        // newUser.password = req.body.password
        let mailOptions = {
            from: 'info.crypverse@gmail.com',
            to: newUser.email,
            subject: 'Aktivasi Akun Crypverse',
            text: 'haloo!!!',
            html: `
              <img src="https://lh3.googleusercontent.com/fife/AAbDypCmJle2fWmh_-VguDIsGFgEIqgKKA79WvVP-1N-4BTKJ5vDfy5sYMqNSB30LnZdiLBntFhGcYEZdwxcd3uMiAmfINEO4mbowM89x5LixUEvUbgydQ9GBLqgcHgjM3ZcgVqqml4Wruxu42ZdhNHvvZRPnYxM_uBrORs2ZbX_0yFtGV0ELjmEogvosOvCWk-_MvKTkuBu_wd9kEVe-klEwSKyXFMoGrEE0VLjx-bopXP6eboL0hyzIS2Lgx4qQyJJhWBy7_Q7DuKWZOs5Uqaz9A2Nrmc67OeLjppE4yxu7iLfmmHO2WNU-j5eNXGZ0Jvfq_qkKw4LMFmGvNDM23JmqLG7q88onYlA5f8u_Ihl2xxb-3zEIkD32meybZRyenV-UWT93Aa7ZHZbSkobUSu1m0GXjmeq-Y5xllCttqof_QRuQFCWIsw4FosLjP5RaqnQOR56wA0yy4QSeeks1b5UCGC4kj8i8aklUGFpLpSv0hg0LRp7nYCGCHNZFhPF4Mrdw-b5bJLr0fBrT2F78nNZdmxKf7E_v5gxriJ1kBfm72JrRg7-kuY0e9WnpifShfADi9DJoh7lpYvCqueiyWCrZS9XUrhsqJJJYvp8FVaynbIxIfDDRWCWQbychTYBhGMVV00vU3VjejBs19d68D3kf_1wDOQqA9yCslYTzoOU5RXA-epsmcotNkVz9XIsC1GPNDtjFU2-wmRz2G2kaJD1yyWA5WRUyGKo1KW6RnOSZ7foOmCqkgFnmr0rQi2prZDxzQueHgBBhnj_ouiIuxSxLg23dL3FernuD_gwEkkeuncmYh2S2E3PrrTwjgTMk0MweOfjQrYe4y5J-nuFH0IP7FpXD8b5V0MdEj3981TJ6OeRXT5zS4dAPH0_AoiYMKeaKa_UO1IKYfhSbgQ6U99k3sCUo9Kh_8R8DG8FX30lObS2N1Mgro4kJ9cB1eUYyJmiLeXkSiz6nXU7t2Gin2et5IzUhqXf3kvDbvBkqpSL-hb91eP_3cfi2JeNXbzTR-zTZwThaY3L3tev8AYByPaWaJ3Q1p2_4L32XqNsh4gq4EWC60PgSyfUz6j7MnAh1whL13eZnxjsolXHwDTQeaEOT9DKmZrJV65HR_R9ExOc4R4bVQ21voDMQcCuW7HNi0QJcvoXO0NyaWL0eD0UEMpRPkKPrs0IE8EsWDGlPQXvoRvf_Ir60VKGLXSUN8GnDMNSEkRG9da-wVeJoBTc6irCUsy8H3BjGnC7yghj1tYS4S3P0wNTsz9p1r8ESv_P4KiCdtUNztsJvHBECiVftN9AvsSOYDpw6qu3qpWHqOkM98W2MFuh9SA_eSw9khu8EWyUtOSKSako606AA-6ZxakOgqWQnfjDXcBqvmHVfLKBvPiLgQuc2hikeK80kmKq8aN5MT7YUb1AY665y1v5lbPybpEcS1nEROY48N8-q3PQsN1RQw33tIv3PYyK8-EOkDxnzadPlXHB05-WzWrHYcFJecf2mC5XZ5FBV0U78esMKLOlZSQe2wLvvWB3fS_S9MXbuVetY_rhVLDHpT2um8dqO1s17J2Jdxv9TrSEqNkeRIQYu8C_gHO22mn17crNVqYPvBho=w1920-h830" width="100%"/>
              <div style="width: 600px; font-family: Arial, Helvetica, sans-serif;">
                  <h1>Halo, ${newUser.nama}</h1>
                  <p>Saya Kukuh Satrio dari Tim Crypverse mengucapkan terimakasih telah mendaftar akun crypverse. Silahkan aktivasi akun anda dengan menekan tombol aktivasi akun dibawah</p>
                  <p>Apabila ada permasalahan atau ada yang dibingungkan bisa menghubungi email info.crypverse@gmail.com atau bisa langsung membalas email ini</p>
                  <br>
                  <button style="background-color: #BCF2C0; padding: 14px 32px; border-radius: 500px; border: none;"><a href="http://localhost:3000/email-activation/${newUser.id}" style=" color: #0B1E37; text-decoration: none; font-weight: 500;">Aktivasi Akun</a></button>
                  <br>
                  <div>
                      <p>Sekian Terima kasih</p>
                      <p>Salam hangat, Kukuh Satrio</p>
                  </div>
              </div>
            `
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.json(newUser)
    } catch(err) {
        res.json({message: err})
    }
})

router.get('/', async (req, res) => {
    try {
        let allUser = await User.find()
        // for (let i = 0; i < allUser.length; i++) {
        //     allUser[i].nama = decryption(allUser[i].nama, allUser[i].password);
        //     allUser[i].email = decryption(allUser[i].email, allUser[i].password);
        //     allUser[i].password = decryption(allUser[i].password, allUser[i].password);
        // }
        // allUser[1].nama = decryption(allUser[1].nama, "password123")
        res.json(allUser)
    } catch(err) {
        res.json({message: err})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        res.json(user)
    } catch(err) {
        res.json({message: err})
    }
})

module.exports = router