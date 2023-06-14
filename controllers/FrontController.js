const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt')
const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')


cloudinary.config({
    cloud_name: 'ddb7jubdi',
    api_key: '981393513955296',
    api_secret: 'tq_dRaC0uDabPcp6WXtjtyBbass',
});


class FrontController {
    static home = (req, res) => {
        res.render("home")
    }
    static about = (req, res) => {
        res.render("about")
    }
    static login = (req, res) => {
        res.render("login", { message: req.flash('success'), error: req.flash("error") })
    }
    static registration = (req, res) => {
        res.render("registration", { message: req.flash('error') })
    }
    static dashboard = async(req, res) => {

        try {
            // console.log(req.user)
            const{name,email,_id,image} = req.user
            res.render("dashboard",{n:name,image:image})
        } catch (error) {
            console.log(error)       
        }
    }

    static insert = async (req, res) => {
        // console.log(req.files.image)
        const file = req.files.image
        const imageupload = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'studentimage'
        })
        console.log(imageupload)

        const { name, email, password, c_password } = req.body

        const user = await UserModel.findOne({ email: email })
        //     // console.log(user)
        if (user) {
            req.flash('error', 'Email already Exist !')
            res.redirect('/registration')


        }
        else {
            if (name && email && password && c_password) {
                if (password == c_password) {
                    try {
                        const hashpassword = await bcrypt.hash(password, 10)
                        const result = new UserModel({
                            name: name,
                            email: email,
                            password: hashpassword,
                            image: {
                                public_id: imageupload.public_id,
                                url: imageupload.secure_url
                            }

                        })
                        await result.save()
                        req.flash('success', 'Registration Successfully ! Please Login here ')
                        res.redirect('/')

                    } catch (error) {
                        console.log(error)
                    }


                }
                else {
                    req.flash('error', 'password and confirm password does not match !')
                    res.redirect('/registration')

                }

            } else {
                req.flash('error', 'All Fields Are Required !')
                res.redirect('/registration')


                //         }
                //     }
                //     const result = new UserModel({
                //         name:req.body.name,
                //         email:req.body.email,
                //         password:req.body.password

                //     })
                //     await result.save()
                //     req.flash('success', 'Registration Successfully ! Please Login here ')
                //     res.redirect('/')

                // }


                // static login = (req,res)=>{
                //     res.send("hello login ")
                // }

            }
        }
    }
    static verify_login = async (req, res) => {
        try {
            const { email, password } = req.body
            if (email && password) {
                const user = await UserModel.findOne({ email: email })
                // console.log(user)
                if (user != null) {
                    const ismatch = await bcrypt.compare(password, user.password)
                    if (ismatch) {
                        // generate token here 
                        const token = jwt.sign({ ID: user._id }, 'anujjain@123#');
                        // console.log(token)
                        res.cookie('token', token)
                        res.redirect('/dashboard')
                    } else {
                        req.flash('error', 'email and password does not match !');
                        res.redirect('/');

                    }

                } else {
                    req.flash('error', 'you are not a register user !');
                    res.redirect('/');

                }

            } else {
                req.flash('error', 'All Fields Are Required !');
                res.redirect('/');


            }
            // console.log(req.body)

        } catch (error) {
            console.log(error);

        }
    }

    static logout = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = FrontController


