import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const BuyCredits = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const { user, backendUrl, loadCreditsData, token, setShowLogin } = context;

  const navigate = useNavigate();

  const initPay = async (order) => {
    console.log("Opening Razorpay with order:", order);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: Number(order.amount),
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-razor",
            response,
            { headers: { token } }
          );
          if (data.success) {
            loadCreditsData();
            navigate("/");
            toast.success("Credit Added");
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (err) => console.error("Payment failed:", err));
      rzp.open();
    } else {
      console.error("Razorpay SDK not loaded");
    }
  };

  const paymentRazorpay = async (planId) => {
    try {
      console.log("Clicked plan:", planId);
      console.log("User object:", user);
      console.log("Token:", token);
      console.log("User ID from state:", user?._id);

      if (!user) {
        setShowLogin(true);
        return;
      }

      // ✅ Use user._id if available, otherwise decode from JWT
      let userId = user?._id;
      if (!userId && token) {
        const decoded = jwtDecode(token);
        userId = decoded.id;
        console.log("User ID from token:", userId);
      }

      if (!userId) {
        console.error("No valid userId found");
        return;
      }

      console.log("Frontend sending:", { planId, id: userId });

      const { data } = await axios.post(
        backendUrl + "/api/user/pay-razor",
        { planId, id: userId }, // ✅ always a string ObjectId now
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (err) {
      console.error("Payment Razorpay frontend error:", err);
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose a plan
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-left ">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <img src={assets.logo_icon} width={40} alt="" />
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span> /
              {item.credits} credits
            </p>
            <button
              onClick={() => paymentRazorpay(item.id)}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52"
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </Motion.div>
  );
};

export default BuyCredits;
