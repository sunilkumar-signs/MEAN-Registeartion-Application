const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');


require('../db/conn');
const User = require("../model/userSchema");

// router.get('/', (req, res) => {
//     res.send('hello world from the server router file')
// });

router.post('/register', async (req, res) => {
    console.log(req.body)

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ err: "Please fill the fields properly" })
    }
    try {
        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password are not macthing" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            //Before save bcrypt will run 
            await user.save();

            res.status(201).json({ message: "user registered successfully" });
        }
    } catch (err) {
        console.log(err)
    }
});

router.post('/signin', async (req, res) => {
    try {
        console.log("inside /signin", req.body)
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the details properly" });
        }

        const userLogin = await User.findOne({ email: email });

        console.log("userLogin", userLogin)

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            console.log("before auth", isMatch)
            const token = await userLogin.generateAuthToken();
            console.log('the token is:', token)
            console.log(password, userLogin.password)


            res.cookie("jwtoken", token, { //takes name:string and value:string(this value comes from userschema )
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true  //for secure connection 
            })
            console.log("After auth", isMatch)

            if (!isMatch) {
                res.status(400).json({ error: "Invalid credential pass" });
            } else {
                res.status(200).json({ message: "login was successful" });
            }
        } else {
            res.status(400).json({ error: "Invalid credential email" });
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/about', authenticate, (req, res) => {
    console.log("Hello, About page");
    res.send(req.rootUser);
});



//get user data for contact us and Home page
router.get('/getdata', authenticate, (req, res) => {
    console.log("Hello, Contact us page");
    res.send(req.rootUser);

});

router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name, !email, !phone, !message) {
            console.log("error in contact form");
            return res.json({ error: "Please fill the contact form" })
        }

        const userContact = await User.findOne({ _id: req.userID });

        console.log(userContact)

        if (userContact) {

            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({ message: "user contact message sent successfully" })
        }
    } catch (error) {
        console.log(error);
    }
});

//Logout page
router.get('/logout', (req, res) => {
    console.log("Hello, you have been logged out");
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send("User logout successful");
});


module.exports = router;