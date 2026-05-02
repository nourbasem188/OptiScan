import CategoryModel from "../../DB/Models/category.model.js";
import ProductModel from "../../DB/Models/product.model.js";

export const AddCategory = async (req, res) => {
    try {
        const {name,description,image}=req.body
        const existingCategory = await CategoryModel.findOne({name})
        if(existingCategory){
            return res.status(400).json({
                message: "Category already exists!"
            })
        }
        const category = await CategoryModel.create({name,description,image})
        return res.status(201).json({
            message: "Category added successfully",
            category: category
        })
    } catch (error) {
        return res.status(500).json({
            message: "Couldn`t add category",
            error: error.message
        })
    }
}

export const ShowCategory = async (req, res) => {

    try {
        const {categoryName}=req.params;
        const category = await CategoryModel.findOne({name:categoryName})
        if (!category) {
            return res.status(404).json({
                message: "No category found"
            })
        }
        return res.status(200).json({
            message: "Category found",
            category: category
        })
    } catch (error) {
        return res.status(500).json({
            message: "Couldn`t show category",
            error: error.message
        })
    }
}

export const ShowAllCategories = async (req, res) => {

    try {
        const categories = await CategoryModel.find()
        return res.status(200).json({
            message: "Categories found",
            categories: categories
        })
    } catch (error) {
        return res.status(500).json({
            message: "Couldn`t show categories",
            error: error.message
        })
    }

}



export const updateCategory = async (req, res) => {

    try {
        const {categoryId} = req.params;
        const categoryData = req.body
        const category = await CategoryModel.findById(
            categoryId,
            {$set: categoryData},
            {new: true,runValidators: true}
        )
        if (!category) {
            return res.status(404).json({
                message: "No category found"
            })
        }
        const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, {name, description, image}, {new: true})
        return res.status(200).json({
            message: "Category updated successfully",
            category: updatedCategory
        })
    } catch (error) {
        return res.status(500).json({
            message: "Couldn`t update category",
            error: error.message
        })
    }
}

export const ShowByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // 1. نتأكد إن القسم موجود أصلاً
        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                message: "No category found"
            });
        }

        // 2. السطر السحري: بندور في موديل المنتجات على أي حاجة تبع الـ categoryId ده
        // ملاحظة: تأكدي إن الحقل في موديل المنتج اسمه category
        const products = await ProductModel.find({ category: categoryId });

        // 3. بنرجع بيانات القسم ومعاها المنتجات الحقيقية مش مصفوفة فاضية
        return res.status(200).json({
            message: "Category and products found",
            category: category,
            data: products // الـ JS في الـ Frontend مستني كلمة data
        });

    } catch (error) {
        return res.status(500).json({
            message: "Couldn't show category products",
            error: error.message
        });
    }
}

export const removeCategory=async(req,res)=>{

    try {
        const {categoryId}=req.params;
        const category=await CategoryModel.findById(categoryId)
        if(!category){
            return res.status(404).json({
                message: "No category found"
            })
        }
        await CategoryModel.findByIdAndDelete(categoryId)
        return res.status(200).json({
            message: "Category removed successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Couldn`t remove category",
            error: error.message
        })
    }
}