import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

// creating Schema

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob:String,
    gender:String
})

//Encrypting the password with hash function

userSchema.pre('save', async function(next){
    console.log("hiiii")
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})

// Model of Schema

const User = new mongoose.model("User", userSchema)


//Routes

app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            const isMatch =  bcrypt.compare(password, user.password);
            if(isMatch ) {
                res.send({message: "Login Successfull", user: user})
                
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email, password,dob,gender} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password,
                dob,
                gender
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 



app.listen(9002,() => {
    console.log("BE started at port 9002")
})