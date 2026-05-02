import mongoose from "mongoose";
import { Schema,model,Types } from "mongoose";

const OrderSchema=new Schema({

    userId:{type:Types.ObjectId,ref:"User",required:true},
    products:[{
        productId:{type:Types.ObjectId,ref:"Product",required:true},
        quantity:{type:Number,required:true,default:1,min:1},
        unitPrice: { type: Number, required: true }, // السعر وقت الطلب
        finalPrice: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true },
    address:{type:String,required:true},
    phone:{type:Number,required:true},
    status:{type:String,enum:["Pending","Shipped","Delivered","Cancelled"],default:"Pending"},
    paymentType:{type:String,enum:["Cash on Delivery","Credit Card"," InstaPay"],default:"Cash on Delivery"}
},{timestamps:true})




const OrderModel=model("Order",OrderSchema);

export default OrderModel;