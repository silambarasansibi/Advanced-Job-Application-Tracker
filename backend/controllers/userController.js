const userService = require("../services/userService");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};

module.exports = {
  getUsers,
};
