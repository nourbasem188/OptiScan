import express from "express";
import bootstrap from "./src/application.js";
const app = express();
const port = 3000;
app.use(express.json());
app.use('/uploads', express.static('uploads'));

bootstrap(app, express);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})