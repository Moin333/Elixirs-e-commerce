E-Commerce Web Application
This is a complete E-Commerce web application built with a MERN stack (MongoDB, Express, React, Node.js) and integrated with Razorpay for payment processing. 
The project includes both a user-facing front-end and an admin panel.


Table of Contents
1.Features
2.Technologies Used
3.Front-End Setup
4.Back-End Setup
5.Admin Panel Setup
6.Database Models
7.Razorpay Integration
8.How to Run the Project


1.Features
User Authentication (Signup/Login)
Product Management (Add/Remove Products)
Shopping Cart Functionality
Category-based Product Filtering
Checkout Process with Payment Integration (Razorpay)
Admin Panel for Managing Products
Responsive Design


2.Technologies Used
Front-End: React, React Router
Back-End: Node.js, Express.js, MongoDB, Mongoose
Authentication: JWT (JSON Web Tokens)
Payment Integration: Razorpay API
Styling: CSS
Other Libraries: Multer (for file uploads), Crypto (for signature verification)


3.Front-End Setup
The front-end is built using React and includes various components like Navbar, Footer, and different pages for shopping, product details, cart, login/signup, and checkout.

->Key Files
App.js: Main application file that sets up the routes using react-router-dom.
index.js: Renders the App component within the ShopContextProvider for state management.
ShopContextProvider.js: Context provider for managing global state across the application.

->Components
Navbar: Navigation bar with links to different pages.
Footer: Footer section displayed across all pages.
Pages: Includes Shop, ShopCategory, Product, Cart, LoginSignup, and Checkout.

->Usage
Routing: The application uses react-router-dom for client-side routing.
Context API: ShopContextProvider is used for managing the global state, including the shopping cart data.


4.Back-End Setup
The back-end is built with Node.js and Express and connects to a MongoDB database for storing user and product information. 
The back-end also includes JWT-based authentication and Razorpay integration for handling payments.

->Key Files
index.js: Main server file that sets up the Express app, connects to MongoDB, and defines the API routes.
.env: Environment variables for database connection strings and Razorpay API keys.

->Middleware
JWT Verification: Middleware to verify JWT tokens for protected routes.
Multer: Used for handling file uploads (product images).
Cors: Enables Cross-Origin Resource Sharing.

->API Endpoints
Authentication:
/signup: User signup
/login: User login
Product Management:
/addproduct: Add a new product
/removeproduct: Remove an existing product
/allproducts: Fetch all products
/newcollections: Fetch the latest products
/popularinwomen: Fetch popular products in the women's category
Cart Management:
/addtocart: Add a product to the cart
/removefromcart: Remove a product from the cart
/getcart: Fetch the current cart data
Payment Processing:
/api/razorpay/order: Create a Razorpay order
/api/razorpay/verify: Verify payment and update order status
Checkout:
/api/checkout/storeUserInfo: Store user information for checkout


5.Admin Panel Setup
The admin panel is a React application that allows administrators to manage the products. It includes a simple layout with a Navbar and an Admin page.

->Key Files
App.js: Main application file for the admin panel.
index.js: Renders the admin panel application.


6.Database Models

Product Model
const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    subimage1: { type: String },
    subimage2: { type: String },
    subimage3: { type: String },
    subimage4: { type: String },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    description: { type: String, required: true },
    big_description: { type: String },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

User Model
const Users = mongoose.model('Users', {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now },
});

Order Model
const Order = mongoose.model("Order", {
    order_id: { type: String, required: true },
    status: { type: String, default: "Pending" },
    cartData: { type: Object, required: true },
});

Payment Model
const paymentSchema = new mongoose.Schema({
    razorpay_order_id: { type: String, required: true },
    razorpay_payment_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
});
const Payment = mongoose.model("Payment", paymentSchema);

UserInfo Model
const UserInfo = mongoose.model('UserInfo', {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    country: { type: String, required: true },
    streetAddress: { type: String, required: true },
    postalCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    stateProvince: { type: String, required: true },
    city: { type: String, required: true },
});


7.Razorpay Integration
The application integrates with Razorpay for payment processing. The integration is done on the back-end using the Razorpay Node.js client.

->Payment Workflow
1.Order Creation: A Razorpay order is created by calling the /api/razorpay/order endpoint. The total amount is fetched from the user's cart.
2.Payment Verification: After the payment is completed, Razorpay sends a signature that is verified on the server using the /api/razorpay/verify endpoint. 
If the signature is valid, the order status is updated, and the payment is recorded in the database.


8.How to Run the Project

->Prerequisites
Node.js
MongoDB
Razorpay Account

->Steps to Run
1.Clone the repository:
git clone https://github.com/Moin333/Elixirs-e-commerce.git

2.Navigate to the project directory:
cd Elixirs-e-commerce

3.Install the dependencies:
npm install
cd admin_panel
npm install

4.Set up the environment variables: Create a .env file in the root directory and add your MongoDB connection string and Razorpay API keys.
MONGODB_URI=<your-mongodb-connection-string>
RAZORPAY_API_KEY=<your-razorpay-api-key>
RAZORPAY_API_SECRET=<your-razorpay-api-secret>

5.Run the back-end server:
node ./index.js

6.Run the front-end server:
cd ../
npm start

7.Run the admin panel:
cd admin_panel
npm run dev

8.Access the application:
User Front-End: http://localhost:3000
Admin Panel: http://localhost:3000/admin


Contributing
Contributions are welcome! Please open an issue or submit a pull request with any improvements or bug fixes.


License
This project is licensed under the MIT License.
