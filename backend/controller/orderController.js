import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Placing user Order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "https://flavouredwheels-frontend.onrender.com";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
   

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error)
    res.json({
        success:false,
        message:"Error in the Payement"
    })
  }
};

const verifyOrder = async(req,res)=>{
  const{orderId, success} = req.body;
  try {
    if(success == "true"){
      await orderModel.findByIdAndUpdate(orderId, {payment:true});
      const orderObj = await orderModel.findById(orderId);
      await userModel.findByIdAndUpdate( orderObj.userId, {cartData:{}});
      res.json({
        success:true,
        message:"Paid"
      })
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({
        success: false,
        message: "Not paid"
      })
    }
    
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error in  modifyin payment status"
    })
  }
}

//user order for frontend
const userOrders = async(req,res) =>{
  try {
    const orders = await orderModel.find({userId:req.body.userId})
    res.json({
      success: true,
      data: orders
    })
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message:"Error in fetching order"
    })
  }
}

//Listing orders for admin pannel
const listOrders = async(req, res) =>{
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      data: orders
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: "Error while fetching all Users Order"
    })
  }
}

//api for updating order Status
const updateStatus = async(req, res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
    res.json({
      success: true,
      message: "Status Updated"
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: "Error in updating status"
    })
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
