require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./models");

const app = express();
const PORT = process.env.SERVER_PORT || 3100;

app.use(bodyParser.json());
app.use(cors());

// Database synchronization
db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((err) => {
    console.error("Database synchronization failed: ", err);
  });

// Routes
const gernalRoutes = require("./routes/gernal.routes");
app.use('/', gernalRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
