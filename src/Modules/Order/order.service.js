import CartModel from "../../DB/Models/cart.model.js";
import OrderModel from "../../DB/Models/order.model.js";
import ProductModel from "../../DB/Models/product.model.js";


export const CreateOrder = async (req, res) => {

    try {
        const userId = req.user._id;
        const {address,phone,paymentType} = req.body;

        const cart=await CartModel.findOne({userId});
        if(!cart || cart.products.length === 0){
            return res.status(404).json({
                message: "Cart not found or empty"
            });
        }
        const orderProducts=[];
        let orderTotalPrice=0;

        for(const item of cart.products){

            const product=await ProductModel.findById(item.productId)
            if(!product || product.stock<item.quantity){
                return res.status(400).json({ message: `Product ${product?.name} is out of stock` });
            }

            orderProducts.push({
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: product.price,
                finalPrice: product.price * item.quantity
            });
            orderTotalPrice += product.price * item.quantity;
            product.stock -= item.quantity;
            await product.save();
        }
        
        const order = await OrderModel.create({
            userId,
            products: orderProducts,
            totalPrice: orderTotalPrice,
            address,
            phone,
            paymentType
        });

        await CartModel.findOneAndDelete({userId},{product:[],totalPrice:0});
        
        return res.status(201).json({
            message: "Order placed successfully",
            order
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create order",
            error: error.message
        });
    }
}