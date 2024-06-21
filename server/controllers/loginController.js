const db = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt with:", username, password);

  try {
    const user = await db.user.findOne({ where: { username } });
    console.log("User found:", user);
    if (!user) {
      console.log("User not found.");
      return res.status(404).json({ error: "User not found." });
    }
    console.log(password, user.password)
    const userpass = user.password;
    const isMatch = await bcrypt.compare(password, userpass);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Invalid credentials.");
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '60s' });

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
