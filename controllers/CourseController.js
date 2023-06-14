const CourseModel = require("../models/Course")

class CourseController {
    static course_insert = async (req, res) => {
        try {
            // console.log(req.body)
            const result = new CourseModel({
                name:req.body.name,
                email:req.body.email,
                number:req.body.number,
                address:req.body.address,
                gender:req.body.gender,
                qualification:req.body.qualification,
                course:req.body.course,
                user_id:req.user.id
            })

        await result.save()
        req.flash('success', 'Insert Successfully !')

        res.redirect('/course_display')
        }catch (error) {
                console.log(error);
            }
        }

        static Course_display = async(req,res)=>{
            try{
                const data = await CourseModel.find({
                })
                // console.log(data);
                res.render('courses/display',{d:data,message:req.flash('success')})
            }catch(error){
                console.log(error)
            }
        }

        static course_view = async(req,res)=>{
            try{
                // console.log(req.params.id)
                const data = await CourseModel.findById(req.params.id)
                // console.log(data);
                res.render('courses/views',{d:data})
            }catch(error){
                console.log(error)
            }
        }

        static course_edit = async(req,res)=>{
            try{
                // console.log(req.params.id)
                const data = await CourseModel.findById(req.params.id)
                // console.log(data);
                res.render('courses/edit',{d:data})
            }catch(error){
                console.log(error)
            }
        }

        static course_update = async(req,res)=>{
            try{
                // console.log(req.body)
                // console.log(req.params.id)
                const update = await CourseModel.findByIdAndUpdate(req.params.id,{

                    name:req.body.name,
                    email:req.body.email,
                    number:req.body.number,
                    address:req.body.address,
                    gender:req.body.gender,
                    qualification:req.body.qualification,
                    course:req.body.course

                })
                req.flash('success', 'Updated Successfully !')


                res.redirect('/course_display')
            }catch(error){
                console.log(error)
            }
        }

        static course_delete = async(req,res)=>{
            try{
                // console.log(req.body)
                // console.log(req.params.id)
                const update = await CourseModel.findByIdAndDelete(req.params.id)
                req.flash('success', 'Delete Successfully !')

                res.redirect('/course_display')
            }catch(error){
                console.log(error)
            }
        }

        
}
module.exports = CourseController