
const mongoose=require('mongoose');
const {Schema}=mongoose;
main().
then(()=>console.log("connection successful"))
.catch((err)=>console.log(err))
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo")
}
const UserSchema=new Schema({
    username:String,
    addresses:[
        {
            location:String,
            city:String,
        }
    ],
})
const User=mongoose.model("User",UserSchema);
const addUser=async()=>{
    let user1=new User({
        username:"sherlock",
        addresses:[{
            location:"221b bakers street",
            city:"London"
        }]
    })
    user1.addresses.push({
        location:"p32 wallstreet",
        city:"london"
    })
   let result= await user1.save();
   console.log(result)

}
addUser();
