const express = require("express")
const {db}=require("./config/db")
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT
const app = express()
const userRouter = require('./routers/User.Route');
const productRouter = require('./routers/Product.Route')

app.use(express.json())
app.use(cors())


app.get("/", (req,res) => {
    res.send("Welcome, Backend of JobPortal!")
})

app.use(userRouter,productRouter); 


app.listen(port, () => {
    try {
        db()
        console.log(`Server is running on port ${port}`)
    } catch (error) {
        console.error(error)
    }

})