import axios from "axios";
import userModel from "../models/userModels.js";
import FormData from "form-data";

const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId;

    // ✅ validate input
    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: "No credits left",
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    // ✅ call external API safely
    let apiResponse;
    try {
      apiResponse = await axios.post(
        "https://clipdrop-api.co/text-to-image/v1",
        formData,
        {
          headers: {
            "x-api-key": process.env.API_KEY,
            ...formData.getHeaders(),
          },
          responseType: "arraybuffer",
        }
      );
    } catch (apiError) {
      return res.status(500).json({
        success: false,
        message: "Image generation failed",
      });
    }

    // ✅ convert image
    const base64Image = Buffer.from(apiResponse.data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    // ✅ atomic update (VERY IMPORTANT 🔥)
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $inc: { creditBalance: -1 } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Image Generated",
      creditBalance: updatedUser.creditBalance,
      resultImage,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { generateImage };