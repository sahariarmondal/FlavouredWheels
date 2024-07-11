import React, { useEffect } from "react";
import "./Cart.css";
import { useContext, useState } from "react";
import { StoreContext } from "../../components/context/StoreContext";
import { useNavigate } from "react-router-dom";
import LoginPopup from "../../components/LoginPopup/LoginPopup";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/order");
    } else {
      setShowLogin(true);
    }
  };

  if (getTotalCartAmount()) {
    return (
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div>
                  <div key={index} className="cart-items-title cart-items-item">
                    <img src={url + /images/ + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <p
                      className="cross"
                      onClick={() => removeFromCart(item._id)}
                    >
                      X
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            <div>
              <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
              {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
            </div>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promocode, Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Promocode" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="no-item-inCart">
        <h2>No Item in the Cart</h2>
        <button onClick={() => navigate("/")}>Add Items to Cart</button>
      </div>
    );
  }
};

export default Cart;
