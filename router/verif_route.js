const express = require('express')
const router = express.Router()
const User = require('../models/user_model')
const {decryption} = require('../controller/user_controller')

router.get('/:id', async (req, res) => {
    const verif = {$set: 
        {
            isVerified: true,
        }
    }
    try {
        let update  = await User.updateOne({_id: req.params.id}, verif)
        let me = await User.findOne({ _id: req.params.id })
        // console.log(json(me))
        if (update.modifiedCount > 0) {
            res.render('email-validated', {name: me.nama})
        } else if(update.modifiedCount <= 0) {
            if (me.isVerified == true) {
                res.json({message: "Email already active"})
            } else {
                res.json({message: "Activation email failed"})
            }
        }
    } catch(err) {
        res.json({message: err})
    }
})


module.exports = router