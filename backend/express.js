const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/registerDB")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  dob: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);

    await newUser.save();

    res.json({
      message: "User saved successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching users",
    });
  }
});
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({
      message: "user deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "error fetching data",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
