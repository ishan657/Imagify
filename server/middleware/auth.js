import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  } else {
    try {
      const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

      if (tokenDecode.id) {
        req.userId = tokenDecode.id;
      } else {
        return res.json({
          success: false,
          message: "Not Authorized. Login Again",
        });
      }
      next();
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }
};

export default userAuth;
