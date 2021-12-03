const express = require('express')
const router = express.Router()
const Data = require('../modals/data')
const { body, validationResult } = require('express-validator');

router.get('/', async (req,res) => {
    try {
        const data = await Data.find()
        res.json(data)
    } catch (error) {
        res.send(error)
    }
    
})

router.get('/getdatawithid/:id', async (req,res) => {
    try {
        const data = await Data.findById(req.params.id)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
    
})

router.post('/creatdata', [
    body('firstname',"First Name atleast have 5 char").isLength({ min: 3 }),
    body('lastname',"Last Name atleast have 5 char").isLength({ min: 3 }),
    // body('age',"Age above 18 requires").isLength({ min: 18 }),
    body('email',"Enter a Valid Email").isEmail()
] ,async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        let ser = await Data.findOne({email: req.body.email});
        if(ser){
            return res.status(400).json({error:"Sorry a user with this email is already exist"})
        }
        const data = new Data({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            age : req.body.age,
            email : req.body.email,
        })
        const savedData = await data.save()
        res.json(savedData)
    } catch (error) {
        res.json(error)
    }
    
})

router.put('/updatedata/:id' ,async (req,res) => {
    try {
        const data = await Data.findById(req.params.id)
        data.firstname = req.body.firstname
        data.lastname = req.body.lastname
        data.age = req.body.age
        data.email = req.body.email
        const savedData = await data.save()
        res.json(savedData)
    } catch (error) {
        res.json(error)
    }
    
})

router.delete('/deletedata/:id', async (req,res) => {
    try {
        const data = await Data.findByIdAndDelete(req.params.id)
        // const savedData = await data.save()
        res.json("dleted")
    } catch (error) {
        res.json(error)
    }
    
})

module.exports = router