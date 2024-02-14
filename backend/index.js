const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const port = 4000;
require('dotenv').config();
const Razorpay = require('razorpay');
const crypto = require('crypto');


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Moin_Ansari:moin123@cluster0.2p18z40.mongodb.net/e-commerce");

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Invalid Token" });
        }
    }
};
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    subimage1: {
        type: String,
        required: true,
    },
    subimage2: {
        type: String,
        required: true,
    },
    subimage3: {
        type: String,
        required: true,
    },
    subimage4: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    description:{
        type : String ,
        required: true,
    },
    big_description:{
        type : String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

app.post('/addproduct', async (req, res) => {
    try {
        const products = await Product.find({});
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            subimage1: req.body.subimage1,
            subimage2: req.body.subimage2,
            subimage3: req.body.subimage3,
            subimage4: req.body.subimage4,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            description: req.body.description,
            big_description: req.body.big_description
        });

        await product.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Removed");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("All Products Fetched");
        res.send(products);
    } catch (error) {
        console.error("Error fetching all products:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

app.post('/signup', async (req, res) => {
    try {
        const check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "existing user found with the same email id" });
        }

        const cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        await user.save();

        const data = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (user) {
            const passCompare = req.body.password === user.password;
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id,
                    }
                };
                const token = jwt.sign(data, 'secret_ecom');
                res.json({ success: true, token });
            } else {
                res.json({ success: false, errors: "Wrong Password" });
            }
        } else {
            res.json({ success: false, errors: "Wrong Email Id" });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

app.get('/newcollections', async (req, res) => {
    try {
        const products = await Product.find({});
        const newcollection = products.slice(1).slice(-8);
        console.log("NewCollection Fetched");
        res.send(newcollection);
    } catch (error) {
        console.error("Error fetching new collections:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

app.get('/popularinwomen', async (req, res) => {
    try {
        const products = await Product.find({ category: "women" });
        const popularInWomen = products.slice(0, 4);
        console.log("Popular in Women Fetched");
        res.send(popularInWomen);
    } catch (error) {
        console.error("Error fetching popular in women:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        console.log("Added", req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added");
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        console.log("removed", req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
        }
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Remove");
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

app.post('/getcart', fetchUser, async (req, res) => {
    try {
        console.log('GetCart');
        let userData = await Users.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


const paymentSchema = new mongoose.Schema({
    razorpay_order_id: {
      type: String,
      required: true,
    },
    
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
    },
  });

  const Order = mongoose.model("Order", {
    order_id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
    // Add other fields as needed
});
  
  const Payment = mongoose.model("Payment", paymentSchema);
  
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });
  
  app.get('/api/cart/total', fetchUser, async (req, res) => {
    try {
      console.log('Get Cart Total Amount');
      let userData = await Users.findOne({ _id: req.user.id });
      
      let totalAmount = 0;
      for (const item in userData.cartData) {
        if (userData.cartData[item] > 0) {
          let itemInfo = await Product.findOne({ id: item });
          totalAmount += userData.cartData[item] * itemInfo.new_price;
        }
      }
  
      res.json({ success: true, totalAmount });
    } catch (error) {
      console.error("Error fetching cart total amount:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });

app.post("/api/razorpay/order", async (req, res) => {
    try {
      // Fetch the total amount dynamically from the user's cart
      const totalAmountResponse = await fetch(`http://localhost:${port}/api/cart/total`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": req.header('auth-token'),
        },
      });

      const totalAmountData = await totalAmountResponse.json();

      if (!totalAmountData.success) {
        return res.status(500).json({ success: false, error: "Error fetching cart total amount" });
      }

      const orderAmount = totalAmountData.totalAmount * 100; // Convert amount to paisa
      const options = {
        amount: orderAmount,
        currency: "INR",
        receipt: "order_receipt_" + Date.now(),
      };
  
      // Using Razorpay Node.js client's promise-based API
      const order = await razorpay.orders.create(options);
      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
      cart[index] = 0;
    }
    return cart;
  };
app.post("/api/razorpay/verify", fetchUser, async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        try {
            console.log("User ID:", req.user.id);
            // Verify the user using the fetchUser middleware
            // The user information is available in req.user
            const user = await Users.findOne({ _id: req.user.id });

            if (user) {
                // Update the user's cart data
                user.cartData = getDefaultCart(); // Reset cart to empty or your desired logic
                await user.save();
            } else {
                console.error("User not found while updating cart data.");
            }

            // Update the Order status in the database
            const order = await Order.findOne({ order_id: razorpay_order_id });
            if (order) {
                // Order found, update the status
                order.status = "Paid"; // Set your desired status
                await order.save();
            } else {
                // Order not found, create a new order
                await Order.create({
                    order_id: razorpay_order_id,
                    status: "Paid", // Set your desired status
                });
            }

            // Create a Payment record
            await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });

            res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
        } catch (error) {
            console.error("Error updating/creating order and payment records:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    } else {
        res.status(400).json({ success: false, error: "Invalid Signature" });
    }
});




app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port" + port);
    } else {
        console.log("Error:" + error);
    }
});