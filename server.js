const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const FILE = "submissions.json";

app.use(cors());
app.use(express.json());

// Save form data
app.post("/submit", (req, res) => {
  const data = req.body;
  let submissions = [];

  if (fs.existsSync(FILE)) {
    submissions = JSON.parse(fs.readFileSync(FILE));
  }

  submissions.push(data);
  fs.writeFileSync(FILE, JSON.stringify(submissions, null, 2));
  res.send("Form submitted successfully!");
});

// View all submissions
app.get("/admin", (req, res) => {
  if (fs.existsSync(FILE)) {
    const data = JSON.parse(fs.readFileSync(FILE));
    res.json(data);
  } else {
    res.json([]);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
