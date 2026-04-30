import ProductModel from "../../DB/Models/product.model.js";


export const AddProduct = async (req, res) => {

    try {
        const product = req.body
        const newProduct = await ProductModel.create(product)
        return res.status(201).json({
            message: "Product added successfully",
            product: newProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: "Couldn`t add product",
            error: error.message
        })
    }
}

export const ShowProduct = async (req, res) => {

    try {
        const {productName} = req.params;
        const product = await ProductModel.findOne({name:productName})
        if (!product) {
            return res.status(404).json({
                message: "No products found"
            })
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            data: {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch product",
            error: error.message
        })
    }

}

export const removeProduct = async (req, res) => {

    try {
        const { productId } = req.params;
        const removedProduct = await ProductModel.findOneAndDelete(productId)
        if (!removedProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: error.message
            })
        }
        return res.status(200).json({
            message: "Product removed successfully",
            removedProduct: removedProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete product",
            error: error.message
        })
    }

}