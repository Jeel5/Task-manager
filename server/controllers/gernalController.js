const db = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.insertData = async (req, res) => {
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

    const token = jwt.sign({ id: newRecord.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

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
