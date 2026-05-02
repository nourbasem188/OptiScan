import connectDB from "./DB/connection.js";
import userCollection from "./Modules/User/user.controller.js";
import productCollection from "./Modules/Products/product.controller.js"
import categoryCollection from "./Modules/Category/category.controller.js"
import cartCollection from "./Modules/Cart/cart.controller.js"
import orderCollection from "./Modules/Order/order.controller.js"

const bootstrap = async (app, express) => {
    app.use(express.json());

    await connectDB();

    app.use("/user", userCollection)
    app.use("/product", productCollection)
    app.use("/category", categoryCollection)
    app.use("/cart", cartCollection)
    app.use("/order", orderCollection)



    app.all("/*dummy", (req, res) => {
        res.status(404).json({
            message: "Page not found"
        })
    })

}

export default bootstrap;