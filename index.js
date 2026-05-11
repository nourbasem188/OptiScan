import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bootstrap from "./src/application.js";


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.static('Public'));

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

bootstrap(app, express);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})