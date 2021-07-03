const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    }, 
    messages:[
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: Number,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ],
    tokens: [
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
})

//Hashing password
userSchema.pre('save', async function (next) {
    console.log('bcrypt function successfull')
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

//Generating token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token1 = jwt.sign({_id: this.id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token1})
        await this.save();
        return token1;
    } catch (err) {
        console.log(err)
    }
}

//Store the Message
userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({name, email, phone, message})
        await this.save();
        return this.messages;
    } catch (error) {
        console.log("userSchema addmessage", error);
    }
 }

//Create the Collection
const User = mongoose.model('USER', userSchema);

module.exports = User;