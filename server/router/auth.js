const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../db/conn");
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});

// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;
//     if(!name  || !email || !phone || !work || !password || !cpassword ){
//         return res.status(422).json({error: "Plz filled the field properly"});
//     }
//     User.findOne({email: email})
//     .then((userExis) => {
//         if(userExis){
//             return res.status(422).json({error: 'Email already Exist'});
//         }
//         const user = new User({name, email, phone, work, password, cpassword});

//         user.save().then(() => {
//              res.status(201).json({massage: 'user registered successfuly'});

//         }).catch((err) => res.status(500).json({error: "faild to registered"}));
//     }).catch(err => {console.log(err); })

//});


router.post('/register', async(req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if(!name  || !email || !phone || !work || !password || !cpassword ){
        return res.status(422).json({error: "Plz filled the field properly"});
    }
    try{
        const userExis = await User.findOne({email: email});
        if(userExis){
            return res.status(422).json({error: 'Email already Exist'});
        } else if(password != cpassword){
            return res.status(422).json({error: 'Password are not matching'});

        } else{
            const user = new User({name, email, phone, work, password, cpassword});
            await user.save() ;           
            res.status(201).json({massage: 'user registered successfuly'});
        
        }
        }
    catch(err) {
        console.log(err); }  
});



//login route

router.post('/signin', async (req, res) =>{
    try{
        const { email, password } = req.body;
        if (!email || !password){
            return res.status(400).json({error: "Plz Filled the data"});
        }

        const userLogin = await User.findOne({email: email});
        console.log(userLogin);
       
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            if(!isMatch){
                res.status(400).json({error: "Invalid Credientials Pass"});
            } else {
                res.json({massage: "user Signin Successfully"});
            } 

        } else {
            res.status(400).json({error: "Invalid Credientials"});

        }

       
    }
    catch(err){
    console.log(err);
    }
});

module.exports = router;

