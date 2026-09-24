const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userData = await authService.register(name, email, password);

    res.status(201).json({
      message: "User registered successfully",
      user: userData,
    });
  } catch (error) {
    if (error.message === "User already exists") {
      return res.status(400).json({ error: error.message });
    }
    console.error("Register Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const result = await authService.login(email, password);

    res.json(result);
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return res.status(400).json({ error: error.message });
    }
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  register,
  login,
};
