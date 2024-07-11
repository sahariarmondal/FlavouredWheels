import mongoose, { connect } from "mongoose";

export const connectDB = async()=>{
    try{
    await mongoose.connect('mongodb+srv://sahariarmondal1802:2024@cluster0.vrnhnwa.mongodb.net/food-del')
    .then(()=>console.log("DB Connected"))
    }
    catch(error){
        console.log(error)
        console.log("Error while connecting to DB")
    }
    
}