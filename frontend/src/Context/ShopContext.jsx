import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_Product(data));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const initiatePayment = async () => {
    try {
        const response = await fetch("http://localhost:4000/api/razorpay/order", {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem("auth-token"),
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        console.log("Razorpay order data:", data);

        if (data && data.order && data.order.amount) {
            const options = {
                key: "rzp_test_UJPuWsn8g1ywq6", // Replace with your actual Razorpay key
                amount: data.order.amount,
                currency: data.order.currency,
                order_id: data.order.id,
                name: "Elixiers",
                description: "Payment for products",
                handler: async (response) => {
                    // Handle the payment success
                    console.log(response);
                    const verifyResponse = await fetch("http://localhost:4000/api/razorpay/verify", {
                        method: "POST",
                        headers: {
                            "auth-token": localStorage.getItem("auth-token"),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(response),
                    });

                    const verifyData = await verifyResponse.json();

                    if (verifyData.success) {
                        console.log("Payment verified successfully");
                        // Perform any further actions, such as updating the UI or notifying the user
                    } else {
                        console.error("Payment verification failed");
                    }
                },

                theme: {
                    color: "#F37254",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } else {
            console.error("Invalid data structure from Razorpay server:", data);
        }
    } catch (error) {
        console.error("Error initiating payment:", error);
    }
};

  
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.new_price;
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    console.log("Updated Cart Items:", cartItems);
  }, [cartItems]);

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    initiatePayment, // New function for initiating payment
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
