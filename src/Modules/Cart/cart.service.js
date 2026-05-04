import CartModel from "../../DB/Models/cart.model.js";
import ProductModel from "../../DB/Models/product.model.js";

export const AddToCart = async (req, res) => {

    try {
        const { productId, quantity } = req.body
        const userId = req.user._id
        const product = await ProductModel.findById(productId)
        if (!product || product.stock < quantity) {
            return res.status(404).json({ message: "Product not available or out of stock" });
        }
        const cart = await CartModel.findOne({ userId })
        if (!cart) {
            // لو معندوش، ننشئ سلة جديدة
            const newCart = await CartModel.create({
                userId,
                products: [{ productId, quantity }],
                totalPrice: product.price * quantity
            });
            return res.status(201).json({ message: "Cart created", cart: newCart });
        }
        const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.products[itemIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
        cart.totalPrice += product.price * quantity;
        await cart.save();
        return res.status(200).json({ message: "Product added to cart", cart, totalPrice: cart.totalPrice });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to add product to cart",
            error: error.message
        })
    }
}

export const UpdateCart = async (req, res) => {

    try {
        const { productId, action } = req.body;
        const userId = req.user._id;
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: "Product not found in cart" });

        const product = await ProductModel.findById(productId);

        if (action === "inc") {
            cart.products[itemIndex].quantity += 1;
            cart.totalPrice += product.price;
        } else if (action === "dec") {
            if (cart.products[itemIndex].quantity > 1) {
                cart.products[itemIndex].quantity -= 1;
                cart.totalPrice -= product.price;
            } else {
                cart.totalPrice -= product.price;
                cart.products.splice(itemIndex, 1);
            }
        } else {
            const totalItemPrice = product.price * cart.products[itemIndex].quantity;
            cart.totalPrice -= totalItemPrice;
            cart.products.splice(itemIndex, 1);
        }
        if (cart.totalPrice < 0) cart.totalPrice = 0;
        await cart.save();
        return res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update cart",
            error: error.message
        })
    }
}

export const ShowCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await CartModel.findOne({ userId }).populate('products.productId');
        if (!cart) {
            // Return empty cart instead of 404
            return res.status(200).json({ message: "Cart fetched successfully", cart: { products: [] } });
        }

        return res.status(200).json({ message: "Cart fetched successfully", cart });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch cart",
            error: error.message
        })
    }
}

export const RemoveFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        cart.products.splice(itemIndex, 1);
        await cart.save();
        return res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to remove product from cart",
            error: error.message
        })
    }
}