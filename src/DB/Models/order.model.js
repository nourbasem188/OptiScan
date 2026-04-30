import mongoose from "mongoose";
import { Schema,model,Types } from "mongoose";

const OrderSchema=new Schema({

    userId:{type:Types.ObjectId,ref:"User",required:true},
    products:[{
        productId:{type:Types.ObjectId,ref:"Product",required:true},
        quantity:{type:Number,required:true,default:1,min:1}
    }],
    address:String,
    phone:Number,
    status:{type:String,enum:["Pending","Shipped","Delivered","Cancelled"],default:"Pending"},
    payment:{type:String,enum:["Cash on Delivery","Credit Card"," InstaPay"],default:"Cash on Delivery"},
})




const OrderModel=model("Order",OrderSchema);

export default OrderModel;