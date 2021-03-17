const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { v4: uuidv4 }  = require('uuid')

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
    },
    userPostsId: {
        type: String
    }
})

//Before your created password is saved on the database it is encrypted using bcrypt.
//We also create a second id that ties a user to their posts to avoid using the user _id as we use it to create a token.
//And we don't want to expose users emails on the app so that's not an option.
userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10)
    this.userPostsId = await uuidv4()
    next()
})

//Create a user verification function on the User model to use in the userApiController.
userSchema.statics.verify = async function(email, password) {
    let errorList = { name: "verify", errors: [] }
    if(!email) errorList.errors.push({ message: "Please provide an email.", type: "email" })
    if(!password) errorList.errors.push({ message: "Please provide a password.", type: "password" })
    if(errorList.errors.length > 0) throw errorList

    const user = await this.findOne({ email }).select('name password userPostsId').lean()
    
    if(!user) throw { name: "verify", errors: [{ message: "User with that email doesn't exist.", type: "email" }] }


    const correctPassword = await bcrypt.compare(password, user.password)
    if(!correctPassword) throw { name: "verify", errors: [{ message: "Wrong email or password.", type: "general" }] }

    return { name: user.name, _id: user._id, userPostsId: user.userPostsId }
}

//Function for validating a valid name format, alphabet characters and spaces only allowed in name.
function isValidName(name) {
    return /^[a-zA-Z\s]+$/.test(name)
}

module.exports = mongoose.model('user', userSchema)