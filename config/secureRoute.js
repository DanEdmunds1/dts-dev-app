import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export default async function secureRoute(req, res, next) {
    try {
        console.log("AUTH HEADER:", req.headers.authorization)

        if (!req.headers.authorization) throw new Error('Missing headers')

        const token = req.headers.authorization.replace('Bearer ', '')
        console.log("TOKEN:", token)

        const payload = jwt.verify(token, process.env.SECRET)
        console.log("PAYLOAD:", payload)

        const userToVerify = await User.findById(payload.sub)
        console.log("USER FOUND:", userToVerify)

        if (!userToVerify) throw new Error('User not found')

        req.currentUser = userToVerify
        console.log("REQ.CURRENTUSER SET TO:", req.currentUser._id)

        next()

    } catch (error) {
        console.log("SECURE ROUTE ERROR:", error)
        return res.status(401).json({ message: 'Log in for Authorization' })
    }
}
