import ProductModel from "../../DB/Models/product.model.js";
import CategoryModel from "../../DB/Models/category.model.js";



export const AddProduct = async (req, res) => {

    try {
        const {
            name, price, description,
            category, shape, color, material, stock
        } = req.body
        const existingProduct = await ProductModel.findOne({ name })
        if (existingProduct) {
            return res.status(400).json({
                message: "Product already exists!"
            })
        }
        const imagePath = req.file ? req.file.path : null;
        if (!imagePath) {
            return res.status(400).json({
                message: "Image is required"
            })
        }
        const newProduct = await ProductModel.create({
            name,
            price,
            description,
            image: imagePath,
            category,
            shape,
            color,
            material,
            stock
        })
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
        const { productName } = req.params;
        const product = await ProductModel.findOne({ name: productName })
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

export const ShowAllProducts = async (req, res) => {
    try {
        const { category, shape, color, material, search, minPrice, maxPrice } = req.query;
        
        let filter = {};

        if (category) filter.category = category;

        if (shape) filter.shape = shape;
        if (color) filter.color = color;
        if (material) filter.material = material;
        if (search) filter.name = { $regex: search, $options: "i" };
        
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const products = await ProductModel.find(filter).populate("category", "name");

        if (products.length === 0) {
            return res.status(404).json({
                message: "No products found"
            })
        }
        return res.status(200).json({
            message: "Products fetched successfully",
            data: products
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch products",
            error: error.message
        })
    }
}


export const ShowById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            message: "Product details found",
            data: product
        });
    } catch (error) {
        return res.status(500).json({ message: "Error", error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { ProductId } = req.params;
        const productData = req.body
        
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            ProductId, 
            { $set: productData },
            { new: true, runValidators: true }
        );
        
        if (!updatedProduct) {
            return res.status(404).json({
                message: "No product found"
            });
        }
        
        return res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        return res.status(500).json({
            message: "Couldn`t update product",
            error: error.message
        });
    }
}

export const RemoveProduct = async (req, res) => {

    try {
        const { ProductId } = req.params;
        const removedProduct = await ProductModel.findByIdAndDelete(ProductId)
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