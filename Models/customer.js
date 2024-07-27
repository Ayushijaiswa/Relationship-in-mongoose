
const mongoose=require('mongoose');
const {Schema}=mongoose;
main().
then(()=>console.log("connection successful"))
.catch((err)=>console.log(err))
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/customer")
}
const orderScehma=new Schema({
  item:String,
  prices:Number,
});


const Order=mongoose.model("Order",orderScehma);
const addorders=async()=>{
    let order1=new Order({
        item:"vadapav",
        prices:8000,
    })
  let result= await order1.save();
  console.log(result);
}


const addOrders=async()=>{
    let result= await Order.insertMany([{
        item:"samosa",
        prices:40,
    },
    {
        item:"maggie",
        prices:40,
    },
{
    item:"chanapoha",
    prices:76.
},]
)
console.log(result);
}

const customerSchema=new Schema({
    name:String,
    orders:[
        {
           type:Schema.Types.ObjectId ,
           ref:"Order"
        }
    ]
})
//customerSchema.pre("findOneAndDelete",async()=>{
  //  console.log("pre")
//})
customerSchema.post("findOneAndDelete",async(customer)=>{
   if(customer.orders.length){
    let data1= await  Order.deleteMany({_id:{$in:customer.orders }})
  console.log(data1)
   }
})
const Customer=mongoose.model("Customer",customerSchema);
const addCustomer=async()=>{

    let cust1=new Customer({
    name:"khushi jaiswal",

 })
  let order1=await Order.findOne({item:"samosa"})
  let order2=await Order.findOne({item:"chanapoha"})
  cust1.orders.push(order1);
  cust1.orders.push(order2);
 let result= await cust1.save();
 console.log(result)
 
}
const findCustomer=async()=>{
  let result=  await Customer.find({}).populate("orders");
  console.log(result[0]);
}


const addCust=async()=>{
    let newCust=new Customer({
        name:"Arjun",
    })
    let newOrder=new Order({
        item:"pizza",
        prices:250,
    })
    newCust.orders.push(newOrder)
    await newOrder.save()
    await newCust.save();
    console.log("added")
}

const delCust=async()=>{
    //onlu delte the customer
    let data=await Customer.findByIdAndDelete("66a53e589ec916b382e320ed");
    console.log(data)
}
delCust()

