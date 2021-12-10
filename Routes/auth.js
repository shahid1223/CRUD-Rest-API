const express = require('express')
const router = express.Router()
const User = require('../modals/User')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');var jwt = require('jsonwebtoken');var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const JWT_SECRET = "okokok"

router.get('/createuser', [
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let ser = await User.findOne({ email: req.body.email });
        if (ser) {
            return res.status(400).json({ error: "Sorry a user with this email is already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPas = await bcrypt.hash(req.body.password, salt)
        let user = await User.create({
            email: req.body.email,
            password: secPas,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })
        res.json(user)
    } catch (error) {
        res.json("Internal server errror")
    }

})

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email , password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.json({error:"Try to login with correct credentials"});
        }
        const passwodcampare = await bcrypt.compare(password,user.password)
        if(!passwodcampare){
            return res.status(400).json({error:"Try to login with correct credentials"});
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
})
module.exports = router