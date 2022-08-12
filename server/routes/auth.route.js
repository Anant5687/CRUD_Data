const express = require('express')
const authrouter = express.Router()
const bcrypt = require('bcryptjs')
const authusers = require('../modals/userSchemaRegister')




authrouter.post('/register', async (req, res) => {
    const { fname, lname, password, email, isAdmin, mobile } = req.body;
    if (!fname || !password || !email) return res.status(404).json({ message: "Require fields are empty" })

    let hash = await bcrypt.hash(password, 10)

    try {
        const emailFind = await authusers.findOne({ email: email })
        if (emailFind) return res.status(404).json({ message: "User already registerd" })

        const newUser = new authusers({
            fname, lname, password: hash, email, isAdmin, mobile
        })
        await newUser.save()

        res.status(200).json(newUser)
    } catch (error) {
        res.status(404).status({ message: error.message })
    }

})

// Login Post Route

authrouter.post('/', async (req, res) => {
    const { email } = req.body;
    const passwords = String(req.body.password)

    try {
        const loginUser = await authusers.findOne({ email })
        if (!loginUser) return res.status(404).json({ message: "User not found" })

        const ispasswordCorrect = await bcrypt.compare(passwords, loginUser.password)

        if (!ispasswordCorrect) return res.status(404).json({ message: "Inncorrect password" })

        const { password, ...other } = loginUser._doc

        res.status(200).json({ ...other })


    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

authrouter.get("/getAllUser", async (req, res) => {
    try {
        const allUser = await authusers.find()
        res.status(200).json(allUser)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})


authrouter.get("/getUser/:userId", async (req, res) => {
    const { userId } = req.params
    try {
        const oneUser = await authusers.findById({ _id: userId })
        res.status(200).json(oneUser)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})
authrouter.delete("/deleteUser/:userId", async (req, res) => {
    const { userId } = req.params
    try {
        const oneUser = await authusers.findByIdAndDelete({ _id: userId })
        res.status(200).json(oneUser)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})
module.exports = authrouter;