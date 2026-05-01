import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String } 
})

// Remove password from json response
userSchema.set('toJSON', {
    virtuals: true,
    transform(doc, json) {
        delete json.password
    }
})

userSchema.virtual('taskCreated', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})


// Virtual Field
userSchema.virtual('passwordConfirmation').set(function (value) {
    this._passwordConfirmation = value
})

// Pre-Validation
userSchema.pre('validate', function (next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
        this.invalidate('passwordConfirmation', 'Make sure the passwords match')
    }
    next()
})

// Pre-Save
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12))
    }
    next()
})

// Export so we can assign schema to Model
export default mongoose.model('User', userSchema)