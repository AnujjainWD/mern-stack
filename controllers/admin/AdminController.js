const CourseModel = require('../../models/Course')


class AdminController{

    static dashboard = async(req,res)=>{
        try {
            const {name,email,id,image} = req.user
            const course = await CourseModel.find()
            // console.log(course);
            res.render('admin/dashboard',{n:name,image:image,c:course})

            
        } catch (error) {
            console.log('error')
            
        }

    }

}


module.exports = AdminController