import jwt from "jsonwebtoken";
import "dotenv/config";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@sorciaafrica.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "SorciaAdmin2026!";
const JWT_SECRET = process.env.JWT_SECRET || "sorcia-fallback-secret";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "Login successful.",
      token,
      admin: { email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    res.json({
      success: true,
      admin: { email: decoded.email },
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token." });
  }
};
