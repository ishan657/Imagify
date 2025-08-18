import axios from "axios";
import userModel from "../models/userModels.js";
import FormData from "form-data";

const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;
    const user = await userModel.findById(userId);
    if (!user || !prompt) {
      return res
        .status(404)
        .json({ success: false, message: "Missing Details" });
    }
    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.json({
        success: false,
        message: "NO credits left",
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData(); // passing the data to FormData
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.form(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    await userModel.findByIdAndUpdate(userId, {
      creditBalance: user.creditBalance - 1,
    });
    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { generateImage };
