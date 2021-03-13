const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.statics.verify = async function(email, password) {
    const user = this.findOne({email})
    
    if(!user) throw new Error("Wrong email.")

    const correctPassword = await bcrypt.compare(password, user.password)

    if(!correctPassword) throw new Error("Wrong email or password.")

    return user
}

module.exports = mongoose.model('user', userSchema)