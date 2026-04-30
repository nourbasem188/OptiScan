import connectDB from "./DB/connection.js";
import userCollection from "./Modules/User/user.controller.js";
import productCollection from "./Modules/Products/product.controller.js"



const bootstrap = async (app, express) => {
    app.use(express.json());

    await connectDB();

    app.use("/user",userCollection)
    app.use("/product",productCollection)



    app.all("/*dummy", (req, res) => {
        res.status(404).json({
            message: "Page not found"
        })
    })

}

export default bootstrap;