const { task } = require('../models');

const createTask = async (req, res) => {
  try {
    const { title, description, startDate, endDate, priority } = req.body;
    const userId = req.userId;

    const newTask = await task.create({
      title,
      description,
      startDate,
      endDate,
      userId,
      priority,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasksByUserId = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await task.findAll({
      where: { userId },
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateTask = async (req, res) => {
  console.log("yohohooh")
  try {
    const { id, title, description, startDate, endDate, priority } = req.body;
    const userId = req.userId;
    console.log(req.body)

    const existingTask = await task.findOne({ where: { id, userId } });
    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    existingTask.title = title;
    existingTask.description = description;
    existingTask.startDate = startDate;
    existingTask.endDate = endDate;
    existingTask.priority = priority;

    await existingTask.save();
    res.status(200).json(existingTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const existingTask = await task.findOne({ where: { id, userId } });
    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    await existingTask.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTasksByUserId,
  updateTask,
  deleteTask
};
