const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt')
const UserModel = require('../models/User')


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
        res.render("login", { message: req.flash('success') })
    }
    static registration = (req, res) => {
        res.render("registration", { message: req.flash('error') })
    }
    static dashboard = (req, res) => {
        res.render("dashboard")
    }

    static insert = async (req, res) => {
        // console.log(req.files.image)
        const file = req.files.image
        const imageupload = await cloudinary.uploader.upload(file.tempFilePath,{
            folder:'studentimage'
        })
        console.log(imageupload)

    //     const { name, email, password, c_password } = req.body

    //     const user = await UserModel.findOne({ email: email })
    //     // console.log(user)
    //     if (user) {
    //         req.flash('error', 'Email already Exist !')
    //         res.redirect('/registration')


    //     } 
    //     else {
    //         if (name && email && password && c_password) {
    //             if (password == c_password) {
    //                 try {
    //                     const hashpassword = await bcrypt.hash(password,10)
    //                     const result = new UserModel({
    //                         name: name,
    //                         email: email,
    //                         password: hashpassword

    //                     })
    //                     await result.save()
    //                     req.flash('success', 'Registration Successfully ! Please Login here ')
    //                     res.redirect('/')

    //                 } catch (error) {
    //                     console.log(error)
    //                 }


    //             }
    //             else {
    //                 req.flash('error', 'password and confirm password does not match !')
    //                 res.redirect('/registration')

    //             }

    //         } else {
    //             req.flash('error', 'All Fields Are Required !')
    //             res.redirect('/registration')


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
module.exports = FrontController