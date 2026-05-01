import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export const register = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        return res.status(201).json({ message: `Welcome to the database ${newUser.username}` })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        // email (key) represents the fields we want to search on
        // email (value) is what is inside of the req.body under the key of email
        const userToLogin = await User.findOne({ email: email })
        // !userToLogin checks if the user exists
        // Everything after checks if the plain text password matches the password stored in the database
        if (!userToLogin || !bcrypt.compareSync(req.body.password, userToLogin.password)) {
            throw new Error(!userToLogin ? 'Whoopsie (email not found)' : 'Passwords do not match')
        }

        // Adding web token
        // jwt.sign is a method that creates a JSON web token
        // Consists of the headers, payload, and secret
        // Add payload as first argument - payload has key: value pairs, the sub is most important
        // Add secret to second argument - its a string passwqord used to encrypt the third part of the token
        const token = jwt.sign({ sub: userToLogin._id }, process.env.SECRET, { expiresIn: '1d' })

        console.log('Password match, user validated')
        return res.status(202).json({ message: `Welcome back to the database ${userToLogin.username}`, token: token })

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Password or Email is incorrect, please check again" })
    }
}

export const getProfile = async (req, res) => {
  try {
      const userId = req.currentUser // Get the user ID from req.currentUser
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' })
      }

      const profile = await User.findById(userId).populate('characterCreated')
      if (!profile) {
          return res.status(404).json({ message: 'User profile not found' })
      }
      
      console.log(profile)
      return res.json(profile)
  } catch (error) {
      console.log(error)
      return res.status(401).json(error)
  }
}

export const updateUserImage = async (req, res) => {
  try{
    const userId = req.currentUser
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' })
  }
    const { image } = req.body

    const profile = await User.findByIdAndUpdate(userId, { image }, { new: true })
    if (!profile) {
    return res.status(404).json({ message: 'User profile not found' })
}
    console.log(profile)
    return res.json(profile)
  } catch(error) {
      return res.status(401).json(error)
  }
}