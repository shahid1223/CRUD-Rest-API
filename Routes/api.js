const express = require('express')
const router = express.Router()
const Data = require('../modals/data')

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

router.post('/creatdata', async (req,res) => {
    try {
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

router.put('/updatedata/:id', async (req,res) => {
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