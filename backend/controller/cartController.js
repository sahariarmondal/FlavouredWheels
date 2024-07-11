import userModel from "../models/userModel.js";

//add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Added to Cart",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error while addig in cart",
    });
  }
};

//remove item from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] === 1) {
        delete cartData[req.body.itemId];
      }
    else if (cartData[req.body.itemId]) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Removed from cart",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error while removing from the cart",
    });
  }
};

//fetch userCart Data
const getCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({
            success: true,
            cartData
        })
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error while getting cart items"})
    }

};

export { addToCart, removeFromCart, getCart };
