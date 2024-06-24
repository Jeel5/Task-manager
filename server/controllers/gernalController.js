const db = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');

exports.registerUser = async (req, res) => {
  console.log("heyooo")
  try {
    const { table, username, password, ...fieldsToInsert } = req.body;

    if (!table) {
      return res.status(400).json({ error: "Table name not provided." });
    }

    const Model = db[table];

    if (!Model) {
      return res.status(404).json({ error: "Table not found." });
    }

    if (table === 'user') {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      fieldsToInsert.password = hashedPassword;
    }

    const newRecord = await Model.create({ username, password: fieldsToInsert.password, ...fieldsToInsert });

    const token = jwt.sign({ id: newRecord.id }, config.secret, { expiresIn: '30d' });

    res.status(201).json({
      message: `${table} data inserted successfully.`,
      data: newRecord,
      token,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

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

    const token = jwt.sign({ id: user.id, username: user.username }, config.secret, { expiresIn: '30d' });

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
