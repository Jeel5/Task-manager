const db = require("../models");

exports.insertData = async (req, res) => {
  try {
    const { table, ...fieldsToInsert } = req.body;

    if (!table) {
      return res.status(400).json({ error: "Table name not provided." });
    }

    const Model = db[table];

    if (!Model) {
      return res.status(404).json({ error: "Table not found." });
    }

    const newRecord = await Model.create(fieldsToInsert);

    res.status(201).json({
      message: `${table} data inserted successfully.`,
      data: newRecord,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
