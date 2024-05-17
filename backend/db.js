const mongoose=require('mongoose');
const { string } = require('zod');
mongoose.connect("mongodb+srv://admin:1234567890@cluster0.jhdxqmj.mongodb.net/paytm")

const userSchema=mongoose.Schema({
    username:string,
    password:string,
    firstName:string,
    lastName:string
})

const User=mongoose.model('User',userSchema);

module.exports={
    User
}