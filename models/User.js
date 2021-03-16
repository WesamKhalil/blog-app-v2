const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name."],
        maxLength: [30, "Name can't be longer than 30 characters."],
        validate: [
            { validator: isValidName, message: "Name must only contain alphabet characters and spaces." }
        ]
    },
    email: {
        type: String,
        required: [true, "Please provide an email."],
        unique: [true, "User with that email already exists."]
    },
    password: {
        type: String,
        minLength: [8, "Password must be atleast 8 characters long."],
        maxLength: [50, "Password can't be longer than 50 characters."],
        required: [true, "Please provide a password."],
        // validate: [
        //     { validator: isValidPassword, message: "Password requires one uppercase letter, lowercase letter, number and special character." }
        // ]
    }
})

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.statics.verify = async function(email, password) {
    let errorList = { name: "verify", errors: [] }
    if(!email) errorList.errors.push({ message: "Please provide an email.", type: "email" })
    if(!password) errorList.errors.push({ message: "Please provide a password.", type: "password" })
    if(errorList.errors.length > 0) throw errorList

    const user = await this.findOne({ email })
    
    if(!user) throw { name: "verify", errors: [{ message: "User with that email doesn't exist.", type: "email" }] }


    const correctPassword = await bcrypt.compare(password, user.password)
    if(!correctPassword) throw { name: "verify", errors: [{ message: "Wrong email or password.", type: "general" }] }

    return user
}

function isValidName(name) {
    return /^[a-zA-Z\s]+$/.test(name)
}

module.exports = mongoose.model('user', userSchema)