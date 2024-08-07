const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const cors = require("cors")
const bodyParser = require("body-parser")
const eachAndEveryProduct = require("./schemas/productSchema.js")
const UserDetail = require("./schemas/userSchema.js")
const Cart = require("./schemas/cartSchema.js")
const Razorpay = require("razorpay")
const orders = require("./schemas/ordersSchema.js")

const app = express()
const corsOptaion = {
    origin: "http://localhost:5173",
    credentials: true,
}
app.use(cors(corsOptaion))
app.use(cookieParser())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "secret",

    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(bodyParser.json())

const conn = mongoose.connect("mongodb+srv://anantjha0112:Anant9324831333@clusterofanant.nrldpqa.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOfAnant")

// const data = new UserDetail({
//     name:"Anant Jha",
//     email:"anantjha0112@gmail.com",
//     password:"12345678"
// })
// data.save()
app.get("/user", (req, res) => {
    if (req.session.user) {
        res.json({ valid: true, value: req.session.user })
    }
    else {
        res.json({ valid: false })
    }
})
app.get("/product", async (req, res) => {
    try {
        const data = await eachAndEveryProduct.find({});
        res.json(data);
    }
    catch (e) {
        console.log(e);
    }
})


app.post("/login", async (req, res) => {
    try {

        const value = await UserDetail.find({ email: req.body.email });
        if (value.length > 0) {
            if (value[0].password == req.body.password) {
                req.session.user = value[0];
                res.json({ message: "succesfull" ,user:{valid:true,value:value[0]}})
            }
            else {
                res.json({ message: "incorrect password" })
            }
        }
        else {
            res.json({ message: "No records found" })
        }
    }
    catch (e) {
        console.log(e);
    }
})

app.get("/logout" ,async (req,res)=>{
    if(!req.session.user)
    {
        res.json({ valid: false })
        return
    }
    req.session.destroy()
    res.json({ valid: false })

})

app.post("/cart", async (req, res) => {
    try {
        if (!req.session.user) return

        const data = await Cart.find({ email: req.body.email });
        if (data.length > 0) {
            let arr = data[0].cart
            if (arr.find(a => a.id === req.body.id)) {
                res.json({ message: "succesfull" })
                return;
            }
            arr.push({ id: req.body.id, quantity: req.body.quantity })

            const response = new Cart(
                {
                    email: req.body.email,
                    cart: arr
                }
            )
            await Cart.deleteOne({ email: req.body.email })
            response.save()

            res.json({ message: "succesfull" })
        }
        else {
            const response = new Cart(
                {
                    email: req.body.email,
                    cart: [{ id: req.body.id, quantity: req.body.quantity }]
                }
            )
            response.save()
        }

    }
    catch (e) {
        console.log(e);
    }
})

app.post("/getCart", async (req, res) => {
    try {
        if (req.session.user) {

            const data = await Cart.find({ email: req.body.email })

            if (data.length > 0) {
                console.log(data[0].cart);
                res.json(data[0].cart)
            }
            else {
                console.log("else");
                res.json([])
            }
        }
    }
    catch (e) {
        console.log(e);
    }
})


app.post("/increaseQuantity", async (req, res) => {
    try {
        if (!req.session.user) {
            return res.json({ message: "unsuccessfull" });
        }
        const data = await Cart.find({ email: req.body.email });

        if (data.length > 0) {
            let list = data[0].cart;
            let index = list.findIndex(obj => obj.id === parseInt(req.body.id))

            list[index]["quantity"] += 1;

            await Cart.updateOne({ email: req.body.email }, { $set: { cart: list } });
            res.json({ message: "successfull" })
        }
        else {
            res.json({ message: "unsuccessfull" });

        }
    }
    catch (e) {
        console.log(e);
    }
})

app.post("/decreaseQuantity", async (req, res) => {
    try {
        if (!req.session.user) {
            return res.json({ message: "unsuccesfull" });
        }


        const data = await Cart.find({ email: req.body.email });
        if (data.length > 0) {
            let list = data[0].cart;
            let index = list.findIndex(obj => obj.id === parseInt(req.body.id))

            list[index]["quantity"] -= 1;

            await Cart.updateOne({ email: req.body.email }, { $set: { cart: list } });
            res.json({ message: "successfull" })
        }
        else {
            return res.json({ message: "unsuccesfull" })
        }
    }
    catch (e) {
        console.log(e);
    }
})

app.post("/remove", async (req, res) => {
    try {
        if (!req.session.user) {
            return res.json({ message: "unsuccesfull" });
        }


        const data = await Cart.find({ email: req.body.email });
        if (data.length > 0) {
            let list = data[0].cart;
            let index = list.findIndex(obj => obj.id === parseInt(req.body.id))

            list.splice(index, 1)

            await Cart.updateOne({ email: req.body.email }, { $set: { cart: list } });
            res.json({ message: "successfull" })
        }
        else {
            return res.json({ message: "unsuccesfull" })
        }
    }
    catch (e) {
        console.log(e);
    }
})


app.get("/address", async (req, res) => {
    try {
        if (!req.session.user) {
            return;
        }

        console.log(req.session.user.email);
        const data = await UserDetail.find({ email: req.session.user.email });

        res.json(data);

    } catch (err) {
        console.error("Error fetching address:", err);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.post("/addAddress", async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        console.log(req.body);

        const data = await UserDetail.updateOne(
            { email: req.session.user.email },
            {
                $push: {
                    address: {
                        $each: [req.body], // Add the new address as an array
                    },
                },
            }
        );
        res.json({ message: "successful" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

const razorpay = new Razorpay({
    key_id: "rzp_test_gI00jflkRvp85R",
    key_secret: "GJAHUj7atKa2sc57EOoj1c5W"
})

app.post("/razorpay", async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100,  // Make sure req.body.amount is defined
            currency: "INR",
            receipt: "sudhfshdihisdhcugsucsdycgusdcu",
            payment_capture: 1
        };

        const response = await razorpay.orders.create(options);
        console.log(response);
        res.json(response);

    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.post("/addPaymentToDB", async (req, res) => {
    try {
        if (!req.session.user) {
            return
        }
        const cartDetail = await Cart.find({ email: req.session.user.email })
        const orderData = await orders.find({ email: req.session.user.email })


        if (orderData.length > 0) {

            let list = orderData[0].orders;
            list.push({ product: cartDetail[0].cart, transaction: req.body, status: "ordered", orderDate: new Date().getDate(), orderMonth: new Date().getMonth() })

            await orders.updateOne({ email: req.session.user.email },
                { $set: { orders: list } }
            )

            // removing item from the cart
            await Cart.updateOne({ email: req.session.user.email }, {
                $set: { cart: [] }
            })
            res.json({ message: "ok" })
        }
        else {
            const insert = new orders(
                {
                    email: req.session.user.email,
                    orders: [{ product: cartDetail[0].cart, transaction: req.body, status: "ordered", orderDate: new Date().getDate(), orderMonth: new Date().getMonth() }]

                }
            )
            insert.save()
            await Cart.updateOne({ email: req.session.user.email }, {
                $set: { cart: [] }
            })
            res.json({ message: "ok" })
        }


    } catch (error) {
        console.log(error);

    }
})

app.get("/getOrders", async (req, res) => {
    try
    {
        if (!req.session.user) {
            res.json([]);
            return;
        }

        const data = await orders.find({ email: req.session.user.email })

        if (data.length > 0) {
            res.json(data[0].orders)
        }
        else {
            res.json([])
        }
    }
    catch(e)
    {
        console.log(e);
    }
})

app.listen(5000, () => {

    console.log("listning.......");
})