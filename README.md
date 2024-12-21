# Elixirs E-Commerce Web Application  

This is a complete E-Commerce web application built with the MERN stack (MongoDB, Express, React, Node.js) and integrated with Razorpay for payment processing. It includes both a user-facing front-end and an admin panel.  

---

## Table of Contents  
1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Front-End Setup](#front-end-setup)  
4. [Back-End Setup](#back-end-setup)  
5. [Admin Panel Setup](#admin-panel-setup)  
6. [Database Models](#database-models)  
7. [Razorpay Integration](#razorpay-integration)  
8. [How to Run the Project](#how-to-run-the-project)  
9. [Demo Video](#demo-video)  
10. [Contributing](#contributing)  
11. [License](#license)  

---

## Features  
- **User Authentication**: Signup/Login functionality.  
- **Product Management**: Add/Remove products.  
- **Shopping Cart**: Manage products in the cart.  
- **Category-based Filtering**: Browse products by category.  
- **Checkout Process**: Payment integration using Razorpay.  
- **Admin Panel**: Manage products and view analytics.  
- **Responsive Design**: Works seamlessly on various devices.  

---

## Technologies Used  

- **Front-End**: React, React Router.  
- **Back-End**: Node.js, Express.js, MongoDB, Mongoose.  
- **Authentication**: JWT (JSON Web Tokens).  
- **Payment Integration**: Razorpay API.  
- **Styling**: CSS.  
- **Other Libraries**: Multer (file uploads), Crypto (signature verification).  

---

## Front-End Setup  

The front-end is built using React and includes several components for navigation, shopping, and checkout functionality.  

### Key Files  
- **App.js**: Sets up routes using `react-router-dom`.  
- **index.js**: Renders the `App` component with `ShopContextProvider` for global state.  
- **ShopContextProvider.js**: Manages global state for shopping cart and other data.  

### Components  
- **Navbar**: Navigation links to pages.  
- **Footer**: Footer section for the application.  
- **Pages**: Includes Shop, ShopCategory, Product, Cart, LoginSignup, and Checkout pages.  

### Usage  
- **Routing**: Client-side routing with `react-router-dom`.  
- **Context API**: Global state management for cart data and user actions.  

---

## Back-End Setup  

The back-end is powered by Node.js and Express, with MongoDB as the database. It includes features like JWT-based authentication and Razorpay payment processing.  

### Key Files  
- **index.js**: Main server file that initializes the Express app and connects to MongoDB.  
- **.env**: Stores environment variables (e.g., database connection strings, Razorpay keys).  

### Middleware  
- **JWT Verification**: Protects API routes.  
- **Multer**: Handles file uploads.  
- **Cors**: Enables cross-origin requests.  

### API Endpoints  
#### Authentication  
- `/signup`: User signup.  
- `/login`: User login.  

#### Product Management  
- `/addproduct`: Add a new product.  
- `/removeproduct`: Remove an existing product.  
- `/allproducts`: Fetch all products.  
- `/newcollections`: Latest products.  
- `/popularinwomen`: Popular products for women.  

#### Cart Management  
- `/addtocart`: Add product to the cart.  
- `/removefromcart`: Remove product from the cart.  
- `/getcart`: Fetch cart data.  

#### Payment Processing  
- `/api/razorpay/order`: Create a Razorpay order.  
- `/api/razorpay/verify`: Verify payment and update status.  

#### Checkout  
- `/api/checkout/storeUserInfo`: Store user info for checkout.  

---

## Admin Panel Setup  

The admin panel is built with React and allows administrators to manage products efficiently.  

### Key Files  
- **App.js**: Main application file for the admin panel.  
- **index.js**: Renders the admin application.  

---

## Database Models  

### Product Model  
```javascript
const Product = mongoose.model("Product", { ... });
```
### User Model
```javascript
const Users = mongoose.model("Users", { ... });
```
### Order Model
```javascript
const Order = mongoose.model("Order", { ... });
```
### Payment Model
```javascript
const Payment = mongoose.model("Payment", { ... });
```
### UserInfo Model
```javascript
const UserInfo = mongoose.model("UserInfo", { ... });
```

---

## Razorpay Integration
### Payment Workflow
Order Creation: Razorpay order created via /api/razorpay/order.
Payment Verification: Signature verified at /api/razorpay/verify.

---

## How to Run the Project
### Prerequisites
Node.js
MongoDB
Razorpay Account

### Steps to Run
1. Clone the repository:
   git clone https://github.com/Moin333/Elixirs-e-commerce.git
2. Navigate to the project directory:
   cd Elixirs-e-commerce
3. Install dependencies:
   npm install
   cd admin_panel
   npm install
4. Set up environment variables:
   Create a .env file and add:
   env
   MONGODB_URI=
   RAZORPAY_API_KEY=
   RAZORPAY_API_SECRET=
5. Run the back-end server:
   node ./index.js
6. Run the front-end server:
   cd ../
   npm start
7. Run the admin panel:
   cd admin_panel
   npm run dev
8. Access the application:
   User Front-End: http://localhost:3000
   Admin Panel: http://localhost:3000/admin

---

## Demo Video

![Demo Preview](/project-demo-link2.gif)
![Demo Preview](/project-demo-link1.gif)
![Demo Preview](/project-demo-link3.gif)
![Demo Preview](/project-demo-link4.gif)
![Demo Preview](/project-demo-link5.gif)
![Demo Preview](/project-demo-link6.gif)
![Demo Preview](/project-demo-link7.gif)

---

## Contributing
Contributions are welcome! Open an issue or submit a pull request with improvements or bug fixes.

---

## License
This project is licensed under the MIT License.

---