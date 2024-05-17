
const { User } = require("../db");
const router=express.Router()
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const zod=require("zod")

const signupbody=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post("/signup",async(req,res)=>{

    const{success}=signupbody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const extingUser=await findOne({
        username:req.body.username
    })
    if(extingUser){
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
    })}

    const user=await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId=User._id

    const token =jwt.sign({
        userId
    },JWT_SECRET)

    res.json({
        message: "User created successfully",
        token: token
    })
})


    const signinBody = zod.object({
        username: zod.string().email(),
        password: zod.string()
    })

    
    router.post("/signin", async (req, res) => {
        const { success } = signinBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            })
        }
    
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });
    
        if (user) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET);
      
            res.json({
                token: token
            })
            return;
        }
    
        
        res.status(411).json({
            message: "Error while logging in"
        })
    })












module.exports=router

