import userModel from "../models/userModels.js";
import transactionModel from "../models/transactionModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";

// ================== REGISTER ==================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    // Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ================== LOGIN ==================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.json({
        success: true,
        token,
        user: { name: user.name, email: user.email },
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ================== USER CREDITS ==================
const userCredits = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    res.json({
      success: true,
      credits: user.creditBalance || 0,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ================== RAZORPAY INSTANCE ==================
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ================== PAYMENT RAZORPAY ==================
const paymentRazorpay = async (req, res) => {
  try {
    console.log("Backend received body:", req.body);

    const { planId, id: userId } = req.body; // get userId and planId

    if (!userId || !planId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    // Validate user
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Determine plan details
    let credit, plan, amount;
    switch (planId) {
      case "Basic":
        credit = 100;
        plan = "Basic";
        amount = 100;
        break;
      case "Advanced":
        credit = 500;
        plan = "Advanced";
        amount = 500;
        break;
      case "Business":
        credit = 2500;
        plan = "Business";
        amount = 5000;
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid Plan" });
    }

    // Save transaction in DB
    const transactionData = {
      userId,
      plan,
      amount,
      credits: credit,
      date: Date.now(),
    };
    const newTransaction = await transactionModel.create(transactionData);

    // Razorpay order options
    const options = {
      amount: amount * 100, // amount in paisa
      currency: process.env.CURRENCY || "INR",
      receipt: String(newTransaction._id),
    };

    // Create Razorpay order
    const order = await razorpayInstance.orders.create(options);
    console.log("Order created:", order);

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Payment Razorpay error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
// ================== VERIFY RAZORPAY =================='

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status == "paid") {
      const transactionData = await transactionModel.findById(
        orderInfo.receipt
      );
      if (transactionData.payment) {
        return res.json({ sucess: false, message: "Payment Failed" });
      }
      const userData = await userModel.findby(transactionData.userId);
      const creditBalance = userData.creditBalance + transactionData.credits;
      await userModel.findByIdAndUpdate(userData._Id, { creditBalance });
      await transactionModel.findOneAndUpdate(transactionData._id, {
        payment: true,
      });
      res.json({ success: true, message: "Credits Added" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
};
