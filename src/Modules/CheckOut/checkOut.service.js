import CheckOutModel from "../../DB/Models/checkOut.model.js";
import CartModel from "../../DB/Models/cart.model.js";

export const placeOrder = async (req, res) => {
    try {
        const realUserId = req.user._id;
        const realUserEmail = req.user.email;
        const { firstName, lastName, mobileNo, address1, address2, country, city, paymentMethod } = req.body;

        const cart = await CartModel.findOne({ userId: realUserId }).populate('products.productId');
        if (!cart || !cart.products || cart.products.length === 0) {
            return res.status(404).json({ message: "No products in cart" });
        }

        let orderTotalPrice = 0;
        const orderProducts = cart.products.map(item => {
            const itemPrice = item.productId ? item.productId.price : 0;
            orderTotalPrice += itemPrice * item.quantity;

            return {
                productId: item.productId._id,
                quantity: item.quantity,
                price: itemPrice
            };
        });

        const shippingFee = 50;
        const finalTotal = orderTotalPrice + shippingFee;

        const newOrder = new CheckOutModel({
            userId: realUserId,
            products: orderProducts,
            billingAddress: { 
                firstName,
                lastName,
                email: realUserEmail,
                mobileNo,
                address1,
                address2,
                country,
                city,
                paymentMethod: paymentMethod || "Cash on Delivery",
                totalPrice: finalTotal
            },
            status: "Pending"
        });

        await newOrder.save();

        await CartModel.findOneAndUpdate({ userId: realUserId }, { products: [] });

        return res.status(201).json({
            success: true,
            message: "Order placed successfully! 🚀",
            orderId: newOrder._id
        });

    } catch (error) {
        console.error("DETAILED ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message
        });
    }
};