import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Error("Unauthenticated");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;

    next();
  } catch (error) {
    res.json({ message: error.message });
  }
};

export default authMiddleware;
