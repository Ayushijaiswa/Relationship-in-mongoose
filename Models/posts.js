const mongoose=require('mongoose');
const {Schema}=mongoose;
main().
then(()=>console.log("connection successful"))
.catch((err)=>console.log(err))
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/User")
}
const userSchema=new Schema({
    username:String,
    email:String
})
let User=mongoose.model("User",userSchema);
const postScehma= new Schema({
    content:String,
    likes:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})
let Post=mongoose.model("Post",postScehma);
  


const addData=async()=>{
    let user1=new User({
        username:"khushi jaiswal",
        email:"ayushi@gmail.com"

    })
    let post1=new Post({
        content:"hello world",
        likes:7,
    })
    post1.user=user1;
   let result= await user1.save();
let postr=await post1.save();
console.log(postr)
}
 

const findUser=async()=>{
 let user=await User.findOne({username:"khushi jaiswal"})

    let post=new Post({
        content:"bye world",
        likes:78,
    })
    post.user=user;
   
let postr=await post.save();
console.log(postr)

}

const del=async()=>{
    await Post.findByIdAndDelete('66a4ff3e63153623c1e466e7');
    
}
const getData=async()=>{
    let result =await Post.find({}).populate("user","username");
    console.log(result)
}
getData()